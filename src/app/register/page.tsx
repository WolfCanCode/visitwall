"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PixelCard from "@/components/PixelCard";
import PixelInput from "@/components/PixelInput";
import PixelButton from "@/components/PixelButton";
import PixelHeading from "@/components/PixelHeading";
import PixelSection from "@/components/PixelSection";
import { register } from "@/lib/api";
import { getAuthToken } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (getAuthToken()) {
      router.push("/edit");
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    if (!formData.username || !formData.email || !formData.password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      const response = await register({
        email: formData.email,
        password: formData.password,
        username: formData.username,
      });

      if (response.success !== false) {
        // Redirect to confirm page
        router.push(`/confirm?email=${encodeURIComponent(formData.email)}`);
      } else {
        setError(response.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Registration failed. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 py-12">
      <PixelCard className="w-full max-w-md">
        <PixelHeading as="h1" className="text-center mb-6">
          REGISTER
        </PixelHeading>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <PixelSection className="p-3 bg-red-500/20 border-red-500">
              <p className="font-pixel text-xs text-red-500">{error}</p>
            </PixelSection>
          )}

          <PixelInput
            label="Username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            required
            autoComplete="username"
          />

          <PixelInput
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />

          <PixelInput
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="new-password"
          />

          <PixelInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            autoComplete="new-password"
          />

          <div className="pt-4">
            <PixelButton type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "REGISTERING..." : "REGISTER"}
            </PixelButton>
          </div>

          <div className="text-center">
            <p className="font-pixel text-[10px] text-gray-400 mb-2">
              Already have an account?
            </p>
            <Link
              href="/login"
              className="font-pixel text-xs text-blue-500 hover:underline"
            >
              LOGIN HERE
            </Link>
          </div>
        </form>
      </PixelCard>
    </main>
  );
}
