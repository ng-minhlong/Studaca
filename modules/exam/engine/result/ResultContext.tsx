'use client';

/**
 * Result Context
 * Read-only context for exam results
 */

import React from 'react';
import type { Result, QuestionResult, ScoreBreakdown } from '../../types';

export interface ResultContextType {
  result: Result;
  
  // Accessors
  getSummary: () => Result['summary'];
  getStatistics: () => Result['statistics'];
  getQuestionResult: (questionId: string) => QuestionResult | null;
  getSectionBreakdown: (sectionId: string) => ScoreBreakdown | null;
  getAllQuestionResults: () => QuestionResult[];
  getAccuracyPercentage: () => number;
}

export const ResultContext = React.createContext<ResultContextType | null>(null);
