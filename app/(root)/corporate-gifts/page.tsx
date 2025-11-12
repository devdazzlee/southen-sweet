'use client';

import PageHero from '@/components/shared/PageHero';
import ContentSection from '@/components/shared/ContentSection';
import { Gift, Package, Users, Star, Truck, HeadphonesIcon, Sparkles, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function CorporateGiftsPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    quantity: '',
    event: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isSubmitting) {
      setIsSubmitting(true);
      try {
        // Simulate API call (replace with actual API call later)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        toast({
          title: "Request Submitted!",
          description: "Thank you! Our corporate team will contact you within 24 hours.",
        });
        
        setFormData({
          companyName: '',
          contactName: '',
          email: '',
          phone: '',
          quantity: '',
          event: '',
          message: ''
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "An error occurred. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <PageHero 
        title="Corporate Gifts" 
        description="Premium licorice gifts that leave a lasting impression on your clients and team."
      />

      <ContentSection>
        <div className="max-w-6xl mx-auto">
          {/* Introduction */}
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Sweeten Your Business Relationships
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Show appreciation to your clients, partners, and employees with premium licorice gifts. 
              Our corporate gifting program offers customizable options, bulk pricing, and white-glove service.
            </p>
          </div>

          {/* Why Choose Us */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
              Why Choose Our Corporate Gifts?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-600 rounded-full mb-4">
                  <Star className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Premium Quality</h3>
                <p className="text-gray-700">
                  Only the finest ingredients and authentic recipes. Your gift reflects your brand&apos;s excellence.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
                  <Sparkles className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Custom Branding</h3>
                <p className="text-gray-700">
                  Add your company logo, custom messages, and branded packaging to make it uniquely yours.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-4">
                  <HeadphonesIcon className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Dedicated Support</h3>
                <p className="text-gray-700">
                  A dedicated account manager to handle your order from planning to delivery.
                </p>
              </div>
            </div>
          </div>

          {/* Perfect For */}
          <div className="mb-16 bg-gradient-to-br from-orange-50 to-white p-8 md:p-12 rounded-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Perfect For Every Occasion
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="flex items-start gap-3">
                <Gift className="text-orange-600 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Client Appreciation</h3>
                  <p className="text-gray-700">Thank loyal clients and strengthen business relationships</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="text-orange-600 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Employee Recognition</h3>
                  <p className="text-gray-700">Celebrate achievements and boost team morale</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Sparkles className="text-orange-600 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Holiday Gifts</h3>
                  <p className="text-gray-700">Spread seasonal cheer to clients and staff</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Package className="text-orange-600 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Conference Swag</h3>
                  <p className="text-gray-700">Stand out at trade shows and corporate events</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-orange-600 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Welcome Packages</h3>
                  <p className="text-gray-700">Make new employees or clients feel valued</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Star className="text-orange-600 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Milestone Celebrations</h3>
                  <p className="text-gray-700">Mark company anniversaries and achievements</p>
                </div>
              </div>
            </div>
          </div>

          {/* Our Process */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
              Simple Ordering Process
            </h2>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Consult</h3>
                <p className="text-gray-700 text-sm">Share your needs and vision with our team</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Customize</h3>
                <p className="text-gray-700 text-sm">Select products and customize packaging</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Approve</h3>
                <p className="text-gray-700 text-sm">Review samples and finalize your order</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  4
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Deliver</h3>
                <p className="text-gray-700 text-sm">Receive your premium corporate gifts</p>
              </div>
            </div>
          </div>

          {/* Features & Benefits */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
              What&apos;s Included
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-gray-200 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Package className="mr-2 text-orange-600" size={24} />
                  Flexible Options
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Minimum order: 25 units</li>
                  <li>✓ Volume discounts available</li>
                  <li>✓ Mix and match products</li>
                  <li>✓ Individual or bulk packaging</li>
                </ul>
              </div>

              <div className="border border-gray-200 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Sparkles className="mr-2 text-orange-600" size={24} />
                  Customization
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Custom logo printing</li>
                  <li>✓ Personalized gift messages</li>
                  <li>✓ Branded packaging options</li>
                  <li>✓ Color-coordinated selections</li>
                </ul>
              </div>

              <div className="border border-gray-200 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Truck className="mr-2 text-orange-600" size={24} />
                  Delivery
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Nationwide shipping</li>
                  <li>✓ Direct-to-recipient options</li>
                  <li>✓ Scheduled delivery dates</li>
                  <li>✓ Tracking for all orders</li>
                </ul>
              </div>

              <div className="border border-gray-200 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <HeadphonesIcon className="mr-2 text-orange-600" size={24} />
                  Support
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Dedicated account manager</li>
                  <li>✓ Free design consultation</li>
                  <li>✓ Sample products available</li>
                  <li>✓ Reorder management</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Request Quote Form */}
          <div className="mb-16 bg-gradient-to-br from-gray-50 to-white p-8 md:p-12 rounded-lg border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Request a Custom Quote
            </h2>
            <p className="text-center text-gray-700 mb-8 max-w-2xl mx-auto">
              Fill out the form below and our corporate gifting team will contact you within 24 hours 
              with a personalized quote and recommendations.
            </p>
            
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="companyName" className="block text-sm font-semibold text-gray-900 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Your Company Inc."
                  />
                </div>

                <div>
                  <label htmlFor="contactName" className="block text-sm font-semibold text-gray-900 mb-2">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="John Smith"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="+1 919-701-9321"
                  />
                </div>

                <div>
                  <label htmlFor="quantity" className="block text-sm font-semibold text-gray-900 mb-2">
                    Estimated Quantity *
                  </label>
                  <select
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">Select quantity</option>
                    <option value="25-50">25-50 units</option>
                    <option value="51-100">51-100 units</option>
                    <option value="101-250">101-250 units</option>
                    <option value="251-500">251-500 units</option>
                    <option value="500+">500+ units</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="event" className="block text-sm font-semibold text-gray-900 mb-2">
                    Event/Occasion *
                  </label>
                  <select
                    id="event"
                    name="event"
                    value={formData.event}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">Select occasion</option>
                    <option value="client-appreciation">Client Appreciation</option>
                    <option value="employee-recognition">Employee Recognition</option>
                    <option value="holiday">Holiday Gifts</option>
                    <option value="conference">Conference/Trade Show</option>
                    <option value="welcome">Welcome Package</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                  Additional Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Tell us about your gifting needs, desired delivery date, customization preferences, etc."
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-orange-600 text-white px-12 py-4 rounded-full text-lg font-semibold hover:bg-orange-700 transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2 justify-center">
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    'Request Quote'
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Contact CTA */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-8 rounded-lg text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Have Questions?</h3>
            <p className="text-lg mb-6">
              Our corporate gifting specialists are here to help you create the perfect gift program.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="mailto:Info@southernsweetandsour.com" 
                className="bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                Email Corporate Team
              </a>
              <a 
                href="tel:+19197019321" 
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-orange-600 transition-colors"
              >
                Call +1 919-701-9321
              </a>
            </div>
          </div>
        </div>
      </ContentSection>
    </div>
  );
}





