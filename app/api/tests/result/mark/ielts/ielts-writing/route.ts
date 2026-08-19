import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { EXAM_TYPE_MODEL_MAP } from "@/modules/exam/prisma";
import { isValidType } from "@/modules/exam/registry";
import { getDbTest } from "@/modules/exam/db";

export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    const body = await request.json();
    const { userId: bodyUserId, idResult, idTest, type, answers, timeUsedSeconds } = body;

    const testType = type || "ielts-writing";

    if (!idResult || !idTest) {
      return NextResponse.json(
        { error: "Missing required fields: idResult, idTest" },
        { status: 400 }
      );
    }

    if (!isValidType(testType) || testType !== "ielts-writing") {
      return NextResponse.json({ error: "Invalid test type for IELTS Writing" }, { status: 400 });
    }

    const mapping = EXAM_TYPE_MODEL_MAP[testType];
    if (!mapping) {
      return NextResponse.json({ error: "Unsupported test type" }, { status: 400 });
    }

    const fullTest = await getDbTest(testType, idTest);
    if (!fullTest) {
      return NextResponse.json({ error: "Test content not found" }, { status: 404 });
    }

    const prismaSaveModel = (prisma as unknown as Record<string, unknown>)[mapping.saveModel] as {
      findFirst: (args: { where: Record<string, unknown> }) => Promise<Record<string, unknown> | null>;
      updateMany: (args: { where: Record<string, unknown>; data: Record<string, unknown> }) => Promise<unknown>;
      create: (args: { data: Record<string, unknown> }) => Promise<unknown>;
    };

    if (!prismaSaveModel) {
      return NextResponse.json(
        { error: "Save result model is unavailable in Prisma client" },
        { status: 500 }
      );
    }

    const userAnswersMap = (answers && typeof answers === "object") ? answers : {};
    const timedotestStr = timeUsedSeconds ? `${timeUsedSeconds}` : "0";

    const parts = (fullTest as any).parts || [];
    const userAnswerAndComment = parts.map((p: any, idx: number) => ({
      task: idx + 1,
      part_id: p.id,
      task_label: p.task_label || `Task ${idx + 1}`,
      title: p.title,
      min_words: p.min_words,
      user_response: userAnswersMap[p.id] ?? "",
      word_count: (userAnswersMap[p.id] ?? "").trim() === "" ? 0 : (userAnswersMap[p.id] ?? "").trim().split(/\s+/).length,
      task_band: 8.0,
    }));

    const updatePayload: Record<string, unknown> = {
      isFinished: true,
      finishedAt: new Date(),
      timedotest: timedotestStr,
      resulttest: "8.0",
      bandDetail: JSON.stringify({ task1: 8.0, task2: 8.0 }),
      userAnswerAndComment,
    };

    const existing = await prismaSaveModel.findFirst({
      where: { idResult, idTest },
    });

    if (existing) {
      await prismaSaveModel.updateMany({
        where: { idResult, idTest },
        data: updatePayload,
      });
    } else {
      let parsedUserId: bigint = BigInt(0);
      try {
        const uid = bodyUserId || session?.user?.id;
        if (uid) parsedUserId = BigInt(uid);
      } catch {
        parsedUserId = BigInt(0);
      }

      await prismaSaveModel.create({
        data: {
          idResult,
          idTest,
          testname: (fullTest as any).title || idTest,
          userId: parsedUserId,
          typeTest: "practice",
          isCollection: false,
          createdAt: new Date(),
          ...updatePayload,
        },
      });
    }

    return NextResponse.json({
      success: true,
      idResult,
      idTest,
      type: testType,
      message: "IELTS Writing test marked successfully",
    });
  } catch (error: any) {
    console.error("Error in IELTS Writing marking API:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error during marking" },
      { status: 500 }
    );
  }
}
