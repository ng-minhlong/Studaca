"use client";

import { CheckCircle2, XCircle, MinusCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import type { Layout0Result } from "../../types";
import { formatTimeUsed, scoreColor } from "../../utils";
import { cn } from "@/lib/utils";

interface ResultLayout0Props {
  result: Layout0Result;
}

export function ResultLayout0({ result }: ResultLayout0Props) {
  const totalCorrect = result.part_results.reduce((s, p) => s + p.correct, 0);
  const totalIncorrect = result.part_results.reduce((s, p) => s + p.incorrect, 0);
  const totalSkipped = result.part_results.reduce((s, p) => s + p.skipped, 0);

  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-10">
      {/* Score card */}
      <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
        <p className="mb-1 text-sm font-medium text-muted-foreground uppercase tracking-widest">
          Final Score
        </p>
        <p className={cn("text-7xl font-bold tabular-nums", scoreColor(result.score))}>
          {result.score}
          <span className="text-3xl text-muted-foreground">/100</span>
        </p>
        <div className="mt-4 flex justify-center gap-6 text-sm">
          <div className="flex items-center gap-1.5 text-emerald-600">
            <CheckCircle2 className="h-4 w-4" />
            <span>{totalCorrect} correct</span>
          </div>
          <div className="flex items-center gap-1.5 text-destructive">
            <XCircle className="h-4 w-4" />
            <span>{totalIncorrect} incorrect</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <MinusCircle className="h-4 w-4" />
            <span>{totalSkipped} skipped</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{formatTimeUsed(result.time_used_seconds)}</span>
          </div>
        </div>
      </div>

      {/* Accuracy bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="font-medium">Accuracy</span>
          <span className={cn("font-semibold", scoreColor(result.accuracy))}>
            {result.accuracy.toFixed(1)}%
          </span>
        </div>
        <Progress value={result.accuracy} className="h-2" />
      </div>

      {/* Part breakdown */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Part Breakdown
        </h2>
        {result.part_results.map((part) => {
          const pct = Math.round((part.correct / part.total) * 100);
          return (
            <div key={part.part_id} className="rounded-xl border border-border bg-card px-5 py-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium">{part.part_title}</span>
                <span className="text-xs text-muted-foreground">
                  {part.correct}/{part.total}
                </span>
              </div>
              <Progress value={pct} className="h-1.5" />
              <div className="mt-2 flex gap-4 text-xs text-muted-foreground">
                <span className="text-emerald-600">{part.correct} correct</span>
                <span className="text-destructive">{part.incorrect} incorrect</span>
                {part.skipped > 0 && <span>{part.skipped} skipped</span>}
              </div>
            </div>
          );
        })}
      </div>

      <Separator />

      {/* Question review */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Question Review
        </h2>
        {result.question_results.map((qr) => (
          <div
            key={qr.question_id}
            className={cn(
              "flex items-start gap-3 rounded-xl border px-5 py-4",
              qr.status === "correct"
                ? "border-emerald-200 bg-emerald-50 dark:border-emerald-900/40 dark:bg-emerald-950/20"
                : qr.status === "incorrect"
                ? "border-red-200 bg-red-50 dark:border-red-900/40 dark:bg-red-950/20"
                : "border-border bg-muted/30"
            )}
          >
            {qr.status === "correct" ? (
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
            ) : qr.status === "incorrect" ? (
              <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
            ) : (
              <MinusCircle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
            )}
            <div className="flex-1 space-y-1 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-medium">Q{qr.question_number}</span>
                <Badge
                  variant={
                    qr.status === "correct"
                      ? "default"
                      : qr.status === "incorrect"
                      ? "destructive"
                      : "secondary"
                  }
                  className="text-[10px]"
                >
                  {qr.status}
                </Badge>
              </div>
              <div className="text-xs text-muted-foreground space-y-0.5">
                <p>
                  <span className="font-medium">Your answer:</span>{" "}
                  {qr.user_answer !== null
                    ? Array.isArray(qr.user_answer)
                      ? qr.user_answer.join(", ")
                      : qr.user_answer
                    : <em>not answered</em>}
                </p>
                <p>
                  <span className="font-medium">Correct:</span>{" "}
                  {Array.isArray(qr.correct_answer)
                    ? qr.correct_answer.join(", ")
                    : qr.correct_answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
