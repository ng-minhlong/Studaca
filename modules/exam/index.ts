// Types
export type { Exam, Section, Block, Question, Choice, Answer, ExamType } from './types';
export type { Result, QuestionResult, ScoreBreakdown, ResultSummary, Statistics } from './types';
export type { NavigationState, TimerState, ExamState } from './types';

// Engine
export { ExamProvider, useExam, ExamContext } from './engine';
export { ResultProvider, useResult, ResultContext } from './engine/result';

// Renderers
export { ExamRenderer, ResultRenderer } from './renderers';

// Layouts
export { Layout1, Layout2, Layout3 } from './layouts/test';
export { ResultLayout1, ResultLayout2, ResultLayout3 } from './layouts/result';

// Components
export {
  HeaderPanel,
  TimerPanel,
  QuestionPanel,
  SidebarPanel,
  NavigationPanel,
  ScorePanel,
  BandScorePanel,
  ReviewPanel,
  QuestionRenderer,
  AccuracyChart,
  SectionBreakdownChart,
} from './components';

// Registry
export { layoutRegistry, resultLayoutRegistry } from './registry';

// Adapters
export { getMockExam, getMockResult } from './adapters';

// Initialization
export { initializeExamModule } from './init';
