import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Clock, Hash, ListOrdered, ArrowRight } from "lucide-react";
import { getMockTest } from "@/modules/exam/adapters";
import { isValidType } from "@/modules/exam/registry";

interface TestStartPageProps {
  params: Promise<{ type: string; id: string }>;
}

function countQuestions(test: Awaited<ReturnType<typeof getMockTest>>): number {
  if (!test) return 0;
  if ("questions" in test) return test.questions.length;
  if ("parts" in test) {
    const parts = test.parts as Array<{
      questions?: unknown[];
      questionRanges?: Array<{ questions: unknown[] }>;
    }>;
    return parts.reduce((sum, p) => {
      if (p.questions) return sum + p.questions.length;
      if (p.questionRanges)
        return sum + p.questionRanges.reduce((s, r) => s + r.questions.length, 0);
      return sum;
    }, 0);
  }
  return 0;
}

export default async function TestStartPage({ params }: TestStartPageProps) {
  const { type, id } = await params;

  if (!isValidType(type)) notFound();

  const test = getMockTest(type, id);
  if (!test) notFound();

  const questionCount = countQuestions(test);
  const typeLabel = type.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="flex min-h-screen flex-col bg-background">
      

      {/* Main content */}
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          {/*<Link
            href="/"
            className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            Back to home
          </Link>*/}
          {/* Type badge */}
          <div className="mb-6 flex justify-center">
            <span className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              {typeLabel}
            </span>
          </div>

          {/* Title */}
          <h1 className="mb-2 text-center text-3xl font-bold tracking-tight text-foreground text-balance">
            {test.title}
          </h1>

          {/* ID */}
          <p className="mb-8 text-center text-sm text-muted-foreground">
            ID: <span className="font-mono">{test.id_test}</span>
          </p>

          {/* Meta cards */}
          <div className="mb-8 grid grid-cols-3 gap-3">
            <div className="flex flex-col items-center gap-1.5 rounded-xl border border-border bg-card p-4">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-lg font-semibold text-foreground">{test.duration_minutes}</span>
              <span className="text-xs text-muted-foreground">minutes</span>
            </div>
            {questionCount > 0 && (
              <div className="flex flex-col items-center gap-1.5 rounded-xl border border-border bg-card p-4">
                <ListOrdered className="h-4 w-4 text-muted-foreground" />
                <span className="text-lg font-semibold text-foreground">{questionCount}</span>
                <span className="text-xs text-muted-foreground">questions</span>
              </div>
            )}
            <div className="flex flex-col items-center gap-1.5 rounded-xl border border-border bg-card p-4">
              <Hash className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs font-mono font-semibold text-foreground truncate w-full text-center">
                {test.id_test.split("-").slice(-1)[0]}
              </span>
              <span className="text-xs text-muted-foreground">test ID</span>
            </div>
          </div>

          {/* Instructions */}
          <div className="mb-8 rounded-xl border border-border bg-muted/50 p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Before you start
            </p>
            <ul className="space-y-1.5 text-sm text-foreground">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
                Make sure you are in a quiet environment.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
                The timer starts as soon as you click Start.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
                You can bookmark questions and return to them.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
                Do not refresh the page during the test.
              </li>
            </ul>
          </div>

          {/* CTA */}
          <Link
            href={`/test/${type}/${id}`}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-foreground px-6 py-3.5 text-sm font-semibold text-background transition-opacity hover:opacity-80"
          >
            Start Test
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}
