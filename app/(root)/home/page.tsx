import Hero from '@/components/home/Hero'
import ExploreItems from '@/components/home/ExploreItems'
import WhoWeAre from '@/components/home/WhoWeAre'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import React from 'react'
import Testimoinials from '@/components/home/Testimoinials'

const HomePage = () => {
  return (
    <div>
      <Hero />
      <WhoWeAre />
      <WhyChooseUs  />
      <div id="order">
        <ExploreItems />
      </div>
      <Testimoinials />
    </div>
  )
}

export default HomePage
