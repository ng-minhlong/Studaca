// ---------------------------------------------------------------------------
// Studaca — mock data layer for /library/*
// Replace `simulateFetch` with a real API call whenever the backend is ready.
// The shape of `LibraryItem` and the category configs below are the only
// contract the UI depends on, so swapping in real data is a drop-in change.
// ---------------------------------------------------------------------------

export type LibrarySection = "test" | "practice" | "full-test";

export interface CategoryConfig {
  key: string;
  label: string;
  /** Short monogram shown on the card (kept to 1–3 chars) */
  tag: string;
}

export interface LibraryItem {
  id: string;
  name: string;
  category: string;
  durationMinutes: number;
  testTakerCount: number;
  completed: boolean;
  createdAt: string; // ISO date, used for "Latest" sorting
}

// ---------------------------------------------------------------------------
// Category configs
// ---------------------------------------------------------------------------

export const TEST_CATEGORIES: CategoryConfig[] = [
  { key: "ielts-reading", label: "IELTS Reading", tag: "IR" },
  { key: "ielts-listening", label: "IELTS Listening", tag: "IL" },
  { key: "ielts-speaking", label: "IELTS Speaking", tag: "IS" },
  { key: "ielts-writing", label: "IELTS Writing", tag: "IW" },
  { key: "digital-sat-verbal", label: "Digital SAT Verbal", tag: "SV" },
  { key: "digital-sat-math", label: "Digital SAT Math", tag: "SM" },
  { key: "toeic-reading", label: "TOEIC Reading", tag: "TR" },
  { key: "toeic-listening", label: "TOEIC Listening", tag: "TL" },
  { key: "hsk-reading", label: "HSK Reading", tag: "HR" },
  { key: "hsk-listening", label: "HSK Listening", tag: "HL" },
  { key: "jlpt-reading", label: "JLPT Reading", tag: "JR" },
  { key: "jlpt-listening", label: "JLPT Listening", tag: "JL" },
];

export const PRACTICE_CATEGORIES: CategoryConfig[] = [
  { key: "shadowing", label: "Shadowing", tag: "SH" },
  { key: "dictation", label: "Dictation", tag: "DC" },
  { key: "speaking-practice", label: "Speaking Practice", tag: "SP" },
];

export const FULL_TEST_CATEGORIES: CategoryConfig[] = [
  { key: "digital-sat", label: "Digital SAT", tag: "SAT" },
  { key: "ielts", label: "IELTS", tag: "IELTS" },
  { key: "toeic", label: "TOEIC", tag: "TOEIC" },
  { key: "hsk", label: "HSK", tag: "HSK" },
  { key: "jlpt", label: "JLPT", tag: "JLPT" },
];

export const SECTION_CONFIG: Record<
  LibrarySection,
  { title: string; description: string; categories: CategoryConfig[]; defaultCategory: string }
> = {
  test: {
    title: "Đề thi",
    description: "Luyện từng kỹ năng với ngân hàng đề thi được cập nhật liên tục.",
    categories: TEST_CATEGORIES,
    defaultCategory: "ielts-reading",
  },
  practice: {
    title: "Luyện tập",
    description: "Rèn phản xạ nghe – nói mỗi ngày với các bài luyện tập ngắn.",
    categories: PRACTICE_CATEGORIES,
    defaultCategory: "shadowing",
  },
  "full-test": {
    title: "Thi thử toàn phần",
    description: "Mô phỏng đúng cấu trúc và thời gian của kỳ thi thật.",
    categories: FULL_TEST_CATEGORIES,
    defaultCategory: "digital-sat",
  },
};

// ---------------------------------------------------------------------------
// Mock generation
// ---------------------------------------------------------------------------

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashSeed(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return h;
}

const NAME_PARTS = [
  "Cambridge",
  "Official Guide",
  "Practice Set",
  "Mock Test",
  "Skill Booster",
  "Full Length",
  "Timed Drill",
  "Foundation",
  "Advanced",
  "Weekly Challenge",
  "Exam Simulation",
  "Diagnostic",
];

function durationRangeFor(section: LibrarySection, category: string) {
  if (section === "full-test") return [120, 180] as const;
  if (section === "practice") return [8, 20] as const;
  if (category.includes("writing")) return [40, 60] as const;
  if (category.includes("speaking")) return [11, 15] as const;
  if (category.includes("math")) return [35, 45] as const;
  return [30, 60] as const;
}

export function generateItems(
  section: LibrarySection,
  category: CategoryConfig,
  count = 42
): LibraryItem[] {
  const rand = mulberry32(hashSeed(`${section}-${category.key}`));
  const [minDur, maxDur] = durationRangeFor(section, category.key);
  const items: LibraryItem[] = [];

  for (let i = 1; i <= count; i++) {
    const namePart = NAME_PARTS[Math.floor(rand() * NAME_PARTS.length)];
    const daysAgo = Math.floor(rand() * 400);
    const createdAt = new Date(Date.now() - daysAgo * 86400000).toISOString();

    items.push({
      id: `${category.key}-${i}`,
      name: `${category.label} — ${namePart} ${i}`,
      category: category.key,
      durationMinutes: Math.round(minDur + rand() * (maxDur - minDur)),
      testTakerCount: Math.floor(200 + rand() * 48000),
      completed: rand() > 0.72,
      createdAt,
    });
  }

  return items;
}

/**
 * Simulated network fetch. Swap the body of this function for a real
 * `fetch("/api/library/...")` call — the return type is all callers rely on.
 */
export async function simulateFetch(
  section: LibrarySection,
  categoryKey: string
): Promise<LibraryItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const config = SECTION_CONFIG[section];
  const category =
    config.categories.find((c) => c.key === categoryKey) ?? config.categories[0];

  return generateItems(section, category);
}
