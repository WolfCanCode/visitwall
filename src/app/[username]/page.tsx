import React from "react";
import VisitWallCard from "@/components/VisitWallCard";
import type { Metadata } from "next";
import { MOCK_USER } from "@/lib/data";
import { generateAvatarUrl } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  const { username } = await params;
  const displayName = username.charAt(0).toUpperCase() + username.slice(1);

  return {
    title: `${displayName} | VisitWall`,
    description: `${displayName}'s digital visiting card`,
    icons: {
      icon: generateAvatarUrl(MOCK_USER.avatar),
    },
  };
}

// In a real app, we would fetch data based on the username
// For now, we just use the mock data but override the username
export default async function UserPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const user = {
    ...MOCK_USER,
    username: username,
    displayName: username.charAt(0).toUpperCase() + username.slice(1), // Simple capitalization
  };

  return (
    <main className="min-h-screen p-4 md:p-8 flex items-center justify-center">
      <VisitWallCard user={MOCK_USER} showThemeSwitcher={false} />
    </main>
  );
}
