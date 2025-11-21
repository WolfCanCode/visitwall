import React, { useEffect } from "react";
import PixelSection from "./PixelSection";

interface PixelToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
  duration?: number;
}

export default function PixelToast({
  message,
  type,
  onClose,
  duration = 3000,
}: PixelToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="fixed bottom-26 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <PixelSection
        className={`p-4 border-2 shadow-lg flex items-center justify-between gap-4 ${
          type === "success"
            ? "bg-[#E8F5E9] border-green-600 text-green-800"
            : "bg-[#FFEBEE] border-red-600 text-red-800"
        }`}
        style={{
          boxShadow: `4px 4px 0 ${type === "success" ? "#16a34a" : "#dc2626"}`,
        }}
      >
        <p className="font-pixel text-xs">{message}</p>
        <button
          onClick={onClose}
          className="font-pixel text-xs hover:opacity-70"
        >
          ✕
        </button>
      </PixelSection>
    </div>
  );
}
