/**Use for digital sat - both verbal and math */

"use client";

import { useState } from "react";
import {
  Bookmark,
  BookmarkCheck,
  Calculator,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Circle,
  Send,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useExam } from "../../engine";
import { ExamTimer } from "../../components/ExamTimer";
import { authClient } from "@/lib/auth-client";
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
  const { data: session } = authClient.useSession();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showNavigator, setShowNavigator] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);

  const totalQuestions = test.questions.length;
  const question: SatQuestion = test.questions[currentIndex];
  const currentAnswer = (answers[question.id] as string) ?? "";
  const isBookmarked = bookmarks.has(question.id);
  const userName = session?.user?.name || session?.user?.email || "Student";

  const answeredCount = test.questions.filter((q) => answers[q.id] != null).length;

  const goTo = (idx: number) => {
    if (idx >= 0 && idx < totalQuestions) setCurrentIndex(idx);
  };

  return (
    <div className="mt-16 flex h-[calc(100vh-4rem)] flex-col overflow-hidden bg-background">
      <header className="shrink-0 border-b border-border bg-background">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="min-w-0">
            <h1 className="truncate text-sm font-semibold">{test.title}</h1>
            <p className="text-xs text-muted-foreground">Digital SAT</p>
          </div>

          <div className="flex flex-1 justify-center">
            <ExamTimer seconds={timeRemainingSeconds} />
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowCalculator(true)}
              className="h-9 w-9"
              aria-label="Open calculator"
            >
              <Calculator className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <hr className="border-border" />
      </header>

      <div className="flex flex-1 overflow-hidden">
        <div className="grid h-full w-full grid-cols-1 lg:grid-cols-2">
          <div className="border-r border-border bg-muted/10">
            <ScrollArea className="h-full">
              <div className="mx-auto max-w-2xl px-6 py-8 lg:px-8">
                {question.passage && (
                  <div className="mb-6 rounded-2xl border border-border bg-background/70 p-6 text-sm leading-relaxed text-foreground/80 shadow-sm">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      Passage
                    </p>
                    <div dangerouslySetInnerHTML={{ __html: question.passage }} />
                  </div>
                )}

                <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
                  <div className="mb-4 flex flex-wrap items-center gap-2">
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
                    <Badge variant="secondary" className="text-xs">
                      Question {question.number}
                    </Badge>
                  </div>
                  <div
                    className="text-sm leading-relaxed text-foreground"
                    dangerouslySetInnerHTML={{ __html: question.question }}
                  />
                </div>
              </div>
            </ScrollArea>
          </div>

          <div className="flex flex-col bg-background">
            <ScrollArea className="flex-1">
              <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-6 py-8 lg:px-8">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        Your answer
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Choose the best option for this question.
                      </p>
                    </div>
                    <button
                      onClick={() => toggleBookmark(question.id)}
                      className="shrink-0 text-muted-foreground transition-colors hover:text-amber-500"
                      aria-label={isBookmarked ? "Remove bookmark" : "Bookmark question"}
                    >
                      {isBookmarked ? (
                        <BookmarkCheck className="h-5 w-5 text-amber-500" />
                      ) : (
                        <Bookmark className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  {question.type_question === "multiple-choice" &&
                    question.answers &&
                    Object.keys(question.answers).length > 0 && (
                      <div className="space-y-2">
                        {Object.entries(question.answers).map(([key, label]) => {
                          const letter = key.replace("answer_", "").toUpperCase();
                          const letterMap: Record<string, string> = {
                            "1": "A",
                            "2": "B",
                            "3": "C",
                            "4": "D",
                          };
                          const displayLetter = letterMap[letter] ?? letter;

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

                  {question.type_question === "completion" && (
                    <input
                      type="text"
                      value={currentAnswer}
                      onChange={(e) => setAnswer(question.id, e.target.value)}
                      placeholder="Enter your answer"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  )}
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>

      <footer className="shrink-0 border-t border-border bg-background">
        <hr className="border-border" />
        <div className="flex items-center justify-between gap-3 px-6 py-3">
          <div className="min-w-0">
            <p className="text-sm font-medium">{userName}</p>
            <p className="text-xs text-muted-foreground">{answeredCount}/{totalQuestions} answered</p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => goTo(currentIndex - 1)}
              disabled={currentIndex === 0}
              className="h-9 w-9"
              aria-label="Previous question"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowNavigator((prev) => !prev)}
                className="min-w-[120px]"
              >
                Question {currentIndex + 1} of {totalQuestions}
              </Button>

              {showNavigator && (
                <div className="absolute bottom-full left-1/2 mb-2 w-[min(560px,calc(100vw-2rem))] -translate-x-1/2 rounded-xl border border-border bg-background p-3 shadow-xl">
                  <div className="flex flex-wrap gap-2">
                    {test.questions.map((q, idx) => {
                      const answered = answers[q.id] != null;
                      const active = idx === currentIndex;
                      const bookmarked = bookmarks.has(q.id);

                      return (
                        <button
                          key={q.id}
                          onClick={() => {
                            goTo(idx);
                            setShowNavigator(false);
                          }}
                          className={cn(
                            "flex items-center gap-2 rounded-full border px-3 py-2 text-sm transition-colors",
                            active
                              ? "border-primary bg-primary text-primary-foreground"
                              : answered
                              ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-700"
                              : "border-border bg-background text-muted-foreground hover:text-foreground"
                          )}
                        >
                          {answered ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : (
                            <Circle className="h-4 w-4" />
                          )}
                          <span>{q.number}</span>
                          {bookmarked && <span className="text-amber-500">★</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => goTo(currentIndex + 1)}
              disabled={currentIndex === totalQuestions - 1}
              className="h-9 w-9"
              aria-label="Next question"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <Button size="sm" onClick={finish} className="gap-1.5">
            <Send className="h-3.5 w-3.5" />
            Submit
          </Button>
        </div>
      </footer>

      {showCalculator && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4">
          <div className="flex h-[85vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <div>
                <p className="text-sm font-semibold">Calculator demo</p>
                <p className="text-xs text-muted-foreground">Quick reference while you work</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setShowCalculator(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <iframe
              title="Calculator demo"
              src="https://www.desmos.com/scientific"
              className="h-full w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
}
