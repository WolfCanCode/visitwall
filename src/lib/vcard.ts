import { UserProfile } from "./types";
import { generateAvatarUrl } from "./utils";

export function generateVCard(user: UserProfile): string {
  const vCard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${user.displayName}`,
    `N:${user.displayName};;;;`,
    `TITLE:${user.role}`,
    `ADR;TYPE=WORK:;;${user.location};;;;`,
    `NOTE:${user.latestUpdate.text}`,
  ];

  // Add social links
  user.socials.forEach((social) => {
    if (social.platform === "email") {
      const email = social.url.replace("mailto:", "");
      vCard.push(`EMAIL;TYPE=INTERNET:${email}`);
    } else if (social.platform === "call") {
      const phone = social.url.replace("tel:", "");
      vCard.push(`TEL;TYPE=CELL:${phone}`);
    } else if (social.platform === "whatsapp") {
      vCard.push(`X-SOCIALPROFILE;TYPE=whatsapp:${social.url}`);
    } else {
      vCard.push(`URL:${social.url}`);
    }
  });

  // Add avatar if available (vCard 3.0 supports PHOTO;VALUE=URI)
  if (user.avatar) {
    vCard.push(`PHOTO;VALUE=URI:${generateAvatarUrl(user.avatar)}`);
  }

  vCard.push("END:VCARD");
  return vCard.join("\n");
}
