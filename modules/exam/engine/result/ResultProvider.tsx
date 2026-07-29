'use client';

/**
 * Result Provider
 * Provides read-only access to exam results
 */

import React, { useCallback, ReactNode } from 'react';
import type { Result, QuestionResult, ScoreBreakdown } from '../../types';
import { ResultContext, type ResultContextType } from './ResultContext';

interface ResultProviderProps {
  result: Result;
  children: ReactNode;
}

export function ResultProvider({ result, children }: ResultProviderProps) {
  const getSummary = useCallback(() => {
    return result.summary;
  }, [result]);

  const getStatistics = useCallback(() => {
    return result.statistics;
  }, [result]);

  const getQuestionResult = useCallback(
    (questionId: string): QuestionResult | null => {
      return result.questionResults[questionId] || null;
    },
    [result]
  );

  const getSectionBreakdown = useCallback(
    (sectionId: string): ScoreBreakdown | null => {
      return result.statistics.sectionBreakdown.find(sb => sb.sectionId === sectionId) || null;
    },
    [result]
  );

  const getAllQuestionResults = useCallback(() => {
    return Object.values(result.questionResults);
  }, [result]);

  const getAccuracyPercentage = useCallback(() => {
    return result.summary.percentage;
  }, [result]);

  const value: ResultContextType = {
    result,
    getSummary,
    getStatistics,
    getQuestionResult,
    getSectionBreakdown,
    getAllQuestionResults,
    getAccuracyPercentage,
  };

  return <ResultContext.Provider value={value}>{children}</ResultContext.Provider>;
}
