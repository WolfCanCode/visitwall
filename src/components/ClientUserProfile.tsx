"use client";

import React, { useEffect, useState } from "react";
import VisitWallCard from "@/components/VisitWallCard";
import { getPublicProfile } from "@/lib/api";
import { UserProfile } from "@/lib/types";
import Link from "next/link";
import PixelButton from "@/components/PixelButton";
import PixelCard from "@/components/PixelCard";

export default function ClientUserProfile({ username }: { username: string }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profile = await getPublicProfile(username);
        setUser(profile);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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
    <main className="min-h-screen p-4 md:p-8 flex items-center justify-center">
      <VisitWallCard user={user} showThemeSwitcher={false} />
    </main>
  );
}
