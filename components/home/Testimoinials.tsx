'use client'
import React from 'react'
import { siteData } from '@/content'
import TestimonialCard from '@/components/custom/TesimonialCard'
import Button from '@/components/custom/Button'
import Image from 'next/image'
import Link from 'next/link'

const Testimonials = () => {
  function setSelectedTestimonial(id: number): void {
    // Functionality for testimonial selection can be added here if needed
    console.log('Selected testimonial:', id);
  }

  return (
    <section className="w-full h-full py-16 bg-[#FFF9ED]">
      <div className="layout w-full h-full bg-[#FFF9ED] flex flex-col">
      <div className="w-full p-2 flex flex-col sm:flex-row justify-between items-start mb-12 gap-6 sm:gap-6">
          <h2 className=" text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-black font-inter font-semibold sm:mb-10 md:mb-12 lg:mb-20">
            Testimonials
          </h2>
          <Button 
            href="/contact"
            className="text-black inline-block font-inter sm:text-xl lg:text-2xl md:text-2xl hover:scale-105 transition-all duration-300"
          > 
            View More  
            <Image src="/images/Arrow 3.png" alt="arrow-right" width={150} height={0} className="w-full h-auto" />
          </Button>
        </div>
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center justify-center">
          {siteData.testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              id={testimonial.id}
              name={testimonial.name}
              role={testimonial.role}
              rating={testimonial.rating}
              feedback={testimonial.feedback}
              image={testimonial.image}
              onClick={() => setSelectedTestimonial(testimonial.id)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
