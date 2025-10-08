'use client';
import Button from '@/components/custom/Button';

interface CheckoutDetailsProps {
  onBackToCart: () => void;
  onCompleteOrder: () => void;
}

const CheckoutDetails = ({ onBackToCart, onCompleteOrder }: CheckoutDetailsProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">CHECKOUT DETAILS</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Billing Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing Information</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="First Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Payment Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Information</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Card Number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="CVV"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <input
              type="text"
              placeholder="Cardholder Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <Button
          onClick={onBackToCart}
          className="bg-gray-200 text-gray-700 hover:bg-gray-300 px-6 py-3 rounded-lg transition-colors"
        >
          ← Back to Cart
        </Button>
        <Button
          onClick={onCompleteOrder}
          className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors"
        >
          Complete Order
        </Button>
      </div>
    </div>
  );
};

export default CheckoutDetails;
