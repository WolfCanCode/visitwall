"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import PixelCard from "./PixelCard";
import PixelButton from "./PixelButton";
import { clearAuthToken } from "@/lib/api";

interface PortalLayoutProps {
  children: React.ReactNode;
}

export default function PortalLayout({ children }: PortalLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    clearAuthToken();
    router.push("/login");
  };

  const navItems = [
    { label: "EDIT PROFILE", path: "/edit", icon: "👤" },
    { label: "CONTACT LIST", path: "/contacts", icon: "📒" },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row max-w-7xl mx-auto p-4 gap-4">
      {/* Sidebar / Navigation */}
      <aside className="w-full md:w-64 shrink-0">
        <div className="sticky top-4">
          <PixelCard className="flex flex-col gap-4">
            <div className="text-center mb-2 hidden md:block">
              <h1 className="font-pixel text-lg">VISITWALL</h1>
            </div>

            <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path} className="flex-1">
                  <PixelButton
                    variant={pathname === item.path ? "primary" : "secondary"}
                    className="w-full justify-start text-xs"
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.label}
                  </PixelButton>
                </Link>
              ))}
            </nav>

            <div className="mt-auto border-t-2 border-gray-100 pt-4 hidden md:block">
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
