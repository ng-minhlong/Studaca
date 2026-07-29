'use client';

/**
 * useExam Hook
 * Access exam context and state
 */

import { useContext } from 'react';
import { ExamContext } from './ExamContext';

export function useExam() {
  const context = useContext(ExamContext);
  if (!context) {
    throw new Error('useExam must be used within ExamProvider');
  }
  return context;
}
