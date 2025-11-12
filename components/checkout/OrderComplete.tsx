'use client';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import Button from '@/components/custom/Button';

interface OrderCompleteProps {
  subtotal: number;
  shippingCost: number;
  total: number;
  onNewOrder: () => void;
}

const OrderComplete = ({ subtotal, shippingCost, total, onNewOrder }: OrderCompleteProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 text-center gap-10 flex flex-col">
      <div className="mb-6">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Order Complete!</h2>
        <p className="text-gray-600">Thank you for your purchase. Your order has been successfully placed.</p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
        <div className="space-y-2 text-left">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping:</span>
            <span>${shippingCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg pt-2 border-t">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <Link href="/product">
          <Button className="bg-gray-200 text-gray-700 hover:bg-gray-300 px-6 py-3 rounded-lg transition-colors">
            Continue Shopping
          </Button>
        </Link>
        <Button
          onClick={onNewOrder}
          className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
        >
          New Order
        </Button>
      </div>
    </div>
  );
};

export default OrderComplete;
