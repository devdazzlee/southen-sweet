import React from 'react';
import Image from 'next/image';

interface ButtonWithImageProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
  imageSrc?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageClassName?: string;
}

const ButtonWithImage: React.FC<ButtonWithImageProps> = ({
  children,
  className = '',
  onClick,
  disabled = false,
  type = 'button',
  href,
  imageSrc = '/images/Arrow 3.png',
  imageAlt = 'arrow-right',
  imageWidth = 200,
  imageHeight = 0,
  imageClassName = 'w-30 sm:w-28 md:w-30 lg:w-40 h-auto'
}) => {
  const baseClasses = "text-black sm:text-lg lg:text-2xl md:text-2xl flex flex-col items-end justify-end text-right font-inter hover:scale-105 transition-all duration-300";
  
  const buttonElement = (
    <button
      type={type}
      className={`${baseClasses} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
      <Image 
        src={imageSrc} 
        alt={imageAlt} 
        width={imageWidth} 
        height={imageHeight} 
        className={imageClassName} 
      />
    </button>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {buttonElement}
      </a>
    );
  }

  return buttonElement;
};

export default ButtonWithImage;