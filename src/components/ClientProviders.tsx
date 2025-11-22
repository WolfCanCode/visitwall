"use client";

import React from "react";
import { CollectionProvider } from "@/lib/collection-context";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CollectionProvider>{children}</CollectionProvider>;
}
