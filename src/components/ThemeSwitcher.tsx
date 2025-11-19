'use client';

import React, { useEffect, useState } from 'react';
import PixelButton from './PixelButton';

const THEMES = [
  { id: 'classic', label: 'Classic', color: '#F3E9C8' },
  { id: 'gameboy', label: 'GB', color: '#8B956D' },
];

export default function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState('classic');

  useEffect(() => {
    // Initialize theme from local storage or default
    const savedTheme = localStorage.getItem('visitwall-theme') || 'classic';
    setTheme(savedTheme);
  }, []);

  const setTheme = (themeId: string) => {
    document.body.classList.remove('theme-classic', 'theme-gameboy');
    if (themeId !== 'classic') {
      document.body.classList.add(`theme-${themeId}`);
    }
    setCurrentTheme(themeId);
    localStorage.setItem('visitwall-theme', themeId);
  };

  return (
    <div className="flex gap-2 justify-center mb-6">
      {THEMES.map((theme) => (
        <button
          key={theme.id}
          onClick={() => setTheme(theme.id)}
          className={`w-6 h-6 border-2 border-black transition-transform hover:scale-110 ${
            currentTheme === theme.id ? 'scale-110 ring-2 ring-black ring-offset-2' : ''
          }`}
          style={{ backgroundColor: theme.color }}
          title={theme.label}
          aria-label={`Switch to ${theme.label} theme`}
        />
      ))}
    </div>
  );
}
