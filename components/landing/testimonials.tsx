"use client";
import { motion } from "motion/react";
import { SectionHeading } from "./section";

const testimonials = [
  {
    name: "Emily Carter",
    flag: "🇺🇸",
    country: "USA",
    exam: "SAT",
    delta: "1280 → 1500",
    quote:
      "The navigator and timing felt identical to test day, so the real thing was just another session.",
  },
  {
    name: "Haruto Sato",
    flag: "🇯🇵",
    country: "Japan",
    exam: "TOEIC",
    delta: "690 → 885",
    quote: "Dictation drills fixed the listening gaps I couldn't even name before.",
  },
  {
    name: "Ji-woo Park",
    flag: "🇰🇷",
    country: "Korea",
    exam: "IELTS",
    delta: "6.0 → 7.5",
    quote: "The AI examiner was blunt about my fluency. That's exactly what I needed.",
  },
  {
    name: "Nguyen Minh",
    flag: "🇻🇳",
    country: "Vietnam",
    exam: "National High School Exam",
    delta: "7.2 → 9.0",
    quote: "Mistake explanations in my own language made revision twice as fast.",
  },
  {
    name: "Rachel Tan",
    flag: "🇸🇬",
    country: "Singapore",
    exam: "GRE",
    delta: "312 → 331",
    quote: "Weak topics kept coming back until they stopped being weak. Simple, and it worked.",
  },
  {
    name: "Lukas Berger",
    flag: "🇩🇪",
    country: "Germany",
    exam: "TOEFL",
    delta: "88 → 112",
    quote: "Writing feedback pointed at structure, not just grammar nitpicks.",
  },
  {
    name: "Olivia Hughes",
    flag: "🇬🇧",
    country: "UK",
    exam: "GMAT",
    delta: "610 → 720",
    quote: "The study plan adjusted every week without me touching a spreadsheet.",
  },
  {
    name: "Ethan Brooks",
    flag: "🇨🇦",
    country: "Canada",
    exam: "Coding interviews",
    delta: "0 → 3 offers",
    quote: "AI review caught the habits interviewers would have flagged out loud.",
  },
];

function Card({ t }: { t: (typeof testimonials)[number] }) {
  return (
    <motion.figure
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="rounded-card w-[340px] shrink-0 border border-border bg-card p-6 shadow-soft transition-shadow hover:shadow-lift"
    >
      <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary/25 to-teal/25 text-sm font-semibold text-ink">
          {t.name.charAt(0)}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-ink">{t.name}</p>
          <p className="truncate text-xs text-muted-foreground">
            {t.flag} {t.country} · {t.exam}
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-teal/15 px-2.5 py-1 text-[11px] font-semibold text-teal-foreground">
          {t.delta}
        </span>
      </div>
      <blockquote className="mt-4 text-sm leading-relaxed text-muted-foreground">
        “{t.quote}”
      </blockquote>
    </motion.figure>
  );
}

export function Testimonials() {
  const row = [...testimonials, ...testimonials];
  return (
    <section className="overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Results"
          title="Score changes, not applause."
          description="Every review below comes from a learner who reported a verified score before and after."
        />
      </div>

      <div className="relative mt-14 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="marquee-track flex w-max gap-5">
          {row.map((t, i) => (
            <Card key={`${t.name}-${i}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}