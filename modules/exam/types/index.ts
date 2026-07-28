/**
 * Unified Exam Type Definitions
 * 
 * These types define the contract between the backend and frontend.
 * The frontend only knows about these types - no exam-specific logic.
 */

// ============================================================================
// Question Types
// ============================================================================

export enum QuestionTypeEnum {
  MCQ = 'mcq',
  COMPLETION = 'completion',
  MULTI_SELECT = 'multi-select',
  ESSAY = 'essay',
  RECORDING = 'recording',
}

export type QuestionType = 'mcq' | 'completion' | 'multi-select' | 'essay' | 'recording'

/**
 * Base question structure - all questions follow this
 */
export interface Choice {
  id: string
  label: string
  value: string
}

export interface Question {
  id: string
  type: QuestionType
  title?: string
  instruction?: string
  content: string // The question text or prompt
  choices?: Choice[] // For MCQ, multi-select
  placeholder?: string // For text input/essay
  hasAnswer?: boolean // Used by UI to track if answered
}

// ============================================================================
// Block (Question Grouping)
// ============================================================================

export interface Block {
  id: string
  title?: string
  description?: string
  passage?: string // For reading layouts
  questions: Question[]
}

// ============================================================================
// Section
// ============================================================================

export interface Section {
  id: string
  title: string
  description?: string
  instructions?: string
  blocks: Block[]
  duration?: number // in minutes
}

// ============================================================================
// Layout Configuration
// ============================================================================

export enum LayoutId {
  SINGLE_QUESTION = 'layout_1',
  READING_SPLIT = 'layout_2',
  LISTENING = 'layout_3',
}

export interface LayoutConfig {
  id: LayoutId | string
  name: string
  description?: string
}

// ============================================================================
// Main Exam Object
// ============================================================================

export interface Exam {
  id: string
  title: string
  description?: string
  type?: string // IELTS, TOEIC, SAT, etc. - informational only, layout decides UI
  layout: LayoutConfig
  sections: Section[]
  totalDuration?: number // in minutes
}

// ============================================================================
// Navigation State
// ============================================================================

export interface NavigationState {
  currentSectionIndex: number
  currentBlockIndex: number
  currentQuestionIndex: number
}

// ============================================================================
// Timer State
// ============================================================================

export interface TimerState {
  totalSeconds: number
  remainingSeconds: number
  isActive: boolean
}

// ============================================================================
// Answer Storage
// ============================================================================

export type AnswerValue = string | string[] | undefined

export interface Answer {
  questionId: string
  value: AnswerValue
  timestamp?: number
}

export interface AnswerMap {
  [questionId: string]: AnswerValue
}

// ============================================================================
// Bookmarks
// ============================================================================

export interface BookmarkSet {
  [questionId: string]: boolean
}

// ============================================================================
// Exam Context State
// ============================================================================

export interface ExamContextState {
  exam: Exam | null
  navigationState: NavigationState
  answerMap: AnswerMap
  bookmarkedQuestions: BookmarkSet
  timerState: TimerState
}

// ============================================================================
// Helper Types
// ============================================================================

export interface CurrentQuestion {
  section: Section
  block: Block
  question: Question
  sectionIndex: number
  blockIndex: number
  questionIndex: number
  totalQuestions: number
  currentNumber: number
}
