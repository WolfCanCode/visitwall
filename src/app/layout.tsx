import type { Metadata } from "next";
import "./globals.css";
import "@/styles/pixel.css";

import { MOCK_USER } from "@/lib/data";

export const metadata: Metadata = {
  title: `${MOCK_USER.displayName} | VisitWall`,
  description: `${MOCK_USER.displayName}'s digital visiting card`,
  icons: {
    icon: MOCK_USER.avatarUrl,
  },
  openGraph: {
    title: `${MOCK_USER.displayName} | VisitWall`,
    description: `${MOCK_USER.displayName}'s digital visiting card`,
    images: [
      {
        url: MOCK_USER.avatarUrl,
        width: 1200,
        height: 630,
        alt: `${MOCK_USER.displayName}'s avatar`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${MOCK_USER.displayName} | VisitWall`,
    description: `${MOCK_USER.displayName}'s digital visiting card`,
    images: [MOCK_USER.avatarUrl],
  },
};

import RetroBackground from "@/components/RetroBackground";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <RetroBackground>
          {children}
        </RetroBackground>
      </body>
    </html>
  );
}
