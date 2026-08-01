import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { EXAM_TYPE_MODEL_MAP } from "@/modules/exam/prisma";
import { isValidType } from "@/modules/exam/registry";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ type: string; id: string }> }
) {
  const { type, id } = await params;

  if (!isValidType(type)) {
    return NextResponse.json({ error: "Invalid test type" }, { status: 400 });
  }

  const mapping = EXAM_TYPE_MODEL_MAP[type];
  if (!mapping) {
    return NextResponse.json({ error: "Unsupported test type" }, { status: 400 });
  }

  const prismaModel = (prisma as unknown as Record<string, unknown>)[mapping.model] as {
    findFirst: (args: { where: Record<string, unknown> }) => Promise<Record<string, unknown> | null>;
  };

  if (!prismaModel?.findFirst) {
    return NextResponse.json(
      { error: "Test model is unavailable in Prisma client" },
      { status: 500 }
    );
  }

  const record = await prismaModel.findFirst({ where: { idTest: id } });

  if (!record) {
    return NextResponse.json({ error: "Test not found" }, { status: 404 });
  }

  return NextResponse.json({
    test: {
      id_test: String(record.idTest ?? id),
      title: String(record.testname ?? record.idTest ?? id),
      duration_minutes: Number(record.time ?? 0),
      questionCount: Number(record.numberQuestion ?? 0),
    },
  });
}
