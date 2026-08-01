import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { EXAM_TYPE_MODEL_MAP, getDefaultResultPayload } from "@/modules/exam/prisma";
import { isValidType } from "@/modules/exam/registry";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ type: string; id: string }> }
) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const resolvedParams = await params;
  const { type, id } = resolvedParams;

  if (!isValidType(type)) {
    return NextResponse.json({ error: "Invalid test type" }, { status: 400 });
  }

  const mapping = EXAM_TYPE_MODEL_MAP[type];
  if (!mapping) {
    return NextResponse.json({ error: "Unsupported test type" }, { status: 400 });
  }

  const prismaTestModel = (prisma as unknown as Record<string, unknown>)[mapping.model] as {
    findFirst: (args: { where: Record<string, unknown> }) => Promise<Record<string, unknown> | null>;
  };

  if (!prismaTestModel?.findFirst) {
    return NextResponse.json(
      { error: "Test model is unavailable in Prisma client" },
      { status: 500 }
    );
  }

  const testRecord = await prismaTestModel.findFirst({ where: { idTest: id } });

  if (!testRecord) {
    return NextResponse.json({ error: "Test not found" }, { status: 404 });
  }

  const testname = String(testRecord.testname ?? testRecord.idTest ?? id);
  const sessionUserId = String(session.user.id ?? "0");

  let userId: bigint;
  try {
    userId = BigInt(sessionUserId);
  } catch (error) {
    userId = BigInt(0);
  }

  const idResult = crypto.randomUUID();
  const createData = getDefaultResultPayload(type, userId, testname, id, idResult);

  const prismaSaveModel = (prisma as unknown as Record<string, unknown>)[mapping.saveModel] as {
    create: (args: { data: Record<string, unknown> }) => Promise<unknown>;
  };

  if (!prismaSaveModel?.create) {
    return NextResponse.json(
      { error: "Save result model is unavailable in Prisma client" },
      { status: 500 }
    );
  }

  await prismaSaveModel.create({ data: createData });

  return NextResponse.json({ success: true, idResult, message: "Test session created." });
}
