"use client";

import { Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import type { Layout5Result } from "../../types";
import { formatTimeUsed, scoreColor } from "../../utils";
import { cn } from "@/lib/utils";

interface ResultLayout5Props {
  result: Layout5Result;
}

function ScoreCard({
  label,
  score,
  max,
}: {
  label: string;
  score: number;
  max: number;
}) {
  const pct = Math.round((score / max) * 100);
  return (
    <div className="flex flex-1 flex-col items-center rounded-2xl border border-border bg-card p-6 shadow-sm">
      <p className="mb-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <p className={cn("text-5xl font-bold tabular-nums", scoreColor(pct))}>{score}</p>
      <p className="mt-1 text-xs text-muted-foreground">out of {max}</p>
    </div>
  );
}

export function ResultLayout5({ result }: ResultLayout5Props) {
  const totalPct = Math.round((result.total_score / 1600) * 100);

  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-10">
      {/* Total score */}
      <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
        <p className="mb-1 text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Digital SAT Total Score
        </p>
        <p className={cn("text-7xl font-bold tabular-nums", scoreColor(totalPct))}>
          {result.total_score}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">out of 1600</p>
        <div className="mt-4 flex justify-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {formatTimeUsed(result.time_used_seconds)}
          </span>
        </div>
      </div>

      {/* Section scores */}
      <div className="flex gap-4">
        <ScoreCard label="Math" score={result.math_score} max={800} />
        <ScoreCard
          label="Reading & Writing"
          score={result.reading_writing_score}
          max={800}
        />
      </div>

      <Separator />

      {/* Domain breakdown */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Domain Breakdown
        </h2>
        {result.domain_breakdown.map((d) => {
          const pct = Math.round((d.score / d.total) * 100);
          return (
            <div
              key={d.domain}
              className="rounded-xl border border-border bg-card px-5 py-4"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium">{d.domain}</span>
                <span className={cn("text-sm font-semibold tabular-nums", scoreColor(pct))}>
                  {d.score}/{d.total}
                </span>
              </div>
              <Progress value={pct} className="h-1.5" />
            </div>
          );
        })}
      </div>

      {/* Per-question results */}
      {result.question_results && result.question_results.length > 0 && (
        <>
          <Separator />
          <div className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Question-by-Question
            </h2>
            <div className="grid grid-cols-5 gap-2 sm:grid-cols-8">
              {result.question_results.map((qr) => (
                <div
                  key={qr.question_id}
                  title={`Q${qr.question_number}: ${qr.status}`}
                  className={cn(
                    "flex h-9 w-full items-center justify-center rounded-lg text-xs font-semibold",
                    qr.status === "correct"
                      ? "bg-emerald-100 text-emerald-700"
                      : qr.status === "incorrect"
                      ? "bg-red-100 text-red-700"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {qr.question_number}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
