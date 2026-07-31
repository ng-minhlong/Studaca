import { notFound } from "next/navigation";
import { ExamClientShell } from "@/components/exam/ExamClientShell";
import { getMockTest } from "@/modules/exam/adapters";
import { isValidType } from "@/modules/exam/registry";

interface TestPageProps {
  params: Promise<{ type: string; id: string }>;
}

export default async function TestPage({ params }: TestPageProps) {
  const { type, id } = await params;

  if (!isValidType(type)) notFound();

  const test = getMockTest(type, id);
  if (!test) notFound();

  return <ExamClientShell test={test} />;
}
