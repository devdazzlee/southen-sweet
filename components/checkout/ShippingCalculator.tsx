'use client';
import { ChevronUp } from 'lucide-react';

interface ShippingForm {
  country: string;
  postcode: string;
  address: string;
}

interface ShippingCalculatorProps {
  showShippingCalculator: boolean;
  shippingForm: ShippingForm;
  onToggleCalculator: () => void;
  onFormChange: (field: string, value: string) => void;
}

const ShippingCalculator = ({
  showShippingCalculator,
  shippingForm,
  onToggleCalculator,
  onFormChange
}: ShippingCalculatorProps) => {
  return (
    <div className="mb-6">
      <button
        onClick={onToggleCalculator}
        className="flex items-center justify-between w-full text-left text-gray-700 hover:text-gray-900"
      >
        <span>Calculate shipping</span>
        <ChevronUp className={`w-4 h-4 transition-transform ${showShippingCalculator ? 'rotate-180' : ''}`} />
      </button>
      
      {showShippingCalculator && (
        <div className="mt-4 space-y-3">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">COLOR</label>
            <select className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700">
              <option>Selecting item</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <input
                type="text"
                value={shippingForm.country}
                onChange={(e) => onFormChange('country', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                placeholder="Country"
              />
            </div>
            <div>
              <input
                type="text"
                value={shippingForm.postcode}
                onChange={(e) => onFormChange('postcode', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                placeholder="Postcode / Zip"
              />
            </div>
          </div>
          <div>
            <input
              type="text"
              value={shippingForm.address}
              onChange={(e) => onFormChange('address', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
              placeholder="Address"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ShippingCalculator;
