'use client';
import Link from 'next/link';
import Button from '@/components/custom/Button';

type CheckoutStep = 'cart' | 'details' | 'complete';

interface CheckoutProgressProps {
  currentStep: CheckoutStep;
  onStepChange: (step: CheckoutStep) => void;
}

const CheckoutProgress = ({ currentStep, onStepChange }: CheckoutProgressProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          {/* Step 1: Shopping Cart */}
          <button
            onClick={() => onStepChange('cart')}
            className={`flex items-center transition-colors ${
              currentStep === 'cart' ? 'text-orange-500' : 'text-gray-500'
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              currentStep === 'cart' ? 'bg-orange-500 text-white' : 'bg-gray-300 text-gray-500'
            }`}>
              1
            </div>
            <span className="ml-2 font-medium">Shopping cart</span>
            <div className={`ml-4 w-16 h-0.5 ${
              currentStep === 'cart' ? 'bg-orange-500' : 'bg-gray-300'
            }`}></div>
          </button>

          {/* Step 2: Checkout Details */}
          <button
            onClick={() => onStepChange('details')}
            className={`flex items-center transition-colors ${
              currentStep === 'details' ? 'text-orange-500' : 'text-gray-500'
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              currentStep === 'details' ? 'bg-orange-500 text-white' : 'bg-gray-300 text-gray-500'
            }`}>
              2
            </div>
            <span className="ml-2 font-medium">Checkout details</span>
            <div className={`ml-4 w-16 h-0.5 ${
              currentStep === 'details' ? 'bg-orange-500' : 'bg-gray-300'
            }`}></div>
          </button>

          {/* Step 3: Order Complete */}
          <button
            onClick={() => onStepChange('complete')}
            className={`flex items-center transition-colors ${
              currentStep === 'complete' ? 'text-orange-500' : 'text-gray-500'
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              currentStep === 'complete' ? 'bg-orange-500 text-white' : 'bg-gray-300 text-gray-500'
            }`}>
              3
            </div>
            <span className="ml-2 font-medium">Order complete</span>
          </button>
        </div>

        {/* Continue Shopping Button */}
        <Link href="/product">
          <Button className="bg-gray-200 text-gray-700 hover:bg-gray-300 px-6 py-2 rounded-lg transition-colors">
            ← Continue shopping
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CheckoutProgress;
