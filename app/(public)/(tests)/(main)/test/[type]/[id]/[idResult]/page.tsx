import { notFound } from "next/navigation";
import { ExamClientShell } from "@/components/exam/ExamClientShell";
import { isValidType } from "@/modules/exam/registry";

interface TestPageProps {
  params: Promise<{ type: string; id: string; idResult: string }>;
}

export default async function TestPage({ params }: TestPageProps) {
  const { type, id, idResult } = await params;

  if (!isValidType(type)) notFound();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/tests/test/${type}/${id}/${idResult}`,
    { next: { tags: ["test-session"] } }
  );

  if (!response.ok) notFound();

  const data = await response.json();
  console.log("data: ", JSON.stringify(data, null, 2));
  const test = data?.test;

  if (!test) notFound();

  return <ExamClientShell test={test} />;
}
