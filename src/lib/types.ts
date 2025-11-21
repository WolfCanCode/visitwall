import { Options } from "@dicebear/pixel-art";

export interface SocialLink {
  platform: "whatsapp" | "email" | "call";
  url: string;
}

export interface Goal {
  id: string;
  text: string;
  completed: boolean;
}

export interface Update {
  id: string;
  text: string;
  date: string;
}

export interface UserProfile {
  username: string;
  displayName: string;
  role: string;
  location: string;
  avatar: Options;
  status: "online" | "busy" | "dnd" | "offline" | "vacation";
  socials: SocialLink[];
  goals: Goal[];
  latestUpdate: Update;
  PK?: string;
  createdAt?: string;
  updatedAt?: string;
}
