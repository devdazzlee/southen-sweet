"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";
import { CheckoutProgress } from "@/components/checkout";
import {
  Loader2,
  Package,
  Truck,
  CreditCard,
  MapPin,
  CheckCircle,
  Trash2,
  Plus,
  Minus,
} from "lucide-react";
import axios from "axios";
import Image from "next/image";
import {
  trackEcommerce,
  useTrackdeskPageView,
} from "@/hooks/useTrackdeskEvent";

interface ShippingRate {
  objectId: string;
  carrier: string;
  serviceName: string;
  amount: number;
  estimatedDays: number;
  currency: string;
}

interface ShippingAddress {
  name: string;
  email: string;
  phone: string;
  street1: string;
  street2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export default function CheckoutPage() {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartSubtotal,
    getOriginalSubtotal,
    getDiscountSavings,
    getAppliedTier,
    getPricePerUnit,
    getNextTierMessage,
  } = useCart();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1); // 1: Cart Review, 2: Shipping Address, 3: Shipping Method
  const [calculatingShipping, setCalculatingShipping] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Shipping address state
  const [address, setAddress] = useState<ShippingAddress>({
    name: "",
    email: "",
    phone: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
  });

  // Shipping rates state
  const [shippingRates, setShippingRates] = useState<ShippingRate[]>([]);
  const [selectedRate, setSelectedRate] = useState<ShippingRate | null>(null);

  // Track page view
  useTrackdeskPageView("checkout");

  useEffect(() => {
    // Give the cart context time to load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Track checkout started when user has items in cart and reaches checkout
  useEffect(() => {
    if (
      !isLoading &&
      cartItems.length > 0 &&
      typeof window !== "undefined" &&
      window.Trackdesk
    ) {
      trackEcommerce.checkoutStarted({
        cartValue: getCartSubtotal(),
        itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
        currency: "USD",
      });
    }
  }, [isLoading, cartItems.length]); // Track when cart is loaded

  const subtotal = getCartSubtotal();
  const shippingCost = selectedRate?.amount || 0;
  const total = subtotal + shippingCost;

  // Form validation
  const isAddressValid = () => {
    return (
      address.name.trim() &&
      address.email.trim() &&
      address.phone.trim() &&
      address.street1.trim() &&
      address.city.trim() &&
      address.state.trim() &&
      address.zipCode.trim() &&
      address.country.trim()
    );
  };

  // Calculate shipping rates
  const calculateShipping = async () => {
    if (!isAddressValid()) {
      setError("Please fill in all required address fields");
      return;
    }

    // Filter out invalid cart items (items without valid IDs)
    const validCartItems = cartItems.filter((item) => {
      const isValid =
        item.id && item.id !== null && item.id !== undefined && item.id !== "";
      if (!isValid) {
        console.warn("⚠️ Found invalid cart item (will be skipped):", item);
      }
      return isValid;
    });

    if (validCartItems.length === 0) {
      setError(
        "Your cart contains invalid items. Please clear your cart and add products again."
      );
      return;
    }

    // Log valid items being sent
    console.log(
      "📦 Sending valid cart items:",
      validCartItems.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
      }))
    );

    setCalculatingShipping(true);
    setError(null);

    try {
      const response = await axios.post(
        `${
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
        }/shippo/calculate-rates`,
        {
          shippingAddress: {
            name: address.name,
            email: address.email,
            phone: address.phone,
            street1: address.street1,
            street2: address.street2,
            city: address.city,
            state: address.state,
            zip: address.zipCode,
            country: address.country,
          },
          orderItems: validCartItems.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
          })),
        },
        { withCredentials: true }
      );

      if (response.data.rates && response.data.rates.length > 0) {
        setShippingRates(response.data.rates);
        setCurrentStep(3);
        // Auto-select the cheapest rate
        const cheapestRate = response.data.rates.reduce(
          (prev: ShippingRate, curr: ShippingRate) =>
            curr.amount < prev.amount ? curr : prev
        );
        setSelectedRate(cheapestRate);
      } else {
        setError("No shipping rates available for this address");
      }
    } catch (err: unknown) {
      console.error("Shipping calculation error:", err);
      const errorMessage =
        err instanceof Error &&
        "response" in err &&
        typeof err.response === "object" &&
        err.response !== null &&
        "data" in err.response &&
        typeof err.response.data === "object" &&
        err.response.data !== null &&
        "error" in err.response.data &&
        typeof err.response.data.error === "string"
          ? err.response.data.error
          : "Failed to calculate shipping rates";
      setError(errorMessage);
    } finally {
      setCalculatingShipping(false);
    }
  };

  // Proceed to Stripe payment
  const handleProceedToPayment = async () => {
    if (!selectedRate) {
      setError("Please select a shipping option");
      return;
    }

    // Track checkout step - payment
    if (typeof window !== "undefined" && window.Trackdesk) {
      trackEcommerce.checkoutStep("payment", {
        cartValue: total,
        itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
        shippingCost: shippingCost,
      });
    }

    setProcessingPayment(true);
    setError(null);

    try {
      const orderItems = cartItems.map((item) => ({
        productId: item.id.toString(),
        productName: item.name,
        quantity: item.quantity,
        price: Number(item.currentPrice),
        total: Number(item.currentPrice) * item.quantity,
      }));

      const orderData = {
        orderItems,
        orderNotes: notes || "Order from website",
        total: total,
        shippingAddress: {
          name: address.name,
          email: address.email,
          phone: address.phone,
          street: address.street2
            ? `${address.street1}, ${address.street2}`
            : address.street1,
          city: address.city,
          state: address.state,
          zipCode: address.zipCode,
          country: address.country,
        },
      };

      // Create Stripe Checkout Session
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
        }/payment/create-checkout-session`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderData,
            items: [
              // Product items
              ...cartItems.map((item) => ({
                productName: item.name,
                name: item.name,
                price: Number(item.currentPrice),
                quantity: item.quantity,
              })),
              // Shipping as separate line item
              {
                productName: `Shipping - ${selectedRate.carrier} (${selectedRate.serviceName})`,
                name: `Shipping - ${selectedRate.carrier}`,
                price: selectedRate.amount,
                quantity: 1,
              },
            ],
            selectedShippingRate: {
              objectId: selectedRate.objectId,
              carrier: selectedRate.carrier,
              serviceName: selectedRate.serviceName,
              amount: selectedRate.amount,
            },
            successUrl: `${window.location.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancelUrl: `${window.location.origin}/checkout`,
          }),
        }
      );

      const data = await response.json();

      if (data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        setError("Failed to create checkout session");
      }
    } catch (err: unknown) {
      console.error("Payment error:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Failed to process payment";
      setError(errorMessage);
    } finally {
      setProcessingPayment(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-orange-600" />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 sm:pt-36 md:pt-40 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
              <Package className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 px-4">
              Your cart is empty
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-8 px-4">
              Add some items to your cart before checking out.
            </p>
            <button
              onClick={() => router.push("/product")}
              className="bg-orange-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base rounded-full font-semibold hover:bg-orange-700 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen py-20 sm:py-24 md:py-32 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Checkout
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            Complete your purchase
          </p>
        </div>

        {/* Progress Indicator */}
        <CheckoutProgress currentStep={currentStep} />

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mt-6 sm:mt-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Cart Review */}
            {currentStep === 1 && (
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
                  <div className="flex items-center gap-3">
                    <Package className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                    <h2 className="text-lg sm:text-xl font-semibold">
                      Review Your Cart
                    </h2>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-600">
                    {cartItems.length} items
                  </span>
                </div>

                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row gap-3 sm:gap-4 p-3 sm:p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="flex gap-3 sm:gap-4 flex-1">
                        {/* Product Image */}
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                          {item.image && (
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={80}
                              height={80}
                              className="object-cover w-full h-full"
                            />
                          )}
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm sm:text-base font-semibold text-gray-900 truncate">
                            {item.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-600">
                            ${getPricePerUnit().toFixed(2)} each
                          </p>

                          {/* Quantity Controls - Mobile */}
                          <div className="flex items-center gap-2 sm:gap-3 mt-2">
                            <button
                              onClick={() => {
                                console.log(
                                  "Decreasing quantity for item:",
                                  item.id
                                );
                                updateQuantity(
                                  item.id,
                                  Math.max(1, item.quantity - 1)
                                );
                              }}
                              className="p-1 rounded-md hover:bg-gray-100 border border-gray-300"
                            >
                              <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                            </button>
                            <span className="text-sm sm:text-base font-medium px-2 sm:px-3 min-w-[2rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => {
                                console.log(
                                  "Increasing quantity for item:",
                                  item.id
                                );
                                updateQuantity(item.id, item.quantity + 1);
                              }}
                              className="p-1 rounded-md hover:bg-gray-100 border border-gray-300"
                            >
                              <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Price and Remove */}
                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start sm:text-right gap-2">
                        <p className="text-base sm:text-lg font-semibold text-gray-900">
                          ${(getPricePerUnit() * item.quantity).toFixed(2)}
                        </p>
                        <button
                          onClick={() => {
                            console.log("Removing item from cart:", {
                              id: item.id,
                              name: item.name,
                            });
                            if (
                              item.id &&
                              item.id !== null &&
                              item.id !== undefined &&
                              item.id !== ""
                            ) {
                              removeFromCart(item.id);
                            } else {
                              console.error(
                                "Cannot remove item - ID is invalid:",
                                item
                              );
                            }
                          }}
                          className="text-red-600 hover:text-red-700 flex items-center gap-1 text-xs sm:text-sm"
                        >
                          <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="sm:inline">Remove</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <button
                    onClick={() => {
                      if (
                        confirm(
                          "Are you sure you want to clear your entire cart?"
                        )
                      ) {
                        console.log("Clearing entire cart");
                        clearCart();
                      }
                    }}
                    className="sm:w-auto px-6 py-2 border-2 border-red-600 text-red-600 rounded-lg font-semibold hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear Cart
                  </button>
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="flex-1 bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
                  >
                    Proceed to Shipping
                    <MapPin className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Shipping Address */}
            {currentStep === 2 && (
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                  <h2 className="text-lg sm:text-xl font-semibold">
                    Shipping Address
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={address.name}
                      onChange={(e) =>
                        setAddress({ ...address, name: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={address.email}
                      onChange={(e) =>
                        setAddress({ ...address, email: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      value={address.phone}
                      onChange={(e) =>
                        setAddress({ ...address, phone: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="+1 919-701-9321"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      value={address.street1}
                      onChange={(e) =>
                        setAddress({ ...address, street1: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="123 Main St"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Apartment, suite, etc. (optional)
                    </label>
                    <input
                      type="text"
                      value={address.street2}
                      onChange={(e) =>
                        setAddress({ ...address, street2: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Apt 4B"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      value={address.city}
                      onChange={(e) =>
                        setAddress({ ...address, city: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="New York"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      value={address.state}
                      onChange={(e) =>
                        setAddress({ ...address, state: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="NY"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      value={address.zipCode}
                      onChange={(e) =>
                        setAddress({ ...address, zipCode: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="10001"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country *
                    </label>
                    <select
                      value={address.country}
                      onChange={(e) =>
                        setAddress({ ...address, country: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="GB">United Kingdom</option>
                      <option value="AU">Australia</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                  >
                    Back to Cart
                  </button>
                  <button
                    onClick={calculateShipping}
                    disabled={calculatingShipping || !isAddressValid()}
                    className="flex-1 bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {calculatingShipping ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Calculating...
                      </>
                    ) : (
                      <>
                        <Truck className="w-5 h-5" />
                        Calculate Shipping
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Shipping Method */}
            {currentStep === 3 && (
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                  <h2 className="text-lg sm:text-xl font-semibold">
                    Shipping Method
                  </h2>
                </div>

                <div className="space-y-3">
                  {shippingRates.map((rate) => (
                    <div
                      key={rate.objectId}
                      onClick={() => setSelectedRate(rate)}
                      className={`border rounded-lg p-3 sm:p-4 cursor-pointer transition-all ${
                        selectedRate?.objectId === rate.objectId
                          ? "border-orange-500 bg-orange-50"
                          : "border-gray-200 hover:border-orange-300"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-start sm:items-center gap-3">
                          <input
                            type="radio"
                            checked={selectedRate?.objectId === rate.objectId}
                            onChange={() => setSelectedRate(rate)}
                            className="w-4 h-4 text-orange-600 mt-0.5 sm:mt-0 flex-shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm sm:text-base font-medium text-gray-900 break-words">
                              {rate.carrier} - {rate.serviceName}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-600">
                              Estimated: {rate.estimatedDays} days
                            </p>
                          </div>
                        </div>
                        <div className="text-left sm:text-right pl-7 sm:pl-0">
                          <p className="text-base sm:text-lg font-semibold text-gray-900">
                            ${rate.amount.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Order Notes (Optional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    rows={3}
                    placeholder="Any special instructions for your order?"
                  />
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleProceedToPayment}
                    disabled={processingPayment || !selectedRate}
                    className="flex-1 bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {processingPayment ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5" />
                        Proceed to Payment
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Order Summary (Always Visible) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:sticky lg:top-24">
              <h2 className="text-lg sm:text-xl font-semibold mb-4">
                Order Summary
              </h2>

              {/* Cart Items */}
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-2 sm:gap-3">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="object-cover w-full h-full"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-xs sm:text-sm text-gray-900 truncate">
                        {item.name}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-medium text-sm sm:text-base text-gray-900">
                        ${(getPricePerUnit() * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm sm:text-base text-gray-600">
                  <span>Original Subtotal</span>
                  <span className="line-through">
                    ${getOriginalSubtotal().toFixed(2)}
                  </span>
                </div>
                {getDiscountSavings() > 0 && (
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-green-600 font-medium">
                      Discount ({getAppliedTier()})
                    </span>
                    <span className="text-green-600 font-bold">
                      -${getDiscountSavings().toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-sm sm:text-base text-gray-900 font-medium">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base text-gray-600">
                  <span>Shipping</span>
                  <span>
                    {selectedRate ? `$${shippingCost.toFixed(2)}` : "TBD"}
                  </span>
                </div>
                <div className="border-t pt-2 flex justify-between text-base sm:text-lg font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {getNextTierMessage() && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800 font-medium text-center">
                    {getNextTierMessage()}
                  </p>
                </div>
              )}
              {selectedRate && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-green-900">
                      Shipping calculated
                    </p>
                    <p className="text-green-700">
                      {selectedRate.carrier} - {selectedRate.serviceName}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
