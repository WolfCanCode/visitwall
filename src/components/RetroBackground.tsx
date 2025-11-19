import React from 'react';

interface RetroBackgroundProps {
  children: React.ReactNode;
}

export default function RetroBackground({ children }: RetroBackgroundProps) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Scanline Overlay */}
      <div className="scanline pointer-events-none z-50" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
