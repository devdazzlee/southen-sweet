import { Package, Truck, Users } from 'lucide-react';

export default function WholesaleBenefits() {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Why Choose Us for Wholesale?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-orange-50">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Premium Quality</h3>
              <p className="text-gray-600">
                Made with authentic ingredients and traditional methods for
                consistent quality
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-orange-50">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Reliable Supply</h3>
              <p className="text-gray-600">
                Consistent inventory and fast delivery to keep your business
                running smoothly
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-orange-50">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Dedicated Support
              </h3>
              <p className="text-gray-600">
                Personal account manager and dedicated customer support for
                all partners
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
