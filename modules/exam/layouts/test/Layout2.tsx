/**Use for ielts listening */

"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Send, Volume2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useExam } from "../../engine";
import { QuestionRenderer } from "../../renderers/QuestionRenderer";
import { ExamTimer } from "../../components/ExamTimer";
import type { Layout2Test } from "../../types";
import { cn } from "@/lib/utils";
import { analyzeTestNumbering } from "../../utils/examNumbering";
import { submitExamAnswers } from "../../utils/submitExam";

interface Layout2Props {
  test: Layout2Test;
}

export function Layout2({ test }: Layout2Props) {
  const router = useRouter();
  const { state, setAnswer, nextPart, prevPart, finish } = useExam();
  const { currentPartIndex, answers, timeRemainingSeconds } = state;
  const [submitting, setSubmitting] = useState(false);

  const numbering = useMemo(() => analyzeTestNumbering(test.parts), [test.parts]);
  const currentPartMeta = numbering.parts[currentPartIndex];
  const part = test.parts[currentPartIndex];

  // Count answered questions based on mapped answer keys
  const answeredCount = Object.keys(numbering.questionNumberMap).filter((key) => {
    const a = answers[key];
    return a !== undefined && a !== "" && !(Array.isArray(a) && a.length === 0);
  }).length;

  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      const result = await submitExamAnswers({
        test,
        answers,
        timeRemainingSeconds,
      });
      finish();
      router.push(`/result/${test.type}/${result.idResult}`);
    } catch (err) {
      console.error("Submit error:", err);
      finish();
      if (test.idResult) {
        router.push(`/result/${test.type}/${test.idResult}`);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-16 flex h-[calc(100vh-4rem)] flex-col overflow-hidden bg-background">
      {/* Header */}
      <header className="flex shrink-0 items-center justify-between border-b border-border bg-background px-6 py-3">
        <div>
          <h1 className="text-sm font-semibold">{test.title}</h1>
          <p className="text-xs text-muted-foreground">
            Part {currentPartIndex + 1} of {test.parts.length} · {answeredCount}/{numbering.totalQuestions} answered
          </p>
        </div>
        <div className="flex items-center gap-4">
          <ExamTimer seconds={timeRemainingSeconds} />
          <Button
            size="sm"
            onClick={handleSubmit}
            disabled={submitting}
            variant="outline"
            className="gap-1.5"
          >
            {submitting ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Send className="h-3.5 w-3.5" />
            )}
            Submit
          </Button>
        </div>
      </header>

      {/* Part tabs */}
      <div className="flex shrink-0 gap-1 border-b border-border bg-muted/30 px-6 py-2">
        {test.parts.map((p, idx) => {
          const pMeta = numbering.parts[idx];
          return (
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
              Part {idx + 1} ({pMeta?.startNumber}-{pMeta?.endNumber})
            </button>
          );
        })}
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
          {part.questionRanges.map((range, rIdx) => {
            const rangeMeta = currentPartMeta?.ranges[rIdx];
            const rangeLabelText =
              rangeMeta && rangeMeta.totalQuestions > 0
                ? rangeMeta.startNumber === rangeMeta.endNumber
                  ? `Question ${rangeMeta.startNumber}`
                  : `Questions ${rangeMeta.startNumber} - ${rangeMeta.endNumber}`
                : (range.label !== "unknown" ? range.label : `Questions`);

            return (
              <div key={rIdx} className="space-y-4">
                <div className="rounded-lg bg-muted/40 px-4 py-2.5">
                  <div className="text-xs font-semibold text-muted-foreground">
                    {rangeLabelText}
                  </div>
                  {range.description ? (
                    <div
                      className="mt-2 text-sm leading-relaxed text-foreground/80"
                      dangerouslySetInnerHTML={{ __html: range.description }}
                    />
                  ) : null}
                </div>
                {range.questions.map((q) => {
                  const firstItem = rangeMeta?.items.find((item) => item.questionId === q.id);
                  const displayNum = firstItem?.globalNumber ?? q.number;
                  const uniqueKey = `${part.id}_${q.id}`;

                  return (
                    <div key={q.id} className="rounded-xl border border-border bg-card p-4 shadow-sm">
                      <QuestionRenderer
                        question={q}
                        partId={part.id}
                        rangeType={range.type_question}
                        answer={answers[uniqueKey] ?? answers[q.id]}
                        answersMap={answers}
                        onAnswer={(val) => setAnswer(uniqueKey, val)}
                        onAnswerKey={(key, val) => setAnswer(key, val)}
                        displayNumber={displayNum}
                      />
                    </div>
                  );
                })}
              </div>
            );
          })}

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
