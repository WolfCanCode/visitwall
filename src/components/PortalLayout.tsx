"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import PixelCard from "./PixelCard";
import PixelButton from "./PixelButton";
import { clearAuthToken, getProfile } from "@/lib/api";

interface PortalLayoutProps {
  children: React.ReactNode;
}

export default function PortalLayout({ children }: PortalLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Apply theme from local storage immediately if available to reduce flash
    const savedTheme = localStorage.getItem("visitwall-theme");
    if (savedTheme) {
      document.body.classList.remove(
        "theme-classic",
        "theme-gameboy",
        "theme-dark",
        "theme-ocean",
        "theme-pastel"
      );
      if (savedTheme !== "classic") {
        document.body.classList.add(`theme-${savedTheme}`);
      }
    }

    const applyTheme = async () => {
      try {
        const profile = await getProfile();
        if (profile.theme) {
          // Update local storage to keep it in sync
          localStorage.setItem("visitwall-theme", profile.theme);

          document.body.classList.remove(
            "theme-classic",
            "theme-gameboy",
            "theme-dark",
            "theme-ocean",
            "theme-pastel"
          );
          if (profile.theme !== "classic") {
            document.body.classList.add(`theme-${profile.theme}`);
          }
        }
      } catch (error) {
        console.error("Failed to fetch profile for theme application", error);
      }
    };
    applyTheme();
  }, []);

  const handleLogout = () => {
    clearAuthToken();
    router.push("/login");
  };

  const navItems = [
    { label: "Profile", path: "/edit" },
    { label: "Contact Vault", path: "/contacts" },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row max-w-7xl mx-auto md:p-4 gap-2">
      {/* Sidebar / Navigation */}
      <aside className="w-full md:w-64 shrink-0">
        <div className="sticky top-0 md:top-4 z-30 bg-[var(--bg-color)] pt-4 px-4 md:p-0">
          <div className="text-center mb-4 ">
            <h1 className="font-pixel text-lg">VISITWALL</h1>
          </div>

          <div className="relative md:hidden">
            <div className="flex overflow-x-auto whitespace-nowrap gap-2 pb-2 no-scrollbar pr-4">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path} className="flex-none">
                  <PixelButton
                    type="button"
                    variant="secondary"
                    className={`text-[10px] px-3 py-2 transition-all flex-none justify-center ${
                      pathname === item.path
                        ? "bg-[var(--text-color)]! text-[var(--card-bg)]! translate-y-px shadow-none"
                        : "hover:bg-[var(--button-bg)]"
                    }`}
                  >
                    {item.label.toUpperCase()}
                  </PixelButton>
                </Link>
              ))}
            </div>
            {/* Shadow indicator for scroll */}
            <div className="absolute right-0 top-0 bottom-4 w-8 bg-linear-to-l from-(--bg-color) to-transparent pointer-events-none z-20" />
          </div>

          <PixelCard className="hidden md:flex flex-col gap-4">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path} className="flex-1">
                  <PixelButton
                    variant="secondary"
                    className={`w-full justify-start text-xs ${
                      pathname === item.path
                        ? "bg-[var(--text-color)]! text-[var(--card-bg)]! translate-y-px shadow-none"
                        : "hover:bg-[var(--button-bg)]"
                    }`}
                  >
                    {item.label}
                  </PixelButton>
                </Link>
              ))}
            </nav>

            <div className="mt-auto border-t-2 border-gray-100 pt-4">
              <PixelButton
                onClick={handleLogout}
                variant="secondary"
                className="w-full justify-center text-xs"
              >
                LOGOUT
              </PixelButton>
            </div>
          </PixelCard>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
