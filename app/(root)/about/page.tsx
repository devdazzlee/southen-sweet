import AboutPage from '@/components/about/Hero'
import OurMission from '@/components/about/OurMission'
import OurProcess from '@/components/about/OurProcess'
import WhoWeAre from '@/components/home/WhoWeAre'
import React from 'react'

const page = () => {
  return (
    <>
      <AboutPage />
      <WhoWeAre />
      <OurProcess />
      <OurMission />
      <div id="order" className="py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Products</h2>
          <p className="text-lg text-gray-600 mb-8">Discover our premium licorice collection</p>
          <a 
            href="/product" 
            className="bg-orange-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-700 transition-colors inline-block"
          >
            Shop Now
          </a>
        </div>
      </div>
    </>
  )
}

export default page