'use client';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Button from '@/components/custom/Button';
import Link from 'next/link';

interface FormData {
  name: string;
  email: string;
  phone: string;
  restaurantName: string;
  comment: string;
}

const ContactPage = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    restaurantName: '',
    comment: ''
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.comment.trim()) {
      newErrors.comment = 'Comment is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Form submitted:', formData);
      // Here you would typically send the data to your backend
      alert('Message sent successfully!');

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        restaurantName: '',
        comment: ''
      });
    }
  };

  return (
    <section className="w-full h-full py-32  bg-white">

      <div className="layout w-full h-full py-10 ">
        {/* Main Content */}
        <div className="max-w-4xl shadow-2xl transition-all duration-300 rounded-2xl  p-4 mx-auto h-auto sm:h-auto md:h-auto lg:h-[810px] xl:h-auto">
          {/* Header */}
          <div className="text-center mb-12 ">
            <h1 className="text-4xl md:text-5xl font-inter font-semibold text-gray-900 mb-4">
              Get in Touch with Our Team
            </h1>
            <p className="font-inter text-lg text-[#373131] leading-14">
              Whether you need support, a demo, or a custom quote — we’re just one message away.
            </p>
          </div>

          {/* Contact Form */}
          <form className="max-w-2xl mx-auto flex flex-col gap-15 p-4 h-full">
            {/* First Row - Name and Email */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Name Field */}
              <div className="w-full flex flex-col gap-4">
                <label htmlFor="name" className="block text-xl font-inter font-semibold text-[#7B7A7A]">
                  Name *
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name here"
                  value={formData.name}
                  onChange={handleInputChange}
                  className='w-full h-16 text-lg px-6 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 border-1 border-[#797E86] text-[#7B7A7A] shadow-lg bg-transparent'
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div className='w-full flex flex-col gap-4'>
                <label htmlFor="email" className="block text-xl font-inter font-semibold text-[#7B7A7A]">
                  Email *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Your email here"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full h-16 text-lg px-6 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 border-1 border-[#797E86] text-[#7B7A7A] shadow-lg bg-transparent `}
                     
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Second Row - Phone and Restaurant Name */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Phone Field */}
              <div className="w-full flex flex-col gap-4">
                <label htmlFor="phone" className="block text-xl font-inter font-semibold text-[#7B7A7A]">
                Phone Number *
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="text"
                  placeholder="Your phone number here"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className='w-full h-16 text-lg px-6 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 border-1 border-[#797E86] text-[#7B7A7A] shadow-lg bg-transparent'
                />
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone}</p>
                )}
              </div>

              {/* Restaurant Name Field */}
              <div className='w-full flex flex-col gap-4'>
                <label htmlFor="restaurantName" className="block text-xl font-inter font-semibold text-[#7B7A7A]">
                  Restaurant Name *
                </label>
                <Input
                  id="restaurantName"
                  name="restaurantName"
                  type="email"
                  placeholder="Your restaurant name here"
                  value={formData.restaurantName}
                  onChange={handleInputChange}
                  className={`w-full h-16 text-lg px-6 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 border-1 border-[#797E86] text-[#7B7A7A] shadow-lg bg-transparent `}
                     
                />
                {errors.restaurantName && (
                  <p className="text-sm text-red-500">{errors.restaurantName}</p>
                )}
              </div>
            </div>

            {/* Comment Field */}
            <div className='w-full flex flex-col gap-4'>
                <label htmlFor="comment" className="block text-xl font-inter font-semibold text-[#7B7A7A]">
                  Comment *
                </label>
                <Input
                  id="comment"
                  name="comment"
                  type="text"
                  placeholder="Your comment here"
                  value={formData.comment}
                  onChange={handleInputChange}
                  className={`w-full h-18 text-lg px-6 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 border-1 border-[#797E86] text-[#7B7A7A] shadow-lg bg-transparent `}
                     
                />
                {errors.comment && (
                  <p className="text-sm text-red-500">{errors.comment}</p>
                )}
              </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <Button
                type="submit"
                  className=" bg-[#E7AB3C] text-white font-semibold px-12 py-4 rounded-full text-lg transition-all duration-300 hover:shadow-lg hover:scale-105 shadow-lg"
              >
                Send Message
              </Button>
            </div>
          </form>

        </div>
      </div>
    </section>
  );
};

export default ContactPage;
