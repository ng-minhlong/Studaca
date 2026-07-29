export interface TestAttempt {
  id: string;
  title: string;
  date: string;
}

export interface ChartDataPoint {
  date: string;
  band: number;
  avgPoint: number;
}

export interface HistoryRecord {
  id: string;
  startTime: string;
  endTime: string;
  testName: string;
  finalResult: string;
  duration: string;
  isCompleted: boolean;
  isInCollection: boolean;
}

export interface TestDetailData {
  id: string;
  title: string;
  timeLimit: number; // phút
  totalQuestions: number;
  priceToken: number;
  remainingTimes: number;
  resource: string;
  testCode: string;
  completedUsers: number;
  allowPreview: boolean;
  warningNotice: string;
  unfinishedAttempts: TestAttempt[];
  chartData: ChartDataPoint[];
  history: HistoryRecord[];
}