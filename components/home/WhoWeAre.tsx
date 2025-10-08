'use client'
import Image from 'next/image'
import React from 'react'
import Button from '@/components/custom/Button';
import ButtonWithImage from '@/components/custom/ButtonWithImage';
import Link from 'next/link'

const WhoWeAre = () => {
  return (
    <section className="py-16 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-white">
      <div className="layout flex flex-col w-full h-full gap-6">
        {/* Header Section */}
        <div className=" flex md:flex-row flex-col gap-9 w-full justify-between">
          <span className="text-black sm:text-lg lg:text-2xl md:text-2xl font-inter underline">About Us</span>

          <ButtonWithImage href="/about">
            Baked With Joy, Glazed With Love
          </ButtonWithImage>
        </div>

        {/* Title */}
        <h1 className="w-full h-full uppercase text-4xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-7xl font-bold sm:mb-10 md:mb-12 lg:mb-18">
          <span className="text-black ">WHO WE </span>
          <span className="text-orange-500 ">ARE?</span>
        </h1>

        {/* Main Content Grid */}
        <div className=" flex flex-col lg:flex-row gap-6 w-full h-full">
          {/* Left Side - Image and Button */}
          <div className=" flex flex-col items-center lg:items-start gap-4 p-2 sm:gap-6 md:gap-8 lg:gap-10 lg:w-1/2">
            {/* <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto  "> */}
            <Image
              width={400}
              height={400}
              src="/images/team.png"
              alt="Team collaboration"
              className="w-full h-full object-cover rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg"
            />
            {/* </div> */}

            <Link href="/about">
              <Button className="bg-[#FBC332] text-inter w-full sm:w-auto h-10 hover:bg-[#fbc231e5] text-black px-4 sm:px-6 text-lg sm:text-base lg:text-lg rounded-full transition-all duration-300"
              >
                View More
              </Button>
            </Link>
          </div>

          {/* Statistics */}
          <div className="flex flex-col w-full lg:w-1/2 h-full justify-center gap-8 sm:gap-10 md:gap-20 lg:gap-20 p-2 sm:p-4">
            <div className="flex flex-col w-full h-auto justify-center gap-6 sm:gap-4 md:gap-6 lg:gap-10">
              <div className="flex flex-col w-full gap-1">
                <h1 className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#E85A2D]">
                  10+ <span className="text-black font-medium text-lg sm;text-xl md:text-2xl">Years</span>
                </h1>
                <p className="text-black text-lg sm:text-xl md:text-2xl">Of Sweet Excellence</p>
              </div>
              <div className="flex flex-col w-full gap-1">
                <h1 className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#E85A2D]">
                  29,000+
                </h1>
                <p className="text-black text-lg sm:text-xl md:text-2xl">Happy Customers Served</p>
              </div>
              <div className="flex flex-col w-full gap-1">
                <h1 className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#E85A2D]">
                  450+
                </h1>
                <p className="text-black text-lg sm:text-xl md:text-2xl">Delicious Products</p>
              </div>
            </div>
            <p className="text-black font-inter leading-5 tracking-wide text-xs sm:text-sm md:text-base">
              Welcome to Southern Sweet and Sour, a proud Disabled Veteran Owned and Operated business.
              We're more than just a candy brand - we're a mission-driven company committed to giving back.
              Our passion for fun, flavorful licorice ropes comes with a purpose: supporting the veteran community.
            </p>
          </div>
          {/* Right Side - Stats and Content */}
          <div className="flex flex-col items-start gap-4 sm:gap-6 md:gap-7 p-2 lg:w-1/2">

            {/* Company Description */}
            <p className="text-black font-inter leading-5 tracking-wide text-xs sm:text-sm md:text-base">
              A portion of every purchase helps fund Warrior's Next Adventure, an organization dedicated to
              helping veterans heal through adventure and support. When you enjoy our sweet and sour treats,
              you're also contributing to a greater cause. Thank you for being part of our journey to make a
              difference, one licorice rope at a time.
            </p>

            {/* Secondary Image */}
            {/* <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto"> */}
            <Image
              width={400}
              height={400}
              src="/images/team.png"
              alt="Team collaboration"
              className="w-full object-cover rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg"
            />
            {/* </div> */}

          </div>

        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
