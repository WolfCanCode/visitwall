import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export const PixelZap = ({ size = 24, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12 1h2v8h8v4h-2v-2h-8V5h-2V3h2V1zM8 7V5h2v2H8zM6 9V7h2v2H6zm-2 2V9h2v2H4zm10 8v2h-2v2h-2v-8H2v-4h2v2h8v6h2zm2-2v2h-2v-2h2zm2-2v2h-2v-2h2zm0 0h2v-2h-2v2z"
      fill="currentColor"
    />
  </svg>
);

export const PixelClock = ({ size = 24, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M19 3H5v2H3v14h2v2h14v-2h2V5h-2V3zm0 2v14H5V5h14zm-8 2h2v6h4v2h-6V7z"
      fill="currentColor"
    />
  </svg>
);

export const PixelMoon = ({ size = 24, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M6 2h8v2h-2v2h-2V4H6V2ZM4 6V4h2v2H4Zm0 10H2V6h2v10Zm2 2H4v-2h2v2Zm2 2H6v-2h2v2Zm10 0v2H8v-2h10Zm2-2v2h-2v-2h2Zm-2-4h2v4h2v-8h-2v2h-2v2Zm-6 0v2h6v-2h-6Zm-2-2h2v2h-2v-2Zm0 0V6H8v6h2Z"
      fill="currentColor"
    />
  </svg>
);

export const PixelPower = ({ size = 24, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M20 2h-2v4H6v2H4v8h2v2h2v4h8v-2h4v-2h-4v-2h4v-2h-4v-2H8v4H6V8h12V6h2V2zm-6 18h-4v-6h4v6z"
      fill="currentColor"
    />
  </svg>
);

export const PixelSun = ({ size = 24, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M13 3h-2v2h2V3zm4 2h2v2h-2V5zm-6 6h2v2h-2v-2zm-8 0h2v2H3v-2zm18 0h-2v2h2v-2zM5 5h2v2H5V5zm14 14h-2v-2h2v2zm-8 2h2v-2h-2v2zm-4-2H5v-2h2v2zM9 7h6v2H9V7zm0 8H7V9h2v6zm0 0v2h6v-2h2V9h-2v6H9z"
      fill="currentColor"
    />
  </svg>
);

export const PixelTreePalm = ({ size = 24, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      {/* Tree trunk */}
      <rect x="11" y="10" width="2" height="11" fill="currentColor" />
      <rect x="10" y="21" width="4" height="2" fill="currentColor" />

      {/* Top leaves - Middle */}
      <rect x="11" y="6" width="2" height="2" fill="currentColor" />
      <rect x="10" y="5" width="4" height="1" fill="currentColor" />
      <rect x="9" y="6" width="1" height="1" fill="currentColor" />
      <rect x="14" y="6" width="1" height="1" fill="currentColor" />

      {/* Left leaves */}
      <rect x="6" y="6" width="3" height="2" fill="currentColor" />
      <rect x="8" y="4" width="3" height="2" fill="currentColor" />

      {/* Right leaves */}
      <rect x="15" y="6" width="3" height="2" fill="currentColor" />
      <rect x="13" y="4" width="3" height="2" fill="currentColor" />

      {/* Bottom-left leaves */}
      <rect x="6" y="9" width="3" height="2" fill="currentColor" />
      <rect x="8" y="8" width="2" height="2" fill="currentColor" />

      {/* Bottom-right leaves */}
      <rect x="15" y="9" width="3" height="2" fill="currentColor" />
      <rect x="14" y="8" width="2" height="2" fill="currentColor" />

      {/* Coconut dots */}
      <rect x="12" y="9" width="1" height="1" fill="currentColor" />
      <rect x="11" y="9" width="1" height="1" fill="currentColor" />
    </g>
  </svg>
);

export const PixelPin = ({ size = 24, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M7 2h10v2H7V2zM5 6V4h2v2H5zm0 8H3V6h2v8zm2 2H5v-2h2v2zm2 2H7v-2h2v2zm2 2H9v-2h2v2zm2 0v2h-2v-2h2zm2-2v2h-2v-2h2zm2-2v2h-2v-2h2zm0-8h2v8h-2V6zm0 0V4h-2v2h2zm-5 2h-4v4h4V8z"
      fill="currentColor"
    />
  </svg>
);

export const PixelCheck = ({ size = 24, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M20 7L18 5l-8 8-4-4L4 11l6 6L20 7z" fill="currentColor" />
  </svg>
);

export const PixelDice = ({ size = 24, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M5 3H3v18h18V3H5zm14 2v14H5V5h14zM9 7H7v2h2V7zm6 0h2v2h-2V7zm-6 8H7v2h2v-2zm6 0h2v2h-2v-2zm-2-4h-2v2h2v-2z"
      fill="currentColor"
    />
  </svg>
);
