import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Clock, Layers, ArrowRight, Volume2, Mic } from "lucide-react";
import { getMockPractice, isValidPracticeType } from "@/modules/practice/adapters";

interface PracticeStartPageProps {
  params: Promise<{ type: string; id: string }>;
}

const PRACTICE_META: Record<
  string,
  { label: string; icon: typeof Volume2; description: string; tip: string }
> = {
  dictation: {
    label: "Dictation",
    icon: Volume2,
    description:
      "Listen to each audio clip and type exactly what you hear. Sharpens listening accuracy and spelling.",
    tip: "Use headphones for best results. You can replay each sentence as many times as you need.",
  },
  shadowing: {
    label: "Shadowing",
    icon: Mic,
    description:
      "Listen to native speech, then speak aloud at the same time or immediately after. Trains rhythm, stress, and natural intonation.",
    tip: "Find a quiet space. Speak loudly and clearly — don't just mouth the words silently.",
  },
};

export default async function PracticeStartPage({ params }: PracticeStartPageProps) {
  const { type, id } = await params;

  if (!isValidPracticeType(type)) notFound();

  const practice = getMockPractice(type, id);
  if (!practice) notFound();

  const meta = PRACTICE_META[type];
  const Icon = meta.icon;

  const itemCount =
    practice.type === "dictation"
      ? practice.sentences.length
      : practice.segments.length;

  const itemLabel =
    practice.type === "dictation" ? "sentences" : "segments";

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-2xl items-center px-4 py-3">
          <Link
            href="/"
            className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            Back to home
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          {/* Type badge */}
          <div className="mb-6 flex justify-center">
            <span className="flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              <Icon className="h-3 w-3" />
              {meta.label} Practice
            </span>
          </div>

          {/* Title */}
          <h1 className="mb-2 text-center text-3xl font-bold tracking-tight text-foreground text-balance">
            {practice.title}
          </h1>

          {/* ID */}
          <p className="mb-8 text-center text-sm text-muted-foreground">
            ID: <span className="font-mono">{practice.id_practice}</span>
          </p>

          {/* Description */}
          <p className="mb-8 text-center text-sm leading-relaxed text-muted-foreground">
            {meta.description}
          </p>

          {/* Meta cards */}
          <div className="mb-8 grid grid-cols-3 gap-3">
            <div className="flex flex-col items-center gap-1.5 rounded-xl border border-border bg-card p-4">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-lg font-semibold text-foreground">
                {practice.duration_minutes}
              </span>
              <span className="text-xs text-muted-foreground">minutes</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 rounded-xl border border-border bg-card p-4">
              <Layers className="h-4 w-4 text-muted-foreground" />
              <span className="text-lg font-semibold text-foreground">{itemCount}</span>
              <span className="text-xs text-muted-foreground">{itemLabel}</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 rounded-xl border border-border bg-card p-4">
              <span className="text-base font-bold text-foreground">{practice.level}</span>
              <span className="text-xs text-muted-foreground">level</span>
            </div>
          </div>

          {/* Tip */}
          <div className="mb-8 rounded-xl border border-border bg-muted/50 p-4">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Tip
            </p>
            <p className="text-sm leading-relaxed text-foreground">{meta.tip}</p>
          </div>

          {/* CTA */}
          <Link
            href={`/practice/${type}/${id}`}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-foreground px-6 py-3.5 text-sm font-semibold text-background transition-opacity hover:opacity-80"
          >
            Start Practice
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}
