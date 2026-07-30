import Link from "next/link";
import { ArrowRight, BookOpen, Headphones, Mic, PenLine, GraduationCap } from "lucide-react";

const EXAM_DEMOS = [
  {
    category: "General (Layout 0)",
    icon: BookOpen,
    color: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    border: "border-slate-200 dark:border-slate-700",
    items: [
      { label: "JLPT N3", type: "jlpt", id: "jlpt-001", resultId: "jlpt-result-001" },
      { label: "HSK Level 4", type: "hsk", id: "hsk-001", resultId: "hsk-result-001" },
      { label: "TOPIK Reading", type: "topik-reading", id: "topik-reading-001", resultId: "topik-reading-result-001" },
      { label: "TOPIK Listening", type: "topik-listening", id: "topik-listening-001", resultId: "topik-listening-result-001" },
      { label: "TOEIC Reading", type: "toeic-reading", id: "toeic-reading-001", resultId: "toeic-reading-result-001" },
      { label: "TOEIC Listening", type: "toeic-listening", id: "toeic-listening-001", resultId: "toeic-listening-result-001" },
      { label: "THPTQG", type: "thptqg", id: "thptqg-001", resultId: "thptqg-result-001" },
      { label: "HSA", type: "hsa", id: "hsa-001", resultId: "hsa-result-001" },
    ],
  },
  {
    category: "IELTS Reading (Layout 1)",
    icon: BookOpen,
    color: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
    border: "border-blue-200 dark:border-blue-800",
    items: [
      { label: "IELTS Reading", type: "ielts-reading", id: "ielts-reading-001", resultId: "ielts-reading-result-001" },
    ],
  },
  {
    category: "IELTS Listening (Layout 2)",
    icon: Headphones,
    color: "bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-300",
    border: "border-violet-200 dark:border-violet-800",
    items: [
      { label: "IELTS Listening", type: "ielts-listening", id: "ielts-listening-001", resultId: "ielts-listening-result-001" },
    ],
  },
  {
    category: "IELTS Speaking (Layout 3)",
    icon: Mic,
    color: "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
    border: "border-rose-200 dark:border-rose-800",
    items: [
      { label: "IELTS Speaking", type: "ielts-speaking", id: "ielts-speaking-001", resultId: "ielts-speaking-result-001" },
    ],
  },
  {
    category: "IELTS Writing (Layout 4)",
    icon: PenLine,
    color: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
    border: "border-amber-200 dark:border-amber-800",
    items: [
      { label: "IELTS Writing", type: "ielts-writing", id: "ielts-writing-001", resultId: "ielts-writing-result-001" },
    ],
  },
  {
    category: "Digital SAT (Layout 5)",
    icon: GraduationCap,
    color: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
    border: "border-emerald-200 dark:border-emerald-800",
    items: [
      { label: "Digital SAT", type: "digital-sat", id: "digital-sat-001", resultId: "digital-sat-result-001" },
    ],
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground">
            Exam Engine Demo
          </h1>
          <p className="text-sm text-muted-foreground">
            6 layout variants supporting 13 exam types. Click any row to open the exam or view results.
          </p>
        </div>

        {/* Layout groups */}
        <div className="space-y-8">
          {EXAM_DEMOS.map((group) => {
            const Icon = group.icon;
            return (
              <section key={group.category}>
                <div className="mb-3 flex items-center gap-2">
                  <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${group.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <h2 className="text-sm font-semibold text-foreground">{group.category}</h2>
                </div>

                <div className={`overflow-hidden rounded-xl border ${group.border} bg-card`}>
                  {group.items.map((item, idx) => (
                    <div
                      key={item.id}
                      className={`flex items-center justify-between px-5 py-4 ${
                        idx < group.items.length - 1 ? "border-b border-border" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-foreground">{item.label}</span>
                        <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                          {item.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/result/${item.type}/${item.resultId}`}
                          className="rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
                        >
                          View Results
                        </Link>
                        <Link
                          href={`/exam/${item.type}/${item.id}`}
                          className="flex items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-xs font-medium text-background transition-opacity hover:opacity-80"
                        >
                          Take Exam
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <p className="mt-12 text-center text-xs text-muted-foreground">
          All data is mock / demo only. No backend required.
        </p>
      </div>
    </main>
  );
}
