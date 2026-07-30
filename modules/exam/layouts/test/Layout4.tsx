"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Send, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useExam } from "../../engine";
import { ExamTimer } from "../../components/ExamTimer";
import type { Layout4Test } from "../../types";
import { countWords } from "../../utils";
import { cn } from "@/lib/utils";

interface Layout4Props {
  test: Layout4Test;
}

export function Layout4({ test }: Layout4Props) {
  const { state, nextPart, prevPart, finish } = useExam();
  const { currentPartIndex, timeRemainingSeconds } = state;

  // Preserve text per task
  const [texts, setTexts] = useState<Record<string, string>>({});

  const part = test.parts[currentPartIndex];
  const text = texts[part.id] ?? "";
  const wordCount = countWords(text);
  const meetsMin = wordCount >= part.min_words;

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      {/* Header */}
      <header className="flex shrink-0 items-center justify-between border-b border-border bg-background px-6 py-3">
        <div>
          <h1 className="text-sm font-semibold">{test.title}</h1>
        </div>
        <div className="flex items-center gap-4">
          <ExamTimer seconds={timeRemainingSeconds} />
          <Button size="sm" onClick={finish} variant="outline" className="gap-1.5">
            <Send className="h-3.5 w-3.5" />
            Submit
          </Button>
        </div>
      </header>

      {/* Task tabs */}
      <div className="flex shrink-0 gap-1 border-b border-border bg-muted/30 px-6 py-2">
        {test.parts.map((p, idx) => (
          <button
            key={p.id}
            onClick={() => {
              const diff = idx - currentPartIndex;
              if (diff < 0) prevPart();
              else if (diff > 0) nextPart();
            }}
            className={cn(
              "rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors",
              idx === currentPartIndex
                ? "bg-background text-foreground shadow-sm border border-border"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {p.task_label}
          </button>
        ))}
      </div>

      {/* Split screen */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: question + image */}
        <div className="flex w-1/2 flex-col overflow-y-auto border-r border-border">
          <div className="flex-1 space-y-4 px-8 py-6">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{part.task_label}</Badge>
            </div>
            <p className="text-sm font-medium leading-relaxed text-foreground">
              {part.question}
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">{part.instructions}</p>
            {part.image_url && (
              <div className="overflow-hidden rounded-xl border border-border bg-muted/30">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={part.image_url}
                  alt="Task illustration"
                  className="w-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                <div className="flex items-center gap-2 px-4 py-3 text-xs text-muted-foreground">
                  <ImageIcon className="h-3.5 w-3.5" />
                  Task illustration
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: textarea */}
        <div className="flex w-1/2 flex-col overflow-hidden">
          <div className="flex items-center justify-between border-b border-border px-5 py-2.5">
            <span className="text-xs text-muted-foreground">Your response</span>
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "text-xs font-medium tabular-nums",
                  meetsMin ? "text-emerald-600" : "text-amber-600"
                )}
              >
                {wordCount} words
              </span>
              <span className="text-xs text-muted-foreground">/ min {part.min_words}</span>
            </div>
          </div>
          <textarea
            value={text}
            onChange={(e) =>
              setTexts((prev) => ({ ...prev, [part.id]: e.target.value }))
            }
            placeholder={`Write your ${part.task_label} response here…`}
            className="flex-1 resize-none bg-background px-5 py-4 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground focus:outline-none"
            spellCheck
          />
          <div className="flex items-center justify-between border-t border-border px-5 py-3">
            <Button
              variant="outline"
              size="sm"
              onClick={prevPart}
              disabled={currentPartIndex === 0}
              className="gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous Task
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextPart}
              disabled={currentPartIndex === test.parts.length - 1}
              className="gap-1"
            >
              Next Task
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
