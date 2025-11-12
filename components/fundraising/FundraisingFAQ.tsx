'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FundraisingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What Is Fundraising?",
      answer: "Our fundraising platform allows groups to sell premium licorice rope candy to raise money for their causes. You keep 50% of every sale with no minimums or fees."
    },
    {
      question: "How can I get service?",
      answer: "Simply sign up for an account, create your fundraising campaign, and start sharing your virtual store link with supporters. Our team provides full support throughout your campaign."
    },
    {
      question: "What kind of service will I get?",
      answer: "You'll receive a dedicated virtual store, marketing materials, order tracking, payment processing, and direct shipping to your supporters. Plus, our customer service team is always available to help."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              If there are questions you want to ask, we will answer all your questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

        
        </div>
      </div>
    </div>
  );
}
