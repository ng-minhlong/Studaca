import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import {
  SECTION_CONFIG,
  generateItems,
  type LibraryItem,
  type LibrarySection,
} from "@/app/(public)/(tests)/library/_lib/mock-data";
import { TEST_CATEGORY_MAP } from "@/modules/exam/prisma";

// ---------------------------------------------------------------------------
// Category → Prisma model mapping for the "test" section
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Convert a raw Prisma record into the `LibraryItem` shape the UI expects.
 *
 * Every model in the schema shares a common subset of columns:
 *   testname, time, testTakerCount, createdAt
 * We normalise those into the `LibraryItem` interface.
 *
 * `completed` is **always** `false` per the task requirements.
 */
function recordToLibraryItem(
  record: Record<string, unknown>,
  categoryKey: string
): LibraryItem {
  const testname = (record.testname as string) ?? "Untitled Test";
  const idTest = (record.idTest as string) ?? "error_id";
  const time = Number(record.time ?? 0);
  const testTakerCount = Number(record.testTakerCount ?? 0);
  const createdAt =
    (record.createdAt as string | Date | undefined) ??
    new Date().toISOString();

  return {
    id: idTest,
    name: testname,
    category: categoryKey,
    durationMinutes: time,
    testTakerCount,
    completed: false,
    createdAt:
      createdAt instanceof Date
        ? createdAt.toISOString()
        : new Date(createdAt).toISOString(),
  };
}

/**
 * Fetch real test records from Prisma for the "test" section.
 */
async function fetchTestItems(categoryKey: string): Promise<LibraryItem[]> {
  const mapping = TEST_CATEGORY_MAP[categoryKey];
  if (!mapping) {
    return [];
  }

  const prismaModel = (prisma as unknown as Record<string, unknown>)[
    mapping.model
  ] as {
    findMany: (args?: {
      where?: Record<string, unknown>;
      orderBy?: Record<string, unknown>;
    }) => Promise<Record<string, unknown>[]>;
  };

  if (!prismaModel?.findMany) {
    return [];
  }

  const where: Record<string, unknown> = {};
  if (mapping.typeValue !== undefined) {
    where[mapping.typeField] = mapping.typeValue;
  }

  const records = await prismaModel.findMany({
    where,
    orderBy: { number: "asc" },
  });

  return records.map((record) => recordToLibraryItem(record, categoryKey));
}

/**
 * Fetch mock data for "full-test" and "practice" sections.
 */
function fetchMockItems(
  section: "full-test" | "practice",
  categoryKey: string
): LibraryItem[] {
  const config = SECTION_CONFIG[section];
  const category =
    config.categories.find((c) => c.key === categoryKey) ??
    config.categories[0];

  return generateItems(section, category);
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

export async function GET(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // pathname looks like /api/tests/library/test
  const segments = pathname.split("/").filter(Boolean);
  const type = segments[segments.length - 1] as LibrarySection | undefined;

  if (!type || !SECTION_CONFIG[type]) {
    return NextResponse.json(
      { error: `Invalid library section: ${type}` },
      { status: 400 }
    );
  }

  const categoryKey =
    request.nextUrl.searchParams.get("category") ??
    SECTION_CONFIG[type].defaultCategory;

  let items: LibraryItem[];

  if (type === "test") {
    // Real data from Prisma
    items = await fetchTestItems(categoryKey);
  } else {
    // Mock data for full-test and practice
    items = fetchMockItems(type, categoryKey);
  }

  return NextResponse.json({ items });
}
