"use client";

import { Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Layout4Result } from "../../types";
import { formatTimeUsed, bandScoreColor } from "../../utils";
import { cn } from "@/lib/utils";

interface ResultLayout4Props {
  result: Layout4Result;
}

const CRITERIA_LABELS: Record<string, string> = {
  task_achievement: "Task Achievement",
  coherence: "Coherence & Cohesion",
  lexical: "Lexical Resource",
  grammar: "Grammatical Range",
};

function CriteriaPanel({
  label,
  band,
  criteria,
  feedback,
  submission,
}: {
  label: string;
  band: number;
  criteria: Record<string, number>;
  feedback: string;
  submission: string;
}) {
  return (
    <div className="space-y-6">
      {/* Band score */}
      <div className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm">
        <p className="mb-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          {label} Band Score
        </p>
        <p className={cn("text-6xl font-bold", bandScoreColor(band))}>
          {band.toFixed(1)}
        </p>
      </div>

      {/* Criteria breakdown */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Criteria Breakdown
        </h3>
        {Object.entries(criteria).map(([key, score]) => (
          <div
            key={key}
            className="rounded-xl border border-border bg-card px-5 py-4"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium">
                {CRITERIA_LABELS[key] ?? key}
              </span>
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
        <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Examiner Feedback
        </h3>
        <div className="rounded-xl border border-border bg-card p-5 text-sm leading-relaxed text-foreground/90">
          {feedback}
        </div>
      </div>

      {/* Submitted text */}
      {submission && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Your Response
          </h3>
          <div className="rounded-xl border border-border bg-muted/30 p-5 text-sm leading-relaxed text-foreground/80 whitespace-pre-wrap">
            {submission}
          </div>
        </div>
      )}
    </div>
  );
}

export function ResultLayout4({ result }: ResultLayout4Props) {
  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-10">
      {/* Overall header */}
      <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
        <p className="mb-1 text-sm font-medium uppercase tracking-widest text-muted-foreground">
          IELTS Writing Overall Band
        </p>
        <p
          className={cn(
            "text-7xl font-bold",
            bandScoreColor(result.overall_band)
          )}
        >
          {result.overall_band.toFixed(1)}
        </p>
        <div className="mt-4 flex items-center justify-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {formatTimeUsed(result.time_used_seconds)}
          </span>
          <Separator orientation="vertical" className="h-4" />
          <span>
            Task 1: <strong>{result.task1_band.toFixed(1)}</strong>
          </span>
          <span>
            Task 2: <strong>{result.task2_band.toFixed(1)}</strong>
          </span>
        </div>
      </div>

      {/* Per-task tabs */}
      <Tabs defaultValue="task1">
        <TabsList className="w-full">
          <TabsTrigger value="task1" className="flex-1">
            Task 1
          </TabsTrigger>
          <TabsTrigger value="task2" className="flex-1">
            Task 2
          </TabsTrigger>
        </TabsList>

        <TabsContent value="task1" className="mt-6">
          <CriteriaPanel
            label="Task 1"
            band={result.task1_band}
            criteria={result.criteria_task1}
            feedback={result.feedback_task1}
            submission={result.submitted_task1}
          />
        </TabsContent>

        <TabsContent value="task2" className="mt-6">
          <CriteriaPanel
            label="Task 2"
            band={result.task2_band}
            criteria={result.criteria_task2}
            feedback={result.feedback_task2}
            submission={result.submitted_task2}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
