import { prisma } from "@/lib/db";
import { EXAM_TYPE_MODEL_MAP } from "./prisma";
import { getLayout } from "./registry";
import type {
  AnyTest,
  ExamType,
  IeltsListeningPart,
  IeltsReadingPart,
  IeltsSpeakingPart,
  IeltsSpeakingQuestion,
  IeltsWritingPart,
  Layout0Test,
  Layout1Test,
  Layout2Test,
  Layout3Test,
  Layout4Test,
  Layout5Test,
  Part,
  Question,
  QuestionRange,
  SatQuestion,
} from "./types";

const LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H"];

function safeParseJson(value: unknown): unknown {
  if (value === null || value === undefined) return null;
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }
  return value;
}

function normalizeAnswerOptions(raw: unknown): Question["answers_option"] {
  if (!raw) return undefined;

  if (Array.isArray(raw)) {
    const options = raw
      .map((item, index) => {
        if (typeof item === "string") {
          return { key: LETTERS[index] ?? String(index + 1), label: item };
        }

        if (Array.isArray(item)) {
          const label = typeof item[0] === "string" ? item[0] : String(item[0] ?? "");
          if (label) {
            return { key: LETTERS[index] ?? String(index + 1), label };
          }
        }

        if (item && typeof item === "object") {
          const label =
            item.label ?? item.text ?? item.answer ?? item.value ?? item.title;
          const key = item.key ?? item.id ?? LETTERS[index] ?? String(index + 1);
          if (typeof label === "string") {
            return { key: String(key), label };
          }
        }
        return undefined;
      })
      .filter((item): item is { key: string; label: string } => Boolean(item));
    return options.length > 0 ? options : undefined;
  }

  if (typeof raw === "object" && raw !== null) {
    const answers = [] as Array<{ key: string; label: string }>;
    for (const key of ["answer_1", "answer1", "A", "B", "C", "D", "E"] as const) {
      if (raw && typeof raw === "object" && key in raw) {
        const label = (raw as Record<string, unknown>)[key];
        if (typeof label === "string") {
          answers.push({ key: String(key).replace(/answer_/, "").toUpperCase(), label });
        }
      }
    }
    if (answers.length > 0) return answers;
  }

  return undefined;
}

function normalizeCorrectAnswer(raw: unknown): string | string[] | undefined {
  if (raw === undefined || raw === null) return undefined;

  if (Array.isArray(raw)) {
    if (raw.some((item) => Array.isArray(item))) {
      const correctAnswers = raw.flatMap((item, index) => {
        if (Array.isArray(item) && (item[1] === true || item[1] === 1 || item[1] === "true")) {
          return [LETTERS[index] ?? String(index + 1)];
        }
        return [];
      });
      if (correctAnswers.length > 0) {
        return correctAnswers.length === 1 ? correctAnswers[0] : correctAnswers;
      }
    }
    return raw.map((item) => String(item));
  }

  if (typeof raw === "object") {
    const rawObj = raw as Record<string, unknown>;
    if (rawObj.correct_answer || rawObj.correctAnswer) {
      return normalizeCorrectAnswer(rawObj.correct_answer ?? rawObj.correctAnswer);
    }
    const answers = Object.entries(rawObj)
      .filter(([, value]) => value === true || value === 1 || value === "true")
      .map(([key]) => key.toUpperCase().replace(/^answer_?/, ""));
    if (answers.length > 0) return answers.length === 1 ? answers[0] : answers;
    return String(raw);
  }
  return String(raw);
}

function getQuestionType(raw?: unknown): Question["type_question"] {
  if (!raw) return "completion";
  const type = String(raw).toLowerCase();
  if (type.includes("multi") || type.includes("multiple") || type.includes("checkbox")) return "multi-select";
  if (type.includes("choice") || type.includes("select") || type.includes("single")) return "multiple-choice";
  return "completion";
}

function normalizeQuestion(raw: unknown, index: number): Question {
  if (typeof raw === "string") {
    return {
      id: `q${index + 1}`,
      number: index + 1,
      type_question: "completion",
      question: raw,
    };
  }

  if (typeof raw === "object" && raw !== null) {
    const record = raw as Record<string, unknown>;
    const questionText =
      record.question ?? record.question_content ?? record.questionContent ?? record.prompt ?? record.text ?? record.title ?? record.questionText;
    const id = String(record.id ?? record.id_question ?? record.idQuestion ?? record.key ?? `q${index + 1}`);
    const answersOption = normalizeAnswerOptions(
      record.answers_option ?? record.answers ?? record.answer ?? record.answerOptions ?? record.options ?? record.box_answers
    );
    const correctAnswer = normalizeCorrectAnswer(
      record.correct_answer ?? record.correctAnswer ?? record.correct ?? record.correctAnswerValue ?? record.answer ?? record.answers
    );
    const typeQuestion = getQuestionType(
      record.type_question ?? record.typeQuestion ?? record.type_group_question ?? record.typeGroupQuestion ?? record.type ?? (answersOption ? "multiple-choice" : undefined)
    );

    return {
      id,
      number: Number(record.number ?? record.number_question ?? index + 1),
      type_question: Array.isArray(correctAnswer) ? "multi-select" : typeQuestion,
      question: String(questionText ?? `Question ${index + 1}`),
      answers_option: answersOption,
      correct_answer: correctAnswer,
    };
  }

  return {
    id: `q${index + 1}`,
    number: index + 1,
    type_question: "completion",
    question: String(raw ?? `Question ${index + 1}`),
  };
}

function normalizeQuestions(raw: unknown): Question[] {
  const value = safeParseJson(raw);
  if (Array.isArray(value)) {
    return value.map((item, index) => normalizeQuestion(item, index));
  }

  if (typeof value === "object" && value !== null) {
    const record = value as Record<string, unknown>;
    if (Array.isArray(record.questions)) {
      return record.questions.map((item, index) => normalizeQuestion(item, index));
    }
    if (Array.isArray(record.items)) {
      return record.items.map((item, index) => normalizeQuestion(item, index));
    }
    if (record.answer_1 || record.answer1 || record.A) {
      return [normalizeQuestion(record, 0)];
    }
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed === "") return [];
    return [normalizeQuestion(trimmed, 0)];
  }

  return [];
}

function normalizeQuestionRanges(raw: unknown): QuestionRange[] {
  const value = safeParseJson(raw);

  if (Array.isArray(value)) {
    const item0 = value[0];
    if (item0 && typeof item0 === "object") {
      const firstRecord = item0 as Record<string, unknown>;
      const hasGroupLikeFields =
        typeof firstRecord.group === "string" ||
        typeof firstRecord.question_group_content === "string" ||
        typeof firstRecord.questionGroupContent === "string" ||
        typeof firstRecord.type_group_question === "string" ||
        typeof firstRecord.typeGroupQuestion === "string";

      if (hasGroupLikeFields) {
        return value.map((range, rIndex) => {
          const record = range as Record<string, unknown>;
          return {
            label: String(record.group ?? record.label ?? `Questions ${rIndex + 1}`),
            description: typeof record.question_group_content === "string"
              ? record.question_group_content
              : typeof record.questionGroupContent === "string"
                ? record.questionGroupContent
                : undefined,
            type_question: getQuestionType(record.type_group_question ?? record.typeGroupQuestion ?? record.type_question ?? record.type ?? undefined),
            questions: normalizeQuestions(record.questions ?? record.items ?? []),
          };
        });
      }

      if (typeof firstRecord.label === "string" || Array.isArray(firstRecord.questions) || Array.isArray(firstRecord.items)) {
        return value.map((range, rIndex) => {
          const record = range as Record<string, unknown>;
          return {
            label: String(record.label ?? `Questions ${rIndex + 1}`),
            type_question: getQuestionType(record.type_question ?? record.typeQuestion ?? record.type ?? undefined),
            questions: normalizeQuestions(record.questions ?? record.items ?? record.questionList ?? range),
          };
        });
      }
    }

    return [
      {
        label: "Questions",
        type_question: "completion",
        questions: value.map((item, index) => normalizeQuestion(item, index)),
      },
    ];
  }

  if (typeof value === "object" && value !== null) {
    const record = value as Record<string, unknown>;
    if (Array.isArray(record.questions)) {
      return [
        {
          label: String(record.label ?? "Questions"),
          type_question: getQuestionType(record.type_question ?? record.typeQuestion ?? record.type ?? undefined),
          questions: normalizeQuestions(record.questions),
        },
      ];
    }
    if (Array.isArray(record.items)) {
      return [
        {
          label: String(record.label ?? "Questions"),
          type_question: getQuestionType(record.type_question ?? record.typeQuestion ?? record.type ?? undefined),
          questions: normalizeQuestions(record.items),
        },
      ];
    }
  }

  return [
    {
      label: "Questions",
      type_question: "completion",
      questions: [],
    },
  ];
}

const PART_MODEL_MAP: Partial<Record<ExamType, string>> = {
  jlpt: "jlptTestPartList",
  hsk: "hskTestPartList",
  "toeic-listening": "toeicListeningTestListPart",
  "toeic-reading": "toeicReadingTestListPart",
  "ielts-reading": "ieltsReadingTestListPart",
  "ielts-listening": "ieltsListeningTestListPart",
  "ielts-speaking": "ieltsSpeakingTestListPart",
  "ielts-writing": "ieltsWritingTestListPart",
  hsa: "hsaTestPartList",
};

function normalizeQuestionChooseIds(raw: unknown): string[] {
  if (raw === null || raw === undefined) return [];

  if (Array.isArray(raw)) {
    return raw
      .map((item) => String(item).trim())
      .filter(Boolean);
  }

  if (typeof raw === "number" && Number.isFinite(raw)) {
    return [String(raw)];
  }

  if (typeof raw === "string") {
    const trimmed = raw.trim();
    if (!trimmed) return [];

    return trimmed
      .split(/[\s,;]+/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  const value = String(raw).trim();
  return value ? value.split(/[\s,;]+/).map((item) => item.trim()).filter(Boolean) : [];
}

async function getPartRecords(type: ExamType, idTest: string, parentRecord?: Record<string, unknown>): Promise<unknown[]> {
  const partModelName = PART_MODEL_MAP[type];
  if (!partModelName) return [];
  const prismaPartModel = (prisma as unknown as Record<string, unknown>)[partModelName] as {
    findMany: (args: Record<string, unknown>) => Promise<unknown[]>;
  };

  if (!prismaPartModel?.findMany) return [];

  try {
    const questionChoose = parentRecord?.questionChoose ?? parentRecord?.question_choose ?? parentRecord?.questionChooseValue;
    const ids = normalizeQuestionChooseIds(questionChoose);

    if (ids.length > 0) {
      const numericIds = ids.map((item) => Number(item)).filter((item) => Number.isFinite(item));
      const where =
        type === "ielts-speaking" || type === "ielts-writing"
          ? { idPart: { in: numericIds.length > 0 ? numericIds : ids } }
          : { idPart: { in: ids } };

      const rows = await prismaPartModel.findMany({ where });
      const rowMap = new Map(
        rows.map((row) => [String((row as Record<string, unknown>).idPart ?? (row as Record<string, unknown>).id_part ?? ""), row])
      );
      return ids.map((id) => rowMap.get(id)).filter((row): row is Record<string, unknown> => Boolean(row));
    }

    return await prismaPartModel.findMany({ where: { idTest } });
  } catch {
    return [];
  }
}

async function buildLayout0Test(type: ExamType, record: Record<string, unknown>, idTest: string): Promise<Layout0Test> {
  const title = String(record.testname ?? record.testname ?? record.idTest ?? idTest);
  const duration = Number(record.time ?? record.timeAllow ?? record.time_allow ?? 0);
  const questions = normalizeQuestions(record.questionChoose ?? record.questionChoice ?? record.testContent ?? record.testcode ?? record.test_content ?? record.questionContent ?? record.answer ?? record.correctAnswer ?? record.correct_answer);
  const partRecords = await getPartRecords(type, idTest);
  const parts: Part[] = partRecords.length > 0
    ? partRecords.map((partRow, partIndex) => {
        const row = partRow as Record<string, unknown>;
        const partQuestions = normalizeQuestions(row.testContent ?? row.questionContent ?? row.question_content ?? row.testContent ?? row.questionChoose ?? row.questionChoose ?? row.testcode ?? row.test_code ?? row.answer ?? row.correctAnswer ?? row.correct_answer ?? row.groupQuestion ?? row.group_question);
        return {
          id: String(row.idPart ?? row.id_part ?? row.id ?? `p${partIndex + 1}`),
          title: String(row.testname ?? row.testType ?? row.test_type ?? `Part ${partIndex + 1}`),
          questions: partQuestions,
        };
      })
    : [
        {
          id: "p1",
          title: String(record.testType ?? record.test_type ?? "Part 1"),
          questions,
        },
      ];

  return {
    id_test: String(record.idTest ?? idTest),
    type,
    layout: "layout_0",
    title,
    duration_minutes: duration,
    isSingle: partRecords.length === 0 ? parts.length === 1 : parts.length === 1,
    parts,
  };
}

async function buildLayout1Test(type: ExamType, record: Record<string, unknown>, idTest: string): Promise<Layout1Test> {
  const title = String(record.testname ?? record.idTest ?? idTest);
  const duration = Number(record.time ?? record.timeAllow ?? record.time_allow ?? 0);
  const partRecords = await getPartRecords(type, idTest, record);
  const parts: IeltsReadingPart[] = partRecords.length > 0
    ? partRecords.map((partRow, partIndex) => {
        const row = partRow as Record<string, unknown>;
        return {
          id: String(row.idPart ?? row.id_part ?? row.id ?? `p${partIndex + 1}`),
          title: String(row.part ? `Passage ${row.part}` : row.testname ?? `Passage ${partIndex + 1}`),
          paragraph: String(row.paragraph ?? row.paragraph_text ?? ""),
          questionRanges: normalizeQuestionRanges(row.groupQuestion ?? row.group_question ?? row.questionRanges ?? row.questions ?? row.questionRange ?? row.group_question ?? row.questionChoose ?? row.questionChoice ?? []),
        };
      })
    : [
        {
          id: "p1",
          title: "Passage 1",
          paragraph: String(record.paragraph ?? record.paragraph_text ?? ""),
          questionRanges: normalizeQuestionRanges(record.groupQuestion ?? record.group_question ?? record.questionRanges ?? record.questions ?? []),
        },
      ];

  return {
    id_test: String(record.idTest ?? idTest),
    type,
    layout: "layout_1",
    title,
    duration_minutes: duration,
    parts,
  };
}

async function buildLayout2Test(type: ExamType, record: Record<string, unknown>, idTest: string): Promise<Layout2Test> {
  const title = String(record.testname ?? record.idTest ?? idTest);
  const duration = Number(record.time ?? record.timeAllow ?? record.time_allow ?? 0);
  const partRecords = await getPartRecords(type, idTest, record);
  const parts: IeltsListeningPart[] = partRecords.length > 0
    ? partRecords.map((partRow, partIndex) => {
        const row = partRow as Record<string, unknown>;
        return {
          id: String(row.idPart ?? row.id_part ?? row.id ?? `p${partIndex + 1}`),
          title: String(row.title ?? row.testname ?? `Part ${partIndex + 1}`),
          audio_link: String(row.audio_link ?? row.audioLinkContext ?? row.audio_link_context ?? ""),
          questionRanges: normalizeQuestionRanges(row.groupQuestion ?? row.group_question ?? row.questionRanges ?? row.questions ?? []),
        };
      })
    : [
        {
          id: "p1",
          title: "Part 1",
          audio_link: String(record.audio_link ?? record.audioLinkContext ?? record.audio_link_context ?? ""),
          questionRanges: normalizeQuestionRanges(record.groupQuestion ?? record.group_question ?? record.questionRanges ?? record.questions ?? []),
        },
      ];

  return {
    id_test: String(record.idTest ?? idTest),
    type,
    layout: "layout_2",
    title,
    duration_minutes: duration,
    parts,
  };
}

async function buildLayout3Test(type: ExamType, record: Record<string, unknown>, idTest: string): Promise<Layout3Test> {
  const title = String(record.testname ?? record.idTest ?? idTest);
  const duration = Number(record.time ?? record.timeAllow ?? record.time_allow ?? 0);
  const partRecords = await getPartRecords(type, idTest, record);

  const parts: IeltsSpeakingPart[] = partRecords.length > 0
    ? (() => {
        const groups: Map<number, Array<Record<string, unknown>>> = new Map();

        partRecords.forEach((row, index) => {
          const recordRow = row as Record<string, unknown>;
          const speakingPart = Number(recordRow.speakingPart ?? recordRow.speaking_part ?? recordRow.part ?? 1);
          const partKey = Number.isFinite(speakingPart) ? speakingPart : index + 1;
          const bucket = groups.get(partKey) ?? [];
          bucket.push(recordRow);
          groups.set(partKey, bucket);
        });

        return Array.from(groups.entries(), ([partNumber, rows]) => {
          const sortedRows = rows.slice().sort((a, b) => {
            const aStt = Number(a.stt ?? a.number ?? 0);
            const bStt = Number(b.stt ?? b.number ?? 0);
            return aStt - bStt;
          });

          return {
            id: `sp${partNumber}`,
            title: `Part ${partNumber}`,
            description: String(sortedRows[0]?.importantAdd ?? sortedRows[0]?.topic ?? record.testType ?? record.test_type ?? ""),
            questions: sortedRows.map((recordRow, questionIndex) => ({
              id: `${String(recordRow.idPart ?? recordRow.id_part ?? recordRow.id ?? `q${partNumber}-${questionIndex + 1}`)}-${recordRow.stt ?? questionIndex + 1}`,
              number: Number(recordRow.stt ?? recordRow.number ?? questionIndex + 1),
              prompt: String(recordRow.questionContent ?? recordRow.question_content ?? recordRow.topic ?? recordRow.title ?? ""),
              prep_time: Number(recordRow.prep_time ?? recordRow.time ?? recordRow.prepTime ?? 0),
              speak_time: Number(recordRow.speak_time ?? recordRow.speaking_time ?? recordRow.time ?? 0),
            })),
          };
        }).sort((a, b) => Number(a.id.replace("sp", "")) - Number(b.id.replace("sp", ""))) as IeltsSpeakingPart[];
      })()
    : [
        {
          id: "sp1",
          title: String(record.testname ?? "Part 1"),
          description: String(record.testType ?? record.test_type ?? ""),
          questions: [
            {
              id: "q1",
              number: 1,
              prompt: String(record.questionContent ?? record.question_content ?? record.topic ?? ""),
              prep_time: Number(record.prep_time ?? record.time ?? 0),
              speak_time: Number(record.speak_time ?? record.time ?? 0),
            },
          ],
        },
      ];

  return {
    id_test: String(record.idTest ?? idTest),
    type,
    layout: "layout_3",
    title,
    duration_minutes: duration,
    parts,
  };
}

async function buildLayout4Test(type: ExamType, record: Record<string, unknown>, idTest: string): Promise<Layout4Test> {
  const title = String(record.testname ?? record.idTest ?? idTest);
  const duration = Number(record.time ?? record.timeAllow ?? record.time_allow ?? 0);
  const partRecords = await getPartRecords(type, idTest, record);
  const parts = partRecords.length > 0
    ? partRecords.map((row, index) => {
        const recordRow = row as Record<string, unknown>;
        return {
          id: String(recordRow.idPart ?? recordRow.id_part ?? recordRow.id ?? `q${index + 1}`),
          title: String(recordRow.title ?? recordRow.testname ?? `Task ${recordRow.task ?? index + 1}`),
          task_label: String(recordRow.task ? `Task ${recordRow.task}` : `Task ${index + 1}`),
          question: String(recordRow.questionContent ?? recordRow.question_content ?? recordRow.question ?? ""),
          instructions: String(recordRow.instructions ?? recordRow.importantAdd ?? recordRow.important_add ?? ""),
          image_url: typeof recordRow.imageLink === "string" ? recordRow.imageLink : typeof recordRow.image_link === "string" ? recordRow.image_link : undefined,
          min_words: Number(recordRow.min_words ?? recordRow.time ?? 150),
        };
      })
    : [
        {
          id: "q1",
          title: String(record.testname ?? `Task 1`),
          task_label: "Task 1",
          question: String(record.questionContent ?? record.question_content ?? record.question ?? ""),
          instructions: String(record.instructions ?? record.importantAdd ?? record.important_add ?? ""),
          image_url: typeof record.imageLink === "string" ? record.imageLink : undefined,
          min_words: Number(record.min_words ?? record.time ?? 150),
        },
      ];

  return {
    id_test: String(record.idTest ?? idTest),
    type,
    layout: "layout_4",
    title,
    duration_minutes: duration,
    parts,
  };
}

async function buildLayout5Test(type: ExamType, record: Record<string, unknown>, idTest: string): Promise<Layout5Test> {
  const title = String(record.testname ?? record.idTest ?? idTest);
  const duration = Number(record.time ?? record.timeAllow ?? record.time_allow ?? 0);
  // Digital SAT test list contains `questionChoose` like: "verbal100, verbal101, ..."
  const tokens = normalizeQuestionChooseIds(record.questionChoose ?? record.question_choose ?? record.questionChooseValue ?? "");

  // If no tokens, try to fall back to normalized questions (legacy behavior)
  if (tokens.length === 0) {
    const questions = normalizeQuestions(record.questionChoose ?? record.questionChoice ?? record.fullTestSpecificModule ?? record.testcode ?? record.questionChoose ?? record.questionContent ?? record.question_content ?? []);
    return {
      id_test: String(record.idTest ?? idTest),
      type,
      layout: "layout_5",
      title,
      duration_minutes: duration,
      questions: questions as SatQuestion[],
    };
  }

  // Query both math and verbal banks for matching idQuestion values
  const prismaAny = prisma as unknown as Record<string, any>;
  const mathModel = prismaAny.digitalSatQuestionBankMath;
  const verbalModel = prismaAny.digitalSatQuestionBankVerbal;

  const mathRows = mathModel?.findMany ? await mathModel.findMany({ where: { idQuestion: { in: tokens } } }) : [];
  const verbalRows = verbalModel?.findMany ? await verbalModel.findMany({ where: { idQuestion: { in: tokens } } }) : [];

  // Build lookup map by several key variants to be forgiving with prefixes
  const rowMap = new Map<string, Record<string, unknown>>();
  for (const r of [...mathRows, ...verbalRows]) {
    const key = String((r as Record<string, unknown>).idQuestion ?? "");
    if (key) rowMap.set(key, r as Record<string, unknown>);
    // also map numeric-only variant if applicable
    const numeric = key.replace(/^[^0-9]*/, "");
    if (numeric && numeric !== key) rowMap.set(numeric, r as Record<string, unknown>);
    // map prefixed variants too
    if (/^verbal/i.test(key)) rowMap.set(key.toLowerCase(), r as Record<string, unknown>);
  }

  const questions: SatQuestion[] = tokens.map((tok, idx) => {
    const rawKey = tok;
    let row = rowMap.get(rawKey) ?? rowMap.get(rawKey.toLowerCase());
    if (!row && /^[a-zA-Z]+\d+$/.test(rawKey)) {
      const stripped = rawKey.replace(/^[^0-9]*/, "");
      row = rowMap.get(stripped) ?? rowMap.get("verbal" + stripped) ?? rowMap.get("math" + stripped);
    }

    if (!row) {
      return {
        id: rawKey,
        number: idx + 1,
        type_question: "completion",
        question: rawKey,
        answers: "",
      } as SatQuestion;
    }

    const r = row as Record<string, unknown>;
    const answersObj: Record<string, string> | "" = (r.answer_1 || r.answer1)
      ? {
          answer_1: String(r.answer_1 ?? r.answer1 ?? ""),
          answer_2: String(r.answer_2 ?? r.answer2 ?? ""),
          answer_3: String(r.answer_3 ?? r.answer3 ?? ""),
          answer_4: String(r.answer_4 ?? r.answer4 ?? ""),
        }
      : "";

    return {
      id: rawKey,
      number: idx + 1,
      type_question: answersObj === "" ? "completion" : "multiple-choice",
      passage: typeof r.category === "string" ? String(r.category) : undefined,
      question: String(r.questionContent ?? r.question_content ?? r.question ?? r.questionContent ?? rawKey),
      answers: answersObj as SatQuestion["answers"],
      correct_answer: String(r.correctAnswer ?? r.correct_answer ?? ""),
      domain: typeof r.category === "string" ? String(r.category) : undefined,
      module: undefined,
    } as SatQuestion;
  });

  return {
    id_test: String(record.idTest ?? idTest),
    type,
    layout: "layout_5",
    title,
    duration_minutes: duration,
    questions,
  };
}

async function buildTest(type: ExamType, record: Record<string, unknown>, idTest: string): Promise<AnyTest | null> {
  const layout = getLayout(type);
  switch (layout) {
    case "layout_0":
      return buildLayout0Test(type, record, idTest);
    case "layout_1":
      return buildLayout1Test(type, record, idTest);
    case "layout_2":
      return buildLayout2Test(type, record, idTest);
    case "layout_3":
      return buildLayout3Test(type, record, idTest);
    case "layout_4":
      return buildLayout4Test(type, record, idTest);
    case "layout_5":
      return buildLayout5Test(type, record, idTest);
    default:
      return null;
  }
}

export async function getDbTest(type: ExamType, idTest: string): Promise<AnyTest | null> {
  const mapping = EXAM_TYPE_MODEL_MAP[type];
  if (!mapping) return null;

  const prismaTestModel = (prisma as unknown as Record<string, unknown>)[mapping.model] as {
    findFirst: (args: Record<string, unknown>) => Promise<Record<string, unknown> | null>;
  };
  if (!prismaTestModel?.findFirst) return null;

  const record = await prismaTestModel.findFirst({ where: { idTest } });
  if (!record) return null;

  return buildTest(type, record, idTest);
}

export async function hasValidTestSession(type: ExamType, idTest: string, idResult: string): Promise<boolean> {
  const mapping = EXAM_TYPE_MODEL_MAP[type];
  if (!mapping) return false;

  const prismaTestModel = (prisma as unknown as Record<string, unknown>)[mapping.model] as {
    findFirst: (args: Record<string, unknown>) => Promise<Record<string, unknown> | null>;
  };
  if (!prismaTestModel?.findFirst) return false;

  const record = await prismaTestModel.findFirst({ where: { idTest } });
  if (!record) return false;

  const prismaSaveModel = (prisma as unknown as Record<string, unknown>)[mapping.saveModel] as {
    findFirst: (args: Record<string, unknown>) => Promise<Record<string, unknown> | null>;
  };
  if (!prismaSaveModel?.findFirst) return false;

  const saveRecord = await prismaSaveModel.findFirst({ where: { idTest, idResult } });
  return Boolean(saveRecord);
}

export async function getDbTestForSession(type: ExamType, idTest: string, idResult: string): Promise<AnyTest | null> {
  const isValid = await hasValidTestSession(type, idTest, idResult);
  if (!isValid) return null;
  const test = await getDbTest(type, idTest);
  if (test) {
    (test as any).idResult = idResult;
  }
  return test;
}
