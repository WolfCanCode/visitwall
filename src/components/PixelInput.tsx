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
      <PixelSection
        className={`p-0 transition-all duration-200 ${
          props.disabled
            ? "opacity-50 cursor-not-allowed bg-gray-100"
            : "focus-within:border-[var(--accent-color)] focus-within:bg-white focus-within:shadow-sm"
        }`}
      >
        <input
          {...props}
          className={`w-full bg-transparent border-none p-2 font-pixel text-[10px] focus:outline-none placeholder:text-gray-400 ${
            props.disabled ? "cursor-not-allowed" : ""
          }`}
        />
      </PixelSection>
    </div>
  );
}
