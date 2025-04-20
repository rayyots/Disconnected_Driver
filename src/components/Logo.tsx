
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ className, size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-24',
  };

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div className={cn('font-bold text-white', sizeClasses[size])}>
        <span className="text-white">Disconnected</span>
        <span className="text-[#00C4CC]">Driver</span>
      </div>
    </div>
  );
};

export default Logo;
