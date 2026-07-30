"use client";

import { Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Layout0Test } from "../../types";
import { useExam } from "../../engine";

interface Layout0SidebarProps {
  test: Layout0Test;
}

export function Layout0Sidebar({ test }: Layout0SidebarProps) {
  const { state, setPart, setQuestion } = useExam();
  const { answers, bookmarks, currentPartIndex } = state;

  // Build a flat list of all question IDs per part
  return (
    <aside className="sticky top-0 flex h-screen flex-col gap-4 overflow-y-auto border-l border-border bg-background p-4">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Navigation
      </h2>

      {test.parts.map((part, pIdx) => {
        const isActivePart = pIdx === currentPartIndex;
        return (
          <div key={part.id} className="space-y-2">
            <button
              onClick={() => setPart(pIdx)}
              className={cn(
                "w-full rounded-md px-3 py-2 text-left text-xs font-semibold transition-colors",
                isActivePart
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {part.title}
            </button>

            {isActivePart && (
              <div className="flex flex-wrap gap-1.5 px-1">
                {part.questions.map((q, qIdx) => {
                  const answered = answers[q.id] !== undefined && answers[q.id] !== "" && !(Array.isArray(answers[q.id]) && (answers[q.id] as string[]).length === 0);
                  const bookmarked = bookmarks.has(q.id);
                  const isCurrentQ = qIdx === state.currentQuestionIndex && isActivePart;

                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        setPart(pIdx);
                        setQuestion(qIdx);
                      }}
                      title={`Question ${q.number}${bookmarked ? " (bookmarked)" : ""}`}
                      className={cn(
                        "relative flex h-7 w-7 items-center justify-center rounded text-xs font-medium transition-colors",
                        isCurrentQ
                          ? "ring-2 ring-foreground ring-offset-1"
                          : "",
                        answered
                          ? "bg-foreground text-background"
                          : "border border-border bg-background text-muted-foreground hover:border-foreground/40"
                      )}
                    >
                      {q.number}
                      {bookmarked && (
                        <span className="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-amber-400">
                          <Bookmark className="h-1.5 w-1.5 fill-white text-white" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      {/* Legend */}
      <div className="mt-auto space-y-1.5 pt-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Legend
        </p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="flex h-5 w-5 items-center justify-center rounded bg-foreground text-background text-[10px]">1</span>
          <span>Answered</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="flex h-5 w-5 items-center justify-center rounded border border-border text-[10px]">1</span>
          <span>Unanswered</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="relative flex h-5 w-5 items-center justify-center rounded border border-border text-[10px]">
            1
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-amber-400" />
          </span>
          <span>Bookmarked</span>
        </div>
      </div>
    </aside>
  );
}
