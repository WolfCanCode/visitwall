"use client";

import React, { useEffect, useState } from "react";
import VisitWallCard from "@/components/VisitWallCard";
import { getPublicProfile, getAuthToken } from "@/lib/api";
import { UserProfile } from "@/lib/types";
import Link from "next/link";
import PixelButton from "@/components/PixelButton";
import PixelCard from "@/components/PixelCard";

export default function ClientUserProfile({ username }: { username: string }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!getAuthToken());
    const fetchData = async () => {
      try {
        const profile = await getPublicProfile(username);
        setUser(profile);

        // Apply theme
        document.body.classList.remove(
          "theme-classic",
          "theme-gameboy",
          "theme-dark",
          "theme-ocean",
          "theme-pastel"
        );
        if (profile.theme && profile.theme !== "classic") {
          document.body.classList.add(`theme-${profile.theme}`);
        } else {
          document.body.classList.add(`theme-classic`);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    return () => {
      // Cleanup theme on unmount and restore user's theme if logged in
      document.body.classList.remove(
        "theme-classic",
        "theme-gameboy",
        "theme-dark",
        "theme-ocean",
        "theme-pastel"
      );

      // Restore theme from local storage if available
      const savedTheme = localStorage.getItem("visitwall-theme");
      if (savedTheme && savedTheme !== "classic") {
        document.body.classList.add(`theme-${savedTheme}`);
      }
    };
  }, [username]);

  if (loading) {
    return (
      <main className="min-h-screen p-4 md:p-8 flex items-center justify-center">
        <div className="font-pixel text-sm">LOADING...</div>
      </main>
    );
  }

  if (error || !user) {
    return (
      <main className="min-h-screen p-4 md:p-8 flex items-center justify-center">
        <PixelCard className="text-center p-8">
          <h1 className="font-pixel text-xl mb-4 text-red-500">
            User Not Found
          </h1>
          <p className="font-pixel text-xs mb-6">
            The user &quot;{username}&quot; does not exist.
          </p>
          <Link href="/">
            <PixelButton>GO HOME</PixelButton>
          </Link>
        </PixelCard>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-4 md:p-8 flex items-center justify-center relative">
      {isLoggedIn && (
        <div className="fixed top-4 left-4 z-50">
          <Link href="/contacts">
            <PixelButton className="text-xs" variant="secondary">
              ← BACK TO PORTAL
            </PixelButton>
          </Link>
        </div>
      )}
      <VisitWallCard
        user={user}
        showThemeSwitcher={false}
        enableCollections={isLoggedIn}
      />
    </main>
  );
}
