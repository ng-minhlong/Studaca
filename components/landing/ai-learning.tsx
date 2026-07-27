"use client";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

const capabilities = [
  "Explain mistakes",
  "Generate similar questions",
  "Grammar correction",
  "Writing feedback",
  "Speaking scoring",
  "Coding review",
  "Personalized study plan",
];

const bubbles = [
  { from: "user", text: "I keep losing marks on IELTS Task 2 coherence." },
  {
    from: "ai",
    text: "Your paragraphs each hold two arguments. Split them, and open with a claim sentence—that alone usually moves coherence from 6.5 to 7.",
  },
  { from: "user", text: "Can you rewrite my second paragraph?" },
  {
    from: "ai",
    text: "Done. I also queued three practice prompts on the same structure for tomorrow's session.",
  },
];

export function AiLearning() {
  return (
    <section id="ai-learning" className="relative overflow-hidden bg-ink py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(50%_40%_at_20%_0%,color-mix(in_oklab,var(--primary)_28%,transparent),transparent_70%),radial-gradient(40%_40%_at_85%_20%,color-mix(in_oklab,var(--teal)_20%,transparent),transparent_70%)]" />

      <div className="relative mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70">
            <Sparkles className="h-3.5 w-3.5" /> AI Learning
          </span>
          <h2 className="mt-6 text-3xl font-semibold text-balance text-white sm:text-4xl">
            Meet Your AI Tutor.
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-white/60">
            It reads your attempt history, finds the pattern behind repeated mistakes and turns it
            into the next week of study—not a generic recommendation feed.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {capabilities.map((c, i) => (
              <motion.span
                key={c}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-lg border border-white/12 bg-white/5 px-3 py-2 text-sm text-white/75"
              >
                {c}
              </motion.span>
            ))}
          </div>
        </div>

        <div className="rounded-card border border-white/12 bg-white/[0.04] p-5 backdrop-blur-sm">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-teal text-xs font-semibold text-white">
              AI
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">Studaca Tutor</p>
              <p className="truncate text-xs text-white/50">Reviewing your last 42 attempts</p>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {bubbles.map((b, i) => (
              <motion.div
                key={b.text}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 * i }}
                className={
                  b.from === "user"
                    ? "ml-auto max-w-[82%] rounded-2xl rounded-br-md bg-primary px-3.5 py-2.5 text-sm text-primary-foreground"
                    : "max-w-[88%] rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.06] px-3.5 py-2.5 text-sm leading-relaxed text-white/80"
                }
              >
                {b.text}
              </motion.div>
            ))}

            <div className="flex items-center gap-1.5 pt-1">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  animate={{ opacity: [0.25, 1, 0.25] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.18 }}
                  className="h-1.5 w-1.5 rounded-full bg-white/70"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}