import React from 'react';

interface PixelStickerProps {
  emoji: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function PixelSticker({ emoji, className = '', style }: PixelStickerProps) {
  return (
    <div 
      className={`absolute text-2xl select-none pointer-events-none ${className}`}
      style={{
        textShadow: '2px 2px 0 #000',
        ...style
      }}
    >
      {emoji}
    </div>
  );
}
