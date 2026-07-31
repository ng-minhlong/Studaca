import type { AnyPractice, PracticeType } from "../types";
import { mockDictation, mockShadowing } from "../mocks";

export const VALID_PRACTICE_TYPES: PracticeType[] = ["dictation", "shadowing"];

export function isValidPracticeType(type: string): type is PracticeType {
  return VALID_PRACTICE_TYPES.includes(type as PracticeType);
}

// ─── Practice Registry ────────────────────────────────────────────────────────

const PRACTICE_REGISTRY: Record<string, AnyPractice> = {
  "dictation:dictation-001": mockDictation,
  "shadowing:shadowing-001": mockShadowing,
};

export function getMockPractice(
  type: PracticeType,
  id: string
): AnyPractice | null {
  return PRACTICE_REGISTRY[`${type}:${id}`] ?? null;
}
