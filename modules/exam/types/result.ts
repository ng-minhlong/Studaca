/**
 * Result Type Definitions
 * Defines result data structures for post-exam analysis
 */

import type { Answer, Question } from './question';

export interface QuestionResult {
  questionId: string;
  question: Question;
  userAnswer: Answer;
  isCorrect: boolean;
  timeSpent: number; // milliseconds
  explanation?: string;
}

export interface ScoreBreakdown {
  sectionId: string;
  sectionTitle: string;
  totalQuestions: number;
  correct: number;
  wrong: number;
  skipped: number;
  accuracy: number; // percentage 0-100
  timeSpent: number; // milliseconds
}

export interface ResultSummary {
  totalQuestions: number;
  answered: number;
  correct: number;
  wrong: number;
  skipped: number;
  totalScore: number;
  maxScore: number;
  percentage: number; // 0-100
  totalTimeSpent: number; // milliseconds
  bandScore?: number; // For IELTS-like exams (1-9)
  grade?: string; // For other exam types
}

export interface Statistics {
  accuracy: number; // percentage
  sectionBreakdown: ScoreBreakdown[];
  timePerQuestion: number; // average milliseconds
  mostDifficultSection?: string;
  leastAccurateQuestionType?: string;
}

export interface Result {
  id: string;
  examId: string;
  userId?: string;
  attemptNumber: number;
  completedAt: Date;
  summary: ResultSummary;
  statistics: Statistics;
  questionResults: Record<string, QuestionResult>;
  resultLayout: {
    id: string; // e.g., 'result_layout_1'
    config?: Record<string, any>;
  };
}
