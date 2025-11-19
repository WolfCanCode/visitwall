import React from 'react';
import VisitWallCard from '@/components/VisitWallCard';
import { MOCK_USER } from '@/lib/data';

export default function DemoPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 py-12">
      <VisitWallCard user={MOCK_USER} />
    </main>
  );
}
