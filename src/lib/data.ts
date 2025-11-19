import { UserProfile } from './types';

export const MOCK_USER: UserProfile = {
  username: 'wolfcancode',
  displayName: 'Tommy Le (Wolf)',
  role: 'Frontend Architect',
  location: 'Vlaardingen, The Netherlands',
  avatarUrl: 'https://api.dicebear.com/9.x/pixel-art/svg?seed=wolf',
  status: 'online',
  socials: [
    { platform: 'whatsapp', url: '#', label: 'WhatsApp' },
    { platform: 'email', url: 'mailto:tommy.le.2921@gmail.com', label: 'Email' },
    { platform: 'call', url: 'tel:+31687854917', label: 'Call' },
  ],
  goals: [
    { id: '1', text: 'Ship VisitWall V1', completed: false },
  ],
  latestUpdate: {
    id: 'u1',
    text: 'Just initialized the project 🎨',
    date: 'Just now',
  },
};
