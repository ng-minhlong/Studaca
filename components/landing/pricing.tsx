"use client";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { SectionHeading } from "./section";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Free",
    price: "$0",
    note: "forever",
    desc: "Enough to finish a full practice cycle before you pay anything.",
    features: ["2,000 practice questions", "1 mock exam per month", "Basic AI explanations", "Community access"],
    cta: "Start free",
  },
  {
    name: "Pro",
    price: "$19",
    note: "per month",
    desc: "For anyone with a test date already on the calendar.",
    features: [
      "Full 100,000+ question bank",
      "Unlimited mock exams",
      "AI tutor, speaking & writing scoring",
      "All 50+ courses",
      "Coding playground & AI review",
    ],
    cta: "Get started",
    featured: true,
  },
  {
    name: "Teams",
    price: "Custom",
    note: "schools & centers",
    desc: "Cohort dashboards for tutoring centers and school programs.",
    features: ["Class analytics", "Assignment scheduling", "Teacher accounts", "Priority support"],
    cta: "Talk to us",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="border-t border-border bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Pricing"
          title="Pay when the practice is already working."
          description="No per-exam upsells. One plan covers every exam type on the platform."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "rounded-card flex flex-col border p-7",
                p.featured
                  ? "border-primary/30 bg-background shadow-lift"
                  : "border-border bg-background shadow-soft",
              )}
            >
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                <h3 className="truncate text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                  {p.name}
                </h3>
                {p.featured && (
                  <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
                    Most chosen
                  </span>
                )}
              </div>
              <p className="mt-4 flex items-baseline gap-1.5">
                <span className="text-4xl font-semibold text-ink">{p.price}</span>
                <span className="text-sm text-muted-foreground">{p.note}</span>
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              <ul className="mt-6 flex-1 space-y-2.5">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-ink">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                className={cn(
                  "rounded-btn mt-7 w-full px-4 py-2.5 text-sm font-medium transition-all active:scale-[0.98]",
                  p.featured
                    ? "bg-primary text-primary-foreground shadow-glow hover:brightness-110"
                    : "border border-border bg-card text-ink hover:bg-accent",
                )}
              >
                {p.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}