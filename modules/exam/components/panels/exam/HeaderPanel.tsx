'use client';

import React from 'react';
import type { Exam } from '../../../types';
import { useExam } from '../../../engine';

interface HeaderPanelProps {
  exam: Exam;
}

export function HeaderPanel({ exam }: HeaderPanelProps) {
  const { getTotalQuestions, getAnsweredCount } = useExam();
  const totalQuestions = getTotalQuestions();
  const answered = getAnsweredCount();
  const progress = Math.round((answered / totalQuestions) * 100);

  return (
    <div className="bg-background border-b border-border p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-foreground mb-2">{exam.title}</h1>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {exam.examType}
          </p>
          <div className="flex items-center gap-4">
            <div className="text-sm">
              <span className="text-foreground font-semibold">{answered}</span>
              <span className="text-muted-foreground">/{totalQuestions}</span>
              <span className="text-muted-foreground ml-2">answered</span>
            </div>
            <div className="w-32 h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-sm font-semibold text-foreground w-10 text-right">
              {progress}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
