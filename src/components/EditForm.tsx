"use client";

import React, { useState, useCallback } from "react";
import { UserProfile, SocialLink, Goal } from "@/lib/types";
import PixelInput from "./PixelInput";
import PixelButton from "./PixelButton";
import PixelCard from "./PixelCard";
import PixelHeading from "./PixelHeading";
import PixelSelect from "./PixelSelect";
import PixelSection from "./PixelSection";
import AvatarEditor from "./AvatarEditor";
import { clearAuthToken, updateProfile } from "@/lib/api";
import PixelCheckbox from "./PixelCheckbox";
import { Options } from "@dicebear/pixel-art";
import PixelModal from "./PixelModal";
import VisitWallCard from "./VisitWallCard";
import PixelTabs from "./PixelTabs";
import { getSocialLink, getSocialDisplayValue } from "@/lib/utils";
import PixelToast from "./PixelToast";
import { useRouter } from "next/navigation";

const THEMES = [
  { id: "classic", label: "Classic", color: "#F3E9C8" },
  { id: "gameboy", label: "GB", color: "#8B956D" },
  { id: "dark", label: "Dark", color: "#111111" },
  { id: "ocean", label: "Ocean", color: "#E0F7FA" },
  { id: "pastel", label: "Pastel", color: "#FFF5F5" },
];

const STATUS_OPTIONS = [
  { value: "online", label: "Online" },
  { value: "busy", label: "Busy" },
  { value: "dnd", label: "DND" },
  { value: "offline", label: "Offline" },
  { value: "vacation", label: "Vacation" },
];

const SOCIAL_PLATFORMS = [
  { value: "whatsapp", label: "WhatsApp" },
  { value: "email", label: "Email" },
  { value: "call", label: "Call" },
  { value: "locket", label: "Locket" },
  { value: "messenger", label: "Messenger" },
  { value: "instagram", label: "Instagram" },
  { value: "x", label: "X (Twitter)" },
  { value: "facebook", label: "Facebook" },
  { value: "snapchat", label: "Snapchat" },
];

interface EditFormProps {
  initialData: UserProfile;
}

export default function EditForm({ initialData }: EditFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<UserProfile>(() => {
    const data = { ...initialData };
    if (!data.socials || data.socials.length === 0) {
      data.socials = [{ platform: "whatsapp", url: "" }];
    }
    if (!data.goals || data.goals.length === 0) {
      data.goals = [{ id: Date.now().toString(), text: "", completed: false }];
    }
    if (!data.theme) {
      data.theme = "classic";
    }
    return data;
  });
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleAvatarChange = useCallback(
    (avatar: Options) => {
      setFormData((prev) => ({ ...prev, avatar }));
    },
    [setFormData]
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      latestUpdate: {
        ...prev.latestUpdate,
        [name]: value,
      },
    }));
  };

  const handleSocialChange = (
    index: number,
    field: keyof SocialLink,
    value: string
  ) => {
    const newSocials = [...formData.socials];
    newSocials[index] = { ...newSocials[index], [field]: value };
    setFormData((prev) => ({ ...prev, socials: newSocials }));
  };

  const handleThemeChange = (themeId: string) => {
    setFormData((prev) => ({ ...prev, theme: themeId }));
  };

  const handleGoalChange = (
    index: number,
    field: keyof Goal,
    value: string | boolean
  ) => {
    const newGoals = [...formData.goals];
    newGoals[index] = { ...newGoals[index], [field]: value };
    setFormData((prev) => ({ ...prev, goals: newGoals }));
  };

  const addGoal = () => {
    setFormData((prev) => ({
      ...prev,
      goals: [
        ...prev.goals,
        { id: Date.now().toString(), text: "", completed: false },
      ],
    }));
  };

  const removeGoal = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      goals: prev.goals.filter((_, i) => i !== index),
    }));
  };

  const addSocial = () => {
    setFormData((prev) => ({
      ...prev,
      socials: [...prev.socials, { platform: "whatsapp", url: "" }],
    }));
  };

  const removeSocial = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      socials: prev.socials.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    // Filter out empty social links and process them
    const processedSocials = formData.socials
      .filter((social) => social.url && social.url.trim() !== "")
      .map((social) => {
        return {
          ...social,
          url: getSocialLink(social.platform, social.url),
        };
      });

    // Filter out empty goals
    const processedGoals = formData.goals.filter(
      (goal) => goal.text && goal.text.trim() !== ""
    );

    const dataToSave: Partial<UserProfile> = {
      ...formData,
      socials: processedSocials,
      goals: processedGoals,
    };

    // Only include latestUpdate if it has text
    if (
      formData.latestUpdate.text &&
      formData.latestUpdate.text.trim() !== ""
    ) {
      dataToSave.latestUpdate = {
        ...formData.latestUpdate,
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      };
    } else {
      delete dataToSave.latestUpdate;
    }

    try {
      const updatedProfile = await updateProfile(dataToSave);
      setFormData(updatedProfile);
      setMessage({ type: "success", text: "Profile updated successfully!" });
    } catch (error) {
      console.error(error);
      setMessage({ type: "error", text: "Failed to update profile." });
    } finally {
      setIsSaving(false);
    }
  };

  const onLogout = () => {
    clearAuthToken();
    router.push("/login");
  };

  const tabs = [
    {
      id: "profile",
      label: "PROFILE",
      content: (
        <div className="space-y-6">
          {/* Profile Link */}
          <div>
            <PixelHeading as="h3" className="mb-3 text-sm">
              YOUR PROFILE LINK
            </PixelHeading>
            <PixelSection className="flex items-center gap-2 bg-white!">
              <div className="flex-1 font-pixel text-[10px] truncate text-blue-600">
                <a
                  href={`https://dev.visitwall.com/${formData.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {`https://dev.visitwall.com/${formData.username}`}
                </a>
              </div>
              <PixelButton
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `https://dev.visitwall.com/${formData.username}`
                  );
                  alert("Copied to clipboard!");
                }}
                className="text-[10px] py-1 px-2 h-auto min-h-0"
              >
                COPY
              </PixelButton>
            </PixelSection>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PixelInput
              label="Display Name"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
            />
            <PixelInput
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              disabled
            />
            <PixelInput
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            />
            <PixelInput
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
            <PixelSelect
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              options={STATUS_OPTIONS}
            />
          </div>

          {/* Latest Update */}
          <div>
            <PixelHeading as="h3" className="mb-3 text-sm">
              LATEST UPDATE
            </PixelHeading>
            <PixelSection>
              <div className="grid grid-cols-1 gap-4">
                <PixelInput
                  label="Update Text"
                  name="text"
                  value={formData.latestUpdate.text}
                  onChange={handleUpdateChange}
                  className="mb-0"
                />
              </div>
            </PixelSection>
          </div>
        </div>
      ),
    },
    {
      id: "avatar",
      label: "AVATAR",
      content: (
        <div className="flex flex-col items-center">
          <AvatarEditor
            avatar={formData.avatar as Options}
            onAvatarChange={handleAvatarChange}
          />
        </div>
      ),
    },
    {
      id: "theme",
      label: "THEME",
      content: (
        <div>
          <PixelHeading as="h3" className="mb-3 text-sm">
            SELECT THEME
          </PixelHeading>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {THEMES.map((theme) => (
              <div
                key={theme.id}
                onClick={() => handleThemeChange(theme.id)}
                className={`cursor-pointer border-2 border-black p-2 transition-all hover:-translate-y-1 ${
                  formData.theme === theme.id
                    ? "ring-2 ring-black ring-offset-2 bg-gray-100"
                    : "bg-white"
                }`}
              >
                <div
                  className="w-full h-24 mb-2 border-2 border-black relative overflow-hidden"
                  style={{ backgroundColor: theme.color }}
                >
                  {/* Mini Preview Representation */}
                  <div className="absolute top-2 left-2 w-8 h-8 bg-white border-2 border-black rounded-none opacity-50" />
                  <div className="absolute top-2 left-12 right-2 h-2 bg-black opacity-10" />
                  <div className="absolute top-6 left-12 right-2 h-2 bg-black opacity-10" />
                  <div className="absolute bottom-2 left-2 right-2 h-8 bg-white border-2 border-black opacity-30" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-pixel text-[10px] uppercase">
                    {theme.label}
                  </span>
                  {formData.theme === theme.id && (
                    <span className="text-green-500 text-xs">✓</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "socials",
      label: "SOCIALS",
      content: (
        <div>
          <div className="flex justify-between items-center mb-3">
            <PixelHeading as="h3" className="mb-0 text-sm">
              SOCIAL LINKS
            </PixelHeading>
            <PixelButton
              type="button"
              onClick={addSocial}
              className="text-[10px] py-1 px-2"
            >
              + ADD SOCIAL
            </PixelButton>
          </div>
          <div className="space-y-4">
            {formData.socials.map((social, index) => (
              <PixelSection key={index} className="relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pr-8">
                  <PixelSelect
                    label="Platform"
                    value={social.platform}
                    onChange={(e) =>
                      handleSocialChange(index, "platform", e.target.value)
                    }
                    options={SOCIAL_PLATFORMS}
                    className="mb-0"
                  />
                  <PixelInput
                    label={
                      social.platform === "whatsapp" ||
                      social.platform === "call"
                        ? "Phone Number"
                        : social.platform === "email"
                        ? "Email Address"
                        : social.platform === "locket"
                        ? "Link"
                        : "Username"
                    }
                    value={getSocialDisplayValue(social.platform, social.url)}
                    placeholder={
                      social.platform === "whatsapp"
                        ? "Phone with country code"
                        : social.platform === "email"
                        ? "name@example.com"
                        : social.platform === "locket"
                        ? "Share link"
                        : social.platform === "call"
                        ? "Phone number"
                        : "Username"
                    }
                    onChange={(e) =>
                      handleSocialChange(index, "url", e.target.value)
                    }
                    className="mb-0"
                  />
                </div>
                <PixelButton
                  type="button"
                  onClick={() => removeSocial(index)}
                  className="absolute top-2 right-2 text-red-500 px-2! py-1! border-red-500! min-w-0"
                >
                  ✕
                </PixelButton>
              </PixelSection>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "goals",
      label: "GOALS",
      content: (
        <div>
          <div className="flex justify-between items-center mb-3">
            <PixelHeading as="h3" className="mb-0 text-sm">
              GOALS
            </PixelHeading>
            <PixelButton
              type="button"
              onClick={addGoal}
              className="text-[10px] py-1 px-2"
            >
              + ADD GOAL
            </PixelButton>
          </div>
          <div className="space-y-3">
            {formData.goals.map((goal, index) => (
              <PixelSection key={goal.id} className="relative">
                <div className="flex items-center gap-3">
                  <PixelCheckbox
                    checked={goal.completed}
                    onChange={(checked) =>
                      handleGoalChange(index, "completed", checked)
                    }
                  />
                  <div className="flex-1">
                    <PixelInput
                      label="Goal Text"
                      value={goal.text}
                      onChange={(e) =>
                        handleGoalChange(index, "text", e.target.value)
                      }
                      className="mb-0"
                    />
                  </div>
                  <PixelButton
                    type="button"
                    onClick={() => removeGoal(index)}
                    className="text-red-500 px-2! py-1! border-red-500! min-w-0"
                  >
                    ✕
                  </PixelButton>
                </div>
              </PixelSection>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full mx-auto md:p-4 pb-24 space-y-6">
      <PixelCard className="w-full">
        <form onSubmit={handleSubmit} className="space-y-6">
          <PixelTabs tabs={tabs} />

          <div className="block md:hidden fixed bottom-0 m-0 right-0 left-0 md:left-auto md:w-[calc(100%-17rem)] z-40">
            <PixelCard className="rounded-none border-x-0 border-b-0 flex shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] pb-8 pt-4 px-4 bg-[var(--section-bg)]">
              <div className="flex justify-between w-full mx-auto gap-3">
                <PixelButton
                  type="button"
                  onClick={() => setShowPreview(true)}
                  variant="secondary"
                  className="flex-1 md:flex-none md:w-auto md:min-w-[150px]"
                >
                  PREVIEW CARD
                </PixelButton>
                <PixelButton
                  type="submit"
                  className="flex-1 md:flex-none md:w-auto md:min-w-[200px]"
                  disabled={isSaving}
                >
                  {isSaving ? "SAVING..." : "SAVE CHANGES"}
                </PixelButton>
              </div>
            </PixelCard>
          </div>

          <div className="hidden md:flex justify-between w-full mx-auto gap-3">
            <PixelButton
              type="button"
              onClick={() => setShowPreview(true)}
              variant="secondary"
              className="flex-1 md:flex-none md:w-auto md:min-w-[150px]"
            >
              PREVIEW CARD
            </PixelButton>
            <PixelButton
              type="submit"
              className="flex-1 md:flex-none md:w-auto md:min-w-[200px]"
              disabled={isSaving}
            >
              {isSaving ? "SAVING..." : "SAVE CHANGES"}
            </PixelButton>
          </div>
        </form>

        {message && (
          <PixelToast
            message={message.text}
            type={message.type}
            onClose={() => setMessage(null)}
          />
        )}

        <PixelModal
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
          title="Card Preview"
        >
          <div
            className={`flex justify-center p-4 theme-${
              formData.theme || "classic"
            }`}
          >
            <VisitWallCard
              user={{
                ...formData,
                socials: formData.socials.map((s) => ({
                  ...s,
                  url: getSocialLink(s.platform, s.url),
                })),
              }}
              showThemeSwitcher={false}
            />
          </div>
        </PixelModal>
      </PixelCard>
    </div>
  );
}
