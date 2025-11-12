"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, Package, Truck, ArrowRight, Loader2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { trackEcommerce } from "@/hooks/useTrackdeskEvent";

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const session_id = searchParams.get("session_id");
    const orderId = searchParams.get("order") || "";

    if (session_id) {
      setSessionId(session_id);
      // Clear cart after successful payment
      clearCart();
    }

    // Track order conversion
    if (
      (session_id || orderId) &&
      typeof window !== "undefined" &&
      window.Trackdesk
    ) {
      trackPurchase(session_id || orderId, orderId);
    }
  }, [searchParams, clearCart]);

  const trackPurchase = async (sessionIdOrOrderId: string, orderId: string) => {
    try {
      // Get stored referral code from sessionStorage
      const getStoredReferralCode = () => {
        try {
          const stored = sessionStorage.getItem("trackdesk_referral_code");
          if (!stored) {
            return null;
          }

          const sessionData = JSON.parse(stored);
          const code = sessionData.code;

          if (!code || typeof code !== "string") {
            sessionStorage.removeItem("trackdesk_referral_code");
            return null;
          }

          // Check if session is still valid (max 24 hours)
          const timestamp = new Date(sessionData.timestamp);
          const now = new Date();
          const hoursDiff =
            (now.getTime() - timestamp.getTime()) / (1000 * 60 * 60);

          if (hoursDiff > 24) {
            sessionStorage.removeItem("trackdesk_referral_code");
            return null;
          }

          return code;
        } catch (error) {
          console.error("[Trackdesk] Error reading referral code:", error);
          sessionStorage.removeItem("trackdesk_referral_code");
          return null;
        }
      };

      const referralCode = getStoredReferralCode();
      const apiUrl =
        process.env.NEXT_PUBLIC_TRACKDESK_API_URL ||
        process.env.NEXT_PUBLIC_API_URL ||
        "";
      const websiteId = process.env.NEXT_PUBLIC_TRACKDESK_WEBSITE_ID || "";

      if (!apiUrl || !websiteId) {
        console.warn("[Trackdesk] API URL or Website ID not configured");
        return;
      }

      // Try to fetch order details from backend
      let orderValue = 0;
      let orderItems: Array<{
        id: string;
        name: string;
        price: number;
        quantity: number;
      }> = [];

      // Method 1: Try to fetch order by orderId
      if (orderId) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}`,
            { credentials: "include" }
          );

          if (response.ok) {
            const orderData = await response.json();
            const order = orderData.order || orderData.data?.order || orderData;
            orderValue = Number(order.totalAmount || order.total || 0);
            orderItems = (order.orderItems || []).map((item: any) => ({
              id: item.productId || item.product_id || "",
              name: item.productName || item.product_name || item.name || "",
              price: Number(item.price || item.unit_price || 0),
              quantity: item.quantity || item.qty || 1,
            }));
            console.log("[Trackdesk] ✅ Order fetched from backend:", {
              orderId,
              orderValue,
              itemCount: orderItems.length,
            });
          }
        } catch (error) {
          console.error("[Trackdesk] Failed to fetch order details:", error);
        }
      }

      // Method 2: If orderValue is still 0, try to fetch from Stripe session
      if (
        orderValue === 0 &&
        sessionIdOrOrderId &&
        sessionIdOrOrderId.startsWith("cs_")
      ) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/payment/session/${sessionIdOrOrderId}`,
            { credentials: "include" }
          );

          if (response.ok) {
            const sessionData = await response.json();
            const session = sessionData.session || sessionData;

            // Stripe amounts are in cents, convert to dollars
            if (session.amount_total) {
              orderValue = session.amount_total / 100;
              console.log("[Trackdesk] ✅ Order value from Stripe session:", {
                sessionId: sessionIdOrOrderId,
                orderValue,
                amountTotal: session.amount_total,
              });
            }
          }
        } catch (error) {
          console.error("[Trackdesk] Failed to fetch Stripe session:", error);
        }
      }

      // Method 3: Calculate from orderItems if we have them but no total
      if (orderValue === 0 && orderItems.length > 0) {
        orderValue = orderItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        console.log(
          "[Trackdesk] ✅ Calculated order value from items:",
          orderValue
        );
      }

      // Track conversion via Trackdesk (for analytics)
      if (typeof window !== "undefined" && window.Trackdesk && orderValue > 0) {
        trackEcommerce.purchase({
          orderId: orderId || sessionIdOrOrderId,
          value: orderValue,
          currency: "USD",
          items: orderItems,
        });
      }

      // Track order/conversion via API endpoint (for referral tracking)
      if (referralCode && orderValue > 0) {
        const orderPayload = {
          referralCode: referralCode,
          websiteId: websiteId,
          storeId: websiteId,
          orderId: orderId || sessionIdOrOrderId,
          orderValue: orderValue,
          value: orderValue,
          currency: "USD",
        };

        console.log("[Trackdesk] Sending order tracking request:", {
          referralCode,
          orderId: orderId || sessionIdOrOrderId,
          orderValue,
        });

        const response = await fetch(`${apiUrl}/tracking/order`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderPayload),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("[Trackdesk] ✅ Order tracked successfully:", data);
          console.log("[Trackdesk] Commission calculated:", {
            orderValue,
            commission: data.commission,
            commissionRate: data.commissionRate || "N/A",
          });
        } else {
          const errorText = await response.text();
          let errorData;
          try {
            errorData = JSON.parse(errorText);
          } catch {
            errorData = { message: errorText };
          }
          console.error(
            "[Trackdesk] ❌ Failed to track order:",
            response.status,
            errorData
          );
        }
      } else if (!referralCode) {
        console.log(
          "[Trackdesk] ℹ️ No referral code found - order not attributed to affiliate"
        );
      } else {
        console.warn(
          "[Trackdesk] ⚠️ Cannot track order: orderValue is 0 or invalid",
          {
            orderId: orderId || sessionIdOrOrderId,
            orderValue,
            hasOrderId: !!orderId,
            hasSessionId: !!sessionIdOrOrderId,
          }
        );
      }
    } catch (error) {
      console.error("[Trackdesk] Error tracking purchase:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-32 sm:pt-36 md:pt-40 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-14 h-14 sm:w-16 sm:h-16 text-green-600" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 px-4">
            Order Confirmed!
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 px-4">
            Thank you for your purchase
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 mb-6">
          <div className="border-b border-gray-200 pb-6 mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
              What happens next?
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              We&apos;ve received your order and will process it shortly
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-orange-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">
                  Order Confirmation
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 break-words">
                  You&apos;ll receive an order confirmation email with order
                  details and tracking information.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">
                  Order Processing
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 break-words">
                  We&apos;re preparing your items for shipment. This usually
                  takes 1-2 business days.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Truck className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">
                  Shipping & Delivery
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 break-words">
                  Your order will be shipped with tracking information.
                  You&apos;ll receive updates via email.
                </p>
              </div>
            </div>
          </div>

          {sessionId && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg overflow-hidden">
              <p className="text-xs sm:text-sm text-gray-600 break-all">
                <span className="font-medium">Payment Session ID:</span>{" "}
                <span className="font-mono text-[10px] sm:text-xs">
                  {sessionId}
                </span>
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <button
            onClick={() => router.push("/product")}
            className="px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base bg-orange-600 text-white rounded-full font-semibold hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
          >
            Continue Shopping
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={() => router.push("/")}
            className="px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base bg-white text-gray-900 border-2 border-gray-300 rounded-full font-semibold hover:bg-gray-50 transition-colors"
          >
            Back to Home
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-6 sm:mt-8 text-center">
          <p className="text-sm sm:text-base text-gray-600 mb-2">
            Need help? Contact our customer support
          </p>
          <a
            href="/contact"
            className="text-sm sm:text-base text-orange-600 hover:text-orange-700 font-medium"
          >
            Get Support
          </a>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-12 h-12 animate-spin text-orange-600" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
