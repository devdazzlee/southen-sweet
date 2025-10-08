import Link from 'next/link'
import React from 'react'

const OurProcess = () => {
    return (
        <section className="w-full h-full py-16 sm:py-16 md:py-30 lg:py-30 xl:py-36 bg-[#FFF9ED]">
            <div className="layout w-full h-full py-16 sm:py-16 md:py-20 lg:py-20 xl:py-20 flex flex-col items-center justify-center">
                {/* TOP */}
                <div className="w-full p-2 flex flex-col items-start mb-8 gap-14">
                    <Link href="/product">
                        <h3 className="text-black inline-block underline font-inter font-regular sm:text-xl lg:text-2xl md:text-2xl hover:scale-105 transition-all duration-300">
                            Steps
                        </h3>
                    </Link>
                    <h2 className=" text-4xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-7xl text-black uppercase font-inter font-semibold sm:mb-10 md:mb-12 lg:mb-20">
                        Our <span className="text-[#FFAD33]">Process</span>
                    </h2>
                </div>
                {/* main content */}
                <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:items-center lg:items-center md:justify-between lg:justify-between gap-6 md:gap-8 lg:gap-10">
                    {/* left side */}
                    <div className=" w-full flex flex-col items-center justify-start gap-7 sm:h-[220px] md:h-[420px] lg:h-[600px] px-4 py-6 md:px-6 md:py-10 lg:px-8 lg:py-14">
                        <div className='flex flex-col items-start justify-start w-full gap-6 md:gap-10'>
                            <i className='bg-white rounded-[24px] w-12 h-20 flex items-center justify-center text-black font-inter font-semibold text-2xl'>01</i>
                            <h2 className='text-black font-inter leading-14 tracking-wide font-medium text-3xl sm:text-3xl md:text-4xl lg:text-5xl max-w-xs md:max-w-2xs'>Pick Your Favorites</h2>
                            <div className='flex justify-end items-end gap-2 md:gap-4 w-full'>
                                <hr className='text-gray-500 w-8 md:w-12 h-full'/>
                                <p className='text-gray-500 font-inter leading-5 tracking-wide font-regular text-xs sm:text-sm w-48 sm:w-60 md:w-72'>Browse our collection of classic candies, sour treats, and sweet surprises. </p>
                            </div>
                        </div>
                    </div>
                    {/* middle side */}
                    <div className=" w-full flex flex-col items-center justify-center gap-7 sm:h-[220px] md:h-[420px] lg:h-[600px] px-4 py-6 md:px-6 md:py-10 lg:px-8 lg:py-14">
                        <div className='flex flex-col items-start justify-start w-full gap-6 md:gap-7'>
                            <i className='bg-white rounded-[24px] w-12 h-20 flex items-center justify-center text-black font-inter font-semibold text-2xl'>02</i>
                            <h2 className='text-black font-inter leading-14 tracking-wide font-medium text-3xl sm:text-3xl md:text-4xl lg:text-5xl max-w-xs md:max-w-2xs'>Add to Your Candy Bag</h2>
                            <div className='flex w-full justify-end items-end gap-2 md:gap-4'>
                                <hr className='w-8 md:w-12 h-full text-gray-500'/>
                                <p className='text-gray-500 font-inter leading-5 tracking-wide font-regular text-xs sm:text-sm w-40 sm:w-52 md:w-64'>Mix and match as much as you like — no limits on sweetness! </p>
                            </div>
                        </div>
                    </div>
                    {/* right side */}  
                    <div className=" w-full flex flex-col items-center justify-end gap-7 sm:h-[220px] md:h-[420px] lg:h-[600px] px-4 py-6 md:px-6 md:py-10 lg:px-8 lg:py-14">
                        <div className='flex flex-col items-start justify-start w-full gap-6 md:gap-7'>
                            <i className='bg-white rounded-[24px] w-12 h-20 flex items-center justify-center text-black font-inter font-semibold text-2xl'>03</i>
                            <h2 className='text-black font-inter leading-14 tracking-wide font-medium text-3xl sm:text-3xl md:text-4xl lg:text-5xl max-w-xs md:max-w-2xs'>Get It Delivered Fast</h2>
                            <div className='flex justify-end items-end gap-2 md:gap-4 w-full'>
                                <hr className='text-gray-500 w-8 md:w-12 h-full'/>
                                <p className='text-gray-500 font-inter leading-5 tracking-wide font-regular text-xs sm:text-sm w-48 sm:w-60 md:w-72'>We pack it fresh and ship it straight to your door with care. </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OurProcess