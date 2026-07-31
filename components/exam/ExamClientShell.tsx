"use client";

import { useRouter } from "next/navigation";
import { ExamProvider } from "@/modules/exam/engine";
import { ExamRenderer } from "@/modules/exam/renderers/ExamRenderer";
import type { AnyTest } from "@/modules/exam/types";

interface ExamClientShellProps {
  test: AnyTest;
}

export function ExamClientShell({ test }: ExamClientShellProps) {
  const router = useRouter();

  return (
    <ExamProvider
      test={test}
      onFinish={() => router.push(`/result/${test.type}/${test.id_test}-result-001`)}

    >
      <ExamRenderer test={test} />
    </ExamProvider>
  );
}
