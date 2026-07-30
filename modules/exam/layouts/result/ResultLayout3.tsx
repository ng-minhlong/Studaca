"use client";

import { Clock, Play } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import type { Layout3Result } from "../../types";
import { formatTimeUsed, bandScoreColor } from "../../utils";
import { cn } from "@/lib/utils";

interface ResultLayout3Props {
  result: Layout3Result;
}

const CRITERIA_LABELS: Record<string, string> = {
  fluency: "Fluency & Coherence",
  lexical: "Lexical Resource",
  grammar: "Grammatical Range",
  pronunciation: "Pronunciation",
};

export function ResultLayout3({ result }: ResultLayout3Props) {
  const criteriaEntries = Object.entries(result.criteria) as [
    keyof typeof result.criteria,
    number
  ][];

  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-10">
      {/* Overall band */}
      <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
        <p className="mb-1 text-sm font-medium uppercase tracking-widest text-muted-foreground">
          IELTS Speaking Overall Band
        </p>
        <p className={cn("text-7xl font-bold", bandScoreColor(result.overall_band))}>
          {result.overall_band.toFixed(1)}
        </p>
        <div className="mt-4 flex justify-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {formatTimeUsed(result.time_used_seconds)}
          </span>
        </div>
      </div>

      {/* Criteria */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Assessment Criteria
        </h2>
        {criteriaEntries.map(([key, score]) => (
          <div key={key} className="rounded-xl border border-border bg-card px-5 py-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium">{CRITERIA_LABELS[key] ?? key}</span>
              <span className={cn("text-sm font-bold", bandScoreColor(score))}>
                {score.toFixed(1)}
              </span>
            </div>
            <Progress value={(score / 9) * 100} className="h-1.5" />
          </div>
        ))}
      </div>

      <Separator />

      {/* Feedback */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Examiner Feedback
        </h2>
        <div className="rounded-xl border border-border bg-card p-5 text-sm leading-relaxed text-foreground/90">
          {result.feedback}
        </div>
      </div>

      {/* Recording previews */}
      {result.recording_urls && Object.keys(result.recording_urls).length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Your Recordings
          </h2>
          {Object.entries(result.recording_urls).map(([qId, url]) => (
            <div
              key={qId}
              className="rounded-xl border border-border bg-card px-5 py-4"
            >
              <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                <Play className="h-3.5 w-3.5" />
                Question {qId}
              </div>
              <audio controls src={url} className="w-full" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
