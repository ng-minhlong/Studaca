"use client";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="bg-aurora pointer-events-none absolute inset-0" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-3xl px-6 text-center"
      >
        <h2 className="text-3xl font-semibold text-balance text-ink sm:text-5xl">
          Ready to Study Smarter?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
          Join thousands of learners preparing for their dream exams with Studaca.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <button className="rounded-btn group inline-flex items-center gap-2 bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-glow transition-all hover:brightness-110 active:scale-[0.98]">
            Get Started Free
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
          <button className="rounded-btn border border-border bg-card px-5 py-3 text-sm font-medium text-ink shadow-soft transition-colors hover:bg-accent">
            Book a Demo
          </button>
        </div>
      </motion.div>
    </section>
  );
}