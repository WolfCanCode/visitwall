import React from 'react';

interface PixelHeadingProps {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className?: string;
}

export default function PixelHeading({ children, as: Tag = 'h2', className = '' }: PixelHeadingProps) {
  return (
    <Tag className={`pixel-heading ${className}`}>
      {children}
    </Tag>
  );
}
