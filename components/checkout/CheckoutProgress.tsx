'use client';
import Link from 'next/link';
import Button from '@/components/custom/Button';

interface CheckoutProgressProps {
  currentStep: number; // 1, 2, or 3
}

const CheckoutProgress = ({ currentStep }: CheckoutProgressProps) => {
  const steps = [
    { number: 1, label: 'Cart' },
    { number: 2, label: 'Shipping' },
    { number: 3, label: 'Payment' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6 sm:mb-8">
      {/* Mobile: Vertical Progress */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-700">
            Step {currentStep} of 3
          </h3>
          <Link href="/product">
            <Button className="bg-gray-200 text-gray-700 hover:bg-gray-300 px-3 py-1.5 text-xs rounded-lg transition-colors">
              ← Shopping
            </Button>
          </Link>
        </div>
        <div className="space-y-3">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 ${
                currentStep >= step.number 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-300 text-gray-500'
              }`}>
                {step.number}
              </div>
              <span className={`ml-3 text-sm font-medium ${
                currentStep >= step.number ? 'text-orange-500' : 'text-gray-500'
              }`}>
                {step.label}
              </span>
              {index < steps.length - 1 && (
                <div className="ml-auto w-1 h-8 bg-gray-300"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: Horizontal Progress */}
      <div className="hidden md:flex items-center justify-between">
        <div className="flex items-center space-x-4 lg:space-x-8 flex-1">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className="flex items-center">
                <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center text-sm lg:text-base font-semibold ${
                  currentStep >= step.number 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-300 text-gray-500'
                }`}>
                  {step.number}
                </div>
                <span className={`ml-2 lg:ml-3 text-sm lg:text-base font-medium whitespace-nowrap ${
                  currentStep >= step.number ? 'text-orange-500' : 'text-gray-500'
                }`}>
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`mx-2 lg:mx-4 w-8 lg:w-16 h-0.5 ${
                  currentStep > step.number ? 'bg-orange-500' : 'bg-gray-300'
                }`}></div>
              )}
            </div>
          ))}
        </div>

        {/* Continue Shopping Button */}
        <Link href="/product" className="ml-4 lg:ml-8">
          <Button className="bg-gray-200 text-gray-700 hover:bg-gray-300 px-4 lg:px-6 py-2 text-sm lg:text-base rounded-lg transition-colors whitespace-nowrap">
            ← Continue shopping
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CheckoutProgress;
