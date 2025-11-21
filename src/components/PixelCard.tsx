import React from "react";

interface PixelCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function PixelCard({
  children,
  className = "",
}: PixelCardProps) {
  return <div className={`pixel-card ${className}`}>{children}</div>;
}
