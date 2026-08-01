"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface StartTestButtonProps {
  type: string;
  id: string;
}

export function StartTestButton({ type, id }: StartTestButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleStart() {
    setIsLoading(true);

    try {
      const response = await fetch(`/api/results/create/test/${type}/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        toast.error(data.message ?? "Unable to start test. Please try again.");
        return;
      }

      if (!data.idResult) {
        toast.error("Could not generate result session.");
        return;
      }

      toast.success("Test session created.");
      router.push(`/test/${type}/${id}/${data.idResult}`);
    } catch (error) {
      toast.error("Unable to start test. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button onClick={handleStart} className="w-full" disabled={isLoading}>
      {isLoading ? "Starting..." : "Start Test"}
    </Button>
  );
}
