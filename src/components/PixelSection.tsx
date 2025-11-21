import React from 'react';

interface PixelSectionProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function PixelSection({ children, className = '', style }: PixelSectionProps) {
  return (
    <div className={`pixel-section ${className}`} style={style}>
      {children}
    </div>
  );
}
