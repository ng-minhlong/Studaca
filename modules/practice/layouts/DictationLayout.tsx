"use client";

import Link from "next/link";
import { ChevronLeft, Volume2, Eye, EyeOff, CheckCircle2, ArrowLeft, ArrowRight, Flag } from "lucide-react";
import { useState, useRef } from "react";
import { usePractice } from "../engine";
import type { DictationPractice } from "../types";

function formatTime(s: number) {
  const m = Math.floor(s / 60).toString().padStart(2, "0");
  const sec = (s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
}

export function DictationLayout() {
  const { practice, state, totalItems, setDictationAnswer, next, prev, jump, finish } =
    usePractice();
  const p = practice as DictationPractice;
  const sentence = p.sentences[state.currentIndex];

  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const answer = state.dictationAnswers[sentence.id] ?? "";
  const isLast = state.currentIndex === totalItems - 1;
  const allAnswered = p.sentences.every((s) => (state.dictationAnswers[s.id] ?? "").trim() !== "");

  const toggleReveal = (id: string) =>
    setRevealed((prev) => ({ ...prev, [id]: !prev[id] }));

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-10 border-b border-border bg-background/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-3">
          <Link
            href="/"
            className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            Exit
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">{formatTime(state.elapsedSeconds)}</span>
            <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
              {state.currentIndex + 1} / {totalItems}
            </span>
          </div>
          <button
            onClick={finish}
            className="flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
          >
            <Flag className="h-3 w-3" />
            Finish
          </button>
        </div>
      </header>

      {/* Progress dots */}
      <div className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-3xl items-center gap-1.5 overflow-x-auto px-4 py-2.5 scrollbar-none">
          {p.sentences.map((s, i) => {
            const done = (state.dictationAnswers[s.id] ?? "").trim() !== "";
            const active = i === state.currentIndex;
            return (
              <button
                key={s.id}
                onClick={() => jump(i)}
                title={`Sentence ${s.number}`}
                className={`h-2 flex-1 min-w-[16px] max-w-[32px] rounded-full transition-colors ${
                  active
                    ? "bg-foreground"
                    : done
                    ? "bg-foreground/40"
                    : "bg-border"
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Main */}
      <main className="flex flex-1 justify-center px-4 py-10">
        <div className="w-full max-w-2xl">
          {/* Sentence header */}
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background">
              {sentence.number}
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Dictation
              </p>
              {sentence.hint && (
                <p className="text-xs text-muted-foreground">{sentence.hint}</p>
              )}
            </div>
          </div>

          {/* Audio player */}
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-border bg-card p-4">
            <audio ref={audioRef} src={sentence.audio_link} preload="metadata" />
            <button
              onClick={playAudio}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-foreground text-background shadow-sm transition-opacity hover:opacity-80"
              aria-label="Play audio"
            >
              <Volume2 className="h-4 w-4" />
            </button>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Play audio</p>
              <p className="text-xs text-muted-foreground">
                You can replay as many times as needed
              </p>
            </div>
          </div>

          {/* Answer input */}
          <div className="mb-4">
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Type what you hear
            </label>
            <textarea
              value={answer}
              onChange={(e) => setDictationAnswer(sentence.id, e.target.value)}
              rows={3}
              placeholder="Type the sentence exactly as you hear it..."
              className="w-full resize-none rounded-xl border border-border bg-card p-4 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-foreground/40 focus:outline-none focus:ring-0 transition-colors"
            />
          </div>

          {/* Reveal transcript */}
          <button
            onClick={() => toggleReveal(sentence.id)}
            className="mb-6 flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            {revealed[sentence.id] ? (
              <EyeOff className="h-3.5 w-3.5" />
            ) : (
              <Eye className="h-3.5 w-3.5" />
            )}
            {revealed[sentence.id] ? "Hide transcript" : "Show transcript"}
          </button>

          {revealed[sentence.id] && (
            <div className="mb-6 rounded-xl border border-border bg-muted/50 p-4">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Transcript
              </p>
              <p className="text-sm leading-relaxed text-foreground">
                {sentence.transcript}
              </p>
              {answer.trim() !== "" && (
                <div className="mt-3 border-t border-border pt-3">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Your answer
                  </p>
                  <p className="text-sm leading-relaxed text-foreground">{answer}</p>
                  {answer.trim().toLowerCase() ===
                  sentence.transcript.trim().toLowerCase() ? (
                    <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-emerald-600">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Perfect match
                    </p>
                  ) : (
                    <p className="mt-1.5 text-xs text-muted-foreground">
                      Review the differences above.
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={prev}
              disabled={state.currentIndex === 0}
              className="flex items-center gap-1.5 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:opacity-40"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </button>

            {isLast ? (
              <button
                onClick={finish}
                disabled={!allAnswered}
                className="flex items-center gap-1.5 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-80 disabled:opacity-40"
              >
                <Flag className="h-4 w-4" />
                Finish practice
              </button>
            ) : (
              <button
                onClick={next}
                className="flex items-center gap-1.5 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-80"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
