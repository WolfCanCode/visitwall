import React from "react";
import InstagramIcon from "@/assets/social/instagram.svg";
import FacebookIcon from "@/assets/social/facebook.svg";
import XIcon from "@/assets/social/x.svg";
import WhatsappIcon from "@/assets/social/whatsapp.svg";
import MessengerIcon from "@/assets/social/messenger.svg";
import SnapchatIcon from "@/assets/social/snapchat.svg";
import LocketIcon from "@/assets/social/locket.svg";
import EmailIcon from "@/assets/social/email.svg";
import CallIcon from "@/assets/social/call.svg";
interface IconProps {
  platform: string;
  size?: number;
  className?: string;
}

export const PixelSocialIcon = ({
  platform,
  size = 16,
  className = "",
}: IconProps) => {
  const getIcon = (p: string) => {
    const iconProps = {
      width: size,
      height: size,
      className: className,
    };

    switch (p) {
      case "instagram":
        return <InstagramIcon {...iconProps} />;
      case "facebook":
        return <FacebookIcon {...iconProps} />;
      case "x":
        return <XIcon {...iconProps} />;
      case "whatsapp":
        return <WhatsappIcon {...iconProps} />;
      case "messenger":
        return <MessengerIcon {...iconProps} />;
      case "snapchat":
        return <SnapchatIcon {...iconProps} />;
      case "locket":
        return <LocketIcon {...iconProps} />;
      case "email":
        return <EmailIcon {...iconProps} />;
      case "call":
        return <CallIcon {...iconProps} />;
      default:
        return <EmailIcon {...iconProps} />;
    }
  };

  return getIcon(platform);
};
