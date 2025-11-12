import { Mail, Phone, Building } from 'lucide-react';

export default function WholesaleContactInfo() {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Ready to Get Started?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center p-6">
              <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Email Us</h3>
              <p className="text-gray-600">
                wholesale@southernsweetandsour.com
              </p>
            </div>
            <div className="flex flex-col items-center p-6">
              <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Call Us</h3>
              <p className="text-gray-600">+1 919-701-9321</p>
            </div>
            <div className="flex flex-col items-center p-6">
              <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mb-4">
                <Building className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Business Hours</h3>
              <p className="text-gray-600">Mon-Fri: 9AM-6PM EST</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
