/**Apply only to layout 1 and layout 2 - Ielts Listening and Ielts Reading */


"use client";

import { cn } from "@/lib/utils";
import type { Question } from "../types";

interface QuestionRendererProps {
  question: Question;
  answer: string | string[] | undefined;
  onAnswer: (value: string | string[]) => void;
  showNumber?: boolean;
}

export function QuestionRenderer({
  question,
  answer,
  onAnswer,
  showNumber = true,
}: QuestionRendererProps) {
  return (
    <div className="space-y-3">
      {showNumber && (
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Question {question.number}
        </p>
      )}
      <p className="text-sm leading-relaxed text-foreground"><div dangerouslySetInnerHTML={{ __html: question.question }} /> </p>

      {question.type_question === "multiple-choice" && question.answers_option && (
        <div className="space-y-2">
          {question.answers_option.map((opt) => {
            const selected = answer === opt.key;
            return (
              <button
                key={opt.key}
                onClick={() => onAnswer(opt.key)}
                className={cn(
                  "flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-colors",
                  selected
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-background text-foreground hover:border-foreground/40 hover:bg-muted"
                )}
              >
                <span className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs font-semibold",
                  selected ? "border-background text-background" : "border-muted-foreground text-muted-foreground"
                )}>
                  {opt.key}
                </span>
                <span className="leading-relaxed">{opt.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {question.type_question === "multi-select" && question.answers_option && (
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Select all that apply</p>
          {question.answers_option.map((opt) => {
            const selected = Array.isArray(answer) && answer.includes(opt.key);
            return (
              <button
                key={opt.key}
                onClick={() => {
                  const current = Array.isArray(answer) ? answer : [];
                  const next = selected
                    ? current.filter((k) => k !== opt.key)
                    : [...current, opt.key];
                  onAnswer(next);
                }}
                className={cn(
                  "flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-colors",
                  selected
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-background text-foreground hover:border-foreground/40 hover:bg-muted"
                )}
              >
                <span className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-xs font-semibold",
                  selected ? "border-background text-background" : "border-muted-foreground text-muted-foreground"
                )}>
                  {opt.key}
                </span>
                <span className="leading-relaxed">{opt.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {question.type_question === "completion" && (
        <input
          type="text"
          value={typeof answer === "string" ? answer : ""}
          onChange={(e) => onAnswer(e.target.value)}
          placeholder="Type your answer here…"
          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      )}
    </div>
  );
}
