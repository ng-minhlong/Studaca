"use client";
import { motion } from "motion/react";
import { ArrowRight, Play, Flame, Code2, Sparkles, BookOpen, Mic } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

function DashboardMock() {
  return (
    <div className="rounded-card border border-border bg-card p-4 shadow-lift">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-muted" />
          <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-muted" />
          <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-muted" />
          <span className="ml-2 truncate text-xs font-medium text-muted-foreground">
            studaca.com / dashboard
          </span>
        </div>
        <span className="shrink-0 rounded-full bg-teal/15 px-2 py-0.5 text-[11px] font-medium text-teal-foreground">
          Live
        </span>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-background p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-ink">SAT Practice</p>
            <BookOpen className="h-4 w-4 text-primary" />
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Module 2 · Math</p>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "72%" }}
              transition={{ duration: 1.4, delay: 0.5, ease }}
              className="h-full rounded-full bg-primary"
            />
          </div>
          <p className="mt-2 text-xs font-medium text-muted-foreground">72% complete</p>
        </div>

        <div className="rounded-xl border border-border bg-background p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-ink">IELTS Speaking</p>
            <Mic className="h-4 w-4 text-teal" />
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Part 2 · Cue card</p>
          <div className="mt-3 flex h-8 items-end gap-[3px]">
            {[9, 16, 24, 14, 28, 20, 32, 18, 12, 26, 22, 10, 18, 30, 14].map((h, i) => (
              <motion.span
                key={i}
                animate={{ height: [h * 0.4, h, h * 0.5] }}
                transition={{
                  duration: 1.2 + (i % 4) * 0.2,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }}
                className="w-[3px] rounded-full bg-teal/70"
              />
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-background p-4">
          <p className="text-xs font-medium text-muted-foreground">AI Score</p>
          <p className="mt-1 text-2xl font-semibold text-ink">
            7.5 <span className="text-sm font-medium text-teal">+0.5</span>
          </p>
          <div className="mt-3 grid grid-cols-4 gap-1.5">
            {["Fl", "Pr", "Gr", "Vo"].map((t, i) => (
              <div key={t} className="rounded-md bg-muted px-1 py-1 text-center">
                <p className="text-[10px] font-medium text-muted-foreground">{t}</p>
                <p className="text-[11px] font-semibold text-ink">{[7.5, 7, 8, 7.5][i]}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-background p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">Today&apos;s Study Streak</p>
            <Flame className="h-4 w-4 text-primary" />
          </div>
          <p className="mt-1 text-2xl font-semibold text-ink">28 days</p>
          <div className="mt-3 flex gap-1">
            {Array.from({ length: 14 }).map((_, i) => (
              <span
                key={i}
                className={`h-4 flex-1 rounded-[3px] ${i > 1 ? "bg-primary/70" : "bg-muted"}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3 rounded-xl border border-border bg-background p-4">
        <p className="text-xs font-medium text-muted-foreground">Recent Courses</p>
        <div className="mt-3 space-y-2.5">
          {[
            ["Master SAT Math", "62%"],
            ["IELTS Writing Band 8+", "34%"],
          ].map(([name, pct]) => (
            <div key={name} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
              <div className="flex min-w-0 items-center gap-2">
                <span className="h-7 w-7 shrink-0 rounded-md bg-primary/10" />
                <p className="truncate text-xs font-medium text-ink">{name}</p>
              </div>
              <p className="shrink-0 text-xs text-muted-foreground">{pct}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="bg-aurora pointer-events-none absolute inset-0" />
      <div className="grid-lines pointer-events-none absolute inset-0 [mask-image:radial-gradient(70%_50%_at_50%_0%,black,transparent)]" />

      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[1.05fr_1fr] lg:items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-soft"
          >
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            AI tutors now review your code and your essays
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.06, ease }}
            className="mt-6 text-4xl leading-[1.05] font-semibold text-balance text-ink sm:text-5xl lg:text-6xl"
          >
            Everything You Need to Master Any Exam.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.14, ease }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Practice, learn and improve with AI. Over 100,000 exam questions, realistic exam
            simulations, online courses and intelligent AI tutors—all in one platform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <button className="rounded-btn group inline-flex items-center gap-2 bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-glow transition-all hover:brightness-110 active:scale-[0.98]">
              Get Started
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <button className="rounded-btn inline-flex items-center gap-2 border border-border bg-card px-5 py-3 text-sm font-medium text-ink shadow-soft transition-colors hover:bg-accent">
              <Play className="h-4 w-4 text-primary" />
              Explore Demo
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32, rotateX: 6 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease }}
          className="relative"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <DashboardMock />
          </motion.div>

          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-card absolute -top-6 -right-2 hidden items-center gap-2 border border-border bg-card px-3 py-2 shadow-lift sm:flex"
          >
            <Code2 className="h-4 w-4 text-primary" />
            <div>
              <p className="text-[11px] font-semibold text-ink">Coding Practice</p>
              <p className="text-[10px] text-muted-foreground">12/12 tests passed</p>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-card absolute -bottom-6 -left-4 hidden items-center gap-2 border border-border bg-card px-3 py-2 shadow-lift sm:flex"
          >
            <span className="grid h-7 w-7 place-items-center rounded-md bg-teal/15">
              <Sparkles className="h-3.5 w-3.5 text-teal-foreground" />
            </span>
            <div>
              <p className="text-[11px] font-semibold text-ink">AI Tutor</p>
              <p className="text-[10px] text-muted-foreground">Explained 3 mistakes</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}