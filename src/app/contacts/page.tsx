"use client";

import React, { useState } from "react";
import PortalLayout from "@/components/PortalLayout";
import PixelCard from "@/components/PixelCard";
import PixelHeading from "@/components/PixelHeading";
import PixelButton from "@/components/PixelButton";
import PixelSection from "@/components/PixelSection";
import PixelInput from "@/components/PixelInput";
import { useCollections } from "@/lib/collection-context";
import {
  createCollection,
  deleteCollection,
  updateCollection,
} from "@/lib/api";
import { generateAvatarUrl } from "@/lib/utils";
import { UserProfile } from "@/lib/types";
import Link from "next/link";

export default function ContactsPage() {
  const { collections, loading, refreshCollections } = useCollections();
  const [isCreating, setIsCreating] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [newCollectionIcon, setNewCollectionIcon] = useState("📁");
  const [editingCollectionId, setEditingCollectionId] = useState<string | null>(
    null
  );
  const [editName, setEditName] = useState("");
  const [editIcon, setEditIcon] = useState("");

  const EMOJI_OPTIONS = [
    "📁",
    "⭐",
    "❤️",
    "🏠",
    "🏢",
    "🎮",
    "🎵",
    "✈️",
    "🍔",
    "💡",
  ];

  const handleCreate = async () => {
    if (!newCollectionName.trim()) return;
    try {
      await createCollection(newCollectionName, newCollectionIcon);
      setNewCollectionName("");
      setNewCollectionIcon("📁");
      setIsCreating(false);
      refreshCollections();
    } catch (error) {
      console.error("Failed to create collection", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this collection?")) return;
    try {
      await deleteCollection(id);
      refreshCollections();
    } catch (error) {
      console.error("Failed to delete collection", error);
    }
  };

  const handleUpdate = async (id: string) => {
    if (!editName.trim()) return;
    try {
      await updateCollection(id, editName, editIcon);
      setEditingCollectionId(null);
      setEditName("");
      setEditIcon("");
      refreshCollections();
    } catch (error) {
      console.error("Failed to update collection", error);
    }
  };

  const startEdit = (id: string, currentName: string, currentIcon?: string) => {
    setEditingCollectionId(id);
    setEditName(currentName);
    setEditIcon(currentIcon || "📁");
  };

  if (loading) {
    return (
      <PortalLayout>
        <div className="p-4 text-center font-pixel">Loading Collections...</div>
      </PortalLayout>
    );
  }

  return (
    <PortalLayout>
      <div className="p-4 pb-24 space-y-6">
        <PixelCard>
          <div className="flex justify-between items-center mb-4">
            <PixelHeading as="h2" className="mb-0 text-sm md:text-lg">
              CONTACT LIST
            </PixelHeading>
            <PixelButton
              onClick={() => setIsCreating(true)}
              className="text-xs"
            >
              + NEW COLLECTION
            </PixelButton>
          </div>

          {isCreating && (
            <PixelSection className="mb-4 flex flex-col gap-3">
              <div className="flex flex-col gap-2 items-start">
                <div className="flex flex-col gap-1">
                  <span className="font-pixel text-[10px] uppercase">Icon</span>
                  <div className="relative group">
                    <div className="w-[38px] h-[38px] border-2 border-black bg-white flex items-center justify-center text-xl cursor-pointer hover:bg-gray-50">
                      {newCollectionIcon}
                    </div>
                    <div className="absolute top-full left-0 mt-1 bg-white border-2 border-black p-2 grid grid-cols-5 gap-1 w-[180px] z-10 invisible group-hover:visible">
                      <div className="absolute inset-0 bg-transparent -top-2 h-[calc(100%+8px)] -z-10" />
                      {EMOJI_OPTIONS.map((emoji) => (
                        <button
                          key={emoji}
                          onClick={() => setNewCollectionIcon(emoji)}
                          className={`w-8 h-8 flex items-center justify-center hover:bg-gray-100 ${
                            newCollectionIcon === emoji ? "bg-gray-200" : ""
                          }`}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <PixelInput
                    label="Collection Name"
                    value={newCollectionName}
                    onChange={(e) => setNewCollectionName(e.target.value)}
                    className="mb-0"
                    autoFocus
                  />
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <PixelButton onClick={handleCreate} className="h-[38px]">
                  SAVE
                </PixelButton>
                <PixelButton
                  onClick={() => setIsCreating(false)}
                  variant="secondary"
                  className="h-[38px]"
                >
                  CANCEL
                </PixelButton>
              </div>
            </PixelSection>
          )}

          <div className="space-y-6">
            {collections.length === 0 && !isCreating && (
              <div className="text-center py-8 text-gray-500 font-pixel text-xs">
                No collections found. Create one to start adding contacts!
              </div>
            )}

            {collections.map((collection) => (
              <div
                key={collection.id}
                className="border-b-2 border-gray-100 pb-4 last:border-0"
              >
                <div className="flex justify-between items-center mb-3">
                  {editingCollectionId === collection.id ? (
                    <div className="flex gap-2 items-center flex-1 mr-4">
                      <div className="relative group">
                        <div className="w-8 h-8 border-b-2 border-black flex items-center justify-center text-lg cursor-pointer">
                          {editIcon}
                        </div>
                        <div className="absolute top-full left-0 mt-1 bg-white border-2 border-black p-2 grid grid-cols-5 gap-1 w-[180px] z-10 invisible group-hover:visible">
                          <div className="absolute inset-0 bg-transparent -top-2 h-[calc(100%+8px)] -z-10" />
                          {EMOJI_OPTIONS.map((emoji) => (
                            <button
                              key={emoji}
                              onClick={() => setEditIcon(emoji)}
                              className={`w-8 h-8 flex items-center justify-center hover:bg-gray-100 ${
                                editIcon === emoji ? "bg-gray-200" : ""
                              }`}
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      </div>
                      <input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="font-pixel text-xs p-1 border-b-2 border-black bg-transparent outline-none w-full"
                        autoFocus
                      />
                      <PixelButton
                        onClick={() => handleUpdate(collection.id)}
                        className="text-[10px] py-1 px-2"
                      >
                        OK
                      </PixelButton>
                      <PixelButton
                        onClick={() => setEditingCollectionId(null)}
                        variant="secondary"
                        className="text-[10px] py-1 px-2"
                      >
                        X
                      </PixelButton>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{collection.icon || "📁"}</span>
                      <h3 className="font-pixel text-sm uppercase">
                        {collection.name}
                      </h3>
                      <span className="text-xs text-gray-400 font-pixel">
                        ({collection.profileIds?.length || 0})
                      </span>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        startEdit(
                          collection.id,
                          collection.name,
                          collection.icon
                        )
                      }
                      className="text-[10px] font-pixel hover:text-blue-500"
                    >
                      EDIT
                    </button>
                    <button
                      onClick={() => handleDelete(collection.id)}
                      className="text-[10px] font-pixel hover:text-red-500"
                    >
                      DELETE
                    </button>
                  </div>
                </div>

                {/* Profiles Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {collection.profiles?.map((profile) => (
                    <Link key={profile.username} href={`/${profile.username}`}>
                      <PixelSection className="flex items-center gap-3 hover:bg-white/50 transition-colors cursor-pointer p-2">
                        <div className="w-10 h-10 bg-white border-2 border-black overflow-hidden shrink-0">
                          <img
                            src={generateAvatarUrl(profile.avatar)}
                            alt={profile.displayName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-pixel text-xs truncate">
                            {profile.displayName}
                          </p>
                          <div className="flex items-center gap-1 mt-1">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                profile.status === "online"
                                  ? "bg-green-500"
                                  : profile.status === "busy"
                                  ? "bg-red-500"
                                  : "bg-gray-400"
                              }`}
                            />
                            <p className="font-pixel text-[8px] text-gray-500 uppercase">
                              {profile.status}
                            </p>
                          </div>
                        </div>
                      </PixelSection>
                    </Link>
                  ))}
                  {(!collection.profiles ||
                    collection.profiles.length === 0) && (
                    <div className="col-span-full text-center py-2">
                      <p className="font-pixel text-[10px] text-gray-400 italic">
                        No contacts in this collection
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </PixelCard>
      </div>
    </PortalLayout>
  );
}
