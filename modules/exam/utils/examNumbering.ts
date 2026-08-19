export interface QuestionItemMeta {
  id: string; // unique answer key, e.g. "1206_q1" or "1206_q1_input_0"
  questionId: string; // original q.id
  partId: string;
  inputIndex?: number;
  globalNumber: number; // sequential number across whole test (1..N)
  type: string;
}

export interface RangeMeta {
  startNumber: number;
  endNumber: number;
  totalQuestions: number;
  items: QuestionItemMeta[];
}

export interface PartMeta {
  partIndex: number;
  partId: string;
  title: string;
  startNumber: number;
  endNumber: number;
  totalQuestions: number;
  ranges: RangeMeta[];
}

export interface NumberingAnalysisResult {
  totalQuestions: number;
  parts: PartMeta[];
  questionNumberMap: Record<string, number>; // Maps each answer key to globalNumber
}

/**
 * Counts how many <input...> placeholders are in a string.
 */
export function countInputPlaceholders(html: string): number {
  if (!html) return 0;
  const matches = html.match(/<input\b[^>]*\/?>/gi);
  return matches ? matches.length : 0;
}

/**
 * Calculates continuous sequential numbering across all parts, ranges, and questions in Layout 1 / Layout 2.
 * Generates globally unique answer keys prefixed with partId to prevent collisions across parts.
 */
export function analyzeTestNumbering(parts: Array<{
  id: string;
  title: string;
  questionRanges: Array<{
    type_question?: string;
    questions: Array<{
      id: string;
      number?: number;
      type_question?: string;
      question?: string;
    }>;
  }>;
}>): NumberingAnalysisResult {
  let currentNumber = 1;
  const questionNumberMap: Record<string, number> = {};
  const analyzedParts: PartMeta[] = [];

  for (let pIdx = 0; pIdx < parts.length; pIdx++) {
    const part = parts[pIdx];
    const partStartNumber = currentNumber;
    const analyzedRanges: RangeMeta[] = [];

    for (const range of part.questionRanges || []) {
      const rangeStartNumber = currentNumber;
      const items: QuestionItemMeta[] = [];
      const effectiveRangeType = range.type_question;

      for (const q of range.questions || []) {
        const effectiveType = effectiveRangeType || q.type_question || "completion";
        const isCompletion = effectiveType === "completion";
        const inputCount = isCompletion ? countInputPlaceholders(q.question || "") : 0;

        if (isCompletion && inputCount > 1) {
          // Multi-input completion question: prefix with part.id to ensure uniqueness
          for (let i = 0; i < inputCount; i++) {
            const uniqueKey = `${part.id}_${q.id}_input_${i}`;
            const num = currentNumber++;
            questionNumberMap[uniqueKey] = num;
            items.push({
              id: uniqueKey,
              questionId: q.id,
              partId: part.id,
              inputIndex: i,
              globalNumber: num,
              type: "completion",
            });
          }
        } else {
          // Single question (or 1-input completion, or multiple-choice, or multi-select)
          const uniqueKey = `${part.id}_${q.id}`;
          const num = currentNumber++;
          questionNumberMap[uniqueKey] = num;
          items.push({
            id: uniqueKey,
            questionId: q.id,
            partId: part.id,
            globalNumber: num,
            type: effectiveType,
          });
        }
      }

      const rangeEndNumber = currentNumber > rangeStartNumber ? currentNumber - 1 : rangeStartNumber;
      analyzedRanges.push({
        startNumber: rangeStartNumber,
        endNumber: rangeEndNumber,
        totalQuestions: items.length,
        items,
      });
    }

    const partEndNumber = currentNumber > partStartNumber ? currentNumber - 1 : partStartNumber;
    analyzedParts.push({
      partIndex: pIdx,
      partId: part.id,
      title: part.title,
      startNumber: partStartNumber,
      endNumber: partEndNumber,
      totalQuestions: partEndNumber - partStartNumber + (currentNumber > partStartNumber ? 1 : 0),
      ranges: analyzedRanges,
    });
  }

  return {
    totalQuestions: currentNumber - 1,
    parts: analyzedParts,
    questionNumberMap,
  };
}

/**
 * Generates structured submission log for exam results (Supports Layout 1, 2, 4, 5, etc.)
 */
export function formatSubmissionLog(test: any, answers: Record<string, any>) {
  // Layout 4: IELTS Writing (test.layout === "layout_4")
  if (test.layout === "layout_4" && Array.isArray(test.parts)) {
    const tasks = test.parts.map((p: any, idx: number) => ({
      task_number: idx + 1,
      part_id: p.id,
      task_label: p.task_label || `Task ${idx + 1}`,
      title: p.title,
      min_words: p.min_words,
      user_response: answers[p.id] ?? "",
      word_count: (answers[p.id] ?? "").trim() === "" ? 0 : (answers[p.id] ?? "").trim().split(/\s+/).length,
    }));

    return {
      test_id: test.id_test,
      test_title: test.title,
      layout: test.layout,
      type: test.type,
      total_tasks: tasks.length,
      submitted_at: new Date().toISOString(),
      tasks,
    };
  }

  // Layout 5: Digital SAT (test.layout === "layout_5" or flat test.questions)
  if (test.layout === "layout_5" && Array.isArray(test.questions)) {
    const questionsWithAnswers = test.questions.map((q: any, idx: number) => ({
      question_number: q.number ?? idx + 1,
      question_id: q.id,
      module: q.module,
      domain: q.domain,
      type_question: q.type_question,
      user_answer: answers[q.id] ?? null,
    }));

    return {
      test_id: test.id_test,
      test_title: test.title,
      layout: test.layout,
      type: test.type,
      total_questions: test.questions.length,
      submitted_at: new Date().toISOString(),
      questions: questionsWithAnswers,
    };
  }

  // Layout 1 & 2: IELTS Reading / Listening (with questionRanges)
  if (test.parts && Array.isArray(test.parts) && test.parts[0]?.questionRanges) {
    const analysis = analyzeTestNumbering(test.parts);

    const formattedParts = analysis.parts.map((pMeta, pIdx) => {
      const originalPart = test.parts[pIdx];
      const questionsWithAnswers: Array<{
        question_number: number;
        question_id: string;
        type_question: string;
        user_answer: any;
      }> = [];

      for (const rangeMeta of pMeta.ranges) {
        for (const item of rangeMeta.items) {
          questionsWithAnswers.push({
            question_number: item.globalNumber,
            question_id: item.id,
            type_question: item.type,
            user_answer: answers[item.id] ?? null,
          });
        }
      }

      return {
        part_id: originalPart.id,
        part_title: originalPart.title,
        questions_count: questionsWithAnswers.length,
        questions: questionsWithAnswers,
      };
    });

    return {
      test_id: test.id_test,
      test_title: test.title,
      layout: test.layout,
      type: test.type,
      total_questions: analysis.totalQuestions,
      submitted_at: new Date().toISOString(),
      parts: formattedParts,
      raw_answers: answers,
    };
  }

  // Fallback
  return {
    test_id: test.id_test,
    test_title: test.title,
    layout: test.layout,
    type: test.type,
    submitted_at: new Date().toISOString(),
    answers,
  };
}
