'use client';

/**
 * Result Layout 1: General Exam Results
 * For HSK, JLPT, TOPIK, THPT, Aptitude tests
 */

import React from 'react';
import type { Result } from '../../types';
import { ResultProvider, useResult } from '../../engine/result';
import { ScorePanel } from '../../components/panels/result/ScorePanel';
import { AccuracyChart } from '../../components/charts/AccuracyChart';
import { SectionBreakdownChart } from '../../components/charts/SectionBreakdownChart';
import { ReviewPanel } from '../../components/panels/result/ReviewPanel';

interface ResultLayout1Props {
  result: Result;
}

function ResultLayout1Content() {
  const { getSummary } = useResult();
  const summary = getSummary();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted border-b border-border p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-2">Exam Results</h1>
          <p className="text-muted-foreground">
            Completed on {new Date(new Date().getTime() - Math.random() * 86400000).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Score Cards */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Performance Summary</h2>
          <ScorePanel />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-2 gap-6">
          <AccuracyChart />
          <SectionBreakdownChart />
        </div>

        {/* Detailed Statistics */}
        <div className="bg-muted rounded-lg p-6 border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Statistics</h3>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                Accuracy
              </p>
              <p className="text-2xl font-bold text-foreground">
                {summary.percentage}%
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                Total Time
              </p>
              <p className="text-2xl font-bold text-foreground">
                {Math.floor(summary.totalTimeSpent / 1000 / 60)}m
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                Answered
              </p>
              <p className="text-2xl font-bold text-foreground">
                {summary.answered}/{summary.totalQuestions}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                Score
              </p>
              <p className="text-2xl font-bold text-foreground">
                {summary.totalScore}/{summary.maxScore}
              </p>
            </div>
          </div>
        </div>

        {/* Question Review */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Detailed Review</h2>
          <ReviewPanel />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-6">
          <button className="px-6 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 font-medium">
            Download Report
          </button>
          <button className="px-6 py-2 rounded-lg bg-secondary text-foreground hover:bg-secondary/80 font-medium">
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}

export function ResultLayout1({ result }: ResultLayout1Props) {
  return (
    <ResultProvider result={result}>
      <ResultLayout1Content />
    </ResultProvider>
  );
}
