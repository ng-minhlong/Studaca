"use client";
import { motion } from "motion/react";
import { Reveal } from "./section";

const countries = [
  ["🇺🇸", "USA"],
  ["🇬🇧", "UK"],
  ["🇯🇵", "Japan"],
  ["🇰🇷", "Korea"],
  ["🇻🇳", "Vietnam"],
  ["🇸🇬", "Singapore"],
  ["🇩🇪", "Germany"],
  ["🇨🇦", "Canada"],
];

const metrics = [
  ["100,000+", "Practice Tests"],
  ["1M+", "Questions Solved"],
  ["50+", "Courses"],
  ["20+", "Exam Types"],
];

export function SocialProof() {
  return (
    <section className="border-y border-border bg-surface py-14">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="text-center text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Trusted by learners from
          </p>
        </Reveal>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
          {countries.map(([flag, name], i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              whileHover={{ y: -3 }}
              className="flex items-center gap-2 rounded-full border border-border bg-background px-3.5 py-2 text-sm font-medium text-ink"
            >
              <span className="text-base leading-none">{flag}</span>
              {name}
            </motion.div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-card border border-border bg-border lg:grid-cols-4">
          {metrics.map(([value, label], i) => (
            <Reveal key={label} delay={i * 0.06} className="bg-background p-6 text-center">
              <p className="text-2xl font-semibold text-ink sm:text-3xl">{value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}