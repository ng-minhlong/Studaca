"use client";
import { motion } from "motion/react";
import { Sparkles, Library, GraduationCap, Terminal, Check } from "lucide-react";
import { Reveal, SectionHeading } from "./section";

const exams = [
  "SAT",
  "IELTS",
  "TOEFL",
  "TOEIC",
  "HSK",
  "JLPT",
  "TOPIK",
  "Vietnam National High School Exam",
  "Cambridge",
  "AP",
  "IB",
  "GRE",
  "GMAT",
];

function CardShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`rounded-card border border-border bg-card p-7 shadow-soft transition-shadow hover:shadow-lift ${className}`}
    >
      {children}
    </motion.div>
  );
}

function Head({
  icon,
  title,
  desc,
  tag,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  tag?: string;
}) {
  return (
    <div>
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
            {icon}
          </span>
          <h3 className="truncate text-lg font-semibold text-ink">{title}</h3>
        </div>
        {tag && (
          <span className="shrink-0 rounded-full bg-teal/15 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-teal-foreground uppercase">
            {tag}
          </span>
        )}
      </div>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{desc}</p>
    </div>
  );
}

export function Features() {
  return (
    <section id="features" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Platform"
          title="One platform, the whole preparation loop."
          description="Study material, practice, feedback and coaching stop living in separate tabs."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-5">
          <CardShell className="lg:col-span-3">
            <Head
              icon={<Sparkles className="h-5 w-5" />}
              title="AI Learning"
              desc="Personal AI tutor that explains mistakes, recommends lessons and tracks your progress."
            />
            <div className="mt-6 space-y-3 rounded-xl border border-border bg-background p-4">
              <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-md bg-primary px-3.5 py-2.5 text-sm text-primary-foreground">
                Why is B wrong in question 14?
              </div>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25, duration: 0.5 }}
                className="max-w-[85%] rounded-2xl rounded-bl-md border border-border bg-card px-3.5 py-2.5 text-sm text-ink"
              >
                B restates a detail from line 12, but the question asks for the author&apos;s
                <span className="font-medium"> purpose</span>. Option D matches the shift in
                paragraph 3.
              </motion.div>
              <div className="flex gap-2 pt-1">
                {["Similar question", "Explain simpler"].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </CardShell>

          <CardShell className="lg:col-span-2">
            <Head
              icon={<Library className="h-5 w-5" />}
              title="Question Bank"
              desc="100,000+ questions across multiple exams, tagged by skill, difficulty and source."
            />
            <div className="mt-6 flex flex-wrap gap-2">
              {exams.map((e) => (
                <span
                  key={e}
                  className="rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs font-medium text-muted-foreground"
                >
                  {e}
                </span>
              ))}
            </div>
          </CardShell>

          <CardShell className="lg:col-span-2">
            <Head
              icon={<GraduationCap className="h-5 w-5" />}
              title="Online Courses"
              desc="Structured programs taught by exam specialists, free and premium."
            />
            <ul className="mt-6 space-y-2.5">
              {["Video lessons", "Assignments", "Quizzes", "Certificates", "Free & Premium"].map(
                (t) => (
                  <li key={t} className="flex items-center gap-2.5 text-sm text-ink">
                    <Check className="h-4 w-4 shrink-0 text-teal" />
                    {t}
                  </li>
                ),
              )}
            </ul>
          </CardShell>

          <CardShell className="lg:col-span-3">
            <div id="coding" className="scroll-mt-24">
              <Head
                icon={<Terminal className="h-5 w-5" />}
                title="Coding Practice"
                desc="An interactive playground with AI code review and interview-grade problem sets."
                tag="New"
              />
            </div>
            <div className="mt-6 overflow-hidden rounded-xl border border-border bg-ink">
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
                <span className="text-xs font-medium text-white/60">two_sum.py</span>
                <span className="ml-auto rounded-md bg-teal/20 px-2 py-0.5 text-[11px] font-medium text-teal">
                  Run
                </span>
              </div>
              <pre className="overflow-x-auto px-4 py-3 font-mono text-[12px] leading-relaxed text-white/80">
                <code>{`def two_sum(nums, target):
    seen = {}
    for i, n in enumerate(nums):
        if target - n in seen:
            return [seen[target - n], i]
        seen[n] = i`}</code>
              </pre>
              <div className="border-t border-white/10 px-4 py-2.5 font-mono text-[12px] text-teal">
                ✓ 12/12 test cases passed · 43ms
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                "AI code review",
                "Interview questions",
                "LeetCode-style practice",
                "Syntax highlighting",
              ].map((t) => (
                <span
                  key={t}
                  className="rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs font-medium text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </CardShell>
        </div>

        <Reveal className="sr-only">
          <p>Studaca features</p>
        </Reveal>
      </div>
    </section>
  );
}