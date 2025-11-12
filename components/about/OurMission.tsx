import React from 'react'
import Image from 'next/image'

const OurMission = () => {
    return (
        <section className='w-full h-full py-36 '>
            <div className='layout w-full h-full '>

                <div className='w-full h-full relative flex flex-col items-center justify-center px-5'>
                    {/* Left Image */}
                    <div className='w-full h-32 lg:h-28 mb-9'>
                        <div className=' w-[250px] h-[113px] md:w-[274px] md:h-[123px] sm:w-auto sm:h-auto absolute bg-black/40 rounded-2xl overflow-hidden shadow-lg' />
                        <Image
                            src="/images/ourmission-1.png"
                            alt="Team"
                            width={274}
                            height={123}
                            className='rounded-2xl overflow-hidden shadow-lg object-cover'
                        />
                    </div>

                    {/* Main Content */}
                    <div className='w-full max-w-3xl text-start p-2'>
                        <h2 className='text-4xl md:text-5xl lg:text-6xl sm:text-5xl font-semibold font-inter text-gray-900 mb-8'>
                            Our Mission
                        </h2>
                        <p className=' font-regular font-inter text-gray-700 tracking-wide sm:tracking-wide md:tracking-wide lg:tracking-wider xl:tracking-wider leading-8 sm:leading-8 md:leading-8 lg:leading-10 text-xl sm:text-xl md:text-3xl lg:text-4xl xl:text-3xl'>
                            Welcome to Southern Sweet and Sour, a proud Disabled Veteran Owned and Operated business. We're more than just a candy brand – we're a mission-driven company committed to giving back. Our passion for fun, flavorful licorice ropes comes with a purpose: supporting the veteran community.
                        </p>
                    </div>

                    {/* Right Image */}
                    <div className='bg w-full flex items-end justify-end h-52 lg:h-52'>
                    <div className=' w-[250px] h-[140px] md:w-[375px] md:h-[213px] sm:w-auto sm:h-auto absolute bg-black/40 rounded-2xl overflow-hidden shadow-lg' />
                        <Image
                            src="/images/ourmission-2.png"
                            alt="Customer service"
                            width={375}
                            height={213}
                            className=' object-cover rounded-2xl overflow-hidden shadow-lg'
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OurMission