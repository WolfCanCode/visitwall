import { UserProfile } from "./types";
import { Options } from "@dicebear/pixel-art";

export const MOCK_USER: UserProfile = {
  username: "wolfcancode",
  displayName: "Tommy Le (Wolf)",
  role: "Frontend Architect",
  location: "Vlaardingen, The Netherlands",
  avatar: { seed: "wolf" } as Options,
  status: "vacation",
  socials: [
    { platform: "whatsapp", url: "#" },
    {
      platform: "email",
      url: "mailto:tommy.le.2921@gmail.com",
    },
    { platform: "call", url: "tel:+31687854917" },
  ],
  goals: [{ id: "1", text: "Ship VisitWall V1", completed: false }],
  latestUpdate: {
    id: "u1",
    text: "Just initialized the project 🎨",
    date: "Just now",
  },
};
