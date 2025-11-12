import { Target, Percent, Gift } from 'lucide-react';

export default function FundraisingValueProp() {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Your dedication and drive. Our rope candy.
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Raise funds with our Virtual Store Technology—the easiest way to fundraise for teams, 
              school groups and other causes that benefit America&apos;s youth. Sell small batch, premium 
              candy and keep 50% of every dollar you sell, with no minimums or fees.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Dedication</h3>
              <p className="text-gray-600">
                Your commitment to your cause drives our platform
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Percent className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-orange-600 mb-2">50%</h3>
              <h4 className="text-lg font-semibold mb-3">of every dollar you sell supports your cause</h4>
              <p className="text-gray-600">
                You keep half of what you sell through our website, so you reach your goal faster. 
                And there are no set-up fees or handling fees.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Premium Quality</h3>
              <p className="text-gray-600">
                Small batch, premium candy that supporters love
              </p>
            </div>
          </div>

          <div className="text-center">
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
              Get Started Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
  