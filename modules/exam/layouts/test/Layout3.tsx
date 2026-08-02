"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import {
  Mic,
  MicOff,
  Play,
  Square,
  ChevronLeft,
  ChevronRight,
  Send,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useExam } from "../../engine";
import { ExamTimer } from "../../components/ExamTimer";
import type { Layout3Test } from "../../types";
import { cn } from "@/lib/utils";

interface Layout3Props {
  test: Layout3Test;
}

type RecordState = "idle" | "recording" | "recorded";

export function Layout3({ test }: Layout3Props) {
  const { state, nextPart, prevPart, nextQuestion, prevQuestion, setQuestion, finish } = useExam();
  const { currentPartIndex, currentQuestionIndex, timeRemainingSeconds } = state;

  const part = test.parts[currentPartIndex];
  const totalQuestionsInPart = part?.questions.length ?? 0;
  const question = part?.questions[currentQuestionIndex] ?? part?.questions[0];
  const totalParts = test.parts.length;

  // Per-question recording state: questionId -> blob URL
  const [recordings, setRecordings] = useState<Record<string, string>>({});
  const [recordState, setRecordState] = useState<RecordState>("idle");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      chunksRef.current = [];
      mr.ondataavailable = (e) => chunksRef.current.push(e.data);
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setRecordings((prev) => ({ ...prev, [question.id]: url }));
        stream.getTracks().forEach((t) => t.stop());
        setRecordState("recorded");
      };
      mr.start();
      mediaRecorderRef.current = mr;
      setRecordState("recording");
    } catch {
      alert("Microphone access is required for this section.");
    }
  }, [question]);

  const stopRecording = useCallback(() => {
    mediaRecorderRef.current?.stop();
  }, []);

  const totalQuestions = test.parts.reduce((s, p) => s + p.questions.length, 0);
  const currentAbsQ =
    test.parts.slice(0, currentPartIndex).reduce((s, p) => s + p.questions.length, 0) +
    currentQuestionIndex +
    1;

  const handlePrev = () => {
    if (currentQuestionIndex > 0) prevQuestion();
    else if (currentPartIndex > 0) prevPart();
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestionsInPart - 1) nextQuestion();
    else if (currentPartIndex < totalParts - 1) nextPart();
  };

  const isFirst = currentPartIndex === 0 && currentQuestionIndex === 0;
  const isLast =
    currentPartIndex === totalParts - 1 &&
    currentQuestionIndex === totalQuestionsInPart - 1;

  useEffect(() => {
    if (!question) return;
    if (recordState === "recording") {
      stopRecording();
      return;
    }
    setRecordState(recordings[question.id] ? "recorded" : "idle");
  }, [question?.id, recordings, recordState, stopRecording]);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      {/* Header */}
      <header className="flex shrink-0 items-center justify-between border-b border-border bg-background px-6 py-3">
        <div>
          <h1 className="text-sm font-semibold">{test.title}</h1>
          <p className="text-xs text-muted-foreground">
            Question {currentAbsQ} of {totalQuestions}
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

      {/* Part indicator */}
      <div className="flex shrink-0 gap-1 border-b border-border bg-muted/30 px-6 py-2">
        {test.parts.map((p, idx) => (
          <div
            key={p.id}
            className={cn(
              "rounded-md px-3 py-1.5 text-xs font-medium",
              idx === currentPartIndex
                ? "bg-background text-foreground shadow-sm border border-border"
                : "text-muted-foreground"
            )}
          >
            {p.title}
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="flex flex-1 items-center justify-center overflow-y-auto px-4 py-6">
        {question && (
          <div className="mx-auto w-full max-w-xl space-y-6">
            {/* Part description */}
            {part.description && currentQuestionIndex === 0 && (
              <div className="rounded-xl border border-border bg-muted/30 px-5 py-3 text-sm text-muted-foreground">
                {part.description}
              </div>
            )}

            {/* Question card */}
            <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {part.title}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Question {question.number}
                </Badge>
                {question.prep_time && question.prep_time > 0 && (
                  <Badge variant="outline" className="gap-1 text-xs">
                    <Clock className="h-3 w-3" />
                    {question.prep_time}s prep
                  </Badge>
                )}
              </div>

              <p className="whitespace-pre-line text-base leading-relaxed text-foreground">
                {question.prompt}
              </p>

              {question.speak_time && (
                <p className="mt-3 text-xs text-muted-foreground">
                  Speak for up to {question.speak_time} seconds
                </p>
              )}
            </div>

            {part.questions.length > 1 && (
              <div className="flex flex-wrap gap-2">
                {part.questions.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => setQuestion(idx)}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-sm transition-colors",
                      idx === currentQuestionIndex
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {item.number}
                  </button>
                ))}
              </div>
            )}

            {/* Recording controls */}
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-3">
                {recordState !== "recording" ? (
                  <Button
                    onClick={startRecording}
                    size="lg"
                    className="h-14 w-14 rounded-full p-0"
                  >
                    <Mic className="h-6 w-6" />
                    <span className="sr-only">Start recording</span>
                  </Button>
                ) : (
                  <Button
                    onClick={stopRecording}
                    size="lg"
                    variant="destructive"
                    className="h-14 w-14 rounded-full p-0 animate-pulse"
                  >
                    <MicOff className="h-6 w-6" />
                    <span className="sr-only">Stop recording</span>
                  </Button>
                )}
              </div>

              <p className="text-xs text-muted-foreground">
                {recordState === "idle" && "Tap the microphone to start recording"}
                {recordState === "recording" && (
                  <span className="text-destructive font-medium">Recording… tap to stop</span>
                )}
                {recordState === "recorded" && "Recording saved — tap to re-record"}
              </p>

              {/* Playback */}
              {recordings[question.id] && recordState !== "recording" && (
                <div className="w-full rounded-lg border border-border bg-muted/30 px-4 py-3">
                  <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
                    <Play className="h-3 w-3" />
                    Your recording
                  </div>
                  <audio controls src={recordings[question.id]} className="w-full" />
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrev}
                disabled={isFirst}
                className="gap-1"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNext}
                disabled={isLast}
                className="gap-1"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
