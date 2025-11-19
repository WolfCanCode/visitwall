'use client';

import React from 'react';
import { UserProfile } from '@/lib/types';
import { generateVCard } from '@/lib/vcard';
import PixelButton from './PixelButton';
import { Save } from 'lucide-react';

interface SaveContactButtonProps {
  user: UserProfile;
  className?: string;
}

export default function SaveContactButton({ user, className = '' }: SaveContactButtonProps) {
  const handleSave = () => {
    const vCardData = generateVCard(user);
    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${user.username}.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <PixelButton onClick={handleSave} className={`w-full flex items-center justify-center gap-2 ${className}`}>
      <Save size={16} className="w-4 h-4" />
      CONTACT
    </PixelButton>
  );
}
