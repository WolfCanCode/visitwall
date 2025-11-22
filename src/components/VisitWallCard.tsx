"use client";

import React, { useState } from "react";
import { UserProfile } from "@/lib/types";
import PixelCard from "./PixelCard";
import PixelButton from "./PixelButton";
import PixelSection from "./PixelSection";
import PixelHeading from "./PixelHeading";
import ThemeSwitcher from "./ThemeSwitcher";
import PixelSticker from "./PixelSticker";
import TypewriterText from "./TypewriterText";
import {
  PixelZap,
  PixelClock,
  PixelMoon,
  PixelPower,
  PixelTreePalm,
  PixelPin,
  PixelCheck,
} from "./PixelIcons";

import SaveContactButton from "./SaveContactButton";
import { createAvatar } from "@dicebear/core";
import { pixelArt } from "@dicebear/collection";
import { useCollections } from "@/lib/collection-context";
import PixelModal from "./PixelModal";
import PixelInput from "./PixelInput";
import { createCollection, addProfileToCollection } from "@/lib/api";
import PixelToast from "./PixelToast";

interface VisitWallCardProps {
  user: UserProfile;
  showThemeSwitcher?: boolean;
  enableCollections?: boolean;
}

export default function VisitWallCard({
  user,
  showThemeSwitcher = true,
  enableCollections = false,
}: VisitWallCardProps) {
  const { collections, refreshCollections } = useCollections();
  const [showCollectionModal, setShowCollectionModal] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [newCollectionIcon, setNewCollectionIcon] = useState("📁");
  const [isCreating, setIsCreating] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

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

  const isInCollection = collections.some(
    (c) =>
      c.profiles?.some((p) => p.username === user.username) ||
      c.profileIds.includes(user.username)
  );

  const handleAddToCollection = async (collectionId: string) => {
    try {
      await addProfileToCollection(collectionId, user.username);
      await refreshCollections();
      setMessage({ type: "success", text: "Added to collection!" });
      setShowCollectionModal(false);
    } catch (error) {
      console.error(error);
      setMessage({ type: "error", text: "Failed to add to collection" });
    }
  };

  const handleCreateAndAdd = async () => {
    const name = newCollectionName.trim() || "Default Collection";
    try {
      const collection = await createCollection(name, newCollectionIcon);
      await addProfileToCollection(collection.id, user.username);
      await refreshCollections();
      setMessage({ type: "success", text: `Added to ${name}!` });
      setNewCollectionName("");
      setNewCollectionIcon("📁");
      setIsCreating(false);
      setShowCollectionModal(false);
    } catch (error) {
      console.error(error);
      setMessage({ type: "error", text: "Failed to create collection" });
    }
  };

  const statusColors = {
    online: "bg-[#22C55E]",
    busy: "bg-red-500",
    dnd: "bg-yellow-500",
    offline: "bg-gray-400",
    vacation: "bg-orange-500",
  };

  const statusLabels = {
    online: "ONLINE",
    busy: "BUSY",
    dnd: "DND",
    offline: "OFFLINE",
    vacation: "VACATION",
  };

  const StatusIcon = {
    online: PixelZap,
    busy: PixelClock,
    dnd: PixelMoon,
    offline: PixelPower,
    vacation: PixelTreePalm,
  }[user.status];

  return (
    <div className="relative w-full max-w-md mx-auto">
      {showThemeSwitcher && <ThemeSwitcher />}

      <PixelCard className="w-full relative">
        {/* Saved Badge */}
        {enableCollections && isInCollection && (
          <div className="absolute top-4 right-4 z-10 bg-[#E0F2FE] border-2 border-black px-2 py-1 shadow-[2px_2px_0_0_rgba(0,0,0,1)] flex items-center gap-1 rotate-[-5deg] animate-in fade-in zoom-in duration-300">
            <PixelCheck size={10} className="text-blue-900" />
            <span className="font-pixel text-[8px] text-blue-900 tracking-widest">
              SAVED
            </span>
          </div>
        )}

        {/* Stickers */}
        <PixelSticker
          emoji="💾"
          className="top-[-15px] right-[-10px] rotate-12"
        />
        <PixelSticker
          emoji="✨"
          className="bottom-[-10px] left-[-15px] -rotate-12 delay-700"
        />

        {/* Header Section */}
        <div className="flex items-start gap-4 mb-6">
          <div
            className="relative w-26 h-26 border-3 border-(--border-color) shrink-0"
            dangerouslySetInnerHTML={{
              __html: createAvatar(pixelArt, {
                ...user.avatar,
              }).toString(),
            }}
          />
          <div className="flex-1 min-w-0">
            <PixelHeading
              as="h1"
              className="text-lg mb-2 truncate glitch-hover cursor-default"
            >
              {user.displayName}
            </PixelHeading>
            <p className="font-body text-sm mb-1 truncate">{user.role}</p>
            {user.location && (
              <p className="font-body text-xs opacity-75 mb-2 truncate flex items-center gap-1">
                <PixelPin size={14} /> {user.location}
              </p>
            )}

            {/* Status Bar */}
            <div className="flex items-center gap-2 border-2 border-(--border-color) bg-(--card-bg) px-2 py-1 w-fit">
              <div
                className={`w-3 h-3 ${
                  statusColors[user.status]
                } border-2 border-(--border-color)`}
              />
              <span className="font-pixel text-[10px] pt-0.5">
                {statusLabels[user.status]}
              </span>
              <span>
                <StatusIcon size={12} className="text-(--text-color)" />
              </span>
            </div>
          </div>
        </div>

        {/* Contact Buttons Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {user.socials.map((social, index) => (
            <a
              key={`${social.platform}-${index}`}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="contents"
            >
              <PixelButton className="w-full flex items-center justify-center gap-3 text-[10px] uppercase px-2">
                {/* <PixelSocialIcon platform={social.platform} size={20} /> */}
                <span className="flex-1 text-left">{social.platform}</span>
              </PixelButton>
            </a>
          ))}
        </div>

        <div className="mb-6 flex gap-2">
          <div
            className={
              enableCollections && !isInCollection ? "flex-1" : "w-full"
            }
          >
            <SaveContactButton user={user} className="text-[10px] w-full" />
          </div>
          {enableCollections && !isInCollection && (
            <div className="flex-1">
              <PixelButton
                onClick={() => setShowCollectionModal(true)}
                className="w-full text-[10px]"
                variant="primary"
              >
                + ADD TO LIST
              </PixelButton>
            </div>
          )}
        </div>

        {/* Goals Section */}
        <div className="mb-6">
          <PixelHeading as="h3" className="mb-3">
            CURRENT GOALS
          </PixelHeading>
          <PixelSection>
            <ul className="space-y-3">
              {user.goals.map((goal) => (
                <li
                  key={goal.id}
                  className="flex items-start gap-3 font-body text-sm"
                >
                  <div
                    className={`w-4 h-4 border-2 border-(--border-color) shrink-0 mt-0.5 flex items-center justify-center ${
                      goal.completed ? "bg-(--text-color)" : "bg-transparent"
                    }`}
                  >
                    {goal.completed && (
                      <span className="text-(--card-bg) text-xs">✓</span>
                    )}
                  </div>
                  <span
                    className={goal.completed ? "line-through opacity-50" : ""}
                  >
                    {goal.text || "No goals set yet..."}
                  </span>
                </li>
              ))}
            </ul>
          </PixelSection>
        </div>

        {/* Recent Update Section */}
        <div>
          <PixelHeading as="h3" className="mb-3">
            LATEST UPDATE
          </PixelHeading>
          <PixelSection className="bg-(--button-bg)">
            <p className="font-body text-sm mb-2 min-h-[3em]">
              <TypewriterText
                text={user.latestUpdate.text || "No updates yet..."}
                speed={30}
              />
            </p>
            <p className="font-pixel text-[10px] opacity-60 text-right">
              {user.latestUpdate.date}
            </p>
          </PixelSection>
        </div>
      </PixelCard>

      <PixelModal
        isOpen={showCollectionModal}
        onClose={() => setShowCollectionModal(false)}
        title="Add to Collection"
      >
        <div className="p-2 space-y-4">
          {collections.length > 0 && !isCreating ? (
            <>
              <p className="font-pixel text-xs mb-2">Choose a collection:</p>
              <div className="space-y-2">
                {collections.map((c) => (
                  <PixelButton
                    key={c.id}
                    onClick={() => handleAddToCollection(c.id)}
                    className="w-full justify-start text-xs"
                    variant="secondary"
                    disabled={c.profileIds.includes(user.username)}
                  >
                    {c.name}{" "}
                    {c.profileIds.includes(user.username) && "(Already in)"}
                  </PixelButton>
                ))}
              </div>
              <div className="border-t-2 border-gray-100 my-4 pt-4">
                <PixelButton
                  onClick={() => setIsCreating(true)}
                  className="w-full text-xs"
                >
                  + Create New Collection
                </PixelButton>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <p className="font-pixel text-xs">
                {collections.length === 0
                  ? "You don't have any collections yet."
                  : "Create a new collection:"}
              </p>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2 items-start">
                  <div className="flex flex-col gap-1">
                    <span className="font-pixel text-[10px] uppercase">
                      Icon
                    </span>
                    <div className="relative group">
                      <div className="w-[38px] h-[38px] border-2 border-black bg-white flex items-center justify-center text-xl cursor-pointer hover:bg-gray-50">
                        {newCollectionIcon}
                      </div>
                      <div className="absolute bottom-full left-0 mb-1 bg-white border-2 border-black p-2 grid grid-cols-5 gap-1 w-[180px] z-50 invisible group-hover:visible">
                        <div className="absolute inset-0 bg-transparent -bottom-2 h-[calc(100%+8px)] -z-10" />
                        {EMOJI_OPTIONS.map((emoji) => (
                          <button
                            key={emoji}
                            type="button"
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
                      placeholder="e.g. My Favorites (default)"
                      value={newCollectionName}
                      onChange={(e) => setNewCollectionName(e.target.value)}
                      className="mb-0"
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <PixelButton
                  onClick={handleCreateAndAdd}
                  className="flex-1 text-xs"
                >
                  Create & Add
                </PixelButton>
                {collections.length > 0 && (
                  <PixelButton
                    onClick={() => setIsCreating(false)}
                    variant="secondary"
                    className="flex-1 text-xs"
                  >
                    Cancel
                  </PixelButton>
                )}
              </div>
            </div>
          )}
        </div>
      </PixelModal>

      {message && (
        <PixelToast
          message={message.text}
          type={message.type}
          onClose={() => setMessage(null)}
        />
      )}
    </div>
  );
}
