// ─── Practice Type ────────────────────────────────────────────────────────────

export type PracticeType = "dictation" | "shadowing";

export type PracticeLayoutKey = "dictation_layout" | "shadowing_layout";

// ─── Dictation ────────────────────────────────────────────────────────────────

export interface DictationSentence {
  id: string;
  number: number;
  audio_link: string;
  /** Hidden from user during practice; revealed on result */
  transcript: string;
  hint?: string;
}

export interface DictationPractice {
  id_practice: string;
  type: "dictation";
  layout: "dictation_layout";
  title: string;
  description: string;
  language: string;
  level: string;
  duration_minutes: number;
  sentences: DictationSentence[];
}

// ─── Shadowing ────────────────────────────────────────────────────────────────

export interface ShadowingSegment {
  id: string;
  number: number;
  audio_link: string;
  transcript: string;
  translation?: string;
  duration_seconds: number;
}

export interface ShadowingPractice {
  id_practice: string;
  type: "shadowing";
  layout: "shadowing_layout";
  title: string;
  description: string;
  language: string;
  level: string;
  duration_minutes: number;
  segments: ShadowingSegment[];
}

export type AnyPractice = DictationPractice | ShadowingPractice;

// ─── Practice Engine State ────────────────────────────────────────────────────

export type DictationAnswers = Record<string, string>; // sentenceId -> typed text

export type ShadowingProgress = Record<
  string,
  { listened: boolean; recorded: boolean }
>;

export interface PracticeEngineState {
  currentIndex: number;
  dictationAnswers: DictationAnswers;
  shadowingProgress: ShadowingProgress;
  isFinished: boolean;
  elapsedSeconds: number;
}

export type PracticeEngineAction =
  | { type: "SET_DICTATION_ANSWER"; sentenceId: string; value: string }
  | { type: "SET_SHADOWING_LISTENED"; segmentId: string }
  | { type: "SET_SHADOWING_RECORDED"; segmentId: string }
  | { type: "NEXT" }
  | { type: "PREV" }
  | { type: "JUMP"; index: number }
  | { type: "FINISH" }
  | { type: "TICK" };
