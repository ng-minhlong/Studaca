"use client";

import { useRouter } from "next/navigation";
import { ExamProvider } from "@/modules/exam/engine";
import { ExamRenderer } from "@/modules/exam/renderers/ExamRenderer";
import type { AnyTest } from "@/modules/exam/types";

interface ExamClientShellProps {
  test: AnyTest;
  idResult: string;
}

export function ExamClientShell({ test, idResult }: ExamClientShellProps) {
  const router = useRouter();

  const handleFinish = () => {
    // router.push(`/result/${test.type}/${test.id_test}-result-001`)
  };

  return (
    <ExamProvider
      test={test}
      onFinish={handleFinish}
    >
      <ExamRenderer test={test} />
    </ExamProvider>
  );
}
