import React from "react";
import PixelSection from "./PixelSection";

interface PixelSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
}

export default function PixelSelect({
  label,
  options,
  className = "",
  ...props
}: PixelSelectProps) {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block font-pixel text-xs mb-2 uppercase">{label}</label>
      <PixelSection className="p-0 relative">
        <select
          {...props}
          className="w-full bg-transparent border-none p-2 font-pixel text-[10px] focus:outline-none appearance-none"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-xs">
          ▼
        </div>
      </PixelSection>
    </div>
  );
}
