"use client";

import Logo from "@/components/common/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignUp } from "@clerk/nextjs";
import { Loader2, MailCheck } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function VerifyEmailPage() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;
    setError("");
    setLoading(true);

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/user/dashboard"); // redirect after success
      } else {
        setError("Invalid or expired code. Try again.");
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || "Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  const resendCode = async () => {
    if (!isLoaded) return;
    setError("");
    try {
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
    } catch (err: any) {
      setError("Failed to resend code. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-pink-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-100 p-8"
      >
        <div className="flex flex-col items-center mb-6">
          <Logo />
          <h1 className="text-2xl font-bold text-gray-800 mt-4">
            Verify your email
          </h1>
          <p className="text-sm text-gray-500 mt-1 text-center">
            We’ve sent a 6-digit verification code to your email. Enter it below
            to activate your account.
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Verification Code
            </label>
            <Input
              type="text"
              name="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter your 6-digit code"
              required
              className="tracking-[0.3em] text-center text-lg font-medium"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 bg-red-50 p-2 rounded-lg">
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-shop_orange hover:bg-shop_dark_green text-white font-medium py-2.5 rounded-lg transition-colors"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin w-5 h-5" />
                Verifying...
              </>
            ) : (
              <>
                <MailCheck className="w-5 h-5" />
                Verify Email
              </>
            )}
          </Button>

          <div className="text-center mt-4">
            <button
              type="button"
              onClick={resendCode}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Didn’t get a code? Resend
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
