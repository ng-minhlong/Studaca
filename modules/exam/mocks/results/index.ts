import type {
  Layout0Result,
  Layout1Result,
  Layout2Result,
  Layout3Result,
  Layout4Result,
  Layout5Result,
} from "../../types";

// ─── Layout 0 Results ─────────────────────────────────────────────────────────

export const mockJlptResult: Layout0Result = {
  id_test: "jlpt-001",
  idResult: "jlpt-result-001",
  type: "jlpt",
  layout: "layout_0",
  score: 75,
  total_questions: 5,
  accuracy: 75,
  time_used_seconds: 1820,
  part_results: [
    { part_id: "p1", part_title: "Vocabulary", total: 3, correct: 2, incorrect: 1, skipped: 0 },
    { part_id: "p2", part_title: "Grammar", total: 2, correct: 2, incorrect: 0, skipped: 0 },
  ],
  question_results: [
    { question_id: "q1", question_number: 1, user_answer: "A", correct_answer: "A", status: "correct" },
    { question_id: "q2", question_number: 2, user_answer: "A", correct_answer: "C", status: "incorrect" },
    { question_id: "q3", question_number: 3, user_answer: "yama", correct_answer: "yama", status: "correct" },
    { question_id: "q4", question_number: 4, user_answer: "B", correct_answer: "B", status: "correct" },
    { question_id: "q5", question_number: 5, user_answer: ["A", "C"], correct_answer: ["A", "C"], status: "correct" },
  ],
};

export const mockHskResult: Layout0Result = {
  id_test: "hsk-001",
  idResult: "hsk-result-001",
  type: "hsk",
  layout: "layout_0",
  score: 60,
  total_questions: 5,
  accuracy: 60,
  time_used_seconds: 2400,
  part_results: [
    { part_id: "p1", part_title: "Part 1 – Listening Comprehension", total: 2, correct: 1, incorrect: 1, skipped: 0 },
    { part_id: "p2", part_title: "Part 2 – Reading", total: 3, correct: 2, incorrect: 0, skipped: 1 },
  ],
  question_results: [
    { question_id: "q1", question_number: 1, user_answer: "C", correct_answer: "C", status: "correct" },
    { question_id: "q2", question_number: 2, user_answer: "B", correct_answer: "A", status: "incorrect" },
    { question_id: "q3", question_number: 3, user_answer: "也", correct_answer: "都", status: "incorrect" },
    { question_id: "q4", question_number: 4, user_answer: ["A", "B", "D"], correct_answer: ["A", "B", "D"], status: "correct" },
    { question_id: "q5", question_number: 5, user_answer: null, correct_answer: "B", status: "skipped" },
  ],
};

export const mockTopikReadingResult: Layout0Result = {
  id_test: "topik-reading-001",
  idResult: "topik-reading-result-001",
  type: "topik-reading",
  layout: "layout_0",
  score: 50,
  total_questions: 2,
  accuracy: 50,
  time_used_seconds: 1200,
  part_results: [
    { part_id: "p1", part_title: "Section 1", total: 2, correct: 1, incorrect: 1, skipped: 0 },
  ],
  question_results: [
    { question_id: "q1", question_number: 1, user_answer: "A", correct_answer: "A", status: "correct" },
    { question_id: "q2", question_number: 2, user_answer: "크다", correct_answer: "작다", status: "incorrect" },
  ],
};

export const mockTopikListeningResult: Layout0Result = {
  id_test: "topik-listening-001",
  idResult: "topik-listening-result-001",
  type: "topik-listening",
  layout: "layout_0",
  score: 100,
  total_questions: 1,
  accuracy: 100,
  time_used_seconds: 900,
  part_results: [
    { part_id: "p1", part_title: "Part 1", total: 1, correct: 1, incorrect: 0, skipped: 0 },
  ],
  question_results: [
    { question_id: "q1", question_number: 1, user_answer: "C", correct_answer: "C", status: "correct" },
  ],
};

export const mockToeicReadingResult: Layout0Result = {
  id_test: "toeic-reading-001",
  idResult: "toeic-reading-result-001",
  type: "toeic-reading",
  layout: "layout_0",
  score: 66,
  total_questions: 3,
  accuracy: 66,
  time_used_seconds: 2700,
  part_results: [
    { part_id: "p1", part_title: "Part 5 – Incomplete Sentences", total: 2, correct: 2, incorrect: 0, skipped: 0 },
    { part_id: "p2", part_title: "Part 6 – Text Completion", total: 1, correct: 0, incorrect: 1, skipped: 0 },
  ],
  question_results: [
    { question_id: "q1", question_number: 1, user_answer: "A", correct_answer: "A", status: "correct" },
    { question_id: "q2", question_number: 2, user_answer: "A", correct_answer: "A", status: "correct" },
    { question_id: "q3", question_number: 3, user_answer: "enclosed", correct_answer: "attached", status: "incorrect" },
  ],
};

export const mockToeicListeningResult: Layout0Result = {
  id_test: "toeic-listening-001",
  idResult: "toeic-listening-result-001",
  type: "toeic-listening",
  layout: "layout_0",
  score: 100,
  total_questions: 1,
  accuracy: 100,
  time_used_seconds: 600,
  part_results: [
    { part_id: "p1", part_title: "Part 1 – Photographs", total: 1, correct: 1, incorrect: 0, skipped: 0 },
  ],
  question_results: [
    { question_id: "q1", question_number: 1, user_answer: "C", correct_answer: "C", status: "correct" },
  ],
};

export const mockThptqgResult: Layout0Result = {
  id_test: "thptqg-001",
  idResult: "thptqg-result-001",
  type: "thptqg",
  layout: "layout_0",
  score: 50,
  total_questions: 2,
  accuracy: 50,
  time_used_seconds: 1500,
  part_results: [
    { part_id: "p1", part_title: "Phần I – Đọc hiểu", total: 2, correct: 1, incorrect: 1, skipped: 0 },
  ],
  question_results: [
    { question_id: "q1", question_number: 1, user_answer: "A", correct_answer: "A", status: "correct" },
    { question_id: "q2", question_number: 2, user_answer: ["A", "B"], correct_answer: ["A", "C"], status: "incorrect" },
  ],
};

export const mockHsaResult: Layout0Result = {
  id_test: "hsa-001",
  idResult: "hsa-result-001",
  type: "hsa",
  layout: "layout_0",
  score: 100,
  total_questions: 2,
  accuracy: 100,
  time_used_seconds: 1800,
  part_results: [
    { part_id: "p1", part_title: "Section A", total: 2, correct: 2, incorrect: 0, skipped: 0 },
  ],
  question_results: [
    { question_id: "q1", question_number: 1, user_answer: "B", correct_answer: "B", status: "correct" },
    { question_id: "q2", question_number: 2, user_answer: "short-lived", correct_answer: "short-lived", status: "correct" },
  ],
};

// ─── Layout 1 Result ─────────────────────────────────────────────────────────

export const mockIeltsReadingResult: Layout1Result = {
  id_test: "ielts-reading-001",
  idResult: "ielts-reading-result-001",
  type: "ielts-reading",
  layout: "layout_1",
  band_score: 7.0,
  raw_score: 25,
  time_used_seconds: 3450,
  part_results: [
    { part_id: "rp1", part_title: "Passage 1", total: 7, correct: 6, incorrect: 1, skipped: 0 },
    { part_id: "rp2", part_title: "Passage 2", total: 6, correct: 5, incorrect: 1, skipped: 0 },
    { part_id: "rp3", part_title: "Passage 3", total: 3, correct: 3, incorrect: 0, skipped: 0 },
  ],
  question_results: [
    { question_id: "rq1", question_number: 1, user_answer: "warmer", correct_answer: "warmer", status: "correct" },
    { question_id: "rq2", question_number: 2, user_answer: "transpiration", correct_answer: "transpiration", status: "correct" },
    { question_id: "rq3", question_number: 3, user_answer: "evaporation", correct_answer: "evaporation", status: "correct" },
    { question_id: "rq4", question_number: 4, user_answer: "B", correct_answer: "B", status: "correct" },
    { question_id: "rq5", question_number: 5, user_answer: "B", correct_answer: "B", status: "correct" },
    { question_id: "rq6", question_number: 6, user_answer: "A", correct_answer: "B", status: "incorrect" },
    { question_id: "rq7", question_number: 7, user_answer: ["A", "C", "D"], correct_answer: ["A", "C", "D"], status: "correct" },
    { question_id: "rq10", question_number: 10, user_answer: "200", correct_answer: "200", status: "correct" },
    { question_id: "rq11", question_number: 11, user_answer: "Pacific", correct_answer: "Galapagos", status: "incorrect" },
    { question_id: "rq12", question_number: 12, user_answer: "energy", correct_answer: "energy", status: "correct" },
    { question_id: "rq13", question_number: 13, user_answer: "A", correct_answer: "A", status: "correct" },
    { question_id: "rq14", question_number: 14, user_answer: "C", correct_answer: "C", status: "correct" },
    { question_id: "rq15", question_number: 15, user_answer: "B", correct_answer: "B", status: "correct" },
    { question_id: "rq16", question_number: 16, user_answer: "B", correct_answer: "B", status: "correct" },
    { question_id: "rq17", question_number: 17, user_answer: "B", correct_answer: "B", status: "correct" },
    { question_id: "rq18", question_number: 18, user_answer: "C", correct_answer: "C", status: "correct" },
  ],
};

// ─── Layout 2 Result ─────────────────────────────────────────────────────────

export const mockIeltsListeningResult: Layout2Result = {
  id_test: "ielts-listening-001",
  idResult: "ielts-listening-result-001",
  type: "ielts-listening",
  layout: "layout_2",
  band_score: 6.5,
  raw_score: 21,
  time_used_seconds: 1860,
  part_results: [
    { part_id: "lp1", part_title: "Part 1 – Conversation at a Sports Centre", total: 4, correct: 4, incorrect: 0, skipped: 0 },
    { part_id: "lp2", part_title: "Part 2 – Heritage Walk", total: 3, correct: 2, incorrect: 1, skipped: 0 },
    { part_id: "lp3", part_title: "Part 3 – Research Discussion", total: 1, correct: 1, incorrect: 0, skipped: 0 },
    { part_id: "lp4", part_title: "Part 4 – Soil Erosion Lecture", total: 3, correct: 2, incorrect: 1, skipped: 0 },
  ],
  question_results: [
    { question_id: "lq1", question_number: 1, user_answer: "monthly", correct_answer: "monthly", status: "correct" },
    { question_id: "lq2", question_number: 2, user_answer: "15 March", correct_answer: "15 March", status: "correct" },
    { question_id: "lq3", question_number: 3, user_answer: "yoga", correct_answer: "yoga", status: "correct" },
    { question_id: "lq4", question_number: 4, user_answer: "FIT20", correct_answer: "FIT20", status: "correct" },
    { question_id: "lq5", question_number: 5, user_answer: "B", correct_answer: "B", status: "correct" },
    { question_id: "lq6", question_number: 6, user_answer: "A", correct_answer: "C", status: "incorrect" },
    { question_id: "lq7", question_number: 7, user_answer: "B", correct_answer: "B", status: "correct" },
    { question_id: "lq8", question_number: 8, user_answer: ["A", "B", "E"], correct_answer: ["A", "B", "E"], status: "correct" },
    { question_id: "lq11", question_number: 11, user_answer: "growth", correct_answer: "growth", status: "correct" },
    { question_id: "lq12", question_number: 12, user_answer: "erosion", correct_answer: "degradation", status: "incorrect" },
    { question_id: "lq13", question_number: 13, user_answer: "ploughing", correct_answer: "ploughing", status: "correct" },
  ],
};

// ─── Layout 3 Result ─────────────────────────────────────────────────────────

export const mockIeltsSpeakingResult: Layout3Result = {
  id_test: "ielts-speaking-001",
  idResult: "ielts-speaking-result-001",
  type: "ielts-speaking",
  layout: "layout_3",
  overall_band: 6.5,
  criteria: {
    fluency: 7.0,
    lexical: 6.5,
    grammar: 6.0,
    pronunciation: 6.5,
  },
  feedback:
    "Your responses demonstrated good fluency with only minor hesitations. Vocabulary use was varied but occasional imprecision was noted. Grammar was mostly accurate with some minor errors in complex structures. Pronunciation was generally clear with some strain on certain consonant clusters.",
  recording_urls: {
    sq1: "/recordings/speaking-q1.webm",
    sq2: "/recordings/speaking-q2.webm",
    sq4: "/recordings/speaking-q4.webm",
  },
  time_used_seconds: 720,
  part_results: [
    { part_id: "sp1", part_title: "Part 1 – Introduction", total: 3, correct: 3, incorrect: 0, skipped: 0 },
    { part_id: "sp2", part_title: "Part 2 – Long Turn", total: 1, correct: 1, incorrect: 0, skipped: 0 },
    { part_id: "sp3", part_title: "Part 3 – Discussion", total: 2, correct: 2, incorrect: 0, skipped: 0 },
  ],
  question_results: [],
};

// ─── Layout 4 Result ─────────────────────────────────────────────────────────

export const mockIeltsWritingResult: Layout4Result = {
  id_test: "ielts-writing-001",
  idResult: "ielts-writing-result-001",
  type: "ielts-writing",
  layout: "layout_4",
  overall_band: 6.5,
  task1_band: 6.0,
  task2_band: 7.0,
  criteria_task1: {
    task_achievement: 6.0,
    coherence: 6.0,
    lexical: 6.0,
    grammar: 6.0,
  },
  criteria_task2: {
    task_achievement: 7.0,
    coherence: 7.0,
    lexical: 7.0,
    grammar: 7.0,
  },
  feedback_task1:
    "You described the overall trend adequately and highlighted the most significant feature. However, more specific data comparisons with exact figures would have strengthened the response. Sentence structures were clear but lacked variety.",
  feedback_task2:
    "You presented both views clearly and supported each with relevant examples. Your position was well-stated and consistent throughout. The essay demonstrated a good range of vocabulary and accurate grammar with only occasional minor errors.",
  submitted_task1:
    "The graph illustrates the recycling rates of four materials from 2006 to 2016. Overall, paper and glass saw the most significant changes during this period. Paper recycling increased steadily from around 40% to nearly 65%, while glass remained the most recycled material throughout, peaking at 70% in 2012 before declining slightly. Plastic recycling showed the smallest growth, rising only marginally from 10% to 15%. Metal recycling fluctuated between 25% and 35% without a clear trend. In conclusion, paper and glass dominated recycling activity, while plastic remained the least recycled material across the decade.",
  submitted_task2:
    "The question of whether university education should be free is a deeply contested issue. Proponents of free education argue that it removes financial barriers, enabling talented students from low-income backgrounds to access higher education. This, in turn, benefits society through a more educated workforce and greater social mobility. However, critics contend that students who directly benefit from a degree should contribute to its cost. Tuition fees, they argue, ensure that universities are funded adequately and that students take their studies seriously. In my view, a hybrid model is most equitable: the government should subsidise a significant portion of tuition, with students paying a reduced fee to be repaid only after reaching a reasonable income threshold. This balances accessibility with financial sustainability.",
  time_used_seconds: 3480,
  part_results: [
    { part_id: "wp1", part_title: "Task 1", total: 1, correct: 1, incorrect: 0, skipped: 0 },
    { part_id: "wp2", part_title: "Task 2", total: 1, correct: 1, incorrect: 0, skipped: 0 },
  ],
  question_results: [],
};

// ─── Layout 5 Result ─────────────────────────────────────────────────────────

export const mockDigitalSatResult: Layout5Result = {
  id_test: "digital-sat-001",
  idResult: "digital-sat-result-001",
  type: "digital-sat",
  layout: "layout_5",
  total_score: 1280,
  math_score: 620,
  reading_writing_score: 660,
  domain_breakdown: [
    { domain: "Reading & Writing", score: 660, total: 800 },
    { domain: "Math", score: 620, total: 800 },
    { domain: "Algebra", score: 310, total: 400 },
    { domain: "Advanced Math", score: 155, total: 200 },
    { domain: "Craft & Structure", score: 220, total: 250 },
    { domain: "Information & Ideas", score: 215, total: 250 },
  ],
  time_used_seconds: 3600,
  part_results: [
    { part_id: "rw-module1", part_title: "Reading & Writing – Module 1", total: 3, correct: 3, incorrect: 0, skipped: 0 },
    { part_id: "math-module1", part_title: "Math – Module 1", total: 3, correct: 2, incorrect: 1, skipped: 0 },
  ],
  question_results: [
    { question_id: "sq1", question_number: 1, user_answer: "answer_2", correct_answer: "answer_2", status: "correct" },
    { question_id: "sq2", question_number: 2, user_answer: "answer_2", correct_answer: "answer_2", status: "correct" },
    { question_id: "sq3", question_number: 3, user_answer: "consistent", correct_answer: "consistent", status: "correct" },
    { question_id: "sq4", question_number: 4, user_answer: "answer_2", correct_answer: "answer_2", status: "correct" },
    { question_id: "sq5", question_number: 5, user_answer: "55", correct_answer: "60", status: "incorrect" },
    { question_id: "sq6", question_number: 6, user_answer: "answer_2", correct_answer: "answer_2", status: "correct" },
  ],
};
