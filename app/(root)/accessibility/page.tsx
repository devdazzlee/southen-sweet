import PageHero from '@/components/shared/PageHero';
import ContentSection from '@/components/shared/ContentSection';
import { Eye, Keyboard, MousePointer, Volume2, Monitor, Heart } from 'lucide-react';

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageHero 
        title="Accessibility" 
        description="We're committed to making our website accessible to everyone."
      />

      <ContentSection>
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <Heart className="mr-3 text-orange-600" size={36} />
              Our Commitment
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              At Licorice Ropes, we believe that everyone should have equal access to our products 
              and services. We are committed to ensuring our website is accessible to people with 
              disabilities and complies with WCAG 2.1 Level AA standards.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              We continuously work to improve the accessibility of our website and welcome feedback 
              to help us serve you better.
            </p>
          </div>

          {/* Accessibility Features */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Accessibility Features
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg">
                <div className="flex items-start mb-4">
                  <Eye className="text-orange-600 mr-3 mt-1 flex-shrink-0" size={28} />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Visual Accessibility</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>→ High contrast color schemes</li>
                      <li>→ Scalable text and images</li>
                      <li>→ Clear, readable fonts</li>
                      <li>→ Alt text for all images</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                <div className="flex items-start mb-4">
                  <Keyboard className="text-blue-600 mr-3 mt-1 flex-shrink-0" size={28} />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Keyboard Navigation</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>→ Full keyboard navigation support</li>
                      <li>→ Tab order follows logical flow</li>
                      <li>→ Skip navigation links</li>
                      <li>→ Visible focus indicators</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
                <div className="flex items-start mb-4">
                  <Volume2 className="text-green-600 mr-3 mt-1 flex-shrink-0" size={28} />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Screen Reader Friendly</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>→ Semantic HTML structure</li>
                      <li>→ ARIA labels and landmarks</li>
                      <li>→ Descriptive link text</li>
                      <li>→ Proper heading hierarchy</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
                <div className="flex items-start mb-4">
                  <Monitor className="text-purple-600 mr-3 mt-1 flex-shrink-0" size={28} />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Responsive Design</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>→ Mobile-friendly interface</li>
                      <li>→ Consistent across devices</li>
                      <li>→ Touch-friendly targets</li>
                      <li>→ Flexible layouts</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Assistive Technologies */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Compatible Assistive Technologies
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 leading-relaxed mb-4">
                Our website is designed to work with common assistive technologies, including:
              </p>
              <ul className="grid md:grid-cols-2 gap-3 text-gray-700">
                <li>✓ JAWS (Job Access With Speech)</li>
                <li>✓ NVDA (NonVisual Desktop Access)</li>
                <li>✓ VoiceOver (macOS and iOS)</li>
                <li>✓ TalkBack (Android)</li>
                <li>✓ ZoomText</li>
                <li>✓ Dragon NaturallySpeaking</li>
                <li>✓ Browser zoom functions</li>
                <li>✓ High contrast modes</li>
              </ul>
            </div>
          </div>

          {/* Keyboard Shortcuts */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Helpful Keyboard Shortcuts
            </h2>
            <div className="bg-gradient-to-br from-orange-50 to-white p-8 rounded-lg">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Navigation</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li><kbd className="px-2 py-1 bg-white border border-gray-300 rounded">Tab</kbd> - Move to next element</li>
                    <li><kbd className="px-2 py-1 bg-white border border-gray-300 rounded">Shift + Tab</kbd> - Move to previous element</li>
                    <li><kbd className="px-2 py-1 bg-white border border-gray-300 rounded">Enter</kbd> - Activate link or button</li>
                    <li><kbd className="px-2 py-1 bg-white border border-gray-300 rounded">Space</kbd> - Activate button or checkbox</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Zoom</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li><kbd className="px-2 py-1 bg-white border border-gray-300 rounded">Ctrl +</kbd> - Zoom in</li>
                    <li><kbd className="px-2 py-1 bg-white border border-gray-300 rounded">Ctrl -</kbd> - Zoom out</li>
                    <li><kbd className="px-2 py-1 bg-white border border-gray-300 rounded">Ctrl 0</kbd> - Reset zoom</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Third-Party Content */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Third-Party Content
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              While we strive to ensure our website is fully accessible, some third-party content or 
              services may not meet the same accessibility standards. We work with our partners to 
              improve accessibility across all integrated services.
            </p>
          </div>

          {/* Feedback Section */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-8 rounded-lg text-white">
            <h3 className="text-2xl font-bold mb-4 text-center">
              Help Us Improve
            </h3>
            <p className="text-lg mb-6 text-center">
              We welcome your feedback on the accessibility of our website. If you encounter any 
              accessibility barriers or have suggestions for improvement, please let us know.
            </p>
            
            <div className="bg-white rounded-lg p-6 text-gray-900">
              <h4 className="font-semibold mb-4">Contact Our Accessibility Team:</h4>
              <div className="space-y-3">
                <p>
                  <strong>Email:</strong>{' '}
                  <a href="mailto:Info@southernsweetandsour.com" className="text-orange-600 hover:underline">
                    Info@southernsweetandsour.com
                  </a>
                </p>
                <p>
                  <strong>Phone:</strong> +1 919-701-9321
                </p>
                <p>
                  <strong>Response Time:</strong> We aim to respond to all accessibility inquiries within 2 business days.
                </p>
              </div>
            </div>

            <div className="text-center mt-6">
              <a 
                href="/contact" 
                className="inline-block bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>

          {/* Ongoing Improvements */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Ongoing Improvements
            </h2>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded">
              <p className="text-gray-700 leading-relaxed">
                Accessibility is an ongoing effort. We regularly review and update our website to 
                maintain and improve accessibility standards. Our team receives ongoing training in 
                accessibility best practices, and we conduct regular audits to identify and address 
                any accessibility issues.
              </p>
            </div>
          </div>
        </div>
      </ContentSection>
    </div>
  );
}





