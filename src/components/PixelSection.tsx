import React from 'react';

interface PixelSectionProps {
  children: React.ReactNode;
  className?: string;
}

export default function PixelSection({ children, className = '' }: PixelSectionProps) {
  return (
    <div className={`pixel-section ${className}`}>
      {children}
    </div>
  );
}
