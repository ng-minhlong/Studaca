import type { ExamType, LayoutKey } from "../types";

export const VALID_TYPES: ExamType[] = [
  "jlpt",
  "hsk",
  "topik-reading",
  "topik-listening",
  "toeic-reading",
  "toeic-listening",
  "thptqg",
  "hsa",
  "ielts-reading",
  "ielts-listening",
  "ielts-speaking",
  "ielts-writing",
  "digital-sat",
];

export const TYPE_TO_LAYOUT: Record<ExamType, LayoutKey> = {
  jlpt: "layout_0",
  hsk: "layout_0",
  "topik-reading": "layout_0",
  "topik-listening": "layout_0",
  "toeic-reading": "layout_0",
  "toeic-listening": "layout_0",
  thptqg: "layout_0",
  hsa: "layout_0",
  "ielts-reading": "layout_1",
  "ielts-listening": "layout_2",
  "ielts-speaking": "layout_3",
  "ielts-writing": "layout_4",
  "digital-sat": "layout_5",
};

export function isValidType(type: string): type is ExamType {
  return VALID_TYPES.includes(type as ExamType);
}

export function getLayout(type: ExamType): LayoutKey {
  return TYPE_TO_LAYOUT[type];
}
