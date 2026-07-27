"use client";
import { motion } from "motion/react";
import { SectionHeading } from "./section";

const steps = [
  ["Choose exam", "Pick your target and date—Studaca builds the schedule backwards from it."],
  ["Practice", "Start with a diagnostic set that maps your real starting level."],
  ["Learn", "Lessons are pulled in only where the diagnostic found gaps."],
  ["AI Feedback", "Every attempt returns a reason, not just a red cross."],
  ["Mock Test", "Full-length simulation under exam timing and interface."],
  ["Improve", "Weak skills get re-queued until accuracy holds across sessions."],
  ["Achieve Goal", "Walk in already familiar with the format and your pacing."],
];

export function LearningPath() {
  return (
    <section className="border-y border-border bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Learning path"
          title="A loop that closes, week after week."
          description="The same seven steps run whether you have three weeks or nine months."
        />

        <div className="relative mx-auto mt-16 max-w-3xl">
          <div className="absolute top-2 bottom-2 left-[15px] w-px bg-border sm:left-[19px]" />
          <div className="space-y-8">
            {steps.map(([title, desc], i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-[auto_minmax(0,1fr)] gap-5"
              >
                <span className="relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border bg-background text-xs font-semibold text-primary sm:h-10 sm:w-10 sm:text-sm">
                  {i + 1}
                </span>
                <div className="min-w-0 pt-1 sm:pt-2">
                  <h3 className="text-base font-semibold text-ink">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}