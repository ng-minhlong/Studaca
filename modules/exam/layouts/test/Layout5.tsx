"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Bookmark, BookmarkCheck, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useExam } from "../../engine";
import { ExamTimer } from "../../components/ExamTimer";
import type { Layout5Test, SatQuestion } from "../../types";
import { cn } from "@/lib/utils";

interface Layout5Props {
  test: Layout5Test;
}

function AnswerOption({
  letter,
  label,
  selected,
  onSelect,
}: {
  letter: string;
  label: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors",
        selected
          ? "border-primary bg-primary/10 text-foreground"
          : "border-border bg-card hover:border-primary/40 hover:bg-muted/40"
      )}
    >
      <span
        className={cn(
          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs font-semibold",
          selected
            ? "border-primary bg-primary text-primary-foreground"
            : "border-muted-foreground/40 text-muted-foreground"
        )}
      >
        {letter}
      </span>
      <span className="leading-relaxed">{label}</span>
    </button>
  );
}

export function Layout5({ test }: Layout5Props) {
  const { state, setAnswer, toggleBookmark, finish } = useExam();
  const { answers, bookmarks, timeRemainingSeconds } = state;

  const [currentIndex, setCurrentIndex] = useState(0);

  const totalQuestions = test.questions.length;
  const question: SatQuestion = test.questions[currentIndex];
  const currentAnswer = (answers[question.id] as string) ?? "";
  const isBookmarked = bookmarks.has(question.id);

  const answeredCount = test.questions.filter((q) => answers[q.id] != null).length;

  const goTo = (idx: number) => {
    if (idx >= 0 && idx < totalQuestions) setCurrentIndex(idx);
  };

  // Group questions by module for the sidebar
  const modules = Array.from(new Set(test.questions.map((q) => q.module ?? "Module 1")));

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      {/* Header */}
      <header className="flex shrink-0 items-center justify-between border-b border-border bg-background px-6 py-3">
        <div className="flex items-center gap-3">
          <h1 className="text-sm font-semibold">{test.title}</h1>
          {question.module && (
            <Badge variant="outline" className="text-xs">
              {question.module}
            </Badge>
          )}
          {question.domain && (
            <Badge variant="secondary" className="text-xs">
              {question.domain}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-muted-foreground tabular-nums">
            {answeredCount}/{totalQuestions} answered
          </span>
          <ExamTimer seconds={timeRemainingSeconds} />
          <Button size="sm" onClick={finish} variant="outline" className="gap-1.5">
            <Send className="h-3.5 w-3.5" />
            Submit
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar: question grid */}
        <aside className="flex w-64 shrink-0 flex-col border-r border-border bg-background">
          <div className="border-b border-border px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Questions
            </p>
          </div>
          <ScrollArea className="flex-1 px-4 py-4">
            {modules.map((mod) => {
              const modQs = test.questions.filter(
                (q) => (q.module ?? "Module 1") === mod
              );
              return (
                <div key={mod} className="mb-4">
                  <p className="mb-2 text-xs font-medium text-muted-foreground">{mod}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {modQs.map((q) => {
                      const idx = test.questions.indexOf(q);
                      const answered = answers[q.id] != null;
                      const active = idx === currentIndex;
                      const bm = bookmarks.has(q.id);
                      return (
                        <button
                          key={q.id}
                          onClick={() => goTo(idx)}
                          className={cn(
                            "relative flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold transition-colors",
                            active
                              ? "bg-primary text-primary-foreground"
                              : answered
                              ? "bg-primary/20 text-primary"
                              : "bg-muted text-muted-foreground hover:bg-muted/70"
                          )}
                        >
                          {q.number}
                          {bm && (
                            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-amber-500" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </ScrollArea>
        </aside>

        {/* Main content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <ScrollArea className="flex-1">
            <div className="mx-auto max-w-3xl px-8 py-8">
              {/* Passage (if any) */}
              {question.passage && (
                <div className="mb-6 rounded-xl border border-border bg-muted/30 p-6 text-sm leading-relaxed text-foreground/80">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Passage
                  </p>
                  <p className="whitespace-pre-line">{question.passage}</p>
                </div>
              )}

              {/* Question */}
              <div className="space-y-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      {question.number}
                    </span>
                    <p className="text-sm font-medium leading-relaxed text-foreground">
                      {question.question}
                    </p>
                  </div>
                  <button
                    onClick={() => toggleBookmark(question.id)}
                    className="shrink-0 text-muted-foreground transition-colors hover:text-amber-500"
                    aria-label={isBookmarked ? "Remove bookmark" : "Bookmark question"}
                  >
                    {isBookmarked ? (
                      <BookmarkCheck className="h-4 w-4 text-amber-500" />
                    ) : (
                      <Bookmark className="h-4 w-4" />
                    )}
                  </button>
                </div>

                {/* Multiple choice */}
                {question.type_question === "multiple-choice" &&
                  question.answers !== "" && (
                    <div className="space-y-2">
                      {(
                        Object.entries(question.answers) as [string, string][]
                      ).map(([key, label]) => {
                        const letter = key.replace("answer_", "").toUpperCase();
                        // Map answer_1 -> A, answer_2 -> B, etc.
                        const letterMap: Record<string, string> = {
                          "1": "A",
                          "2": "B",
                          "3": "C",
                          "4": "D",
                        };
                        const displayLetter = letterMap[letter] ?? letter;
                        const answerKey = `answer_${letter.toLowerCase()}`;
                        return (
                          <AnswerOption
                            key={key}
                            letter={displayLetter}
                            label={label}
                            selected={currentAnswer === key}
                            onSelect={() => setAnswer(question.id, key)}
                          />
                        );
                      })}
                    </div>
                  )}

                {/* Free-response / completion */}
                {question.type_question === "completion" && (
                  <input
                    type="text"
                    value={currentAnswer}
                    onChange={(e) => setAnswer(question.id, e.target.value)}
                    placeholder="Enter your answer"
                    className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                )}
              </div>
            </div>
          </ScrollArea>

          {/* Bottom navigation */}
          <div className="flex shrink-0 items-center justify-between border-t border-border bg-background px-8 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => goTo(currentIndex - 1)}
              disabled={currentIndex === 0}
              className="gap-1.5"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <span className="text-xs text-muted-foreground tabular-nums">
              {currentIndex + 1} / {totalQuestions}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => goTo(currentIndex + 1)}
              disabled={currentIndex === totalQuestions - 1}
              className="gap-1.5"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
