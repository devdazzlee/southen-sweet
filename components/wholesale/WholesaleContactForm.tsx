'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { wholesaleApi } from '@/lib/api';
import { Send } from 'lucide-react';

interface FormData {
  FirstName: string;
  LastName: string;
  email: string;
  phone: string;
  message: string;
}

export default function WholesaleContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    FirstName: "",
    LastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const apiData = {
        FirstName: formData.FirstName,
        LastName: formData.LastName,
        email: formData.email,
        phone: formData.phone,
        message: formData.message
      };
      const response = await wholesaleApi.submitInquiry(apiData as WholesaleInquiryRequest);
      interface WholesaleInquiryRequest {
        FirstName: string;
        LastName: string;
        email: string;  
        phone: string;
        message: string;
      }

      if (response.success) {
        toast({
          title: "Inquiry Sent Successfully!",
          description:
            "Thank you for your interest. We will contact you within 24 hours.",
        });

        // Reset form
        setFormData({
          FirstName: "",
          LastName: "",
          email: "",
          phone: "",
          message: "",
        });
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to send inquiry. Please try again.";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Get Wholesale Pricing
              </h2>
              <p className="text-gray-600 text-lg">
                Fill out the form below and we&apos;ll get back to you with
                competitive wholesale rates
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Business Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="FirstName"
                    value={formData.FirstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Your First Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="LastName"
                    value={formData.LastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Your Last Name"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="+1 919-701-9321"
                  />
                </div>
              </div>



          

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Tell us more about your business and wholesale needs..."
                />
              </div>

              <div className="flex items-center justify-center pt-6">
                <button
                  type="submit"
                  disabled={
                    isSubmitting || 
                    !formData.FirstName || 
                    !formData.LastName || 
                    !formData.email || 
                    !formData.phone || 
                    !formData.message
                  }
                  className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center gap-3 transition-colors"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Wholesale Inquiry
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
