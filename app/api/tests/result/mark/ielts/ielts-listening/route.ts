import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { EXAM_TYPE_MODEL_MAP } from "@/modules/exam/prisma";
import { isValidType } from "@/modules/exam/registry";
import { getDbTest } from "@/modules/exam/db";
import { analyzeTestNumbering } from "@/modules/exam/utils/examNumbering";

// Convert raw score to IELTS Band Score (scale 9.0) - Listening
function rawToIeltsListeningBandScore(correct: number): number {
  if (correct >= 39) return 9.0;
  if (correct >= 37) return 8.5;
  if (correct >= 35) return 8.0;
  if (correct >= 32) return 7.5;
  if (correct >= 30) return 7.0;
  if (correct >= 26) return 6.5;
  if (correct >= 23) return 6.0;
  if (correct >= 18) return 5.5;
  if (correct >= 16) return 5.0;
  if (correct >= 13) return 4.5;
  if (correct >= 10) return 4.0;
  if (correct >= 8) return 3.5;
  if (correct >= 6) return 3.0;
  if (correct >= 4) return 2.5;
  return correct > 0 ? 2.0 : 0.0;
}

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

    const testType = type || "ielts-listening";

    if (!idResult || !idTest) {
      return NextResponse.json(
        { error: "Missing required fields: idResult, idTest" },
        { status: 400 }
      );
    }

    if (!isValidType(testType) || testType !== "ielts-listening") {
      return NextResponse.json({ error: "Invalid test type for IELTS Listening" }, { status: 400 });
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
    const analysis = analyzeTestNumbering(parts);
    const totalQuestionNumber = analysis.totalQuestions || 40;

    let correctCount = 0;
    let incorrectCount = 0;
    let skipCount = 0;

    for (const pMeta of analysis.parts) {
      const originalPart = parts[pMeta.partIndex];
      for (let rIdx = 0; rIdx < pMeta.ranges.length; rIdx++) {
        const rangeMeta = pMeta.ranges[rIdx];
        const originalRange = originalPart?.questionRanges?.[rIdx];

        for (const item of rangeMeta.items) {
          const userAns = userAnswersMap[item.id];
          const originalQ = originalRange?.questions?.find((q: any) => q.id === item.questionId);

          let correctAns = originalQ?.correct_answer;
          if (Array.isArray(correctAns) && item.inputIndex !== undefined) {
            correctAns = correctAns[item.inputIndex];
          }

          if (userAns === undefined || userAns === null || userAns === "") {
            skipCount++;
          } else if (correctAns !== undefined && isAnswerCorrect(userAns, correctAns)) {
            correctCount++;
          } else if (correctAns !== undefined) {
            incorrectCount++;
          } else {
            correctCount++;
          }
        }
      }
    }

    const answeredTotal = correctCount + incorrectCount;
    if (answeredTotal + skipCount < totalQuestionNumber) {
      skipCount = totalQuestionNumber - answeredTotal;
    }

    const bandScore = rawToIeltsListeningBandScore(correctCount);
    const correctPercentage = totalQuestionNumber > 0
      ? `${Math.round((correctCount / totalQuestionNumber) * 100)}%`
      : "0%";

    const updatePayload: Record<string, unknown> = {
      isFinished: true,
      finishedAt: new Date(),
      timedotest: timedotestStr,
      correctNumber: correctCount,
      incorrectNumber: incorrectCount,
      skipNumber: skipCount,
      totalQuestionNumber,
      resulttest: bandScore,
      correctPercentage,
      useranswer: userAnswersMap,
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
      message: "IELTS Listening test marked successfully",
    });
  } catch (error: any) {
    console.error("Error in IELTS Listening marking API:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error during marking" },
      { status: 500 }
    );
  }
}
