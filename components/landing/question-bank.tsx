
"use client"

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Clock, Flag, Mic, Play, Volume2, Terminal, Sparkles, Send } from "lucide-react";
import { SectionHeading } from "./section";
import { cn } from "@/lib/utils";

const items = [
  "SAT Reading",
  "SAT Math",
  "IELTS Reading",
  "IELTS Listening",
  "IELTS Speaking",
  "TOEIC Reading",
  "HSK",
  "JLPT",
  "Shadowing",
  "Dictation",
  "AI Conversation",
  "Coding Practice",
] as const;

type Item = (typeof items)[number];

function Chrome({
  title,
  right,
  children,
}: {
  title: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-card overflow-hidden border border-border bg-background shadow-soft">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border bg-card px-4 py-3">
        <p className="truncate text-sm font-semibold text-ink">{title}</p>
        <div className="flex shrink-0 items-center gap-2 text-xs text-muted-foreground">{right}</div>
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
}

const Timer = ({ t }: { t: string }) => (
  <span className="inline-flex items-center gap-1.5 rounded-md bg-background px-2 py-1 font-medium text-ink">
    <Clock className="h-3.5 w-3.5 text-primary" />
    {t}
  </span>
);

function Waveform({ bars = 28, color = "bg-primary/70" }: { bars?: number; color?: string }) {
  return (
    <div className="flex h-12 items-end justify-center gap-[3px]">
      {Array.from({ length: bars }).map((_, i) => (
        <motion.span
          key={i}
          animate={{ height: [8, 12 + ((i * 7) % 34), 10] }}
          transition={{
            duration: 1 + (i % 5) * 0.18,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          className={cn("w-[3px] rounded-full", color)}
        />
      ))}
    </div>
  );
}

function ReadingMock({ passages }: { passages: number }) {
  return (
    <div className="grid gap-4 lg:grid-cols-[1.15fr_1fr]">
      <div className="rounded-xl border border-border bg-card p-4">
        <p className="text-xs font-medium text-muted-foreground">
          Passage {passages > 1 ? "1 of 3" : "1"} · Social Science
        </p>
        <p className="mt-3 text-sm leading-relaxed text-ink">
          In the late nineteenth century, urban planners began treating public parks not as
          ornament but as infrastructure.{" "}
          <mark className="rounded bg-teal/25 px-0.5 text-ink">
            The shift reframed green space as a civic utility
          </mark>
          , comparable to water lines or streetlights, and reshaped municipal budgets for decades.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Critics argued the comparison flattened the aesthetic dimension of design, yet the
          funding it unlocked outlasted the debate.
        </p>
      </div>
      <div className="space-y-3">
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm font-medium text-ink">
            The author mentions water lines primarily to
          </p>
          <div className="mt-3 space-y-2">
            {[
              "contrast two eras of civic design",
              "illustrate how parks were reclassified",
              "criticize nineteenth-century budgets",
              "define a technical planning term",
            ].map((o, i) => (
              <label
                key={o}
                className={cn(
                  "flex cursor-pointer items-start gap-2.5 rounded-lg border px-3 py-2 text-sm transition-colors",
                  i === 1
                    ? "border-primary bg-primary/5 text-ink"
                    : "border-border text-muted-foreground hover:bg-accent",
                )}
              >
                <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border border-current text-[10px] font-semibold">
                  {"ABCD"[i]}
                </span>
                {o}
              </label>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs font-medium text-muted-foreground">Question navigator</p>
          <div className="mt-3 grid grid-cols-9 gap-1.5">
            {Array.from({ length: 27 }).map((_, i) => (
              <span
                key={i}
                className={cn(
                  "grid h-6 place-items-center rounded-md text-[11px] font-medium",
                  i < 13
                    ? "bg-primary/12 text-primary"
                    : i === 13
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground",
                )}
              >
                {i + 1}
              </span>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground">
              <Flag className="h-3.5 w-3.5" /> Mark for Review
            </button>
            <button className="rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MathMock() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="rounded-xl border border-border bg-card p-5">
        <p className="text-xs font-medium text-muted-foreground">Module 2 · Question 14</p>
        <p className="mt-3 text-sm text-ink">
          If <span className="font-mono">f(x) = 2x² − 5x + 3</span>, what is the sum of the roots?
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {["3/2", "5/2", "2", "−5/2"].map((o, i) => (
            <span
              key={o}
              className={cn(
                "rounded-lg border px-3 py-2 text-center font-mono text-sm",
                i === 1 ? "border-primary bg-primary/5 text-ink" : "border-border text-muted-foreground",
              )}
            >
              {o}
            </span>
          ))}
        </div>
      </div>
      <div className="rounded-xl border border-border bg-card p-5">
        <p className="text-xs font-medium text-muted-foreground">Step-by-step solution</p>
        <ol className="mt-3 space-y-3 text-sm text-ink">
          {[
            "Sum of roots = −b / a for ax² + bx + c",
            "a = 2, b = −5",
            "Sum = −(−5)/2 = 5/2",
          ].map((s, i) => (
            <li key={s} className="flex gap-3">
              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/10 text-[11px] font-semibold text-primary">
                {i + 1}
              </span>
              {s}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function ListeningMock() {
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
      <div className="rounded-xl border border-border bg-card p-5">
        <p className="text-sm font-semibold text-ink">Section 3 · Campus interview</p>
        <div className="mt-4 flex items-center gap-3">
          <button className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
            <Play className="h-4 w-4" />
          </button>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full w-2/5 rounded-full bg-primary" />
          </div>
          <span className="shrink-0 text-xs text-muted-foreground">03:42</span>
        </div>
        <Waveform bars={34} />
      </div>
      <div className="rounded-xl border border-border bg-card p-5">
        <p className="text-xs font-medium text-muted-foreground">Complete the notes</p>
        <div className="mt-3 space-y-3 text-sm text-ink">
          <p>
            21. Deadline for the report:{" "}
            <span className="rounded-md border border-primary bg-primary/5 px-2 py-0.5 font-medium">
              14 March
            </span>
          </p>
          <p>
            22. Required word count:{" "}
            <span className="rounded-md border border-dashed border-border px-6 py-0.5" />
          </p>
          <p>
            23. Tutor&apos;s office:{" "}
            <span className="rounded-md border border-dashed border-border px-6 py-0.5" />
          </p>
        </div>
      </div>
    </div>
  );
}

function SpeakingMock() {
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary/30 to-teal/30 text-sm font-semibold text-ink">
            AI
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-ink">AI Examiner · Part 2</p>
            <p className="truncate text-xs text-muted-foreground">Describe a skill you learned</p>
          </div>
          <span className="ml-auto shrink-0 rounded-full bg-teal/15 px-2.5 py-1 text-[11px] font-medium text-teal-foreground">
            Recording
          </span>
        </div>
        <Waveform bars={40} color="bg-teal/70" />
        <div className="mt-4 rounded-lg bg-background p-3 text-sm leading-relaxed text-muted-foreground">
          <span className="text-ink">
            I&apos;d like to talk about learning to swim as an adult, which
          </span>{" "}
          honestly took me much longer than I expected…
        </div>
        <div className="mt-4 flex justify-center">
          <button className="grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-glow">
            <Mic className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="rounded-xl border border-border bg-card p-5">
        <p className="text-xs font-medium text-muted-foreground">Estimated band</p>
        <p className="mt-1 text-3xl font-semibold text-ink">7.5</p>
        <div className="mt-4 space-y-3">
          {[
            ["Fluency", 78],
            ["Pronunciation", 72],
            ["Grammar", 84],
            ["Vocabulary", 76],
          ].map(([label, v]) => (
            <div key={label as string}>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{label}</span>
                <span className="font-medium text-ink">{(Number(v) / 12.5).toFixed(1)}</span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${v}%` }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full bg-teal"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CharacterMock({ label, prompt, options }: { label: string; prompt: string; options: string[] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="rounded-xl border border-border bg-card p-6">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <p className="mt-4 text-4xl font-semibold text-ink">{prompt}</p>
        <p className="mt-3 text-sm text-muted-foreground">Choose the correct reading</p>
      </div>
      <div className="grid grid-cols-2 gap-2 self-start">
        {options.map((o, i) => (
          <span
            key={o}
            className={cn(
              "rounded-lg border px-3 py-3 text-center text-sm",
              i === 0 ? "border-primary bg-primary/5 text-ink" : "border-border bg-card text-muted-foreground",
            )}
          >
            {o}
          </span>
        ))}
      </div>
    </div>
  );
}

function DictationMock() {
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-center gap-3">
          <button className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
            <Volume2 className="h-4 w-4" />
          </button>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full w-1/3 rounded-full bg-primary" />
          </div>
          <span className="shrink-0 text-xs text-muted-foreground">0:12 / 0:34</span>
        </div>
        <div className="mt-4 rounded-lg border border-border bg-background p-4 text-sm leading-relaxed">
          <span className="text-ink">The committee agreed to </span>
          <span className="rounded bg-teal/20 px-1 text-ink">postpone</span>
          <span className="text-ink"> the </span>
          <span className="rounded bg-destructive/15 px-1 text-ink line-through">vote</span>
          <span className="text-muted-foreground"> until the following</span>
          <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-primary align-middle" />
        </div>
      </div>
      <div className="rounded-xl border border-border bg-card p-5 text-center">
        <p className="text-xs font-medium text-muted-foreground">Accuracy</p>
        <p className="mt-2 text-4xl font-semibold text-ink">92%</p>
        <p className="mt-2 text-xs text-muted-foreground">2 spelling slips · 1 missed word</p>
      </div>
    </div>
  );
}

function ShadowingMock() {
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
      <div className="rounded-xl border border-border bg-card p-5">
        <p className="text-sm font-semibold text-ink">Native reference</p>
        <Waveform bars={38} />
        <p className="mt-2 text-sm font-semibold text-ink">Your take</p>
        <Waveform bars={38} color="bg-teal/70" />
        <div className="mt-4 flex justify-center">
          <button className="rounded-btn inline-flex items-center gap-2 bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
            <Mic className="h-4 w-4" /> Record
          </button>
        </div>
      </div>
      <div className="rounded-xl border border-border bg-card p-5 text-center">
        <p className="text-xs font-medium text-muted-foreground">Comparison score</p>
        <p className="mt-2 text-4xl font-semibold text-ink">88</p>
        <p className="mt-2 text-xs text-muted-foreground">Rhythm matched, intonation drifts</p>
      </div>
    </div>
  );
}

function ConversationMock() {
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
      <div className="space-y-3 rounded-xl border border-border bg-card p-5">
        <div className="max-w-[80%] rounded-2xl rounded-bl-md bg-background px-3.5 py-2.5 text-sm text-ink">
          Good morning! Where did you go last weekend?
        </div>
        <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-md bg-primary px-3.5 py-2.5 text-sm text-primary-foreground">
          I go to the museum with my sister.
        </div>
        <div className="max-w-[85%] rounded-2xl rounded-bl-md border border-teal/40 bg-teal/10 px-3.5 py-2.5 text-sm text-ink">
          Small fix: <span className="font-medium">&quot;I went to the museum&quot;</span> — past
          tense for last weekend.
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2">
          <Mic className="h-4 w-4 shrink-0 text-primary" />
          <span className="min-w-0 flex-1 truncate text-sm text-muted-foreground">
            Voice mode is on…
          </span>
          <Send className="h-4 w-4 shrink-0 text-muted-foreground" />
        </div>
      </div>
      <div className="rounded-xl border border-border bg-card p-5">
        <p className="text-xs font-medium text-muted-foreground">Pronunciation</p>
        <p className="mt-1 text-3xl font-semibold text-ink">91</p>
        <div className="mt-4 space-y-2 text-sm">
          {["museum", "weekend", "sister"].map((w, i) => (
            <div key={w} className="flex items-center justify-between">
              <span className="text-ink">{w}</span>
              <span className={i === 0 ? "text-muted-foreground" : "text-teal"}>
                {[74, 95, 97][i]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CodingMock() {
  return (
    <div className="grid gap-4 lg:grid-cols-[1.25fr_1fr]">
      <div className="overflow-hidden rounded-xl border border-border bg-ink">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-white/10 px-4 py-2.5">
          <span className="truncate font-mono text-xs text-white/60">
            solutions / longest_substring.py
          </span>
          <span className="shrink-0 rounded-md bg-teal/20 px-2 py-0.5 text-[11px] font-medium text-teal">
            Run
          </span>
        </div>
        <pre className="overflow-x-auto px-4 py-3 font-mono text-[12px] leading-relaxed text-white/80">
          <code>{`def length_of_longest(s: str) -> int:
    last, start, best = {}, 0, 0
    for i, ch in enumerate(s):
        if ch in last and last[ch] >= start:
            start = last[ch] + 1
        last[ch] = i
        best = max(best, i - start + 1)
    return best`}</code>
        </pre>
        <div className="border-t border-white/10 px-4 py-3 font-mono text-[12px] text-white/70">
          <p className="inline-flex items-center gap-2 text-teal">
            <Terminal className="h-3.5 w-3.5" /> pytest -q
          </p>
          <p className="mt-1 text-teal">✓ 18 passed in 0.42s</p>
        </div>
      </div>
      <div className="space-y-3">
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs font-medium text-muted-foreground">Test cases</p>
          <div className="mt-3 space-y-2 font-mono text-xs">
            {[
              ['"abcabcbb"', "3"],
              ['"bbbbb"', "1"],
              ['"pwwkew"', "3"],
            ].map(([i, o]) => (
              <div key={i} className="flex justify-between rounded-md bg-background px-2.5 py-1.5">
                <span className="text-muted-foreground">{i}</span>
                <span className="text-teal">→ {o}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="inline-flex items-center gap-1.5 text-xs font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" /> AI review
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Optimal O(n) sliding window. Consider renaming <span className="font-mono">best</span>{" "}
            to <span className="font-mono">longest</span> for readability in interviews.
          </p>
        </div>
      </div>
    </div>
  );
}

function Screen({ item }: { item: Item }) {
  switch (item) {
    case "SAT Reading":
      return (
        <Chrome
          title="Digital SAT · Reading and Writing"
          right={
            <>
              <Timer t="18:42" />
              <span>Section 1</span>
            </>
          }
        >
          <ReadingMock passages={1} />
        </Chrome>
      );
    case "SAT Math":
      return (
        <Chrome title="Digital SAT · Math" right={<Timer t="21:05" />}>
          <MathMock />
        </Chrome>
      );
    case "IELTS Reading":
      return (
        <Chrome
          title="IELTS Academic Reading"
          right={
            <>
              <Timer t="42:18" />
              <span>Passage 1 / 3</span>
            </>
          }
        >
          <ReadingMock passages={3} />
        </Chrome>
      );
    case "IELTS Listening":
      return (
        <Chrome title="IELTS Listening" right={<Timer t="12:30" />}>
          <ListeningMock />
        </Chrome>
      );
    case "IELTS Speaking":
      return (
        <Chrome title="IELTS Speaking Room" right={<span>Live AI examiner</span>}>
          <SpeakingMock />
        </Chrome>
      );
    case "TOEIC Reading":
      return (
        <Chrome title="TOEIC · Part 7" right={<Timer t="31:55" />}>
          <ReadingMock passages={1} />
        </Chrome>
      );
    case "HSK":
      return (
        <Chrome title="HSK 4 · Vocabulary" right={<span>Question 8 / 40</span>}>
          <CharacterMock label="Reading practice" prompt="经验" options={["jīng yàn", "jīn yán", "qīng yàn", "jìng yǎn"]} />
        </Chrome>
      );
    case "JLPT":
      return (
        <Chrome title="JLPT N3 · 漢字" right={<span>Question 5 / 35</span>}>
          <CharacterMock label="Kanji reading" prompt="経験" options={["けいけん", "きょうけん", "けいげん", "きけん"]} />
        </Chrome>
      );
    case "Shadowing":
      return (
        <Chrome title="Shadowing Studio" right={<span>Clip 4 · BBC News</span>}>
          <ShadowingMock />
        </Chrome>
      );
    case "Dictation":
      return (
        <Chrome title="Dictation Trainer" right={<span>Set 12 · Academic</span>}>
          <DictationMock />
        </Chrome>
      );
    case "AI Conversation":
      return (
        <Chrome title="AI Conversation" right={<span>Voice mode</span>}>
          <ConversationMock />
        </Chrome>
      );
    case "Coding Practice":
      return (
        <Chrome title="Coding Playground" right={<span>Medium · Strings</span>}>
          <CodingMock />
        </Chrome>
      );
  }
}

export function QuestionBank() {
  const [active, setActive] = useState<Item>("SAT Reading");

  return (
    <section id="question-bank" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Question Bank"
          title="Practice in the interface you'll actually sit in."
          description="Every mode is a faithful recreation of the real testing environment—timers, navigators and scoring included."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
          <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {items.map((item) => (
              <button
                key={item}
                onClick={() => setActive(item)}
                className={cn(
                  "relative shrink-0 rounded-xl px-3.5 py-2.5 text-left text-sm font-medium transition-colors lg:w-full",
                  active === item ? "text-ink" : "text-muted-foreground hover:text-ink",
                )}
              >
                {active === item && (
                  <motion.span
                    layoutId="qb-active"
                    transition={{ type: "spring", stiffness: 420, damping: 36 }}
                    className="absolute inset-0 rounded-xl border border-border bg-card shadow-soft"
                  />
                )}
                <span className="relative whitespace-nowrap">{item}</span>
              </button>
            ))}
          </div>

          <div className="min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                <Screen item={active} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}