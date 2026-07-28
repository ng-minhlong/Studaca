import { createContext } from 'react'
import type {
  Exam,
  NavigationState,
  AnswerMap,
  BookmarkSet,
  TimerState,
  CurrentQuestion,
  AnswerValue,
} from '../types'

/**
 * Exam Context
 * 
 * Manages the entire exam state including:
 * - Navigation (current section/block/question)
 * - Answers and bookmarks
 * - Timer
 */
export interface ExamContextValue {
  // State
  exam: Exam | null
  navigationState: NavigationState
  answerMap: AnswerMap
  bookmarkedQuestions: BookmarkSet
  timerState: TimerState

  // Computed
  getCurrentQuestion: () => CurrentQuestion | null
  getTotalQuestions: () => number
  getCurrentQuestionNumber: () => number

  // Navigation
  nextQuestion: () => void
  previousQuestion: () => void
  jumpToQuestion: (sectionIndex: number, blockIndex: number, questionIndex: number) => void

  // Answers
  answerQuestion: (questionId: string, value: AnswerValue) => void
  getAnswer: (questionId: string) => AnswerValue

  // Bookmarks
  toggleBookmark: (questionId: string) => void
  isBookmarked: (questionId: string) => boolean

  // Timer
  startTimer: (seconds: number) => void
  pauseTimer: () => void
  resumeTimer: () => void
  tick: () => void

  // Exam lifecycle
  finishExam: () => void
}

export const ExamContext = createContext<ExamContextValue | undefined>(undefined)
