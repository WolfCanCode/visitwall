import React from 'react';

interface PixelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export default function PixelButton({ children, className = '', ...props }: PixelButtonProps) {
  return (
    <button 
      className={`pixel-btn active:translate-x-[2px] active:translate-y-[2px] active:shadow-none hover:bg-[#d4d3b8] ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
