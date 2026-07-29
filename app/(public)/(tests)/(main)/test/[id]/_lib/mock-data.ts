import { TestDetailData } from "./types";

export const mockTestDetail: TestDetailData = {
  id: "august-2024-math-a",
  title: "August 2024 - International Version A (Real Test) (Math)",
  timeLimit: 70,
  totalQuestions: 44,
  priceToken: 100,
  remainingTimes: 5,
  resource: "digitalsat",
  testCode: "digitalsat",
  completedUsers: 28163,
  allowPreview: false,
  warningNotice:
    "Warning: For Practice – Digital SAT tests, the result will be shown as the number of correct answers over the total number of câu hỏi (e.g. 20/23). To view results in the official Digital SAT format (1600-scale score), please choose Full Test.",
  unfinishedAttempts: [
    {
      id: "1",
      title: "August 2024 - International Version A (Real Test) (Math)",
      date: "14:41 14/03/2026",
    },
    {
      id: "2",
      title: "August 2024 - International Version A (Real Test) (Math)",
      date: "02:02 06/02/2026",
    },
    {
      id: "3",
      title: "August 2024 - International Version A (Real Test) (Math)",
      date: "23:00 31/01/2026",
    },
    {
      id: "4",
      title: "MATH - August 2024 - International Version A (Real Test)",
      date: "14:30 09/11/2025",
    },
    {
      id: "5",
      title: "MATH - August 2024 - International Version A (Real Test)",
      date: "10:07 09/11/2025",
    },
  ],
  chartData: [
    { date: "28/01", band: 650, avgPoint: 800 },
    { date: "12/12", band: 1050, avgPoint: 850 },
    { date: "11/11", band: 1350, avgPoint: 900 },
  ],
  history: [
    {
      id: "h1",
      startTime: "14:41 14/03/2026",
      endTime: "15:20 14/03/2026",
      testName: "August 2024 - International Version A (Real Test) (Math)",
      finalResult: "38/44 (1350)",
      duration: "39 phút",
      isCompleted: true,
      isInCollection: true,
    },
    {
      id: "h2",
      startTime: "02:02 06/02/2026",
      endTime: "02:40 06/02/2026",
      testName: "August 2024 - International Version A (Real Test) (Math)",
      finalResult: "30/44 (1050)",
      duration: "38 phút",
      isCompleted: true,
      isInCollection: true,
    },
  ],
};