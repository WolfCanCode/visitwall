import { pixelArt } from "@dicebear/collection";
import { createAvatar, Options } from "@dicebear/core";

export const generateAvatarUrl = (avatar: Options) => {
  return `data:image/svg+xml;base64,${Buffer.from(
    createAvatar(pixelArt, {
      size: 128,
      ...avatar,
    }).toString()
  ).toString("base64")}`;
};
