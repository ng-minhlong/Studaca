/**Apply to layout 1 and layout 2 - Ielts Listening and Ielts Reading */

"use client";

import React, { useMemo } from "react";
import { cn } from "@/lib/utils";
import type { Question, QuestionType } from "../types";
import { countInputPlaceholders } from "../utils/examNumbering";

interface QuestionRendererProps {
  question: Question;
  partId?: string;
  rangeType?: QuestionType | string;
  answer: string | string[] | undefined;
  answersMap?: Record<string, string | string[]>;
  onAnswer: (value: string | string[]) => void;
  onAnswerKey?: (key: string, value: string | string[]) => void;
  displayNumber?: number;
  showNumber?: boolean;
}

/**
 * Renders HTML containing <input> tags replaced by interactive React inputs
 */
function CompletionHtmlWithInputs({
  html,
  partId,
  baseQuestionId,
  startNumber,
  answersMap,
  onAnswerKey,
}: {
  html: string;
  partId?: string;
  baseQuestionId: string;
  startNumber: number;
  answersMap?: Record<string, string | string[]>;
  onAnswerKey?: (key: string, value: string | string[]) => void;
}) {
  const parts = useMemo(() => {
    return html.split(/<input\b[^>]*\/?>/gi);
  }, [html]);

  const inputCount = Math.max(0, parts.length - 1);

  return (
    <div className="text-sm leading-relaxed text-foreground space-y-2">
      {parts.map((segment, index) => {
        const isLast = index === parts.length - 1;
        const currentInputNumber = startNumber + index;
        const keyPrefix = partId ? `${partId}_${baseQuestionId}` : baseQuestionId;
        const answerKey = inputCount > 1 ? `${keyPrefix}_input_${index}` : keyPrefix;
        const value = (answersMap?.[answerKey] as string) ?? "";

        return (
          <React.Fragment key={index}>
            <span dangerouslySetInnerHTML={{ __html: segment }} />
            {!isLast && (
              <span className="inline-flex items-center mx-1 my-1 align-middle">
                <input
                  type="text"
                  value={value}
                  onChange={(e) => onAnswerKey?.(answerKey, e.target.value)}
                  placeholder={`Question ${currentInputNumber}`}
                  className="inline-block w-40 min-w-[130px] rounded-md border border-input bg-background px-2.5 py-1 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-2xs font-normal"
                />
              </span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export function QuestionRenderer({
  question,
  partId,
  rangeType,
  answer,
  answersMap,
  onAnswer,
  onAnswerKey,
  displayNumber,
  showNumber = true,
}: QuestionRendererProps) {
  const effectiveType = rangeType || question.type_question || "completion";
  const qNumber = displayNumber ?? question.number;
  const isCompletion = effectiveType === "completion";
  const hasInputTag = isCompletion && countInputPlaceholders(question.question || "") > 0;

  return (
    <div className="space-y-3">
      {showNumber && !hasInputTag && (
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Question {qNumber}
        </p>
      )}

      {hasInputTag ? (
        <CompletionHtmlWithInputs
          html={question.question}
          partId={partId}
          baseQuestionId={question.id}
          startNumber={qNumber}
          answersMap={answersMap}
          onAnswerKey={onAnswerKey}
        />
      ) : (
        <div
          className="text-sm leading-relaxed text-foreground"
          dangerouslySetInnerHTML={{ __html: question.question }}
        />
      )}

      {effectiveType === "multiple-choice" && question.answers_option && (
        <div className="space-y-2">
          {question.answers_option.map((opt) => {
            const selected = answer === opt.key;
            return (
              <button
                key={opt.key}
                type="button"
                onClick={() => onAnswer(opt.key)}
                className={cn(
                  "flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-colors",
                  selected
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-background text-foreground hover:border-foreground/40 hover:bg-muted"
                )}
              >
                <span
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs font-semibold",
                    selected
                      ? "border-background text-background"
                      : "border-muted-foreground text-muted-foreground"
                  )}
                >
                  {opt.key}
                </span>
                <span className="leading-relaxed">{opt.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {effectiveType === "multi-select" && question.answers_option && (
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Select all that apply</p>
          {question.answers_option.map((opt) => {
            const selected = Array.isArray(answer) && answer.includes(opt.key);
            return (
              <button
                key={opt.key}
                type="button"
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
                <span
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-xs font-semibold",
                    selected
                      ? "border-background text-background"
                      : "border-muted-foreground text-muted-foreground"
                  )}
                >
                  {opt.key}
                </span>
                <span className="leading-relaxed">{opt.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {effectiveType === "completion" && !hasInputTag && (
        <input
          type="text"
          value={typeof answer === "string" ? answer : ""}
          onChange={(e) => onAnswer(e.target.value)}
          placeholder={`Enter answer for Question ${qNumber}…`}
          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      )}
    </div>
  );
}
