"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import EditForm from "@/components/EditForm";
import { getProfile, clearAuthToken } from "@/lib/api";
import { UserProfile } from "@/lib/types";
import PixelButton from "@/components/PixelButton";

export default function EditPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const profile = await getProfile();
        setUser(profile);
      } catch (err) {
        console.error(err);
        setError("Failed to load profile. Please login again.");
        // clearAuthToken();
        // router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleLogout = () => {
    clearAuthToken();
    router.push("/login");
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center font-pixel">Loading...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-4 gap-4">
        <div className="text-center font-pixel text-red-500">{error}</div>
        <PixelButton onClick={() => router.push("/login")}>
          GO TO LOGIN
        </PixelButton>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 py-12">
      <div className="w-full max-w-2xl flex justify-end mb-4">
        <PixelButton
          onClick={handleLogout}
          className="text-xs"
          variant="secondary"
        >
          LOGOUT
        </PixelButton>
      </div>
      {user && <EditForm initialData={user} />}
    </main>
  );
}
