"use client";

import { useRouter } from "next/navigation";
import { PracticeProvider } from "@/modules/practice/engine";
import { PracticeRenderer } from "@/modules/practice/renderers/PracticeRenderer";
import type { AnyPractice } from "@/modules/practice/types";

interface PracticeClientShellProps {
  practice: AnyPractice;
}

export function PracticeClientShell({ practice }: PracticeClientShellProps) {
  const router = useRouter();

  return (
    <PracticeProvider
      practice={practice}
      onFinish={() => router.push("/")}
    >
      <PracticeRenderer practice={practice} />
    </PracticeProvider>
  );
}
