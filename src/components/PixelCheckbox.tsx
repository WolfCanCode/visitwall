import React from "react";

interface PixelCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export default function PixelCheckbox({
  checked,
  onChange,
  className = "",
}: PixelCheckboxProps) {
  return (
    <div
      onClick={() => onChange(!checked)}
      className={`w-6 h-6 border-2 border-(--border-color) flex items-center justify-center cursor-pointer bg-white ${className}`}
    >
      {checked && <div className="w-3 h-3 bg-(--text-color)" />}
    </div>
  );
}

