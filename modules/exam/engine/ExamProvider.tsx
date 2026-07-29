'use client';

/**
 * Exam Provider
 * Manages exam state and provides actions via context
 */

import React, { useReducer, useEffect, useCallback, ReactNode } from 'react';
import type { Exam, Answer } from '../types';
import { ExamContext, type ExamContextType } from './ExamContext';

interface ExamProviderProps {
  exam: Exam;
  children: ReactNode;
}

interface State {
  currentSectionId: string;
  currentBlockId: string;
  currentQuestionId: string;
  answers: Record<string, Answer>;
  bookmarks: Set<string>;
  status: 'not-started' | 'in-progress' | 'paused' | 'submitted' | 'completed';
  elapsedTime: number;
}

type Action =
  | { type: 'START_EXAM' }
  | { type: 'PAUSE_EXAM' }
  | { type: 'RESUME_EXAM' }
  | { type: 'SUBMIT_EXAM' }
  | { type: 'ANSWER_QUESTION'; questionId: string; answer: Answer }
  | { type: 'TOGGLE_BOOKMARK'; questionId: string }
  | { type: 'NAVIGATE_TO_QUESTION'; questionId: string }
  | { type: 'UPDATE_ELAPSED_TIME'; elapsed: number };

function getInitialState(exam: Exam): State {
  const firstSection = exam.sections[0];
  const firstBlock = firstSection?.blocks[0];
  const firstQuestion = firstBlock?.questions[0];

  return {
    currentSectionId: firstSection?.id || '',
    currentBlockId: firstBlock?.id || '',
    currentQuestionId: firstQuestion?.id || '',
    answers: {},
    bookmarks: new Set(),
    status: 'not-started',
    elapsedTime: 0,
  };
}

function examReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'START_EXAM':
      return { ...state, status: 'in-progress' };

    case 'PAUSE_EXAM':
      return { ...state, status: 'paused' };

    case 'RESUME_EXAM':
      return { ...state, status: 'in-progress' };

    case 'SUBMIT_EXAM':
      return { ...state, status: 'submitted' };

    case 'ANSWER_QUESTION':
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.questionId]: action.answer,
        },
      };

    case 'TOGGLE_BOOKMARK':
      const newBookmarks = new Set(state.bookmarks);
      if (newBookmarks.has(action.questionId)) {
        newBookmarks.delete(action.questionId);
      } else {
        newBookmarks.add(action.questionId);
      }
      return { ...state, bookmarks: newBookmarks };

    case 'NAVIGATE_TO_QUESTION':
      return { ...state, currentQuestionId: action.questionId };

    case 'UPDATE_ELAPSED_TIME':
      return { ...state, elapsedTime: action.elapsed };

    default:
      return state;
  }
}

// Helper: Find question by ID across all sections/blocks
function findQuestion(exam: Exam, questionId: string): any {
  for (const section of exam.sections) {
    for (const block of section.blocks) {
      const question = block.questions.find(q => q.id === questionId);
      if (question) return question;
    }
  }
  return null;
}

// Helper: Get all questions in order
function getAllQuestions(exam: Exam): any[] {
  const questions: any[] = [];
  for (const section of exam.sections) {
    for (const block of section.blocks) {
      questions.push(...block.questions);
    }
  }
  return questions;
}

export function ExamProvider({ exam, children }: ExamProviderProps) {
  const [state, dispatch] = useReducer(examReducer, exam, getInitialState);

  // Timer effect
  useEffect(() => {
    if (state.status !== 'in-progress') return;

    const interval = setInterval(() => {
      dispatch({ type: 'UPDATE_ELAPSED_TIME', elapsed: state.elapsedTime + 1000 });
    }, 1000);

    return () => clearInterval(interval);
  }, [state.status, state.elapsedTime]);

  const startExam = useCallback(() => {
    dispatch({ type: 'START_EXAM' });
  }, []);

  const pauseExam = useCallback(() => {
    dispatch({ type: 'PAUSE_EXAM' });
  }, []);

  const resumeExam = useCallback(() => {
    dispatch({ type: 'RESUME_EXAM' });
  }, []);

  const submitExam = useCallback(() => {
    dispatch({ type: 'SUBMIT_EXAM' });
  }, []);

  const answerQuestion = useCallback((questionId: string, answer: Answer) => {
    dispatch({ type: 'ANSWER_QUESTION', questionId, answer });
  }, []);

  const toggleBookmark = useCallback((questionId: string) => {
    dispatch({ type: 'TOGGLE_BOOKMARK', questionId });
  }, []);

  const navigateToQuestion = useCallback((questionId: string) => {
    dispatch({ type: 'NAVIGATE_TO_QUESTION', questionId });
  }, []);

  const nextQuestion = useCallback(() => {
    const allQuestions = getAllQuestions(exam);
    const currentIndex = allQuestions.findIndex(q => q.id === state.currentQuestionId);
    if (currentIndex < allQuestions.length - 1) {
      dispatch({
        type: 'NAVIGATE_TO_QUESTION',
        questionId: allQuestions[currentIndex + 1].id,
      });
    }
  }, [exam, state.currentQuestionId]);

  const previousQuestion = useCallback(() => {
    const allQuestions = getAllQuestions(exam);
    const currentIndex = allQuestions.findIndex(q => q.id === state.currentQuestionId);
    if (currentIndex > 0) {
      dispatch({
        type: 'NAVIGATE_TO_QUESTION',
        questionId: allQuestions[currentIndex - 1].id,
      });
    }
  }, [exam, state.currentQuestionId]);

  const getCurrentQuestion = useCallback(() => {
    return findQuestion(exam, state.currentQuestionId);
  }, [exam, state.currentQuestionId]);

  const getTotalQuestions = useCallback(() => {
    return getAllQuestions(exam).length;
  }, [exam]);

  const getAnsweredCount = useCallback(() => {
    return Object.keys(state.answers).length;
  }, [state.answers]);

  const getBookmarkedCount = useCallback(() => {
    return state.bookmarks.size;
  }, [state.bookmarks]);

  const value: ExamContextType = {
    exam,
    currentSectionId: state.currentSectionId,
    currentBlockId: state.currentBlockId,
    currentQuestionId: state.currentQuestionId,
    answers: state.answers,
    bookmarks: state.bookmarks,
    status: state.status,
    elapsedTime: state.elapsedTime,
    startExam,
    pauseExam,
    resumeExam,
    submitExam,
    answerQuestion,
    toggleBookmark,
    navigateToQuestion,
    nextQuestion,
    previousQuestion,
    getCurrentQuestion,
    getTotalQuestions,
    getAnsweredCount,
    getBookmarkedCount,
  };

  return <ExamContext.Provider value={value}>{children}</ExamContext.Provider>;
}
