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
