"use client";
import { motion } from "motion/react";
import { Star, Users, Clock, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./section";

const courses = [
  {
    title: "Master SAT Math",
    teacher: "Daniel Reyes",
    rating: 4.9,
    students: "18,420",
    duration: "14h",
    level: "Intermediate",
    hue: "from-primary/25 to-primary/5",
  },
  {
    title: "IELTS Writing Band 8+",
    teacher: "Amelia Clarke",
    rating: 4.8,
    students: "12,905",
    duration: "9h",
    level: "Advanced",
    hue: "from-teal/30 to-teal/5",
  },
  {
    title: "Complete TOEIC Preparation",
    teacher: "Kenji Watanabe",
    rating: 4.7,
    students: "22,310",
    duration: "21h",
    level: "All levels",
    hue: "from-primary/20 to-teal/10",
  },
  {
    title: "JLPT N3 Intensive",
    teacher: "Sakura Ito",
    rating: 4.9,
    students: "7,640",
    duration: "18h",
    level: "Intermediate",
    hue: "from-teal/25 to-primary/10",
  },
  {
    title: "Python for Beginners",
    teacher: "Marta Nowak",
    rating: 4.8,
    students: "31,088",
    duration: "12h",
    level: "Beginner",
    hue: "from-primary/25 to-primary/5",
  },
  {
    title: "Algorithms & Data Structures",
    teacher: "Arjun Mehta",
    rating: 4.9,
    students: "15,772",
    duration: "26h",
    level: "Advanced",
    hue: "from-teal/25 to-primary/10",
  },
];

export function Courses() {
  return (
    <section id="courses" className="border-y border-border bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <SectionHeading
            align="left"
            eyebrow="Courses"
            title="Taught by people who score, not just teach."
            description="Every course ends in a graded mock exam, so progress is measured the same way the exam measures it."
          />
          <a
            href="#courses"
            className="rounded-btn inline-flex w-fit items-center gap-1.5 border border-border bg-background px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-accent"
          >
            Browse all 50 courses
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {courses.map((c, i) => (
            <motion.article
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: (i % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="rounded-card group grid grid-cols-[auto_minmax(0,1fr)] gap-5 border border-border bg-background p-4 shadow-soft transition-shadow hover:shadow-lift"
            >
              <div
                className={`grid h-full min-h-[112px] w-28 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${c.hue} sm:w-36`}
              >
                <span className="text-xs font-semibold tracking-wide text-ink/50 uppercase">
                  {c.level}
                </span>
              </div>
              <div className="min-w-0 py-1">
                <h3 className="truncate text-base font-semibold text-ink">{c.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.teacher}</p>
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1 font-medium text-ink">
                    <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                    {c.rating}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    {c.students}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {c.duration}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}