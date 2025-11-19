import React from 'react';
import Image from 'next/image';
import { UserProfile } from '@/lib/types';
import PixelCard from './PixelCard';
import PixelButton from './PixelButton';
import PixelSection from './PixelSection';
import PixelHeading from './PixelHeading';
import ThemeSwitcher from './ThemeSwitcher';
import PixelSticker from './PixelSticker';
import TypewriterText from './TypewriterText';
import { Leaf, Flame, Moon, Ghost } from 'lucide-react';

import SaveContactButton from './SaveContactButton';

interface VisitWallCardProps {
  user: UserProfile;
  showThemeSwitcher?: boolean;
}

export default function VisitWallCard({ user, showThemeSwitcher = true }: VisitWallCardProps) {
  const statusColors = {
    online: 'bg-[#22C55E]',
    busy: 'bg-red-500',
    dnd: 'bg-yellow-500',
    offline: 'bg-gray-400',
  };

  const statusLabels = {
    online: 'ONLINE',
    busy: 'BUSY',
    dnd: 'DND',
    offline: 'OFFLINE',
  };

  const StatusIcon = {
    online: Leaf,
    busy: Flame,
    dnd: Moon,
    offline: Ghost,
  }[user.status];

  return (
    <div className="relative w-full max-w-md mx-auto">
      {showThemeSwitcher && <ThemeSwitcher />}
      
      <PixelCard className="w-full relative">
        {/* Stickers */}
        <PixelSticker emoji="💾" className="top-[-15px] right-[-10px] rotate-12" />
        <PixelSticker emoji="✨" className="bottom-[-10px] left-[-15px] -rotate-12 delay-700" />
        
        {/* Header Section */}
        <div className="flex items-start gap-4 mb-6">
          <div className="relative w-24 h-24 border-[3px] border-[var(--border-color)] shrink-0">
            <Image
              src={user.avatarUrl}
              alt={user.username}
              fill
              className="object-cover pixelated"
            />
          </div>
          <div className="flex-1 min-w-0">
            <PixelHeading as="h1" className="text-lg mb-2 truncate glitch-hover cursor-default">
              {user.displayName}
            </PixelHeading>
            <p className="font-body text-sm mb-1 truncate">{user.role}</p>
            <p className="font-body text-xs opacity-75 mb-3 truncate">
              📍 {user.location}
            </p>
            
            {/* Status Bar */}
            <div className="flex items-center gap-2 border-[2px] border-[var(--border-color)] bg-[var(--card-bg)] px-2 py-1 w-fit">
              <div className={`w-3 h-3 ${statusColors[user.status]} border-[2px] border-[var(--border-color)]`} />
              <span className="font-pixel text-[10px]">{statusLabels[user.status]}</span>
              <span className="ml-1">
                <StatusIcon size={14} className="text-[var(--text-color)]" />
              </span>
            </div>
          </div>
        </div>

        {/* Contact Buttons Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {user.socials.map((social) => (
            <a 
              key={social.platform} 
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="contents"
            >
              <PixelButton className="w-full flex items-center justify-center text-[10px]">
                {social.label}
              </PixelButton>
            </a>
          ))}
          <SaveContactButton user={user} className="text-[10px]" />
        </div>

        {/* Goals Section */}
        <div className="mb-6">
          <PixelHeading as="h3" className="mb-3">CURRENT GOALS</PixelHeading>
          <PixelSection>
            <ul className="space-y-3">
              {user.goals.map((goal) => (
                <li key={goal.id} className="flex items-start gap-3 font-body text-sm">
                  <div className={`w-4 h-4 border-[2px] border-[var(--border-color)] shrink-0 mt-0.5 flex items-center justify-center ${goal.completed ? 'bg-[var(--text-color)]' : 'bg-transparent'}`}>
                    {goal.completed && <span className="text-[var(--card-bg)] text-xs">✓</span>}
                  </div>
                  <span className={goal.completed ? 'line-through opacity-50' : ''}>
                    {goal.text}
                  </span>
                </li>
              ))}
            </ul>
          </PixelSection>
        </div>

        {/* Recent Update Section */}
        <div>
          <PixelHeading as="h3" className="mb-3">LATEST UPDATE</PixelHeading>
          <PixelSection className="bg-[var(--button-bg)]">
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
