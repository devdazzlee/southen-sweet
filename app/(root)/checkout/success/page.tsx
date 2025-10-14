'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle, Package, Truck, ArrowRight, Loader2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const session_id = searchParams.get('session_id');
    if (session_id) {
      setSessionId(session_id);
      // Clear cart after successful payment
      clearCart();
    }
  }, [searchParams, clearCart]);

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
                  You&apos;ll receive an order confirmation email with order details and tracking information.
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
                  We&apos;re preparing your items for shipment. This usually takes 1-2 business days.
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
                  Your order will be shipped with tracking information. You&apos;ll receive updates via email.
                </p>
              </div>
            </div>
          </div>

          {sessionId && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg overflow-hidden">
              <p className="text-xs sm:text-sm text-gray-600 break-all">
                <span className="font-medium">Payment Session ID:</span>{' '}
                <span className="font-mono text-[10px] sm:text-xs">{sessionId}</span>
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <button
            onClick={() => router.push('/product')}
            className="px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base bg-orange-600 text-white rounded-full font-semibold hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
          >
            Continue Shopping
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={() => router.push('/')}
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
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-orange-600" />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
