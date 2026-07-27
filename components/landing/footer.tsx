import { GraduationCap } from "lucide-react";

const columns = [
  ["Platform", ["Practice Tests", "Courses", "Coding", "AI Tutor"]],
  ["Company", ["About", "Blog", "Careers", "Contact"]],
  ["Resources", ["Help Center", "Community", "FAQ"]],
  ["Legal", ["Privacy", "Terms", "Cookies"]],
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_repeat(4,minmax(0,1fr))]">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[10px] bg-primary text-primary-foreground">
                <GraduationCap className="h-[18px] w-[18px]" />
              </span>
              <span className="text-[17px] font-semibold tracking-tight text-ink">Studaca</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Practice, courses and AI tutoring for every major exam—in one place.
            </p>
          </div>

          {columns.map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-ink">{title}</h3>
              <ul className="mt-4 space-y-2.5">
                {links.map((l) => (
                  <li key={l}>
                    <a
                      href="#top"
                      className="text-sm text-muted-foreground transition-colors hover:text-ink"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Studaca</p>
          <p>Made for learners worldwide.</p>
        </div>
      </div>
    </footer>
  );
}