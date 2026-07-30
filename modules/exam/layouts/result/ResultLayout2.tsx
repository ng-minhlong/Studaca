"use client";

import { CheckCircle2, XCircle, MinusCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import type { Layout2Result } from "../../types";
import { formatTimeUsed, bandScoreColor } from "../../utils";
import { cn } from "@/lib/utils";

interface ResultLayout2Props {
  result: Layout2Result;
}

export function ResultLayout2({ result }: ResultLayout2Props) {
  const totalCorrect = result.part_results.reduce((s, p) => s + p.correct, 0);
  const totalQ = result.part_results.reduce((s, p) => s + p.total, 0);

  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-10">
      {/* Band score hero */}
      <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
        <p className="mb-1 text-sm font-medium uppercase tracking-widest text-muted-foreground">
          IELTS Listening Band Score
        </p>
        <p className={cn("text-7xl font-bold", bandScoreColor(result.band_score))}>
          {result.band_score.toFixed(1)}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Raw score: {result.raw_score} / {totalQ}
        </p>
        <div className="mt-4 flex justify-center gap-4 text-sm">
          <span className="flex items-center gap-1 text-emerald-600">
            <CheckCircle2 className="h-4 w-4" />
            {totalCorrect} correct
          </span>
          <span className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-4 w-4" />
            {formatTimeUsed(result.time_used_seconds)}
          </span>
        </div>
      </div>

      {/* 4-part breakdown */}
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
              <div className="mt-2 flex gap-4 text-xs">
                <span className="text-emerald-600">{part.correct} correct</span>
                <span className="text-destructive">{part.incorrect} incorrect</span>
                {part.skipped > 0 && <span className="text-muted-foreground">{part.skipped} skipped</span>}
              </div>
            </div>
          );
        })}
      </div>

      <Separator />

      {/* Answer review */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Answer Review
        </h2>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {result.question_results.map((qr) => (
            <div
              key={qr.question_id}
              className={cn(
                "flex items-start gap-2 rounded-lg border px-4 py-3 text-sm",
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
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Q{qr.question_number}</span>
                  <Badge
                    variant={qr.status === "correct" ? "default" : qr.status === "incorrect" ? "destructive" : "secondary"}
                    className="text-[10px]"
                  >
                    {qr.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Your: {qr.user_answer !== null ? (Array.isArray(qr.user_answer) ? qr.user_answer.join(", ") : qr.user_answer) : "—"}
                </p>
                {qr.status !== "correct" && (
                  <p className="text-xs text-emerald-700 dark:text-emerald-400">
                    Correct: {Array.isArray(qr.correct_answer) ? qr.correct_answer.join(", ") : qr.correct_answer}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
