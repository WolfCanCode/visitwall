import React from "react";
import PixelSection from "./PixelSection";

interface PixelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function PixelInput({
  label,
  className = "",
  ...props
}: PixelInputProps) {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block font-pixel text-xs mb-2 uppercase">{label}</label>
      <PixelSection className="p-0">
        <input
          {...props}
          className="w-full bg-transparent border-none p-2 font-pixel text-[10px] focus:outline-none"
        />
      </PixelSection>
    </div>
  );
}
