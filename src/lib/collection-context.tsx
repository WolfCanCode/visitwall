"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { Collection } from "./types";
import { getCollections } from "./api";

interface CollectionContextType {
  collections: Collection[];
  loading: boolean;
  refreshCollections: () => Promise<void>;
}

const CollectionContext = createContext<CollectionContextType | undefined>(
  undefined
);

export function CollectionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshCollections = useCallback(async () => {
    try {
      const data = await getCollections();
      setCollections(data);
    } catch (error) {
      console.error("Failed to fetch collections:", error);
      // Optionally handle error state
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Only fetch if we have a token (rudimentary check, API call will fail if not auth)
    const token = localStorage.getItem("accessToken");
    if (token) {
      refreshCollections();
    } else {
      setLoading(false);
    }
  }, [refreshCollections]);

  return (
    <CollectionContext.Provider
      value={{ collections, loading, refreshCollections }}
    >
      {children}
    </CollectionContext.Provider>
  );
}

export function useCollections() {
  const context = useContext(CollectionContext);
  if (context === undefined) {
    throw new Error("useCollections must be used within a CollectionProvider");
  }
  return context;
}
