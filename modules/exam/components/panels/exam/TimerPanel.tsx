'use client';

import React, { useMemo } from 'react';
import type { Exam } from '../../../types';
import { useExam } from '../../../engine';

interface TimerPanelProps {
  exam: Exam;
}

export function TimerPanel({ exam }: TimerPanelProps) {
  const { elapsedTime, status } = useExam();
  
  const totalDurationMs = exam.totalDuration * 1000;
  const remainingMs = Math.max(0, totalDurationMs - elapsedTime);
  const remainingSeconds = Math.floor(remainingMs / 1000);
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  
  const percentageRemaining = (remainingMs / totalDurationMs) * 100;
  let timerColor = 'bg-green-600';
  if (percentageRemaining <= 25) timerColor = 'bg-red-600';
  else if (percentageRemaining <= 50) timerColor = 'bg-yellow-600';

  const isWarning = remainingMs < 600000; // Less than 10 minutes

  return (
    <div className={`px-4 py-2 flex items-center justify-center gap-3 ${isWarning ? 'bg-yellow-50 dark:bg-yellow-950' : 'bg-muted'}`}>
      <div className="text-sm font-semibold text-foreground">
        Time Remaining:
      </div>
      <div className="flex items-center gap-2">
        <div className="text-lg font-bold text-foreground font-mono min-w-16">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
        <div className="w-32 h-1.5 bg-secondary rounded-full overflow-hidden">
          <div
            className={`h-full ${timerColor} transition-all duration-300`}
            style={{ width: `${percentageRemaining}%` }}
          />
        </div>
      </div>
      {isWarning && (
        <div className="text-xs font-semibold text-yellow-700 dark:text-yellow-200">
          ⚠️ Low Time
        </div>
      )}
      <div className="text-xs text-muted-foreground">
        ({status})
      </div>
    </div>
  );
}
