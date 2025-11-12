'use client';

import PageHero from '@/components/shared/PageHero';
import ContentSection from '@/components/shared/ContentSection';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

export default function FAQsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQ[] = [
    {
      category: 'Orders & Shipping',
      question: 'How long does shipping take?',
      answer: 'Standard shipping takes 5-7 business days, express shipping takes 2-3 business days, and international orders typically arrive within 10-15 business days. All orders are processed within 1-2 business days.'
    },
    {
      category: 'Orders & Shipping',
      question: 'Do you offer free shipping?',
      answer: 'Yes! We offer free standard shipping on all orders over $50. For orders under $50, standard shipping is $5.99.'
    },
    {
      category: 'Orders & Shipping',
      question: 'How can I track my order?',
      answer: 'Once your order ships, you\'ll receive a confirmation email with a tracking number. You can use this number to track your package on our shipping carrier\'s website.'
    },
    {
      category: 'Products',
      question: 'Are your licorice products gluten-free?',
      answer: 'Many of our licorice products are gluten-free, but not all. Please check the product description and ingredients list on each product page for specific dietary information.'
    },
    {
      category: 'Products',
      question: 'What ingredients do you use?',
      answer: 'We use authentic, high-quality ingredients including real licorice root extract, natural flavors, and colors. All ingredient lists are available on individual product pages.'
    },
    {
      category: 'Products',
      question: 'Do you offer sugar-free options?',
      answer: 'Yes! We have a selection of sugar-free licorice products. Look for the "Sugar-Free" tag when browsing our products.'
    },
    {
      category: 'Returns & Refunds',
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return guarantee. Unopened products in original packaging can be returned for a full refund or exchange. Due to health and safety regulations, opened food products cannot be returned unless defective.'
    },
    {
      category: 'Returns & Refunds',
      question: 'How do I return a product?',
      answer: 'Contact our customer service at Info@southernsweetandsour.com with your order number. We\'ll provide you with a return authorization and shipping label. Once we receive your return, refunds are processed within 5-7 business days.'
    },
    {
      category: 'Returns & Refunds',
      question: 'What if my order arrives damaged?',
      answer: 'We\'re sorry if your order arrives damaged! Please contact us immediately at Info@southernsweetandsour.com with photos of the damage. We\'ll send a replacement or issue a full refund right away.'
    },
    {
      category: 'Account & Payment',
      question: 'Do I need an account to place an order?',
      answer: 'No, you can checkout as a guest. However, creating an account allows you to track orders, save favorites, and checkout faster on future purchases.'
    },
    {
      category: 'Account & Payment',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, and Google Pay.'
    },
    {
      category: 'Account & Payment',
      question: 'Is my payment information secure?',
      answer: 'Absolutely! We use industry-standard SSL encryption to protect your payment information. We never store your full credit card details on our servers.'
    },
    {
      category: 'Wholesale & Corporate',
      question: 'Do you offer wholesale pricing?',
      answer: 'Yes! We offer competitive wholesale pricing for retailers and businesses. Please visit our Corporate Gifts page or contact us at wholesale@southernsweetandsour.com for more information.'
    },
    {
      category: 'Wholesale & Corporate',
      question: 'Can I order in bulk for events?',
      answer: 'Absolutely! We love catering to special events. Contact us with your requirements, and we\'ll provide a custom quote with bulk pricing.'
    }
  ];

  const categories = Array.from(new Set(faqs.map(faq => faq.category)));

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      <PageHero 
        title="Frequently Asked Questions" 
        description="Find answers to common questions about our products, shipping, and policies."
      />

      <ContentSection>
        <div className="max-w-4xl mx-auto">
          {categories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <HelpCircle className="mr-3 text-orange-600" size={32} />
                {category}
              </h2>
              
              <div className="space-y-4">
                {faqs
                  .filter(faq => faq.category === category)
                  .map((faq, index) => {
                    const globalIndex = faqs.findIndex(f => f === faq);
                    const isOpen = openIndex === globalIndex;
                    
                    return (
                      <div 
                        key={index}
                        className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <button
                          onClick={() => toggleFAQ(globalIndex)}
                          className="w-full flex justify-between items-center p-5 text-left bg-white hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-semibold text-gray-900 pr-4">
                            {faq.question}
                          </span>
                          <ChevronDown 
                            className={`flex-shrink-0 text-orange-600 transition-transform duration-200 ${
                              isOpen ? 'transform rotate-180' : ''
                            }`}
                            size={24}
                          />
                        </button>
                        
                        <div
                          className={`transition-all duration-200 ${
                            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                          } overflow-hidden`}
                        >
                          <div className="p-5 pt-0 text-gray-700 leading-relaxed bg-gray-50">
                            {faq.answer}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}

          {/* Still have questions? */}
          <div className="mt-16 bg-gradient-to-r from-orange-500 to-orange-600 p-8 rounded-lg text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
            <p className="text-lg mb-6">
              Can't find the answer you're looking for? Our friendly customer service team is here to help!
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





