import { UserProfile } from './types';

export const MOCK_USER: UserProfile = {
  username: 'wolfcancode',
  displayName: 'Wolf',
  role: 'Frontend Architect',
  location: 'Berlin, DE',
  avatarUrl: 'https://api.dicebear.com/9.x/pixel-art/svg?seed=wolf',
  status: 'online',
  socials: [
    { platform: 'whatsapp', url: '#', label: 'WhatsApp' },
    { platform: 'email', url: 'mailto:hello@example.com', label: 'Email' },
    { platform: 'call', url: 'tel:+1234567890', label: 'Call' },
  ],
  goals: [
    { id: '1', text: 'Ship VisitWall V1', completed: false },
    { id: '2', text: 'Learn Rust', completed: true },
    { id: '3', text: 'Run a marathon', completed: false },
  ],
  latestUpdate: {
    id: 'u1',
    text: 'Just shipped the new pixel art design system! 🎨',
    date: '2h ago',
  },
};
