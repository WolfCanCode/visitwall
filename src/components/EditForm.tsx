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
import { MOCK_USER } from "@/lib/data";

import PixelCheckbox from "./PixelCheckbox";

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

export default function EditForm() {
  const [formData, setFormData] = useState<UserProfile>(MOCK_USER);
  const handleAvatarChange = useCallback(
    (seed: string) => {
      setFormData((prev) => ({ ...prev, avatarSeed: seed }));
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

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

    // Update the date to now when saving
    const dataToSave = {
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

    console.log("Saved data:", dataToSave);
    // TODO: Implement actual save logic
    alert("Profile updated! (Mock save)");
  };

  return (
    <PixelCard className="w-full max-w-2xl mx-auto">
      <PixelHeading as="h2" className="text-center mb-6">
        EDIT PROFILE
      </PixelHeading>

      <form onSubmit={handleSubmit} className="space-y-6">
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
          <div className="md:col-span-2">
            <AvatarEditor
              currentSeed={formData.avatarSeed}
              onAvatarChange={handleAvatarChange}
            />
          </div>
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

        {/* Socials */}
        <div>
          <PixelHeading as="h3" className="mb-3 text-sm">
            SOCIAL LINKS
          </PixelHeading>
          <div className="space-y-4">
            {formData.socials.map((social, index) => (
              <PixelSection key={index} className="relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
              </PixelSection>
            ))}
          </div>
        </div>

        {/* Goals */}
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

        <div className="pt-4 flex justify-center">
          <PixelButton
            type="submit"
            className="w-full md:w-auto md:min-w-[200px]"
          >
            SAVE CHANGES
          </PixelButton>
        </div>
      </form>
    </PixelCard>
  );
}
