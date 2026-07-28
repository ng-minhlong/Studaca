'use client'

import { useContext } from 'react'
import { ExamContext, type ExamContextValue } from '../providers/ExamContext'

/**
 * useExam Hook
 * 
 * Access the exam context from any component.
 * Must be used inside ExamProvider.
 */
export function useExam(): ExamContextValue {
  const context = useContext(ExamContext)

  if (!context) {
    throw new Error('useExam must be used inside ExamProvider')
  }

  return context
}
