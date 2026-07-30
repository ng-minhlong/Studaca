import type { Layout0Test } from "../../types";

// isSingle: true — JLPT N5
export const mockJlpt: Layout0Test = {
  id_test: "jlpt-001",
  type: "jlpt",
  layout: "layout_0",
  title: "JLPT N5 Practice Test",
  duration_minutes: 50,
  isSingle: true,
  parts: [
    {
      id: "p1",
      title: "Vocabulary",
      questions: [
        {
          id: "q1",
          number: 1,
          type_question: "multiple-choice",
          question: "What is the reading of 水？",
          answers_option: [
            { key: "A", label: "みず (mizu)" },
            { key: "B", label: "かわ (kawa)" },
            { key: "C", label: "やま (yama)" },
            { key: "D", label: "き (ki)" },
          ],
          correct_answer: "A",
        },
        {
          id: "q2",
          number: 2,
          type_question: "multiple-choice",
          question: "Choose the correct meaning of 大きい:",
          answers_option: [
            { key: "A", label: "small" },
            { key: "B", label: "fast" },
            { key: "C", label: "big" },
            { key: "D", label: "cold" },
          ],
          correct_answer: "C",
        },
        {
          id: "q3",
          number: 3,
          type_question: "completion",
          question: "Write the romaji reading for 山:",
          correct_answer: "yama",
        },
      ],
    },
    {
      id: "p2",
      title: "Grammar",
      questions: [
        {
          id: "q4",
          number: 4,
          type_question: "multiple-choice",
          question: "私___学生です。 Choose the correct particle:",
          answers_option: [
            { key: "A", label: "を" },
            { key: "B", label: "は" },
            { key: "C", label: "に" },
            { key: "D", label: "で" },
          ],
          correct_answer: "B",
        },
        {
          id: "q5",
          number: 5,
          type_question: "multi-select",
          question: "Which of the following are i-adjectives? (select all)",
          answers_option: [
            { key: "A", label: "たかい" },
            { key: "B", label: "きれい" },
            { key: "C", label: "おおきい" },
            { key: "D", label: "しずか" },
          ],
          correct_answer: ["A", "C"],
        },
      ],
    },
  ],
};

// isSingle: false — HSK 3
export const mockHsk: Layout0Test = {
  id_test: "hsk-001",
  type: "hsk",
  layout: "layout_0",
  title: "HSK Level 3 Practice Test",
  duration_minutes: 85,
  isSingle: false,
  parts: [
    {
      id: "p1",
      title: "Part 1 – Listening Comprehension",
      questions: [
        {
          id: "q1",
          number: 1,
          type_question: "multiple-choice",
          question: "The speaker says she goes to school by ___.",
          answers_option: [
            { key: "A", label: "bus" },
            { key: "B", label: "bicycle" },
            { key: "C", label: "subway" },
            { key: "D", label: "on foot" },
          ],
          correct_answer: "C",
        },
        {
          id: "q2",
          number: 2,
          type_question: "multiple-choice",
          question: "What does the man want to buy?",
          answers_option: [
            { key: "A", label: "apples" },
            { key: "B", label: "bananas" },
            { key: "C", label: "oranges" },
            { key: "D", label: "grapes" },
          ],
          correct_answer: "A",
        },
      ],
    },
    {
      id: "p2",
      title: "Part 2 – Reading",
      questions: [
        {
          id: "q3",
          number: 3,
          type_question: "completion",
          question: "Fill in: 她每天早上___跑步。 (she runs every morning)",
          correct_answer: "都",
        },
        {
          id: "q4",
          number: 4,
          type_question: "multi-select",
          question: "Which words relate to weather? (select all that apply)",
          answers_option: [
            { key: "A", label: "晴天" },
            { key: "B", label: "下雨" },
            { key: "C", label: "苹果" },
            { key: "D", label: "下雪" },
          ],
          correct_answer: ["A", "B", "D"],
        },
        {
          id: "q5",
          number: 5,
          type_question: "multiple-choice",
          question: "What does 图书馆 mean?",
          answers_option: [
            { key: "A", label: "hospital" },
            { key: "B", label: "library" },
            { key: "C", label: "restaurant" },
            { key: "D", label: "school" },
          ],
          correct_answer: "B",
        },
      ],
    },
  ],
};

// TOPIK Reading
export const mockTopikReading: Layout0Test = {
  id_test: "topik-reading-001",
  type: "topik-reading",
  layout: "layout_0",
  title: "TOPIK II Reading Practice",
  duration_minutes: 70,
  isSingle: true,
  parts: [
    {
      id: "p1",
      title: "Section 1",
      questions: [
        {
          id: "q1",
          number: 1,
          type_question: "multiple-choice",
          question: "다음 빈칸에 알맞은 것을 고르십시오. 오늘은 날씨가 ___ 좋습니다.",
          answers_option: [
            { key: "A", label: "매우" },
            { key: "B", label: "하지만" },
            { key: "C", label: "그래서" },
            { key: "D", label: "만약" },
          ],
          correct_answer: "A",
        },
        {
          id: "q2",
          number: 2,
          type_question: "completion",
          question: "다음 단어의 반의어를 쓰십시오: 크다",
          correct_answer: "작다",
        },
      ],
    },
  ],
};

// TOPIK Listening
export const mockTopikListening: Layout0Test = {
  id_test: "topik-listening-001",
  type: "topik-listening",
  layout: "layout_0",
  title: "TOPIK II Listening Practice",
  duration_minutes: 60,
  isSingle: false,
  parts: [
    {
      id: "p1",
      title: "Part 1",
      questions: [
        {
          id: "q1",
          number: 1,
          type_question: "multiple-choice",
          question: "What is the woman asking the man to do?",
          answers_option: [
            { key: "A", label: "close the window" },
            { key: "B", label: "open the door" },
            { key: "C", label: "turn off the light" },
            { key: "D", label: "turn on the fan" },
          ],
          correct_answer: "C",
        },
      ],
    },
  ],
};

// TOEIC Reading
export const mockToeicReading: Layout0Test = {
  id_test: "toeic-reading-001",
  type: "toeic-reading",
  layout: "layout_0",
  title: "TOEIC Reading Practice",
  duration_minutes: 75,
  isSingle: false,
  parts: [
    {
      id: "p1",
      title: "Part 5 – Incomplete Sentences",
      questions: [
        {
          id: "q1",
          number: 1,
          type_question: "multiple-choice",
          question:
            "The board meeting has been ___ until next Thursday due to scheduling conflicts.",
          answers_option: [
            { key: "A", label: "postponed" },
            { key: "B", label: "postponing" },
            { key: "C", label: "postpone" },
            { key: "D", label: "postponement" },
          ],
          correct_answer: "A",
        },
        {
          id: "q2",
          number: 2,
          type_question: "multiple-choice",
          question: "Employees are encouraged to submit their expense reports ___ possible.",
          answers_option: [
            { key: "A", label: "as quickly as" },
            { key: "B", label: "quick as" },
            { key: "C", label: "more quickly" },
            { key: "D", label: "the quickest" },
          ],
          correct_answer: "A",
        },
      ],
    },
    {
      id: "p2",
      title: "Part 6 – Text Completion",
      questions: [
        {
          id: "q3",
          number: 3,
          type_question: "completion",
          question: "Please find ___ the updated project timeline for your review.",
          correct_answer: "attached",
        },
      ],
    },
  ],
};

// TOEIC Listening
export const mockToeicListening: Layout0Test = {
  id_test: "toeic-listening-001",
  type: "toeic-listening",
  layout: "layout_0",
  title: "TOEIC Listening Practice",
  duration_minutes: 45,
  isSingle: false,
  parts: [
    {
      id: "p1",
      title: "Part 1 – Photographs",
      questions: [
        {
          id: "q1",
          number: 1,
          type_question: "multiple-choice",
          question: "[Photo: two people in an office] What best describes the photo?",
          answers_option: [
            { key: "A", label: "Two men are shaking hands." },
            { key: "B", label: "A woman is using a computer." },
            { key: "C", label: "People are having a meeting." },
            { key: "D", label: "Someone is reading a document." },
          ],
          correct_answer: "C",
        },
      ],
    },
  ],
};

// THPTQG
export const mockThptqg: Layout0Test = {
  id_test: "thptqg-001",
  type: "thptqg",
  layout: "layout_0",
  title: "THPTQG English Practice",
  duration_minutes: 60,
  isSingle: true,
  parts: [
    {
      id: "p1",
      title: "Phần I – Đọc hiểu",
      questions: [
        {
          id: "q1",
          number: 1,
          type_question: "multiple-choice",
          question:
            "According to the passage, climate change mainly affects ___ regions first.",
          answers_option: [
            { key: "A", label: "coastal" },
            { key: "B", label: "mountainous" },
            { key: "C", label: "desert" },
            { key: "D", label: "forest" },
          ],
          correct_answer: "A",
        },
        {
          id: "q2",
          number: 2,
          type_question: "multi-select",
          question:
            "Which two solutions does the author suggest for reducing carbon emissions?",
          answers_option: [
            { key: "A", label: "renewable energy" },
            { key: "B", label: "nuclear power" },
            { key: "C", label: "public transportation" },
            { key: "D", label: "coal mining" },
          ],
          correct_answer: ["A", "C"],
        },
      ],
    },
  ],
};

// HSA
export const mockHsa: Layout0Test = {
  id_test: "hsa-001",
  type: "hsa",
  layout: "layout_0",
  title: "HSA Practice Test",
  duration_minutes: 90,
  isSingle: false,
  parts: [
    {
      id: "p1",
      title: "Section A",
      questions: [
        {
          id: "q1",
          number: 1,
          type_question: "multiple-choice",
          question: "What is the primary purpose of paragraph 2?",
          answers_option: [
            { key: "A", label: "to introduce the main argument" },
            { key: "B", label: "to provide supporting evidence" },
            { key: "C", label: "to contradict the author's claim" },
            { key: "D", label: "to summarize the passage" },
          ],
          correct_answer: "B",
        },
        {
          id: "q2",
          number: 2,
          type_question: "completion",
          question: "The author uses the word 'ephemeral' to mean ___.",
          correct_answer: "short-lived",
        },
      ],
    },
  ],
};
