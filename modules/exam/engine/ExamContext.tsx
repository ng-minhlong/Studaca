'use client';

/**
 * Exam Context
 * Defines the interface for exam state and actions
 */

import React from 'react';
import type { Exam, Answer } from '../types';

export interface ExamContextType {
  // State
  exam: Exam | null;
  currentSectionId: string;
  currentBlockId: string;
  currentQuestionId: string;
  answers: Record<string, Answer>;
  bookmarks: Set<string>;
  status: 'not-started' | 'in-progress' | 'paused' | 'submitted' | 'completed';
  elapsedTime: number; // milliseconds
  
  // Actions
  startExam: () => void;
  pauseExam: () => void;
  resumeExam: () => void;
  submitExam: () => void;
  
  answerQuestion: (questionId: string, answer: Answer) => void;
  toggleBookmark: (questionId: string) => void;
  
  navigateToQuestion: (questionId: string) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  
  getCurrentQuestion: () => any | null;
  getTotalQuestions: () => number;
  getAnsweredCount: () => number;
  getBookmarkedCount: () => number;
}

export const ExamContext = React.createContext<ExamContextType | null>(null);
