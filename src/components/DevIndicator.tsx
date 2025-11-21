import React from "react";

export default function DevIndicator() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
  // Check if we are in dev environment based on API URL
  const isDev = apiUrl.includes("api-dev");

  if (!isDev) return null;

  return (
    <div className="fixed bottom-25 right-4 z-50 bg-yellow-400 text-black px-3 py-2 font-pixel text-[6px] border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] pointer-events-none uppercase tracking-wider">
      DEV
    </div>
  );
}
