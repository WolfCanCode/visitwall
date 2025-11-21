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
import { updateProfile } from "@/lib/api";
import PixelCheckbox from "./PixelCheckbox";
import { Options } from "@dicebear/pixel-art";
import PixelModal from "./PixelModal";
import VisitWallCard from "./VisitWallCard";
import PixelTabs from "./PixelTabs";

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
];

interface EditFormProps {
  initialData: UserProfile;
}

export default function EditForm({ initialData }: EditFormProps) {
  const [formData, setFormData] = useState<UserProfile>(() => {
    const data = { ...initialData };
    if (!data.socials || data.socials.length === 0) {
      data.socials = [{ platform: "whatsapp", url: "" }];
    }
    if (!data.goals || data.goals.length === 0) {
      data.goals = [{ id: Date.now().toString(), text: "", completed: false }];
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

    // Process social links to add prefixes if needed
    const processedSocials = formData.socials.map((social) => {
      let url = social.url;
      if (social.platform === "email" && !url.startsWith("mailto:")) {
        url = `mailto:${url}`;
      } else if (social.platform === "call" && !url.startsWith("tel:")) {
        url = `tel:${url}`;
      }
      return { ...social, url };
    });

    const dataToSave: UserProfile = {
      ...formData,
      socials: processedSocials,
      latestUpdate: {
        ...formData.latestUpdate,
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      },
    };

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
                    label="Value"
                    value={social.url.replace(/^(mailto:|tel:)/, "")}
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
    <PixelCard className="w-full max-w-2xl mx-auto">
      <PixelHeading as="h2" className="text-center mb-6">
        EDIT PROFILE
      </PixelHeading>

      <form onSubmit={handleSubmit} className="space-y-6">
        {message && (
          <PixelSection
            className={`p-3 border ${
              message.type === "success"
                ? "bg-green-500/20 border-green-500 text-green-500"
                : "bg-red-500/20 border-red-500 text-red-500"
            }`}
          >
            <p className="font-pixel text-xs">{message.text}</p>
          </PixelSection>
        )}

        <PixelTabs tabs={tabs} />

        <div className="pt-4 flex justify-center gap-3 border-t-2 border-gray-100 mt-6">
          <PixelButton
            type="button"
            onClick={() => setShowPreview(true)}
            variant="secondary"
            className="w-full md:w-auto md:min-w-[150px]"
          >
            PREVIEW CARD
          </PixelButton>
          <PixelButton
            type="submit"
            className="w-full md:w-auto md:min-w-[200px]"
            disabled={isSaving}
          >
            {isSaving ? "SAVING..." : "SAVE CHANGES"}
          </PixelButton>
        </div>
      </form>

      <PixelModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        title="Card Preview"
      >
        <div className="flex justify-center p-4">
          <VisitWallCard user={formData} showThemeSwitcher={false} />
        </div>
      </PixelModal>
    </PixelCard>
  );
}
