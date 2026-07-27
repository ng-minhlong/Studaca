"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, RefreshCw } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { authClient } from "@/lib/auth-client";

export default function VerifyRequest() {
  const router = useRouter();
  const params = useSearchParams();
  const [otp, setOtp] = useState("");
  const [isPending, startTransition] = useTransition();
  const [cooldownUntil, setCooldownUntil] = useState(0);
  const [tick, setTick] = useState(0);

  const email = params.get("email") ?? "";
  const mode = params.get("mode") ?? "register";
  const isOtpCompleted = otp.length === 6;

  const title = useMemo(() => {
    return mode === "login" ? "Verify your account" : "Activate your account";
  }, [mode]);

  const description = useMemo(() => {
    return mode === "login"
      ? "Enter the 6-digit code we sent to your email so you can sign in."
      : "Enter the 6-digit code sent to your email to activate your account.";
  }, [mode]);

  const secondsLeft = Math.max(0, Math.ceil((cooldownUntil - Date.now()) / 1000));

  useEffect(() => {
    if (!cooldownUntil) return;

    const interval = window.setInterval(() => setTick((value) => value + 1), 1000);
    return () => window.clearInterval(interval);
  }, [cooldownUntil]);

  function verifyOtp() {
    if (!email) {
      toast.error("Missing email address.");
      return;
    }

    startTransition(async () => {
      await authClient.emailOtp.verifyEmail({
        email,
        otp,
        fetchOptions: {
          onSuccess: () => {
            toast.success("Email verified successfully.");
            router.push("/login");
          },
          onError: () => {
            toast.error("The code is invalid or has expired.");
          },
        },
      });
    });
  }

  function resendOtp() {
    if (!email) {
      toast.error("Missing email address.");
      return;
    }

    if (secondsLeft > 0) {
      toast.error(`Please wait ${secondsLeft}s before requesting a new code.`);
      return;
    }

    startTransition(async () => {
      await authClient.emailOtp.sendVerificationOtp({
        email,
        type: "email-verification",
        fetchOptions: {
          onSuccess: () => {
            setCooldownUntil(Date.now() + 180000);
            toast.success("A new activation code has been sent.");
          },
          onError: () => {
            toast.error("We could not resend the code right now.");
          },
        },
      });
    });
  }

  return (
    <Card className="mx-auto w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center space-y-2">
          <InputOTP
            maxLength={6}
            className="gap-2"
            value={otp}
            onChange={(value) => setOtp(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <p className="text-sm text-muted-foreground">
            Enter the 6-digit code sent to {email || "your email"}
          </p>
        </div>

        <Button onClick={verifyOtp} disabled={isPending || !isOtpCompleted} className="w-full">
          {isPending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              <span>Verifying...</span>
            </>
          ) : (
            <span>Verify code</span>
          )}
        </Button>

        <Button variant="outline" onClick={resendOtp} disabled={isPending || secondsLeft > 0} className="w-full">
          {isPending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <RefreshCw className="size-4" />
              <span>{secondsLeft > 0 ? `Resend code in ${secondsLeft}s` : "Resend code"}</span>
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
