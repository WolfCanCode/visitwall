"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import PixelCard from "@/components/PixelCard";
import PixelInput from "@/components/PixelInput";
import PixelButton from "@/components/PixelButton";
import PixelHeading from "@/components/PixelHeading";
import PixelSection from "@/components/PixelSection";
import PixelToast from "@/components/PixelToast";
import { verifyEmail } from "@/lib/api";

function ConfirmForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
      setSuccess("Please check your email for the verification code.");
    } else {
      setError("No email provided. Please try registering again.");
    }
  }, [searchParams]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsVerifying(true);

    if (!verificationCode) {
      setError("Please enter the verification code");
      setIsVerifying(false);
      return;
    }

    try {
      const response = await verifyEmail({
        email,
        code: verificationCode,
      });

      if (response.success !== false) {
        setSuccess("Email verified successfully! You can now log in.");
        // Redirect to login after a delay
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setError(
          response.message ||
            "Verification failed. Please check your code and try again."
        );
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Verification failed. Please try again.";
      setError(errorMessage);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSkipVerification = () => {
    setSuccess("You can verify your email later. Redirecting to login...");
    setTimeout(() => {
      router.push("/login");
    }, 1500);
  };

  return (
    <PixelCard className="w-full max-w-md">
      <PixelHeading as="h1" className="text-center mb-6">
        VERIFY EMAIL
      </PixelHeading>

      <form onSubmit={handleVerify} className="space-y-6">
        <PixelSection className="p-3 bg-blue-500/20 border-blue-500">
          <p className="font-pixel text-xs text-blue-500 mb-2">
            Check your email ({email}) for the verification code.
          </p>
          <p className="font-pixel text-[10px] text-gray-400">
            If using a fake email or cannot access, you must verify manually in
            AWS.
          </p>
        </PixelSection>

        <PixelInput
          label="Verification Code"
          name="verificationCode"
          type="text"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          required
          placeholder="Enter code from email"
        />

        <div className="pt-4 space-y-3">
          <PixelButton type="submit" className="w-full" disabled={isVerifying}>
            {isVerifying ? "VERIFYING..." : "VERIFY EMAIL"}
          </PixelButton>

          <PixelButton
            type="button"
            onClick={handleSkipVerification}
            className="w-full"
            variant="secondary"
          >
            SKIP (VERIFY LATER)
          </PixelButton>
        </div>

        <div className="text-center">
          <p className="font-pixel text-[10px] text-gray-400 mb-2">
            Already verified?
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
  );
}

export default function ConfirmPage() {
  return (
    <main className="min-h-screen flex items-center p-4 py-12">
      <Suspense fallback={<div className="font-pixel text-sm">LOADING...</div>}>
        <ConfirmForm />
      </Suspense>
    </main>
  );
}
