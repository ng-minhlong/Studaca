import { notFound } from "next/navigation";
import { PracticeClientShell } from "@/components/practice/PracticeClientShell";
import { getMockPractice, isValidPracticeType } from "@/modules/practice/adapters";

interface PracticePageProps {
  params: Promise<{ type: string; id: string }>;
}

export default async function PracticePage({ params }: PracticePageProps) {
  const { type, id } = await params;

  if (!isValidPracticeType(type)) notFound();

  const practice = getMockPractice(type, id);
  if (!practice) notFound();

  return <PracticeClientShell practice={practice} />;
}
