"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PixelCard from "@/components/PixelCard";
import PixelInput from "@/components/PixelInput";
import PixelButton from "@/components/PixelButton";
import PixelHeading from "@/components/PixelHeading";
import PixelSection from "@/components/PixelSection";
import PixelToast from "@/components/PixelToast";
import { login, setAuthToken, getAuthToken } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    try {
      if (!formData.email || !formData.password) {
        setError("Please fill in all fields");
        setIsLoading(false);
        return;
      }

      const response = await login({
        email: formData.email,
        password: formData.password,
      });

      if (response.data?.accessToken) {
        // Store the authentication token
        setAuthToken(response.data.accessToken);
        // Store user email for reference
        localStorage.setItem("userEmail", formData.email);
        router.push("/edit");
      } else {
        setError(response.message || "Login failed. No token received.");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Login failed. Please check your credentials and try again.";

      if (errorMessage === "User account is not confirmed") {
        // Redirect to confirm page
        router.push(`/confirm?email=${encodeURIComponent(formData.email)}`);
        return;
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 py-12">
      <PixelCard className="w-full max-w-md">
        <PixelHeading as="h1" className="text-center mb-6">
          LOGIN
        </PixelHeading>

        <form onSubmit={handleSubmit} className="space-y-6">
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
            autoComplete="current-password"
          />

          <div className="pt-4">
            <PixelButton type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "LOGGING IN..." : "LOGIN"}
            </PixelButton>
          </div>

          <div className="text-center">
            <p className="font-pixel text-[10px] text-gray-400 mb-2">
              Don&apos;t have an account?
            </p>
            <Link
              href="/register"
              className="font-pixel text-xs text-blue-500 hover:underline"
            >
              REGISTER HERE
            </Link>
          </div>
        </form>
        {error && (
          <PixelToast
            message={error}
            type="error"
            onClose={() => setError("")}
          />
        )}
      </PixelCard>
    </main>
  );
}
