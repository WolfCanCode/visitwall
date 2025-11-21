import React, { useState } from "react";
import PixelButton from "./PixelButton";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface PixelTabsProps {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
}

export default function PixelTabs({
  tabs,
  defaultTab,
  className = "",
}: PixelTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  return (
    <div className={className}>
      <div className="relative">
        <div className="flex overflow-x-auto whitespace-nowrap gap-2 mb-4 border-b-4 border-[var(--border-color)] pb-2 sticky top-0 bg-[var(--card-bg)] z-10 pt-2 no-scrollbar pr-4">
          {tabs.map((tab) => (
            <PixelButton
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              variant="secondary"
              className={`text-[10px] px-3 py-2 transition-all flex-none justify-center ${
                activeTab === tab.id
                  ? "bg-[var(--text-color)]! text-[var(--card-bg)]! translate-y-px shadow-none"
                  : "hover:bg-[var(--button-bg)]"
              }`}
            >
              {tab.label}
            </PixelButton>
          ))}
        </div>
        {/* Shadow indicator for scroll */}
        <div className="absolute right-0 top-0 bottom-4 w-8 bg-linear-to-l from-(--card-bg) to-transparent pointer-events-none z-20" />
      </div>
      <div className="min-h-[200px] animate-in fade-in duration-300">
        {tabs.find((t) => t.id === activeTab)?.content}
      </div>
    </div>
  );
}
