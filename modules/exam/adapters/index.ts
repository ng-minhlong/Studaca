import type { AnyTest, AnyResult, ExamType } from "../types";
import {
  mockJlpt,
  mockHsk,
  mockTopikReading,
  mockTopikListening,
  mockToeicReading,
  mockToeicListening,
  mockThptqg,
  mockHsa,
} from "../mocks/tests/layout0";
import {
  mockIeltsReading,
  mockIeltsListening,
  mockIeltsSpeaking,
  mockIeltsWriting,
  mockDigitalSat,
} from "../mocks/tests/layouts1to5";
import {
  mockJlptResult,
  mockHskResult,
  mockTopikReadingResult,
  mockTopikListeningResult,
  mockToeicReadingResult,
  mockToeicListeningResult,
  mockThptqgResult,
  mockHsaResult,
  mockIeltsReadingResult,
  mockIeltsListeningResult,
  mockIeltsSpeakingResult,
  mockIeltsWritingResult,
  mockDigitalSatResult,
} from "../mocks/results";

// ─── Test Registry ────────────────────────────────────────────────────────────

const TEST_REGISTRY: Record<string, AnyTest> = {
  "jlpt:jlpt-001": mockJlpt,
  "hsk:hsk-001": mockHsk,
  "topik-reading:topik-reading-001": mockTopikReading,
  "topik-listening:topik-listening-001": mockTopikListening,
  "toeic-reading:toeic-reading-001": mockToeicReading,
  "toeic-listening:toeic-listening-001": mockToeicListening,
  "thptqg:thptqg-001": mockThptqg,
  "hsa:hsa-001": mockHsa,
  "ielts-reading:ielts-reading-001": mockIeltsReading,
  "ielts-listening:ielts-listening-001": mockIeltsListening,
  "ielts-speaking:ielts-speaking-001": mockIeltsSpeaking,
  "ielts-writing:ielts-writing-001": mockIeltsWriting,
  "digital-sat:digital-sat-001": mockDigitalSat,
};

// ─── Result Registry ──────────────────────────────────────────────────────────

const RESULT_REGISTRY: Record<string, AnyResult> = {
  "jlpt:jlpt-result-001": mockJlptResult,
  "hsk:hsk-result-001": mockHskResult,
  "topik-reading:topik-reading-result-001": mockTopikReadingResult,
  "topik-listening:topik-listening-result-001": mockTopikListeningResult,
  "toeic-reading:toeic-reading-result-001": mockToeicReadingResult,
  "toeic-listening:toeic-listening-result-001": mockToeicListeningResult,
  "thptqg:thptqg-result-001": mockThptqgResult,
  "hsa:hsa-result-001": mockHsaResult,
  "ielts-reading:ielts-reading-result-001": mockIeltsReadingResult,
  "ielts-listening:ielts-listening-result-001": mockIeltsListeningResult,
  "ielts-speaking:ielts-speaking-result-001": mockIeltsSpeakingResult,
  "ielts-writing:ielts-writing-result-001": mockIeltsWritingResult,
  "digital-sat:digital-sat-result-001": mockDigitalSatResult,
};

// ─── Public API ───────────────────────────────────────────────────────────────

export function getMockTest(type: ExamType, id: string): AnyTest | null {
  return TEST_REGISTRY[`${type}:${id}`] ?? null;
}

export function getMockResult(type: ExamType, idResult: string): AnyResult | null {
  return RESULT_REGISTRY[`${type}:${idResult}`] ?? null;
}
