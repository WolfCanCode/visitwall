"use client";

import React, { useState, useMemo, useEffect } from "react";
import { createAvatar } from "@dicebear/core";
import { pixelArt } from "@dicebear/collection";
import { Options } from "@dicebear/pixel-art";
import PixelSection from "./PixelSection";
import PixelButton from "./PixelButton";
import PixelCheckbox from "./PixelCheckbox";
import { PixelDice } from "./PixelIcons";
import PixelModal from "./PixelModal";

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

const GLASSES_VARIANTS = [
  "light01",
  "light02",
  "light03",
  "light04",
  "light05",
  "light06",
  "light07",
  "dark01",
  "dark02",
  "dark03",
  "dark04",
  "dark05",
  "dark06",
  "dark07",
];

const BEARD_VARIANTS = [
  "variant01",
  "variant02",
  "variant03",
  "variant04",
  "variant05",
  "variant06",
  "variant07",
  "variant08",
];

const HAT_VARIANTS = [
  "variant01",
  "variant02",
  "variant03",
  "variant04",
  "variant05",
  "variant06",
  "variant07",
  "variant08",
  "variant09",
  "variant10",
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

const PIXEL_COLORS = [
  "e74c3c",
  "e67e22",
  "f1c40f",
  "2ecc71",
  "3498db",
  "9b59b6",
  "34495e",
  "ecf0f1",
  "95a5a6",
  "7f8c8d",
  "000000",
  "ffffff",
  "8e44ad",
  "2c3e50",
  "1abc9c",
  "16a085",
  "27ae60",
  "2980b9",
  "d35400",
  "c0392b",
];

interface AvatarEditorProps {
  avatar: Options;
  onAvatarChange: (avatar: Options) => void;
}

interface AvatarOptionPreviewProps {
  trait: keyof Options;
  option: string;
  baseOptions: Options;
  onClick: () => void;
  selected: boolean;
}

function AvatarOptionPreview({
  trait,
  option,
  baseOptions,
  onClick,
  selected,
}: AvatarOptionPreviewProps) {
  const svgContent = useMemo(() => {
    return createAvatar(pixelArt, {
      size: 64,
      ...baseOptions,
      [trait]: [option],
    }).toString();
  }, [trait, option, baseOptions]);

  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-1 border-2 transition-all ${
        selected
          ? "border-blue-500 bg-blue-50"
          : "border-transparent hover:border-gray-300"
      }`}
    >
      <div
        className="w-16 h-16 overflow-hidden"
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
    </button>
  );
}

export default function AvatarEditor({
  avatar,
  onAvatarChange,
}: AvatarEditorProps) {
  const [options, setOptions] = useState<Options>(
    avatar ? { ...avatar } : ({ seed: "wolf" } as Options)
  );

  const [activeSelector, setActiveSelector] = useState<{
    type: "trait" | "color";
    trait: keyof Options;
    options: string[];
    title: string;
  } | null>(null);

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

  const openSelector = (
    trait: keyof Options,
    variants: string[],
    type: "trait" | "color",
    title: string
  ) => {
    setActiveSelector({ type, trait, options: variants, title });
  };

  const handleSelect = (value: string) => {
    if (!activeSelector) return;

    setOptions((prev) => ({
      ...prev,
      [activeSelector.trait]: [value],
    }));
    setActiveSelector(null);
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
            Hair & Head
          </div>
          <div className="grid grid-cols-2 gap-2 col-span-2">
            <PixelButton
              type="button"
              onClick={() =>
                openSelector(
                  "hair",
                  HAIR_VARIANTS,
                  "trait",
                  "Select Hair Style"
                )
              }
              className="text-[10px] py-1"
            >
              Hair Style
            </PixelButton>
            <PixelButton
              type="button"
              onClick={() =>
                openSelector(
                  "hairColor",
                  PIXEL_COLORS,
                  "color",
                  "Select Hair Color"
                )
              }
              className="text-[10px] py-1"
            >
              Hair Color
            </PixelButton>
          </div>

          <div className="col-span-2 font-pixel text-[10px] uppercase opacity-75 mt-2">
            Face & Body
          </div>
          <div className="grid grid-cols-2 gap-2 col-span-2">
            <PixelButton
              type="button"
              onClick={() =>
                openSelector("eyes", EYES_VARIANTS, "trait", "Select Eyes")
              }
              className="text-[10px] py-1"
            >
              Eyes Style
            </PixelButton>
            <PixelButton
              type="button"
              onClick={() =>
                openSelector(
                  "eyesColor",
                  PIXEL_COLORS,
                  "color",
                  "Select Eyes Color"
                )
              }
              className="text-[10px] py-1"
            >
              Eyes Color
            </PixelButton>
            <PixelButton
              type="button"
              onClick={() =>
                openSelector("mouth", MOUTH_VARIANTS, "trait", "Select Mouth")
              }
              className="text-[10px] py-1"
            >
              Mouth Style
            </PixelButton>
            <PixelButton
              type="button"
              onClick={() =>
                openSelector(
                  "mouthColor",
                  PIXEL_COLORS,
                  "color",
                  "Select Mouth Color"
                )
              }
              className="text-[10px] py-1"
            >
              Mouth Color
            </PixelButton>
            <PixelButton
              type="button"
              onClick={() =>
                openSelector(
                  "clothing",
                  CLOTHING_VARIANTS,
                  "trait",
                  "Select Outfit"
                )
              }
              className="text-[10px] py-1"
            >
              Outfit Style
            </PixelButton>
            <PixelButton
              type="button"
              onClick={() =>
                openSelector(
                  "clothingColor",
                  PIXEL_COLORS,
                  "color",
                  "Select Outfit Color"
                )
              }
              className="text-[10px] py-1"
            >
              Outfit Color
            </PixelButton>
            <PixelButton
              type="button"
              onClick={() =>
                openSelector(
                  "skinColor",
                  SKIN_COLOR_VARIANTS,
                  "color",
                  "Select Skin Tone"
                )
              }
              className="text-[10px] py-1 col-span-2"
            >
              Skin Tone
            </PixelButton>
          </div>

          <div className="col-span-2 font-pixel text-[10px] uppercase opacity-75 mt-2">
            Accessories
          </div>

          {/* Glasses */}
          <div className="col-span-2 border-2 border-(--border-color) p-2 bg-[#d4d3b8]/20">
            <div
              className="flex items-center gap-2 mb-2 cursor-pointer"
              onClick={() => toggleProbability("glassesProbability")}
            >
              <PixelCheckbox
                checked={options.glassesProbability === 100}
                onChange={() => {}}
              />
              <span className="font-pixel text-xs">Glasses</span>
            </div>
            {options.glassesProbability === 100 && (
              <div className="grid grid-cols-2 gap-2 ml-6">
                <PixelButton
                  type="button"
                  onClick={() =>
                    openSelector(
                      "glasses",
                      GLASSES_VARIANTS,
                      "trait",
                      "Select Glasses"
                    )
                  }
                  className="text-[10px] py-1"
                >
                  Style
                </PixelButton>
                <PixelButton
                  type="button"
                  onClick={() =>
                    openSelector(
                      "glassesColor",
                      PIXEL_COLORS,
                      "color",
                      "Select Glasses Color"
                    )
                  }
                  className="text-[10px] py-1"
                >
                  Color
                </PixelButton>
              </div>
            )}
          </div>

          {/* Beard */}
          <div className="col-span-2 border-2 border-(--border-color) p-2 bg-[#d4d3b8]/20">
            <div
              className="flex items-center gap-2 mb-2 cursor-pointer"
              onClick={() => toggleProbability("beardProbability")}
            >
              <PixelCheckbox
                checked={options.beardProbability === 100}
                onChange={() => {}}
              />
              <span className="font-pixel text-xs">Beard</span>
            </div>
            {options.beardProbability === 100 && (
              <div className="grid grid-cols-2 gap-2 ml-6">
                <PixelButton
                  type="button"
                  onClick={() =>
                    openSelector(
                      "beard",
                      BEARD_VARIANTS,
                      "trait",
                      "Select Beard"
                    )
                  }
                  className="text-[10px] py-1"
                >
                  Style
                </PixelButton>
              </div>
            )}
          </div>

          {/* Hat */}
          <div className="col-span-2 border-2 border-(--border-color) p-2 bg-[#d4d3b8]/20">
            <div
              className="flex items-center gap-2 mb-2 cursor-pointer"
              onClick={() => toggleProbability("hatProbability")}
            >
              <PixelCheckbox
                checked={options.hatProbability === 100}
                onChange={() => {}}
              />
              <span className="font-pixel text-xs">Hat</span>
            </div>
            {options.hatProbability === 100 && (
              <div className="grid grid-cols-2 gap-2 ml-6">
                <PixelButton
                  type="button"
                  onClick={() =>
                    openSelector("hat", HAT_VARIANTS, "trait", "Select Hat")
                  }
                  className="text-[10px] py-1"
                >
                  Style
                </PixelButton>
                <PixelButton
                  type="button"
                  onClick={() =>
                    openSelector(
                      "hatColor",
                      PIXEL_COLORS,
                      "color",
                      "Select Hat Color"
                    )
                  }
                  className="text-[10px] py-1"
                >
                  Color
                </PixelButton>
              </div>
            )}
          </div>
        </div>
      </PixelSection>

      <PixelModal
        isOpen={!!activeSelector}
        onClose={() => setActiveSelector(null)}
        title={activeSelector?.title}
      >
        <div
          className={`grid gap-3 p-2 ${
            activeSelector?.type === "color"
              ? "grid-cols-5 sm:grid-cols-6"
              : "grid-cols-3 sm:grid-cols-4"
          }`}
        >
          {activeSelector?.type === "color" &&
            activeSelector.options.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => handleSelect(color)}
                className={`aspect-square w-full rounded-sm border-2 shadow-sm transition-transform hover:scale-110 ${
                  (options[activeSelector.trait] as string[])?.[0] === color
                    ? "border-black scale-110 ring-2 ring-offset-2 ring-blue-400"
                    : "border-transparent"
                }`}
                style={{ backgroundColor: `#${color}` }}
                title={`#${color}`}
              />
            ))}

          {activeSelector?.type === "trait" &&
            activeSelector.options.map((variant) => (
              <AvatarOptionPreview
                key={variant}
                trait={activeSelector.trait}
                option={variant}
                baseOptions={options}
                selected={
                  (options[activeSelector.trait] as string[])?.[0] === variant
                }
                onClick={() => handleSelect(variant)}
              />
            ))}
        </div>
      </PixelModal>
    </div>
  );
}
