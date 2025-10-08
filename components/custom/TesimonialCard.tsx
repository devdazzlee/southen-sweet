'use client'
import { Star } from 'lucide-react';
import Image from 'next/image';

interface TestimonialCardProps {
  id: number;
  name: string;
  role: string;
  rating: number;
  feedback: string;
  image: string;
  index?: number;
  onClick?: () => void;
}

export default function TestimonialCard({
  id,
  name,
  role,
  rating,
  feedback,
  image,
  index = 0,
  // onClick 
}: TestimonialCardProps) {
  return (
    // <div
    //   className=" bg-amber-200 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer h-full"
    //   onClick={onClick}
    // >
    <div className="bg-white w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-80 p-6 sm:p-8 md:p-10 gap-6 sm:gap-8 md:gap-10 flex flex-col items-center justify-center rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 w-full items-center">
        <Image
          src={image}
          alt={name}
          width={82}
          height={82}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover"
        />
        <div className="flex gap-1 flex-col w-full">
          <h4 className="text-black gap-4 flex uppercase font-inter text-lg sm:text-xl font-bold">{name}</h4>
          <p className="text-[#8F8E8E] text-xs sm:text-sm">{role}</p>
          <span className="flex gap-1">
            <Image src="/svg/Star.svg" alt="star" width={15} height={15} />
            <Image src="/svg/Star.svg" alt="star" width={15} height={15} />
            <Image src="/svg/Star.svg" alt="star" width={15} height={15} />
            <Image src="/svg/Star.svg" alt="star" width={15} height={15} />
            <Image src="/svg/Star.svg" alt="star" width={15} height={15} />
          </span>
        </div>
      </div>
      <p className="text-black leading-6 text-xs sm:text-sm text-regular text-start sm:text-left">{feedback}</p>
    </div>
    // </div>
  );
}