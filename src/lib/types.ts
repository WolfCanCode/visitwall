export interface SocialLink {
  platform: 'whatsapp' | 'email' | 'call';
  url: string;
  label: string;
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
  avatarUrl: string;
  status: 'online' | 'busy' | 'dnd' | 'offline';
  socials: SocialLink[];
  goals: Goal[];
  latestUpdate: Update;
}
