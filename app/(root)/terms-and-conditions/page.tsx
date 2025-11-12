import PageHero from '@/components/shared/PageHero';
import ContentSection from '@/components/shared/ContentSection';
import { FileText, Scale, AlertTriangle } from 'lucide-react';

export default function TermsAndConditionsPage() {
  const lastUpdated = "October 8, 2025";

  return (
    <div className="min-h-screen bg-white">
      <PageHero 
        title="Terms and Conditions" 
        description="Please read these terms carefully before using our services."
      />

      <ContentSection>
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 p-4 bg-blue-50 border-l-4 border-blue-600 rounded">
            <p className="text-sm text-gray-700">
              <strong>Last Updated:</strong> {lastUpdated}
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            {/* Introduction */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <FileText className="mr-3 text-orange-600" size={28} />
                1. Introduction
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Welcome to Licorice Ropes. These Terms and Conditions govern your use of our website 
                and purchase of products. By accessing our website or making a purchase, you agree to be 
                bound by these terms.
              </p>
            </section>

            {/* Use of Website */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                2. Use of Website
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You may use our website for lawful purposes only. You agree not to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>Use the website in any way that violates any applicable law or regulation</li>
                <li>Transmit any harmful or malicious code</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Engage in any data mining or similar data gathering activities</li>
                <li>Use the website to transmit spam or unsolicited communications</li>
              </ul>
            </section>

            {/* Product Information */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                3. Product Information
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We strive to ensure that product descriptions, images, and pricing are accurate. However:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>Product colors may vary slightly due to screen settings</li>
                <li>We reserve the right to correct any errors in product information</li>
                <li>Prices are subject to change without notice</li>
                <li>Product availability is not guaranteed</li>
              </ul>
            </section>

            {/* Orders and Payment */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                4. Orders and Payment
              </h2>
              <div className="bg-gray-50 p-6 rounded-lg mb-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Order Acceptance</h3>
                <p className="text-gray-700 leading-relaxed">
                  All orders are subject to acceptance and product availability. We reserve the right 
                  to refuse or cancel any order for any reason, including but not limited to product 
                  availability, errors in pricing or product information, or suspected fraudulent activity.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Payment</h3>
                <p className="text-gray-700 leading-relaxed">
                  Payment must be received before order processing. We accept major credit cards, 
                  PayPal, and other payment methods as displayed at checkout. All prices are in USD 
                  unless otherwise stated.
                </p>
              </div>
            </section>

            {/* Shipping and Delivery */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                5. Shipping and Delivery
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Shipping times are estimates and not guarantees. We are not responsible for delays 
                caused by shipping carriers or customs. Risk of loss and title pass to you upon 
                delivery to the shipping carrier. For more details, see our{' '}
                <a href="/delivery-and-return" className="text-orange-600 hover:underline">
                  Delivery and Return Policy
                </a>.
              </p>
            </section>

            {/* Returns and Refunds */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                6. Returns and Refunds
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We offer a 30-day return policy for unopened products in original packaging. 
                Due to health and safety regulations, opened food products cannot be returned 
                unless defective. Please see our{' '}
                <a href="/delivery-and-return" className="text-orange-600 hover:underline">
                  Delivery and Return Policy
                </a>{' '}
                for complete details.
              </p>
            </section>

            {/* Intellectual Property */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Scale className="mr-3 text-orange-600" size={28} />
                7. Intellectual Property
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                All content on this website, including text, graphics, logos, images, and software, 
                is the property of Licorice Ropes or its content suppliers and is protected by 
                international copyright laws. You may not reproduce, distribute, or create derivative 
                works without our express written permission.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <AlertTriangle className="mr-3 text-orange-600" size={28} />
                8. Limitation of Liability
              </h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 rounded">
                <p className="text-gray-700 leading-relaxed mb-4">
                  To the fullest extent permitted by law, Licorice Ropes shall not be liable for any 
                  indirect, incidental, special, consequential, or punitive damages arising out of or 
                  relating to your use of the website or purchase of products.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Our total liability shall not exceed the amount you paid for the product in question.
                </p>
              </div>
            </section>

            {/* Product Liability */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                9. Product Liability and Allergies
              </h2>
              <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded">
                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong>Important:</strong> Our products may contain allergens including wheat, soy, 
                  and tree nuts. Always check product labels and ingredient lists before consumption. 
                  If you have food allergies, consult the product information carefully.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  We are not responsible for allergic reactions or adverse effects from product consumption. 
                  By purchasing, you acknowledge that you have read and understood the product information.
                </p>
              </div>
            </section>

            {/* Governing Law */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                10. Governing Law
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                These Terms and Conditions are governed by and construed in accordance with the laws 
                of the United States. Any disputes shall be subject to the exclusive jurisdiction of 
                the courts in our jurisdiction.
              </p>
            </section>

            {/* Changes to Terms */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                11. Changes to Terms
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We reserve the right to modify these Terms and Conditions at any time. Changes will 
                be effective immediately upon posting to the website. Your continued use of the website 
                after changes are posted constitutes acceptance of the modified terms.
              </p>
            </section>

            {/* Contact */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                12. Contact Information
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about these Terms and Conditions, please contact us:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-2">
                  <strong>Email:</strong> Info@southernsweetandsour.com
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Phone:</strong> +1 919-701-9321
                </p>
                <p className="text-gray-700">
                  <strong>Address:</strong> 4363 Ocean Farm Dr, Summerville, SC 29485
                </p>
              </div>
            </section>
          </div>

          {/* Contact CTA */}
          <div className="mt-12 bg-gradient-to-r from-orange-500 to-orange-600 p-8 rounded-lg text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Questions About Our Terms?</h3>
            <p className="text-lg mb-6">
              Our team is here to help clarify any questions you may have.
            </p>
            <a 
              href="/contact" 
              className="inline-block bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </ContentSection>
    </div>
  );
}





