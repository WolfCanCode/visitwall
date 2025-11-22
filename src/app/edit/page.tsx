"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import EditForm from "@/components/EditForm";
import { getProfile } from "@/lib/api";
import { UserProfile } from "@/lib/types";
import PixelButton from "@/components/PixelButton";
import PortalLayout from "@/components/PortalLayout";

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
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (loading) {
    return (
      <PortalLayout>
        <div className="h-full flex items-center justify-center p-4">
          <div className="text-center font-pixel">Loading...</div>
        </div>
      </PortalLayout>
    );
  }

  if (error) {
    return (
      <PortalLayout>
        <div className="h-full flex flex-col items-center justify-center p-4 gap-4">
          <div className="text-center font-pixel text-red-500">{error}</div>
          <PixelButton onClick={() => router.push("/login")}>
            GO TO LOGIN
          </PixelButton>
        </div>
      </PortalLayout>
    );
  }

  return <PortalLayout>{user && <EditForm initialData={user} />}</PortalLayout>;
}
