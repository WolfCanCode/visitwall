import { pixelArt } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { Options } from "@dicebear/pixel-art";

export const generateAvatarUrl = (avatar: Options) => {
  return `data:image/svg+xml;base64,${Buffer.from(
    createAvatar(pixelArt, {
      size: 128,
      ...avatar,
    }).toString()
  ).toString("base64")}`;
};

export function getSocialLink(platform: string, value: string): string {
  const cleanValue = value.trim();
  if (!cleanValue) return "";

  // If it's already a URL, return it (except for some protocols we want to force)
  if (
    cleanValue.startsWith("http") &&
    platform !== "email" &&
    platform !== "call"
  ) {
    return cleanValue;
  }

  switch (platform) {
    case "email":
      return cleanValue.startsWith("mailto:")
        ? cleanValue
        : `mailto:${cleanValue}`;
    case "call":
      return cleanValue.startsWith("tel:") ? cleanValue : `tel:${cleanValue}`;
    case "whatsapp":
      // Remove non-digits for phone number
      const waNumber = cleanValue.replace(/[^0-9]/g, "");
      return `https://wa.me/${waNumber}`;
    case "messenger":
      return `https://m.me/${cleanValue}`;
    case "instagram":
      return `https://instagram.com/${cleanValue.replace("@", "")}`;
    case "x":
      return `https://x.com/${cleanValue.replace("@", "")}`;
    case "facebook":
      return `https://facebook.com/${cleanValue}`;
    case "snapchat":
      return `https://snapchat.com/add/${cleanValue}`;
    case "locket":
      return cleanValue.startsWith("http")
        ? cleanValue
        : `https://${cleanValue}`;
    default:
      return cleanValue.startsWith("http")
        ? cleanValue
        : `https://${cleanValue}`;
  }
}

export function getSocialDisplayValue(platform: string, url: string): string {
  if (!url) return "";

  switch (platform) {
    case "email":
      return url.replace("mailto:", "");
    case "call":
      return url.replace("tel:", "");
    case "whatsapp":
      return url.replace("https://wa.me/", "");
    case "messenger":
      return url.replace("https://m.me/", "");
    case "instagram":
      return url.replace("https://instagram.com/", "").replace(/\/$/, "");
    case "x":
      return url.replace("https://x.com/", "").replace(/\/$/, "");
    case "facebook":
      return url.replace("https://facebook.com/", "").replace(/\/$/, "");
    case "snapchat":
      return url.replace("https://snapchat.com/add/", "").replace(/\/$/, "");
    default:
      return url;
  }
}
