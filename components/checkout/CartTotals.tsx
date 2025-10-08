'use client';
import Button from '@/components/custom/Button';
import ShippingCalculator from './ShippingCalculator';

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

      {/* Total */}
      <div className="flex justify-between items-center mb-6 pt-4 border-t border-gray-200">
        <span className="text-lg font-bold text-gray-900">Total</span>
        <span className="text-xl font-bold text-gray-900">${total.toFixed(0)}</span>
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
