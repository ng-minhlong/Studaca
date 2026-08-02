import type { ExamType } from "./types";

export interface TestCategoryMapping {
  model: string;
  typeField: string;
  typeValue?: string;
}

export interface ExamTypeModelMapping {
  model: string;
  saveModel: string;
  typeField?: string;
  typeValue?: string;
}

export const TEST_CATEGORY_MAP: Record<string, TestCategoryMapping> = {
  "ielts-reading": { model: "ieltsReadingTestList", typeField: "testType" },
  "ielts-listening": { model: "ieltsListeningTestList", typeField: "testType" },
  "ielts-speaking": { model: "ieltsSpeakingTestList", typeField: "testType" },
  "ielts-writing": { model: "ieltsWritingTestList", typeField: "testType" },
  "digital-sat-verbal": {
    model: "digitalSatTestList",
    typeField: "testCategory",
    typeValue: "verbal",
  },
  "digital-sat-math": {
    model: "digitalSatTestList",
    typeField: "testCategory",
    typeValue: "math",
  },
  "toeic-reading": { model: "toeicReadingTestList", typeField: "testType" },
  "toeic-listening": { model: "toeicListeningTestList", typeField: "testType" },
  "hsk-reading": {
    model: "hskTestPartList",
    typeField: "testCategory",
    typeValue: "Reading",
  },
  "hsk-listening": {
    model: "hskTestPartList",
    typeField: "testCategory",
    typeValue: "Listening",
  },
  "jlpt-reading": {
    model: "jlptTestPartList",
    typeField: "testCategory",
    typeValue: "Reading",
  },
  "jlpt-listening": {
    model: "jlptTestPartList",
    typeField: "testCategory",
    typeValue: "Listening",
  },
};

export const EXAM_TYPE_MODEL_MAP: Record<ExamType, ExamTypeModelMapping> = {
  jlpt: { model: "jlptTestList", saveModel: "saveUserResultJlpt" },
  hsk: { model: "hskTestList", saveModel: "saveUserResultHsk" },
  "topik-reading": { model: "topikReadingTestList", saveModel: "saveUserResultTopikReading" },
  "topik-listening": { model: "topikListeningTestList", saveModel: "saveUserResultTopikListening" },
  "toeic-reading": { model: "toeicReadingTestList", saveModel: "saveUserResultToeicReading" },
  "toeic-listening": { model: "toeicListeningTestList", saveModel: "saveUserResultToeicListening" },
  thptqg: { model: "thptqgQuestion", saveModel: "saveUserResultThptqg" },
  hsa: { model: "hsaTestLists", saveModel: "saveUserResultHsa" },
  "ielts-reading": { model: "ieltsReadingTestList", saveModel: "saveUserResultIeltsReading" },
  "ielts-listening": { model: "ieltsListeningTestList", saveModel: "saveUserResultIeltsListening" },
  "ielts-speaking": { model: "ieltsSpeakingTestList", saveModel: "saveUserResultIeltsSpeaking" },
  "ielts-writing": { model: "ieltsWritingTestList", saveModel: "saveUserResultIeltsWriting" },
  "digital-sat": { model: "digitalSatTestList", saveModel: "saveUserResultDigitalSat" },
};

const DEFAULT_RESULT_PAYLOADS: Record<ExamType, Record<string, unknown>> = {
  jlpt: {
    typeTest: "practice",
    correctPercentage: "",
    totalQuestionNumber: 0,
    correctNumber: 0,
    incorrectNumber: 0,
    skipNumber: 0,
    resulttest: 0,
    permissionLink: "",
    timedotest: "",
  },
  hsk: {
    typeTest: "practice",
    correctPercentage: "",
    totalQuestionNumber: 0,
    correctNumber: 0,
    incorrectNumber: 0,
    skipNumber: 0,
    resulttest: 0,
    useranswer: {},
    timedotest: "",
    permissionLink: "",
  },
  "topik-reading": {
    typeTest: "practice",
    correctPercentage: "",
    totalQuestionNumber: 0,
    correctNumber: 0,
    incorrectNumber: 0,
    skipNumber: 0,
    resulttest: 0,
    permissionLink: "",
    timedotest: "",
  },
  "topik-listening": {
    typeTest: "practice",
    correctPercentage: "",
    totalQuestionNumber: 0,
    correctNumber: 0,
    incorrectNumber: 0,
    skipNumber: 0,
    resulttest: 0,
    permissionLink: "",
    timedotest: "",
  },
  "toeic-reading": {
    typeTest: "practice",
    correctPercentage: 0,
    totalQuestionNumber: 0,
    correctNumber: 0,
    incorrectNumber: 0,
    skipNumber: 0,
    resulttest: 0,
    permissionLink: "",
    timedotest: "",
    useranswer: {},
  },
  "toeic-listening": {
    typeTest: "practice",
    correctPercentage: 0,
    totalQuestionNumber: 0,
    correctNumber: 0,
    incorrectNumber: 0,
    skipNumber: 0,
    resulttest: 0,
    permissionLink: "",
    timedotest: "",
    useranswer: {},
  },
  thptqg: {
    typeTest: "practice",
    subject: "",
    timedotest: "",
    resulttest: "",
  },
  hsa: {
    typeTest: "practice",
    timedotest: "",
    resulttest: 0,
  },
  "ielts-reading": {
    typeTest: "practice",
    correctPercentage: "",
    totalQuestionNumber: 0,
    correctNumber: 0,
    incorrectNumber: 0,
    skipNumber: 0,
    resulttest: 0,
    permissionLink: "",
    timedotest: "",
    useranswer: {},
  },
  "ielts-listening": {
    typeTest: "practice",
    correctPercentage: "",
    totalQuestionNumber: 0,
    correctNumber: 0,
    incorrectNumber: 0,
    skipNumber: 0,
    resulttest: 0,
    permissionLink: "",
    timedotest: "",
    useranswer: {},
  },
  "ielts-speaking": {
    typeTest: "practice",
    resulttest: "",
    userAnswerAndComment: [],
    bandDetail: "",
    logAIResponse: "",
    permissionLink: "",
  },
  "ielts-writing": {
    typeTest: "practice",
    resulttest: "",
    bandDetail: "",
    userAnswerAndComment: [],
    timedotest: "",
    permissionLink: "",
  },
  "digital-sat": {
    typeTest: "practice",
    correctPercentage: "",
    resulttest: "",
    timedotest: "",
    saveSpecificTime: "",
    useranswer: [],
  },
};

export function getDefaultResultPayload(
  type: ExamType,
  userId: bigint,
  testname: string,
  idTest: string,
  idResult: string,
) {
  return {
    userId,
    testname,
    idTest,
    idResult,
    isFinished: false,
    isCollection: false,
    createdAt: new Date(),
    ...DEFAULT_RESULT_PAYLOADS[type],
  };
}
