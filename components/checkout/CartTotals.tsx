'use client';
import { useState } from 'react';
import Button from '@/components/custom/Button';
import ShippingCalculator from './ShippingCalculator';
import { api } from '@/lib/axios';
import { Tag, X } from 'lucide-react';

interface ShippingForm {
  country: string;
  postcode: string;
  address: string;
}

interface CartTotalsProps {
  subtotal: number;
  shippingOption: string;
  shippingCost: number;
  total: number;
  showShippingCalculator: boolean;
  shippingForm: ShippingForm;
  onShippingOptionChange: (option: string) => void;
  onToggleShippingCalculator: () => void;
  onShippingFormChange: (field: string, value: string) => void;
  onCheckout: () => void;
}

const CartTotals = ({
  subtotal,
  shippingOption,
  shippingCost,
  total,
  showShippingCalculator,
  shippingForm,
  onShippingOptionChange,
  onToggleShippingCalculator,
  onShippingFormChange,
  onCheckout
}: CartTotalsProps) => {
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<any>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [discountError, setDiscountError] = useState('');

  const validateDiscountCode = async () => {
    if (!discountCode.trim()) {
      setDiscountError('Please enter a discount code');
      return;
    }

    setIsValidating(true);
    setDiscountError('');

    try {
      const data = await api.post('/discounts/validate', {
        code: discountCode.toUpperCase(),
        orderAmount: subtotal
      });

      if (data.success) {
        setAppliedDiscount(data.data.discount);
        setDiscountError('');
      }
    } catch (error: any) {
      setDiscountError(error.message || 'Invalid discount code');
      setAppliedDiscount(null);
    } finally {
      setIsValidating(false);
    }
  };

  const removeDiscount = () => {
    setAppliedDiscount(null);
    setDiscountCode('');
    setDiscountError('');
  };

  const discountAmount = appliedDiscount?.discountAmount || 0;
  const finalTotal = total - discountAmount;
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8 gap-10 flex flex-col">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">CART TOTALS</h2>
      
      {/* Subtotal */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-700">Subtotal</span>
        <span className="text-gray-900 font-semibold">${subtotal.toFixed(2)}</span>
      </div>

      {/* Shipping Options */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <span className="text-gray-700">Shipping</span>
        </div>
        <div className="space-y-2">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="shipping"
              value="free"
              checked={shippingOption === 'free'}
              onChange={(e) => onShippingOptionChange(e.target.value)}
              className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
            />
            <span className="ml-2 text-gray-700">Free Shipping</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="shipping"
              value="flat"
              checked={shippingOption === 'flat'}
              onChange={(e) => onShippingOptionChange(e.target.value)}
              className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
            />
            <span className="ml-2 text-gray-500">Flat rate: $8</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="shipping"
              value="pickup"
              checked={shippingOption === 'pickup'}
              onChange={(e) => onShippingOptionChange(e.target.value)}
              className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
            />
            <span className="ml-2 text-gray-500">Pickup: $6.00</span>
          </label>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Shipping options will be updated during checkout.
        </p>
      </div>

      {/* Calculate Shipping */}
      <ShippingCalculator
        showShippingCalculator={showShippingCalculator}
        shippingForm={shippingForm}
        onToggleCalculator={onToggleShippingCalculator}
        onFormChange={onShippingFormChange}
      />

      {/* Discount Code Section */}
      <div className="mb-6 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2 mb-3">
          <Tag className="w-5 h-5 text-orange-500" />
          <span className="text-gray-700 font-medium">Discount Code</span>
        </div>

        {!appliedDiscount ? (
          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={discountCode}
                onChange={(e) => {
                  setDiscountCode(e.target.value.toUpperCase());
                  setDiscountError('');
                }}
                placeholder="Enter code"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg uppercase"
                disabled={isValidating}
              />
              <button
                onClick={validateDiscountCode}
                disabled={isValidating || !discountCode.trim()}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isValidating ? 'Checking...' : 'Apply'}
              </button>
            </div>
            {discountError && (
              <p className="text-sm text-red-600">{discountError}</p>
            )}
          </div>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-900">{appliedDiscount.code}</p>
                <p className="text-xs text-green-700">{appliedDiscount.name}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600 font-semibold">
                  -${discountAmount.toFixed(2)}
                </span>
                <button
                  onClick={removeDiscount}
                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {appliedDiscount && (
        <div className="flex justify-between items-center mb-2 text-green-600">
          <span>Discount ({appliedDiscount.code})</span>
          <span className="font-semibold">-${discountAmount.toFixed(2)}</span>
        </div>
      )}

      {/* Total */}
      <div className="flex justify-between items-center mb-6 pt-4 border-t border-gray-200">
        <span className="text-lg font-bold text-gray-900">Total</span>
        <span className="text-xl font-bold text-gray-900">${finalTotal.toFixed(2)}</span>
      </div>

      {/* Checkout Button */}
      <Button 
        onClick={onCheckout}
        className="w-72 h-16 bg-[#E7AB3C] text-white py-3 rounded-full justify-center items-center flex hover:bg-[#E7AB3C]/80 transition-colors"
      >
        Checkout
      </Button>
    </div>
  );
};

export default CartTotals;
