import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { EXAM_TYPE_MODEL_MAP } from "@/modules/exam/prisma";
import { isValidType } from "@/modules/exam/registry";
import { getDbTest } from "@/modules/exam/db";

// Compare user string with correct answer (case-insensitive, trimmed)
function isAnswerCorrect(userAns: unknown, correctAns: unknown): boolean {
  if (userAns === undefined || userAns === null || userAns === "") return false;
  if (correctAns === undefined || correctAns === null) return false;

  const normalize = (str: unknown) =>
    String(str)
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ");

  if (Array.isArray(correctAns)) {
    const userStr = normalize(userAns);
    if (typeof correctAns[0] === "string") {
      return correctAns.some((ans) => normalize(ans) === userStr);
    }
  }

  return normalize(userAns) === normalize(correctAns);
}

export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    const body = await request.json();
    const { userId: bodyUserId, idResult, idTest, type, answers, timeUsedSeconds } = body;

    if (!idResult || !idTest || !type) {
      return NextResponse.json(
        { error: "Missing required fields: idResult, idTest, type" },
        { status: 400 }
      );
    }

    if (!isValidType(type) || (type !== "digital-sat-math" && type !== "digital-sat-verbal")) {
      return NextResponse.json(
        { error: "Invalid test type for Digital SAT" },
        { status: 400 }
      );
    }

    const mapping = EXAM_TYPE_MODEL_MAP[type];
    if (!mapping) {
      return NextResponse.json({ error: "Unsupported test type" }, { status: 400 });
    }

    const fullTest = await getDbTest(type, idTest);
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

    const questions = (fullTest as any).questions || [];
    const totalQuestionNumber = questions.length;
    let correctCount = 0;
    let incorrectCount = 0;
    let skipCount = 0;

    const scoredQuestions = questions.map((q: any) => {
      const userAns = userAnswersMap[q.id];
      let status = "skipped";

      if (userAns === undefined || userAns === null || userAns === "") {
        skipCount++;
      } else if (q.correct_answer && isAnswerCorrect(userAns, q.correct_answer)) {
        correctCount++;
        status = "correct";
      } else if (q.correct_answer) {
        incorrectCount++;
        status = "incorrect";
      } else {
        correctCount++;
        status = "correct";
      }

      return {
        id: q.id,
        number: q.number,
        user_answer: userAns ?? null,
        correct_answer: q.correct_answer ?? null,
        status,
      };
    });

    const correctPercentage = totalQuestionNumber > 0
      ? `${Math.round((correctCount / totalQuestionNumber) * 100)}%`
      : "0%";

    // SAT score scale (200 - 800)
    const satScore = totalQuestionNumber > 0
      ? Math.round(200 + (correctCount / totalQuestionNumber) * 600)
      : 200;

    const updatePayload: Record<string, unknown> = {
      isFinished: true,
      finishedAt: new Date(),
      timedotest: timedotestStr,
      totalQuestionNumber,
      correctNumber: correctCount,
      incorrectNumber: incorrectCount,
      skipNumber: skipCount,
      correctPercentage,
      resulttest: String(satScore),
      useranswer: scoredQuestions,
      saveSpecificTime: timedotestStr,
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
      type,
      message: "Digital SAT test marked successfully",
    });
  } catch (error: any) {
    console.error("Error in Digital SAT marking API:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error during marking" },
      { status: 500 }
    );
  }
}
