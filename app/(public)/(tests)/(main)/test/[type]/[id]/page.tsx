import { notFound } from "next/navigation";
import { Clock, Hash, ListOrdered } from "lucide-react";
import { StartTestButton } from "@/components/exam/StartTestButton";
import { isValidType } from "@/modules/exam/registry";

interface TestStartPageProps {
  params: Promise<{ type: string; id: string }>;
}

export default async function TestStartPage({ params }: TestStartPageProps) {
  const { type, id } = await params;

  if (!isValidType(type)) notFound();

  const url = new URL(
    `/api/tests/test/${type}/${id}`,
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
  );
  console.log("Debug: type: ", type);
  console.log("Debug: id: ", id);
  const res = await fetch(url.toString(), { next: { tags: ["test-start"] } });
  const data = await res.json();
  console.log("Data: ", data)
  if (!res.ok || !data?.test) notFound();


  const test = data.test;
  const questionCount = Number(test.questionCount ?? 0);
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
          <StartTestButton type={type} id={id} />
        </div>
      </main>
    </div>
  );
}
