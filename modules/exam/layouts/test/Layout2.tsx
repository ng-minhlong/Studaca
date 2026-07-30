"use client";

import { ChevronLeft, ChevronRight, Send, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useExam } from "../../engine";
import { QuestionRenderer } from "../../renderers/QuestionRenderer";
import { ExamTimer } from "../../components/ExamTimer";
import type { Layout2Test } from "../../types";
import { cn } from "@/lib/utils";

interface Layout2Props {
  test: Layout2Test;
}

export function Layout2({ test }: Layout2Props) {
  const { state, setAnswer, nextPart, prevPart, finish } = useExam();
  const { currentPartIndex, answers, timeRemainingSeconds } = state;

  const part = test.parts[currentPartIndex];

  const allQuestions = test.parts.flatMap((p) =>
    p.questionRanges.flatMap((r) => r.questions)
  );
  const answeredCount = allQuestions.filter((q) => {
    const a = answers[q.id];
    return a !== undefined && a !== "" && !(Array.isArray(a) && a.length === 0);
  }).length;

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      {/* Header */}
      <header className="flex shrink-0 items-center justify-between border-b border-border bg-background px-6 py-3">
        <div>
          <h1 className="text-sm font-semibold">{test.title}</h1>
          <p className="text-xs text-muted-foreground">
            Part {currentPartIndex + 1} of {test.parts.length} · {answeredCount}/{allQuestions.length} answered
          </p>
        </div>
        <div className="flex items-center gap-4">
          <ExamTimer seconds={timeRemainingSeconds} />
          <Button size="sm" onClick={finish} variant="outline" className="gap-1.5">
            <Send className="h-3.5 w-3.5" />
            Submit
          </Button>
        </div>
      </header>

      {/* Part tabs */}
      <div className="flex shrink-0 gap-1 border-b border-border bg-muted/30 px-6 py-2">
        {test.parts.map((p, idx) => (
          <button
            key={p.id}
            onClick={() => {
              const diff = idx - currentPartIndex;
              if (diff < 0) {
                for (let i = 0; i < Math.abs(diff); i++) prevPart();
              } else {
                for (let i = 0; i < diff; i++) nextPart();
              }
            }}
            className={cn(
              "rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors",
              idx === currentPartIndex
                ? "bg-background text-foreground shadow-sm border border-border"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Part {idx + 1}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-2xl space-y-6 px-4 py-6">
          {/* Part title */}
          <div>
            <h2 className="text-base font-semibold">{part.title}</h2>
          </div>

          {/* Audio player */}
          <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/30 px-5 py-4">
            <Volume2 className="h-5 w-5 shrink-0 text-muted-foreground" />
            <div className="flex-1">
              <p className="mb-1.5 text-xs text-muted-foreground">Audio Track – Part {currentPartIndex + 1}</p>
              <audio
                controls
                className="w-full"
                src={part.audio_link}
              >
                Your browser does not support audio.
              </audio>
            </div>
          </div>

          {/* Question ranges */}
          {part.questionRanges.map((range, rIdx) => (
            <div key={rIdx} className="space-y-4">
              <div className="rounded-lg bg-muted/40 px-4 py-2.5">
                <p className="text-xs font-semibold text-muted-foreground">{range.label}</p>
              </div>
              {range.questions.map((q) => (
                <div key={q.id} className="rounded-xl border border-border bg-card p-4 shadow-sm">
                  <QuestionRenderer
                    question={q}
                    answer={answers[q.id]}
                    onAnswer={(val) => setAnswer(q.id, val)}
                  />
                </div>
              ))}
            </div>
          ))}

          {/* Navigation */}
          <div className="flex justify-between pb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={prevPart}
              disabled={currentPartIndex === 0}
              className="gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous Part
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextPart}
              disabled={currentPartIndex === test.parts.length - 1}
              className="gap-1"
            >
              Next Part
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
