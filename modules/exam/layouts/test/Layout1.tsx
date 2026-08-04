"use client";

import { ChevronLeft, ChevronRight, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useExam } from "../../engine";
import { QuestionRenderer } from "../../renderers/QuestionRenderer";
import { ExamTimer } from "../../components/ExamTimer";
import type { Layout1Test } from "../../types";
import { cn } from "@/lib/utils";

interface Layout1Props {
  test: Layout1Test;
}

export function Layout1({ test }: Layout1Props) {
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
    <div className="mt-16 flex h-[calc(100vh-4rem)] flex-col overflow-hidden bg-background">
      {/* Header */}
      <header className="flex shrink-0 items-center justify-between border-b border-border bg-background px-6 py-3">
        <div>
          <h1 className="text-sm font-semibold">{test.title}</h1>
          <p className="text-xs text-muted-foreground">
            Passage {currentPartIndex + 1} of {test.parts.length} · {answeredCount}/{allQuestions.length} answered
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

      {/* Part navigation tabs */}
      <div className="flex shrink-0 gap-1 border-b border-border bg-muted/30 px-6 py-2">
        {test.parts.map((p, idx) => (
          <button
            key={p.id}
            onClick={() => {
              // use state dispatch directly
              if (idx < currentPartIndex) prevPart();
              else if (idx > currentPartIndex) nextPart();
            }}
            className={cn(
              "rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors",
              idx === currentPartIndex
                ? "bg-background text-foreground shadow-sm border border-border"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Passage {idx + 1}
          </button>
        ))}
      </div>

      {/* Split screen */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Paragraph */}
        <ScrollArea className="w-1/2 border-r border-border">
          <div className="px-8 py-6">
            <h2 className="mb-4 text-base font-semibold leading-snug text-foreground">
              {part.title}
            </h2>
            <div
              dangerouslySetInnerHTML={{ __html: part.paragraph }}
            />
          </div>
        </ScrollArea>

        {/* Right: Questions */}
        <ScrollArea className="w-1/2">
          <div className="space-y-8 px-8 py-6">
            {part.questionRanges.map((range, rIdx) => (
              <div key={rIdx} className="space-y-4">
                <div className="rounded-lg bg-muted/40 px-4 py-2.5">
                  <p className="text-xs font-semibold text-muted-foreground"><div dangerouslySetInnerHTML={{ __html: range.label }} /> </p>
                  {range.description ? (
                    <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                      <div
                          dangerouslySetInnerHTML={{ __html: range.description }}
                      />
                      
                     
                    </p>
                  ) : null}
                </div>
                <div className="space-y-4">
                  {range.questions.map((q) => (
                    <div
                      key={q.id}
                      className="rounded-xl border border-border bg-card p-4 shadow-sm"
                    >
                      <QuestionRenderer
                        question={q}
                        answer={answers[q.id]}
                        onAnswer={(val) => setAnswer(q.id, val)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Part navigation */}
            <div className="flex justify-between pb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={prevPart}
                disabled={currentPartIndex === 0}
                className="gap-1"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous Passage
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={nextPart}
                disabled={currentPartIndex === test.parts.length - 1}
                className="gap-1"
              >
                Next Passage
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
