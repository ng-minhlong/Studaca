'use client';

import React from 'react';
import { useResult } from '../../../engine/result';

export function BandScorePanel() {
  const { getSummary } = useResult();
  const summary = getSummary();

  if (!summary.bandScore) {
    return null;
  }

  const getBandDescription = (band: number): string => {
    const descriptions: Record<number, string> = {
      9: 'Expert User - Fluent with perfect command',
      8: 'Very Good User - Fully operational with occasional inaccuracies',
      7: 'Good User - Operational with occasional ineffectiveness',
      6: 'Competent User - Generally effective with some inaccuracies',
      5: 'Modest User - Partially effective',
      4: 'Limited User - Elementary competence only',
      3: 'Extremely Limited User - Conveys only very basic meaning',
      1: 'Non User - Essentially no ability',
    };
    return descriptions[band] || 'Unknown band';
  };

  return (
    <div className="bg-gradient-to-br from-primary to-primary/80 rounded-lg p-8 text-primary-foreground">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold opacity-90 mb-2">IELTS Band Score</p>
          <div className="text-5xl font-bold mb-3">{summary.bandScore}</div>
          <p className="text-sm opacity-90 max-w-sm">
            {getBandDescription(summary.bandScore)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm opacity-90 mb-2">Overall Score</p>
          <p className="text-4xl font-bold">{summary.percentage}%</p>
        </div>
      </div>
    </div>
  );
}
