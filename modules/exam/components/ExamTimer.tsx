"use client";

import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatTime } from "../utils";

interface ExamTimerProps {
  seconds: number;
  className?: string;
}

export function ExamTimer({ seconds, className }: ExamTimerProps) {
  const isWarning = seconds < 300;
  const isCritical = seconds < 60;

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 font-mono text-sm font-medium tabular-nums",
        isCritical
          ? "text-destructive"
          : isWarning
          ? "text-amber-600 dark:text-amber-400"
          : "text-foreground",
        className
      )}
    >
      <Clock className="h-4 w-4 shrink-0" />
      <span>{formatTime(seconds)}</span>
    </div>
  );
}
