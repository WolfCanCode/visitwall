import type { Metadata, Viewport } from "next";
import "./globals.css";
import "@/styles/pixel.css";

import { MOCK_USER } from "@/lib/data";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: `${MOCK_USER.displayName} | VisitWall`,
  description: `${MOCK_USER.displayName}'s digital visiting card`,
  openGraph: {
    title: `${MOCK_USER.displayName} | VisitWall`,
    description: `${MOCK_USER.displayName}'s digital visiting card`,
    type: "website",
    siteName: "VisitWall",
    images: [
      {
        url: generateAvatarUrl(MOCK_USER.avatar),
        width: 1200,
        height: 630,
        alt: `${MOCK_USER.displayName}'s avatar`,
      },
    ],
  },
  appleWebApp: {
    title: "VisitWall",
    statusBarStyle: "black-translucent",
  },
  twitter: {
    card: "summary_large_image",
    title: `${MOCK_USER.displayName} | VisitWall`,
    description: `${MOCK_USER.displayName}'s digital visiting card`,
    images: [generateAvatarUrl(MOCK_USER.avatar)],
  },
};

import RetroBackground from "@/components/RetroBackground";
import { generateAvatarUrl } from "@/lib/utils";
import DevIndicator from "@/components/DevIndicator";
import ClientProviders from "@/components/ClientProviders";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ClientProviders>
          <DevIndicator />
          <RetroBackground>{children}</RetroBackground>
        </ClientProviders>
      </body>
    </html>
  );
}
