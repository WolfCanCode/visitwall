import React from "react";
import ClientUserProfile from "@/components/ClientUserProfile";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  const { username } = await params;

  return {
    title: `${username} | VisitWall`,
    description: `Digital visiting card for ${username}`,
  };
}

export default async function UserPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  return <ClientUserProfile username={username} />;
}
