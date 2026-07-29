'use client';

/**
 * Result Layout 2: IELTS Reading Results
 * Shows band score, section breakdown, and question review
 */

import React from 'react';
import type { Result } from '../../types';
import { ResultProvider, useResult } from '../../engine/result';
import { BandScorePanel } from '../../components/panels/result/BandScorePanel';
import { SectionBreakdownChart } from '../../components/charts/SectionBreakdownChart';
import { ReviewPanel } from '../../components/panels/result/ReviewPanel';

interface ResultLayout2Props {
  result: Result;
}

function ResultLayout2Content() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted border-b border-border p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-2">IELTS Reading Results</h1>
          <p className="text-muted-foreground">
            Test completed on {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Band Score */}
        <BandScorePanel />

        {/* Section Breakdown */}
        <div>
          <SectionBreakdownChart />
        </div>

        {/* Question Review */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Question Analysis</h2>
          <ReviewPanel />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-6">
          <button className="px-6 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 font-medium">
            Download Certificate
          </button>
          <button className="px-6 py-2 rounded-lg bg-secondary text-foreground hover:bg-secondary/80 font-medium">
            Retake Test
          </button>
        </div>
      </div>
    </div>
  );
}

export function ResultLayout2({ result }: ResultLayout2Props) {
  return (
    <ResultProvider result={result}>
      <ResultLayout2Content />
    </ResultProvider>
  );
}
