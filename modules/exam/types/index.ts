// ─── Test Types ────────────────────────────────────────────────────────────────

export type ExamType =
  | "jlpt"
  | "hsk"
  | "topik-reading"
  | "topik-listening"
  | "toeic-reading"
  | "toeic-listening"
  | "thptqg"
  | "hsa"
  | "ielts-reading"
  | "ielts-listening"
  | "ielts-speaking"
  | "ielts-writing"
  | "digital-sat";

export type LayoutKey =
  | "layout_0"
  | "layout_1"
  | "layout_2"
  | "layout_3"
  | "layout_4"
  | "layout_5";

export type QuestionType = "completion" | "multiple-choice" | "multi-select";

// ─── Question ────────────────────────────────────────────────────────────────

export interface AnswerOption {
  key: string;
  label: string;
}

export interface Question {
  id: string;
  number: number;
  type_question: QuestionType;
  question: string;
  answers_option?: AnswerOption[];
  correct_answer?: string | string[];
}

// ─── Part (Layout 0) ─────────────────────────────────────────────────────────

export interface Part {
  id: string;
  title: string;
  questions: Question[];
}

// ─── Question Range (Layout 1 / 2) ───────────────────────────────────────────

export interface QuestionRange {
  label: string;
  description?: string;
  type_question: QuestionType;
  questions: Question[];
}

// ─── IELTS Reading Part ───────────────────────────────────────────────────────

export interface IeltsReadingPart {
  id: string;
  title: string;
  paragraph: string;
  questionRanges: QuestionRange[];
}

// ─── IELTS Listening Part ────────────────────────────────────────────────────

export interface IeltsListeningPart {
  id: string;
  title: string;
  audio_link: string;
  questionRanges: QuestionRange[];
}

// ─── IELTS Speaking Part ─────────────────────────────────────────────────────

export interface IeltsSpeakingQuestion {
  id: string;
  number: number;
  prompt: string;
  prep_time?: number;
  speak_time?: number;
}

export interface IeltsSpeakingPart {
  id: string;
  title: string;
  description?: string;
  questions: IeltsSpeakingQuestion[];
}

// ─── IELTS Writing Part ──────────────────────────────────────────────────────

export interface IeltsWritingPart {
  id: string;
  title: string;
  task_label: string;
  question: string;
  instructions: string;
  image_url?: string;
  min_words: number;
}

// ─── SAT Question ────────────────────────────────────────────────────────────

export interface SatAnswers {
  answer_1: string;
  answer_2: string;
  answer_3: string;
  answer_4: string;
}

export interface SatQuestion {
  id: string;
  number: number;
  type_question: "multiple-choice" | "completion";
  passage?: string;
  question: string;
  answers: SatAnswers | "";
  correct_answer?: string;
  domain?: string;
  module?: string;
}

// ─── Base Test ───────────────────────────────────────────────────────────────

export interface BaseTest {
  id_test: string;
  type: ExamType;
  title: string;
  duration_minutes: number;
}

// ─── Concrete Test variants ───────────────────────────────────────────────────

export interface Layout0Test extends BaseTest {
  layout: "layout_0";
  isSingle: boolean;
  parts: Part[];
}

export interface Layout1Test extends BaseTest {
  layout: "layout_1";
  parts: IeltsReadingPart[];
}

export interface Layout2Test extends BaseTest {
  layout: "layout_2";
  parts: IeltsListeningPart[];
}

export interface Layout3Test extends BaseTest {
  layout: "layout_3";
  parts: IeltsSpeakingPart[];
}

export interface Layout4Test extends BaseTest {
  layout: "layout_4";
  parts: IeltsWritingPart[];
}

export interface Layout5Test extends BaseTest {
  layout: "layout_5";
  questions: SatQuestion[];
}

export type AnyTest =
  | Layout0Test
  | Layout1Test
  | Layout2Test
  | Layout3Test
  | Layout4Test
  | Layout5Test;

// ─── Result Types ────────────────────────────────────────────────────────────

export type QuestionStatus = "correct" | "incorrect" | "skipped";

export interface QuestionResult {
  question_id: string;
  question_number: number;
  user_answer: string | string[] | null;
  correct_answer: string | string[];
  status: QuestionStatus;
}

export interface PartResult {
  part_id: string;
  part_title: string;
  total: number;
  correct: number;
  incorrect: number;
  skipped: number;
}

export interface BaseResult {
  id_test: string;
  idResult: string;
  type: ExamType;
  time_used_seconds: number;
  part_results: PartResult[];
  question_results: QuestionResult[];
}

export interface Layout0Result extends BaseResult {
  layout: "layout_0";
  score: number;
  total_questions: number;
  accuracy: number;
}

export interface Layout1Result extends BaseResult {
  layout: "layout_1";
  band_score: number;
  raw_score: number;
}

export interface Layout2Result extends BaseResult {
  layout: "layout_2";
  band_score: number;
  raw_score: number;
}

export interface IeltsSpeakingCriteria {
  fluency: number;
  lexical: number;
  grammar: number;
  pronunciation: number;
}

export interface Layout3Result extends BaseResult {
  layout: "layout_3";
  overall_band: number;
  criteria: IeltsSpeakingCriteria;
  feedback: string;
  recording_urls?: Record<string, string>;
}

export interface IeltsWritingCriteria {
  [key: string]: number;
  task_achievement: number;
  coherence: number;
  lexical: number;
  grammar: number;
}

export interface Layout4Result extends BaseResult {
  layout: "layout_4";
  overall_band: number;
  task1_band: number;
  task2_band: number;
  criteria_task1: IeltsWritingCriteria;
  criteria_task2: IeltsWritingCriteria;
  feedback_task1: string;
  feedback_task2: string;
  submitted_task1: string;
  submitted_task2: string;
}

export interface SatDomainScore {
  domain: string;
  score: number;
  total: number;
}

export interface Layout5Result extends BaseResult {
  layout: "layout_5";
  total_score: number;
  math_score: number;
  reading_writing_score: number;
  domain_breakdown: SatDomainScore[];
}

export type AnyResult =
  | Layout0Result
  | Layout1Result
  | Layout2Result
  | Layout3Result
  | Layout4Result
  | Layout5Result;
