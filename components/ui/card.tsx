
import { cn } from '@/lib/utils';
import React from 'react';

// Base Card Component
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  backgroundImage?: string;
  overlay?: boolean;
  overlayOpacity?: string;
  hover?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ 
    children, 
    className, 
    backgroundImage, 
    overlay = false, 
    overlayOpacity = "bg-black/30",
    hover = false,
    ...props 
  }, ref) => {
    const cardClasses = cn(
      'relative rounded-lg overflow-hidden shadow-sm',
      hover && 'transition-transform duration-300 hover:scale-105 hover:shadow-xl',
      className
    );

    const backgroundStyle = backgroundImage ? {
      backgroundImage: `url('${backgroundImage}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    } : {};

    return (
      <div 
        ref={ref} 
        className={cardClasses} 
        style={backgroundStyle}
        {...props}
      >
        {overlay && (
          <div className={cn('absolute inset-0', overlayOpacity)} />
        )}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    );
  }
);

Card.displayName = "Card";

// Card Content Component
interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  padding?: string;
  center?: boolean;
}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ 
    children, 
    className, 
    padding = "p-6",
    center = false,
    ...props 
  }, ref) => {
    const contentClasses = cn(
      padding,
      center && 'flex flex-col justify-center',
      'transition-all duration-300',
      className
    );

    return (
      <div ref={ref} className={contentClasses} {...props}>
        {children}
      </div>
    );
  }
);

CardContent.displayName = "CardContent";

// Card Header Component
interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={cn('flex flex-col space-y-1.5 p-6', className)} 
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardHeader.displayName = "CardHeader";

// Card Title Component
interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ children, className, size = 'lg', ...props }, ref) => {
    const sizeClasses = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl'
    };

    const titleClasses = cn(
      'font-bold text-white',
      sizeClasses[size],
      className
    );

    return (
      <h3 ref={ref} className={titleClasses} {...props}>
        {children}
      </h3>
    );
  }
);

CardTitle.displayName = "CardTitle";

// Card Description Component
interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children?: React.ReactNode;
  className?: string;
}

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <p 
        ref={ref} 
        className={cn('text-white text-sm leading-relaxed', className)} 
        {...props}
      >
        {children}
      </p>
    );
  }
);

CardDescription.displayName = "CardDescription";

export { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
   
};

// Default export for backward compatibility
export default Card;