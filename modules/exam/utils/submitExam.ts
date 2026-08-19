import { formatSubmissionLog } from "./examNumbering";

export interface SubmitExamParams {
  test: any;
  answers: Record<string, any>;
  timeRemainingSeconds?: number;
  userId?: string;
}

/**
 * Handles posting exam answers to the marking API and returns idResult for redirect.
 */
export async function submitExamAnswers({
  test,
  answers,
  timeRemainingSeconds = 0,
  userId,
}: SubmitExamParams): Promise<{ success: boolean; idResult: string }> {
  // 1. Console log formatted submission
  const submissionLog = formatSubmissionLog(test, answers);
  console.log(`=== USER SUBMISSION (${test.layout} - ${test.type}) ===`);
  console.log(JSON.stringify(submissionLog, null, 2));

  // 2. Calculate time used
  const totalDurationSeconds = (test.duration_minutes || 60) * 60;
  const timeUsedSeconds = Math.max(0, totalDurationSeconds - timeRemainingSeconds);

  // 3. Determine specific marking endpoint
  let markEndpoint = "/api/tests/result/mark";
  if (test.type === "ielts-reading") {
    markEndpoint = "/api/tests/result/mark/ielts/ielts-reading";
  } else if (test.type === "ielts-listening") {
    markEndpoint = "/api/tests/result/mark/ielts/ielts-listening";
  } else if (test.type === "ielts-writing") {
    markEndpoint = "/api/tests/result/mark/ielts/ielts-writing";
  } else if (test.type === "digital-sat-math" || test.type === "digital-sat-verbal") {
    markEndpoint = "/api/tests/result/mark/digital-sat";
  }

  // 4. Post to marking API
  const response = await fetch(markEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      idResult: test.idResult,
      idTest: test.id_test,
      type: test.type,
      userId,
      answers,
      timeUsedSeconds,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to mark test result");
  }

  const data = await response.json();
  return {
    success: true,
    idResult: data.idResult || test.idResult,
  };
}
