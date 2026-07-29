/**
 * Navigation State Types
 * Manages exam navigation, timer, and bookmarks
 */

export interface NavigationState {
  currentSectionId: string;
  currentBlockId: string;
  currentQuestionId: string;
  navigationHistory: string[]; // Track visited questions
}

export interface TimerState {
  elapsed: number; // milliseconds
  totalDuration: number; // milliseconds
  isRunning: boolean;
  isPaused: boolean;
}

export interface ExamState extends NavigationState {
  answers: Record<string, any>; // questionId -> Answer
  bookmarks: Set<string>; // Question IDs
  status: 'not-started' | 'in-progress' | 'paused' | 'submitted' | 'completed';
  timer: TimerState;
}
