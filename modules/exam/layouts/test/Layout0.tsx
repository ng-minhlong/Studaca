//for general - many test

"use client";

import { Bookmark, BookmarkCheck, ChevronLeft, ChevronRight, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useExam } from "../../engine";
import { QuestionRenderer } from "../../renderers/QuestionRenderer";
import { Layout0Sidebar } from "./Layout0Sidebar";
import { ExamTimer } from "../../components/ExamTimer";
import type { Layout0Test } from "../../types";
import { cn } from "@/lib/utils";

interface Layout0Props {
  test: Layout0Test;
}

export function Layout0({ test }: Layout0Props) {
  const { state, setAnswer, toggleBookmark, setPart, setQuestion, nextQuestion, prevQuestion, finish } = useExam();
  const { currentPartIndex, currentQuestionIndex, answers, bookmarks, timeRemainingSeconds } = state;

  const part = test.parts[currentPartIndex];
  const questions = part?.questions ?? [];

  // isSingle: one question at a time
  // isSingle: false: all questions on one screen

  const allQuestions = test.parts.flatMap((p) => p.questions);
  const answeredCount = allQuestions.filter((q) => {
    const a = answers[q.id];
    return a !== undefined && a !== "" && !(Array.isArray(a) && a.length === 0);
  }).length;

  return (
    <div className="mt-16 flex h-[calc(100vh-4rem)] overflow-hidden bg-background">
      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex shrink-0 items-center justify-between border-b border-border bg-background px-6 py-3">
          <div>
            <h1 className="text-sm font-semibold text-foreground">{test.title}</h1>
            <p className="text-xs text-muted-foreground">
              {answeredCount} / {allQuestions.length} answered
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
        {test.parts.length > 1 && (
          <div className="flex shrink-0 gap-1 overflow-x-auto border-b border-border bg-muted/30 px-6 py-2">
            {test.parts.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => setPart(idx)}
                className={cn(
                  "rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors",
                  idx === currentPartIndex
                    ? "bg-background text-foreground shadow-sm border border-border"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {p.title}
              </button>
            ))}
          </div>
        )}

        {/* Questions area */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {test.isSingle ? (
            // Single question view
            <div className="mx-auto max-w-2xl space-y-6">
              {questions[currentQuestionIndex] && (
                <>
                  {/* Bookmark */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {currentPartIndex + 1}.{currentQuestionIndex + 1} of{" "}
                      {questions.length}
                    </span>
                    <button
                      onClick={() => toggleBookmark(questions[currentQuestionIndex].id)}
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {bookmarks.has(questions[currentQuestionIndex].id) ? (
                        <BookmarkCheck className="h-4 w-4 text-amber-500" />
                      ) : (
                        <Bookmark className="h-4 w-4" />
                      )}
                      {bookmarks.has(questions[currentQuestionIndex].id) ? "Bookmarked" : "Bookmark"}
                    </button>
                  </div>

                  <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                    <QuestionRenderer
                      question={questions[currentQuestionIndex]}
                      answer={answers[questions[currentQuestionIndex].id]}
                      onAnswer={(val) => setAnswer(questions[currentQuestionIndex].id, val)}
                    />
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={prevQuestion}
                      disabled={currentQuestionIndex === 0 && currentPartIndex === 0}
                      className="gap-1"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>

                    {/* Question dots */}
                    <div className="flex gap-1">
                      {questions.map((q, idx) => {
                        const answered = answers[q.id] !== undefined && answers[q.id] !== "" && !(Array.isArray(answers[q.id]) && (answers[q.id] as string[]).length === 0);
                        return (
                          <button
                            key={q.id}
                            onClick={() => setQuestion(idx)}
                            className={cn(
                              "h-2 w-2 rounded-full transition-all",
                              idx === currentQuestionIndex
                                ? "w-4 bg-foreground"
                                : answered
                                ? "bg-foreground/40"
                                : "bg-border hover:bg-muted-foreground"
                            )}
                          />
                        );
                      })}
                    </div>

                    <Button
                      variant={currentQuestionIndex === questions.length - 1 && currentPartIndex === test.parts.length - 1 ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        if (currentQuestionIndex < questions.length - 1) {
                          nextQuestion();
                        } else if (currentPartIndex < test.parts.length - 1) {
                          setPart(currentPartIndex + 1);
                          setQuestion(0);
                        }
                      }}
                      disabled={currentQuestionIndex === questions.length - 1 && currentPartIndex === test.parts.length - 1}
                      className="gap-1"
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </>
              )}
            </div>
          ) : (
            // All questions visible
            <div className="mx-auto max-w-2xl space-y-4">
              {questions.map((q, idx) => (
                <div
                  key={q.id}
                  id={`question-${q.id}`}
                  className="rounded-xl border border-border bg-card p-5 shadow-sm"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Question {q.number}
                    </span>
                    <button
                      onClick={() => toggleBookmark(q.id)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {bookmarks.has(q.id) ? (
                        <BookmarkCheck className="h-4 w-4 text-amber-500" />
                      ) : (
                        <Bookmark className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  <QuestionRenderer
                    question={q}
                    answer={answers[q.id]}
                    onAnswer={(val) => setAnswer(q.id, val)}
                    showNumber={false}
                  />
                </div>
              ))}

              {/* Part navigation */}
              {test.parts.length > 1 && (
                <div className="flex justify-between pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPart(currentPartIndex - 1)}
                    disabled={currentPartIndex === 0}
                    className="gap-1"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous Part
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPart(currentPartIndex + 1)}
                    disabled={currentPartIndex === test.parts.length - 1}
                    className="gap-1"
                  >
                    Next Part
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Sidebar — 30% */}
      <div className="hidden w-72 shrink-0 lg:block">
        <Layout0Sidebar test={test} />
      </div>
    </div>
  );
}
