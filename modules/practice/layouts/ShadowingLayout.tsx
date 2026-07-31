"use client";

import Link from "next/link";
import {
  ChevronLeft, Volume2, Mic, MicOff, Languages,
  ArrowLeft, ArrowRight, Flag, CheckCircle2,
} from "lucide-react";
import { useState, useRef } from "react";
import { usePractice } from "../engine";
import type { ShadowingPractice } from "../types";

function formatTime(s: number) {
  const m = Math.floor(s / 60).toString().padStart(2, "0");
  const sec = (s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
}

type Speed = 0.75 | 1 | 1.25;
const SPEEDS: Speed[] = [0.75, 1, 1.25];

export function ShadowingLayout() {
  const { practice, state, totalItems, markListened, markRecorded, next, prev, jump, finish } =
    usePractice();
  const p = practice as ShadowingPractice;
  const segment = p.segments[state.currentIndex];

  const [speed, setSpeed] = useState<Speed>(1);
  const [showTranslation, setShowTranslation] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDone, setRecordingDone] = useState<Record<string, boolean>>({});
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const progress = state.shadowingProgress[segment.id] ?? { listened: false, recorded: false };
  const isLast = state.currentIndex === totalItems - 1;

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
      markListened(segment.id);
    }
  };

  const toggleRecording = async () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
      setRecordingDone((prev) => ({ ...prev, [segment.id]: true }));
      markRecorded(segment.id);
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      mediaRecorderRef.current = mr;
      mr.start();
      setIsRecording(true);
      // Auto-stop after segment duration + 2s buffer
      setTimeout(() => {
        if (mr.state === "recording") {
          mr.stop();
          stream.getTracks().forEach((t) => t.stop());
          setIsRecording(false);
          setRecordingDone((prev) => ({ ...prev, [segment.id]: true }));
          markRecorded(segment.id);
        }
      }, (segment.duration_seconds + 2) * 1000);
    } catch {
      // Microphone not available — mark as recorded anyway for demo
      setRecordingDone((prev) => ({ ...prev, [segment.id]: true }));
      markRecorded(segment.id);
    }
  };

  const allDone = p.segments.every(
    (s) => state.shadowingProgress[s.id]?.listened && state.shadowingProgress[s.id]?.recorded
  );

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

      {/* Segment dots */}
      <div className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-3xl items-center gap-1.5 overflow-x-auto px-4 py-2.5 scrollbar-none">
          {p.segments.map((s, i) => {
            const done =
              state.shadowingProgress[s.id]?.listened &&
              state.shadowingProgress[s.id]?.recorded;
            const listened = state.shadowingProgress[s.id]?.listened;
            const active = i === state.currentIndex;
            return (
              <button
                key={s.id}
                onClick={() => jump(i)}
                title={`Segment ${s.number}`}
                className={`h-2 flex-1 min-w-[16px] max-w-[32px] rounded-full transition-colors ${
                  active
                    ? "bg-foreground"
                    : done
                    ? "bg-foreground/40"
                    : listened
                    ? "bg-foreground/20"
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
          {/* Segment header */}
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background">
              {segment.number}
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Shadowing · {segment.duration_seconds}s
              </p>
            </div>
            <div className="ml-auto flex items-center gap-1">
              {progress.listened && (
                <span className="flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                  <CheckCircle2 className="h-3 w-3 text-emerald-500" /> Listened
                </span>
              )}
              {progress.recorded && (
                <span className="flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                  <CheckCircle2 className="h-3 w-3 text-emerald-500" /> Shadowed
                </span>
              )}
            </div>
          </div>

          {/* Transcript card */}
          <div className="mb-6 rounded-xl border border-border bg-card p-5">
            <p className="mb-3 text-base leading-relaxed text-foreground font-medium">
              {segment.transcript}
            </p>
            {segment.translation && (
              <>
                <button
                  onClick={() => setShowTranslation((v) => !v)}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Languages className="h-3.5 w-3.5" />
                  {showTranslation ? "Hide translation" : "Show translation"}
                </button>
                {showTranslation && (
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {segment.translation}
                  </p>
                )}
              </>
            )}
          </div>

          {/* Step 1: Listen */}
          <div className="mb-4 rounded-xl border border-border bg-card p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Step 1 — Listen
            </p>
            <div className="flex items-center gap-3">
              <audio ref={audioRef} src={segment.audio_link} preload="metadata" />
              <button
                onClick={playAudio}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-foreground text-background shadow-sm transition-opacity hover:opacity-80"
                aria-label="Play audio"
              >
                <Volume2 className="h-4 w-4" />
              </button>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Play segment</p>
                <p className="text-xs text-muted-foreground">
                  Listen carefully before you shadow
                </p>
              </div>
              {/* Speed selector */}
              <div className="flex items-center gap-1">
                {SPEEDS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSpeed(s)}
                    className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
                      speed === s
                        ? "bg-foreground text-background"
                        : "bg-muted text-muted-foreground hover:bg-border"
                    }`}
                  >
                    {s}x
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Step 2: Shadow / Record */}
          <div className="mb-8 rounded-xl border border-border bg-card p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Step 2 — Shadow
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={toggleRecording}
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full shadow-sm transition-colors ${
                  isRecording
                    ? "animate-pulse bg-destructive text-white"
                    : recordingDone[segment.id]
                    ? "bg-emerald-500 text-white"
                    : "bg-muted text-foreground hover:bg-border"
                }`}
                aria-label={isRecording ? "Stop recording" : "Start recording"}
              >
                {isRecording ? (
                  <MicOff className="h-4 w-4" />
                ) : (
                  <Mic className="h-4 w-4" />
                )}
              </button>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {isRecording
                    ? "Recording... speak now"
                    : recordingDone[segment.id]
                    ? "Shadowing recorded"
                    : "Record your shadowing"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {isRecording
                    ? `Auto-stops after ${segment.duration_seconds + 2}s`
                    : "Speak aloud while or immediately after the audio"}
                </p>
              </div>
            </div>
          </div>

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
                className="flex items-center gap-1.5 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-80"
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
