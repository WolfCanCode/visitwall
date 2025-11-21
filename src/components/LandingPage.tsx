import React from "react";
import Link from "next/link";
import PixelButton from "@/components/PixelButton";
import PixelHeading from "@/components/PixelHeading";
import VisitWallCard from "@/components/VisitWallCard";
import { MOCK_USER } from "@/lib/data";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 gap-8 md:gap-16">
      <div className="text-center max-w-2xl mx-auto space-y-6 z-10">
        <div className="relative inline-block">
          <PixelHeading
            as="h1"
            className="text-3xl md:text-6xl leading-tight mb-4 text-shadow-pixel"
          >
            VISIT WALL
          </PixelHeading>
        </div>

        <p className="font-pixel text-xs md:text-sm leading-loose opacity-80 max-w-lg mx-auto">
          Your retro-styled digital visiting card. Share your profile, goals,
          and socials in 8-bit glory. No signup required to try!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Link href="/register">
            <PixelButton className="text-sm md:text-base px-8! py-4! w-full sm:w-auto">
              CREATE YOUR CARD
            </PixelButton>
          </Link>
          <Link href="/login">
            <PixelButton
              variant="secondary"
              className="text-sm md:text-base px-8! py-4! w-full sm:w-auto"
            >
              LOGIN
            </PixelButton>
          </Link>
        </div>
      </div>

      <div className="w-full max-w-md transform hover:scale-[1.02] transition-transform duration-300 relative z-0">
        <div className="absolute -top-6 -right-2 md:-right-12 z-20 animate-bounce">
          <div className="bg-white border-2 border-black p-2 font-pixel text-[10px] shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
            IT&apos;S FREE!
          </div>
        </div>
        <VisitWallCard user={MOCK_USER} showThemeSwitcher={false} />
      </div>

      <footer className="mt-auto pt-12 font-pixel text-[10px] opacity-50">
        © {new Date().getFullYear()} VisitWall. All pixels reserved.
      </footer>
    </main>
  );
}
