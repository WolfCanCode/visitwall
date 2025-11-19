"use client";

import React, { useState, useMemo, useEffect } from "react";
import { createAvatar } from "@dicebear/core";
import { pixelArt } from "@dicebear/collection";
import { Options } from "@dicebear/pixel-art";
import PixelSection from "./PixelSection";
import PixelButton from "./PixelButton";
import PixelCheckbox from "./PixelCheckbox";
import { PixelDice } from "./PixelIcons";

// Constant definitions for available variants based on schema
const CLOTHING_VARIANTS = [
  "variant23",
  "variant22",
  "variant21",
  "variant20",
  "variant19",
  "variant18",
  "variant17",
  "variant16",
  "variant15",
  "variant14",
  "variant13",
  "variant12",
  "variant11",
  "variant10",
  "variant09",
  "variant08",
  "variant07",
  "variant06",
  "variant05",
  "variant04",
  "variant03",
  "variant02",
  "variant01",
];

const EYES_VARIANTS = [
  "variant12",
  "variant11",
  "variant10",
  "variant09",
  "variant08",
  "variant07",
  "variant06",
  "variant05",
  "variant04",
  "variant03",
  "variant02",
  "variant01",
];

const MOUTH_VARIANTS = [
  "sad10",
  "sad09",
  "sad08",
  "sad07",
  "sad06",
  "sad05",
  "sad04",
  "sad03",
  "sad02",
  "sad01",
  "happy13",
  "happy12",
  "happy11",
  "happy10",
  "happy09",
  "happy08",
  "happy07",
  "happy06",
  "happy05",
  "happy04",
  "happy03",
  "happy02",
  "happy01",
];

const HAIR_VARIANTS = [
  "short24",
  "short23",
  "short22",
  "short21",
  "short20",
  "short19",
  "short18",
  "short17",
  "short16",
  "short15",
  "short14",
  "short13",
  "short12",
  "short11",
  "short10",
  "short09",
  "short08",
  "short07",
  "short06",
  "short05",
  "short04",
  "short03",
  "short02",
  "short01",
  "long21",
  "long20",
  "long19",
  "long18",
  "long17",
  "long16",
  "long15",
  "long14",
  "long13",
  "long12",
  "long11",
  "long10",
  "long09",
  "long08",
  "long07",
  "long06",
  "long05",
  "long04",
  "long03",
  "long02",
  "long01",
];

const SKIN_COLOR_VARIANTS = [
  "ffc994",
  "ffceb4",
  "ffdbb4",
  "ffe4c0",
  "f8d998",
  "e0a878",
  "d08b5b",
  "ae5d29",
  "614335",
];

interface AvatarEditorProps {
  avatar: Options;
  onAvatarChange: (avatar: Options) => void;
}

export default function AvatarEditor({
  avatar,
  onAvatarChange,
}: AvatarEditorProps) {
  const [options, setOptions] = useState<Options>(
    avatar ? { ...avatar } : ({ seed: "wolf" } as Options)
  );

  // Generate avatar SVG
  const avatarRendered = useMemo(() => {
    return createAvatar(pixelArt, {
      size: 128,
      ...options,
    });
  }, [options]);

  const svgContent = useMemo(() => avatarRendered.toString(), [avatarRendered]);

  // Notify parent when the seed changes so it can persist the new avatar

  useEffect(() => {
    onAvatarChange(options);
  }, [options, onAvatarChange]);

  const randomize = () => {
    const randomSeed = Math.random().toString(36).substring(7);
    setOptions({ ...options, seed: randomSeed } as Options);
  };

  const randomizeTrait = (trait: keyof Options, variants: string[]) => {
    const randomVariant = variants[Math.floor(Math.random() * variants.length)];
    setOptions((prev) => ({
      ...prev,
      [trait]: [randomVariant],
    }));
  };

  const toggleProbability = (trait: keyof Options) => {
    setOptions((prev) => ({
      ...prev,
      [trait]: prev[trait] === 100 ? 0 : 100,
    }));
  };

  return (
    <div className="mb-6">
      <label className="block font-pixel text-xs mb-2 uppercase">
        Avatar Editor
      </label>
      <PixelSection className="flex flex-col gap-4">
        <div className="flex justify-center relative mb-4">
          <div
            className="w-32 h-32 border-4 border-(--border-color) bg-white overflow-hidden"
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
          <PixelButton
            type="button"
            onClick={randomize}
            className="absolute -right-4 top-1/2 -translate-y-1/2 h-[38px] px-2!"
            title="Randomize Base Appearance"
          >
            <PixelDice size={20} />
          </PixelButton>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2 font-pixel text-[10px] uppercase opacity-75 mt-2">
            Traits
          </div>

          <PixelButton
            type="button"
            onClick={() => randomizeTrait("hair", HAIR_VARIANTS)}
            className="text-xs py-2"
          >
            Change Hair
          </PixelButton>
          <PixelButton
            type="button"
            onClick={() => randomizeTrait("clothing", CLOTHING_VARIANTS)}
            className="text-xs py-2"
          >
            Change Outfit
          </PixelButton>
          <PixelButton
            type="button"
            onClick={() => randomizeTrait("eyes", EYES_VARIANTS)}
            className="text-xs py-2"
          >
            Change Eyes
          </PixelButton>
          <PixelButton
            type="button"
            onClick={() => randomizeTrait("mouth", MOUTH_VARIANTS)}
            className="text-xs py-2"
          >
            Change Mouth
          </PixelButton>
          <PixelButton
            type="button"
            onClick={() => randomizeTrait("skinColor", SKIN_COLOR_VARIANTS)}
            className="text-xs py-2 col-span-2"
          >
            Change Skin Color
          </PixelButton>

          <div className="col-span-2 font-pixel text-[10px] uppercase opacity-75 mt-2">
            Accessories
          </div>

          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => toggleProbability("glassesProbability")}
          >
            <PixelCheckbox
              checked={options.glassesProbability === 100}
              onChange={() => {}} // handled by parent div
            />
            <span className="font-pixel text-xs">Glasses</span>
          </div>

          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => toggleProbability("beardProbability")}
          >
            <PixelCheckbox
              checked={options.beardProbability === 100}
              onChange={() => {}}
            />
            <span className="font-pixel text-xs">Beard</span>
          </div>

          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => toggleProbability("hatProbability")}
          >
            <PixelCheckbox
              checked={options.hatProbability === 100}
              onChange={() => {}}
            />
            <span className="font-pixel text-xs">Hat</span>
          </div>
        </div>
      </PixelSection>
    </div>
  );
}
