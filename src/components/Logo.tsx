import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const dimensions = {
    sm: 'w-9 h-9',
    md: 'w-12 h-12',
    lg: 'w-24 h-24'
  };

  return (
    <div className={`relative ${dimensions[size]} shrink-0 ${className}`}>
      <img
        src="/logo kwt-2.png"
        alt="KWT Dewi Sri Logo"
        className="w-full h-full object-contain"
      />
    </div>
  );
};

