import React, { useEffect } from "react";
import PixelCard from "./PixelCard";
import PixelButton from "./PixelButton";

interface PixelModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export default function PixelModal({
  isOpen,
  onClose,
  children,
  title,
}: PixelModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative w-full max-w-md z-10">
        <PixelCard className="w-full max-h-[90vh] overflow-y-auto no-scrollbar">
          <div className="flex justify-between items-center mb-4 sticky top-0 bg-white z-20 pb-2 border-b-2 border-gray-100">
            <h2 className="font-pixel text-sm uppercase">
              {title || "Preview"}
            </h2>
            <PixelButton
              onClick={onClose}
              className="text-red-500 px-2! py-1! border-red-500! min-w-0 text-xs hover:bg-red-50"
            >
              ✕
            </PixelButton>
          </div>
          <div className="pb-2">{children}</div>
        </PixelCard>
      </div>
    </div>
  );
}
