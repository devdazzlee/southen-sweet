import React from 'react';

interface FullRoundedButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
}

const FullRoundedButton: React.FC<FullRoundedButtonProps> = ({
  children,
  className = '',
  onClick,
  disabled = false,
  type = 'button',
  href
}) => {
  const baseClasses = "bg-[#FBC332] hover:bg-white text-black font-semibold rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 px-8 py-3 text-lg font-inter";
  
  const buttonElement = (
    <button
      type={type}
      className={`${baseClasses} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
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

export default FullRoundedButton;
