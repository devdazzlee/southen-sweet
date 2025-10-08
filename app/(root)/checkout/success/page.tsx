'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, Package, Mail, ArrowRight } from 'lucide-react';
import Button from '@/components/custom/Button';

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const [orderNumber] = useState(() => Math.floor(Math.random() * 1000000) + 100000);

  useEffect(() => {
    // Clear any cart data or redirect after 10 seconds
    const timer = setTimeout(() => {
      router.push('/product');
    }, 10000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          {/* Success Icon */}
          <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Order Confirmed!
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Thank you for your order. We've received your payment and will begin processing your order shortly.
          </p>

          {/* Order Details */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Details</h2>
            <div className="space-y-2 text-gray-600">
              <p><span className="font-medium">Order Number:</span> #{orderNumber}</p>
              <p><span className="font-medium">Order Date:</span> {new Date().toLocaleDateString()}</p>
              <p><span className="font-medium">Estimated Delivery:</span> 5-7 business days</p>
            </div>
          </div>

          {/* Next Steps */}
          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-semibold text-gray-900">What's Next?</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                <Package className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">Order Processing</h4>
                  <p className="text-sm text-gray-600">We'll prepare your licorice ropes with care</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg">
                <Mail className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">Shipping Notification</h4>
                  <p className="text-sm text-gray-600">You'll receive tracking info via email</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">Delivery</h4>
                  <p className="text-sm text-gray-600">Your delicious treats will arrive safely</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => router.push('/product')}
              className="bg-orange-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-700 transition-colors flex items-center justify-center space-x-2"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
            
            <Button
              onClick={() => router.push('/contact')}
              className="bg-gray-100 text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition-colors"
            >
              Contact Support
            </Button>
          </div>

          {/* Additional Info */}
          <div className="mt-8 p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <p className="text-sm text-orange-700">
              <strong>Questions about your order?</strong> Our customer service team is here to help. 
              Contact us at <a href="mailto:support@licoriceropes.com" className="underline">support@licoriceropes.com</a> 
              or call <a href="tel:+15551234567" className="underline">+1 (555) 123-4567</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
