import React from "react";
import { UserProfile } from "@/lib/types";
import PixelCard from "./PixelCard";
import PixelButton from "./PixelButton";
import PixelSection from "./PixelSection";
import PixelHeading from "./PixelHeading";
import ThemeSwitcher from "./ThemeSwitcher";
import PixelSticker from "./PixelSticker";
import TypewriterText from "./TypewriterText";
import { PixelSocialIcon } from "./PixelSocialIcon";
import {
  PixelZap,
  PixelClock,
  PixelMoon,
  PixelPower,
  PixelTreePalm,
  PixelPin,
} from "./PixelIcons";

import SaveContactButton from "./SaveContactButton";
import { createAvatar } from "@dicebear/core";
import { pixelArt } from "@dicebear/collection";

interface VisitWallCardProps {
  user: UserProfile;
  showThemeSwitcher?: boolean;
}

export default function VisitWallCard({
  user,
  showThemeSwitcher = true,
}: VisitWallCardProps) {
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
            <p className="font-body text-xs opacity-75 mb-2 truncate flex items-center gap-1">
              <PixelPin size={14} /> {user.location}
            </p>

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
                <PixelSocialIcon platform={social.platform} size={20} />
                <span className="flex-1 text-left">{social.platform}</span>
              </PixelButton>
            </a>
          ))}
          <SaveContactButton user={user} className="text-[10px]" />
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
                    {goal.text}
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
              <TypewriterText text={user.latestUpdate.text} speed={30} />
            </p>
            <p className="font-pixel text-[10px] opacity-60 text-right">
              {user.latestUpdate.date}
            </p>
          </PixelSection>
        </div>
      </PixelCard>
    </div>
  );
}
