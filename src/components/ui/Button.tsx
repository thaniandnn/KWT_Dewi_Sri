import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: 'primary' | 'outline' | 'ghost' | 'maroon';
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}: ButtonProps) => {
  const baseStyles = "px-6 py-3 rounded-full font-sans font-medium transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50";
  const variants = {
    primary: "bg-kwt-orange text-white hover:bg-opacity-90 shadow-lg hover:shadow-kwt-orange/20",
    outline: "border-2 border-white text-white hover:bg-white hover:text-kwt-maroon",
    ghost: "text-white hover:bg-white/10",
    maroon: "bg-kwt-maroon text-white hover:bg-opacity-90"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};
