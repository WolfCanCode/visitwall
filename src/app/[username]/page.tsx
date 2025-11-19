import React from 'react';
import VisitWallCard from '@/components/VisitWallCard';
import { MOCK_USER } from '@/lib/data';

// In a real app, we would fetch data based on the username
// For now, we just use the mock data but override the username
export default async function UserPage({ params }: { params: Promise<{ username: string }> }) {
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
