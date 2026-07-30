import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface ResultPageHeaderProps {
  type: string;
}

export function ResultPageHeader({ type }: ResultPageHeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3">
        <Link
          href="/"
          className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          Back to tests
        </Link>
        <span className="text-xs text-border">/</span>
        <span className="text-xs font-medium capitalize text-foreground">
          {type.replace(/-/g, " ")} Results
        </span>
      </div>
    </header>
  );
}
