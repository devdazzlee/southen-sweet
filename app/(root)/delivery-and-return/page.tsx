import PageHero from '@/components/shared/PageHero';
import ContentSection from '@/components/shared/ContentSection';
import { Package, RefreshCw, Clock, MapPin, ShieldCheck, AlertCircle } from 'lucide-react';

export default function DeliveryAndReturnPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageHero 
        title="Delivery & Return" 
        description="Fast shipping, easy returns. Your satisfaction is our priority."
      />

      <ContentSection>
        {/* Delivery Policy */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 flex items-center">
            <Package className="mr-3 text-orange-600" size={36} />
            Delivery Policy
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg">
              <div className="flex items-start mb-4">
                <Clock className="text-orange-600 mr-3 mt-1" size={24} />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Processing Time</h3>
                  <p className="text-gray-700">
                    Orders are processed within 1-2 business days. You will receive a confirmation email once your order has been shipped.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg">
              <div className="flex items-start mb-4">
                <MapPin className="text-orange-600 mr-3 mt-1" size={24} />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Shipping Time</h3>
                  <p className="text-gray-700">
                    Standard shipping: 5-7 business days<br />
                    Express shipping: 2-3 business days<br />
                    International: 10-15 business days
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Shipping Costs</h3>
            <ul className="space-y-2 text-gray-700">
              <li>→ Free standard shipping on orders over $50</li>
              <li>→ Standard shipping: $5.99</li>
              <li>→ Express shipping: $12.99</li>
              <li>→ International shipping calculated at checkout</li>
            </ul>
          </div>
        </div>

        {/* Return Policy */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 flex items-center">
            <RefreshCw className="mr-3 text-orange-600" size={36} />
            Return Policy
          </h2>

          <div className="bg-gradient-to-br from-orange-50 to-white p-8 rounded-lg mb-8">
            <div className="flex items-start mb-6">
              <ShieldCheck className="text-green-600 mr-3 mt-1" size={28} />
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">30-Day Return Guarantee</h3>
                <p className="text-gray-700 text-lg">
                  We stand behind the quality of our products. If you're not completely satisfied, 
                  you can return your purchase within 30 days for a full refund or exchange.
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="border border-gray-200 p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Eligible Returns</h4>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Unopened products in original packaging</li>
                <li>✓ Products with manufacturing defects</li>
                <li>✓ Wrong items received</li>
                <li>✓ Damaged during shipping</li>
              </ul>
            </div>

            <div className="border border-gray-200 p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Non-Eligible Returns</h4>
              <ul className="space-y-2 text-gray-700">
                <li>✗ Opened food products (health & safety)</li>
                <li>✗ Products returned after 30 days</li>
                <li>✗ Items not in original condition</li>
                <li>✗ Sale or clearance items</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg">
            <div className="flex items-start">
              <AlertCircle className="text-blue-600 mr-3 mt-1 flex-shrink-0" size={24} />
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">How to Return</h4>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Contact our customer service at Info@southernsweetandsour.com</li>
                  <li>Provide your order number and reason for return</li>
                  <li>Receive your return authorization and shipping label</li>
                  <li>Pack items securely in original packaging</li>
                  <li>Ship the package using the provided label</li>
                  <li>Receive your refund within 5-7 business days after we receive your return</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-8 rounded-lg text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Have Questions?</h3>
          <p className="text-lg mb-6">Our customer service team is here to help you with any delivery or return questions.</p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <a 
              href="/contact" 
              className="bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Us
            </a>
            <a 
              href="mailto:Info@southernsweetandsour.com" 
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-orange-600 transition-colors"
            >
              Email Support
            </a>
          </div>
        </div>
      </ContentSection>
    </div>
  );
}





