'use client';

import React from 'react';
import { useResult } from '../../../engine/result';

export function ScorePanel() {
  const { getSummary } = useResult();
  const summary = getSummary();

  const scoreCards = [
    {
      label: 'Total Score',
      value: summary.totalScore,
      max: summary.maxScore,
      color: 'bg-blue-500',
    },
    {
      label: 'Correct',
      value: summary.correct,
      max: summary.totalQuestions,
      color: 'bg-green-500',
    },
    {
      label: 'Wrong',
      value: summary.wrong,
      max: summary.totalQuestions,
      color: 'bg-red-500',
    },
    {
      label: 'Skipped',
      value: summary.skipped,
      max: summary.totalQuestions,
      color: 'bg-yellow-500',
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {scoreCards.map((card) => (
        <div
          key={card.label}
          className="bg-muted rounded-lg p-6 border border-border"
        >
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            {card.label}
          </p>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-3xl font-bold text-foreground">
              {card.value}
            </span>
            <span className="text-sm text-muted-foreground">/ {card.max}</span>
          </div>
          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className={`h-full ${card.color} transition-all duration-500`}
              style={{ width: `${(card.value / card.max) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
