import Link from 'next/link'; 
import React from 'react'

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  onClick,
  disabled = false,
  type = 'button',
  href
}) => {

  // If href is provided, render as Link
  if (href) {
    return (
      <Link href={href}>
        <button  
          type={type}
          className={className}
          disabled={disabled}
        >
          {children}
        </button>
      </Link>
    );
  }

  // If onClick is provided, render as regular button
  return (
    <button  
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;