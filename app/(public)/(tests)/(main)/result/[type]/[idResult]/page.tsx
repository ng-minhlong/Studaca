import { notFound } from "next/navigation";
import { ResultRenderer } from "@/modules/exam/renderers/ResultRenderer";
import { getMockResult } from "@/modules/exam/adapters";
import { isValidType } from "@/modules/exam/registry";
import { ResultPageHeader } from "@/components/exam/ResultPageHeader";

interface ResultPageProps {
  params: Promise<{ type: string; idResult: string }>;
}

export default async function ResultPage({ params }: ResultPageProps) {
  const { type, idResult } = await params;

  if (!isValidType(type)) notFound();

  const result = getMockResult(type, idResult);
  if (!result) notFound();

  return (
    <div className="min-h-screen bg-background">
      <ResultPageHeader type={type} />
      <ResultRenderer result={result} />
    </div>
  );
}
