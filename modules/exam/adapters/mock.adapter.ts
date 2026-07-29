/**
 * Mock Adapter
 * Provides mock data for exams and results
 * This interface enables seamless migration to real API
 */

import type { Exam, Result, Answer } from '../types';
import { layout1Mock } from '../mocks/layout1.mock';
import { layout2Mock } from '../mocks/layout2.mock';
import { layout3Mock } from '../mocks/layout3.mock';

// Mock exam data
const mockExams: Record<string, Exam> = {
  layout_1: layout1Mock,
  layout_2: layout2Mock,
  layout_3: layout3Mock,
};

/**
 * Fetch a mock exam by ID
 * Future: Replace with API call to backend
 */
export async function getMockExam(examId: string): Promise<Exam> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));

  const exam = mockExams[examId];
  if (!exam) {
    throw new Error(`Exam ${examId} not found`);
  }

  return exam;
}

/**
 * Get mock result based on exam and user answers
 * In production, this would be calculated by the backend
 */
export async function getMockResult(examId: string, answers: Record<string, Answer>): Promise<Result> {
  await new Promise(resolve => setTimeout(resolve, 300));

  const exam = mockExams[examId];
  if (!exam) {
    throw new Error(`Exam ${examId} not found`);
  }

  // Calculate results from answers
  let correct = 0;
  let wrong = 0;
  let skipped = 0;
  const questionResults: Record<string, any> = {};

  for (const section of exam.sections) {
    for (const block of section.blocks) {
      for (const question of block.questions) {
        const userAnswer = answers[question.id];
        const isCorrect = evaluateAnswer(question, userAnswer);

        if (!userAnswer) {
          skipped++;
        } else if (isCorrect) {
          correct++;
        } else {
          wrong++;
        }

        questionResults[question.id] = {
          questionId: question.id,
          question,
          userAnswer: userAnswer || null,
          isCorrect,
          timeSpent: Math.random() * 60000, // Random time 0-60s
          explanation: question.explanation,
        };
      }
    }
  }

  const totalQuestions = Object.keys(questionResults).length;
  const answered = correct + wrong;
  const percentage = totalQuestions > 0 ? (correct / totalQuestions) * 100 : 0;

  // Calculate section breakdown
  const sectionBreakdown = exam.sections.map(section => {
    let sectionCorrect = 0;
    let sectionWrong = 0;
    let sectionSkipped = 0;

    for (const block of section.blocks) {
      for (const question of block.questions) {
        const result = questionResults[question.id];
        if (!answers[question.id]) {
          sectionSkipped++;
        } else if (result.isCorrect) {
          sectionCorrect++;
        } else {
          sectionWrong++;
        }
      }
    }

    const sectionTotal = sectionCorrect + sectionWrong + sectionSkipped;
    return {
      sectionId: section.id,
      sectionTitle: section.title,
      totalQuestions: sectionTotal,
      correct: sectionCorrect,
      wrong: sectionWrong,
      skipped: sectionSkipped,
      accuracy: sectionTotal > 0 ? (sectionCorrect / sectionTotal) * 100 : 0,
      timeSpent: Math.random() * 3600000, // Random time
    };
  });

  // Determine band score for IELTS (simplified)
  let bandScore: number | undefined;
  if (exam.examType === 'IELTS') {
    if (percentage >= 90) bandScore = 9;
    else if (percentage >= 80) bandScore = 8;
    else if (percentage >= 70) bandScore = 7;
    else if (percentage >= 60) bandScore = 6;
    else if (percentage >= 50) bandScore = 5;
    else if (percentage >= 40) bandScore = 4;
    else if (percentage >= 20) bandScore = 3;
    else bandScore = 1;
  }

  const result: Result = {
    id: `result_${examId}_${Date.now()}`,
    examId,
    attemptNumber: 1,
    completedAt: new Date(),
    summary: {
      totalQuestions,
      answered,
      correct,
      wrong,
      skipped,
      totalScore: correct,
      maxScore: totalQuestions,
      percentage: Math.round(percentage * 100) / 100,
      totalTimeSpent: Math.random() * 7200000, // Random time
      bandScore,
    },
    statistics: {
      accuracy: Math.round(percentage * 100) / 100,
      sectionBreakdown,
      timePerQuestion: 0, // Will calculate from actual data
      mostDifficultSection: sectionBreakdown.length > 0 
        ? sectionBreakdown.reduce((a, b) => a.accuracy < b.accuracy ? a : b).sectionTitle
        : undefined,
    },
    questionResults,
    resultLayout: {
      id: exam.examType === 'IELTS' && exam.layout.id === 'layout_2' 
        ? 'result_layout_2'
        : exam.examType === 'IELTS' && exam.layout.id === 'layout_3'
        ? 'result_layout_3'
        : 'result_layout_1',
    },
  };

  return result;
}

/**
 * Evaluate if an answer is correct
 * Handles different question types
 */
function evaluateAnswer(question: any, answer: Answer): boolean {
  if (!answer) return false;

  switch (question.type) {
    case 'MCQ':
      if (answer.type !== 'MCQ') return false;
      const correctChoice = question.choices.find((c: any) => c.isCorrect);
      return answer.selectedChoiceId === correctChoice?.id;

    case 'Completion':
      if (answer.type !== 'Completion') return false;
      const normalizedAnswer = answer.text.toLowerCase().trim();
      return question.correctAnswers.some((ca: string) =>
        ca.toLowerCase().trim() === normalizedAnswer
      );

    case 'MultiSelect':
      if (answer.type !== 'MultiSelect') return false;
      const correctChoiceIds = question.choices
        .filter((c: any) => c.isCorrect)
        .map((c: any) => c.id);
      
      if (answer.selectedChoiceIds.length !== correctChoiceIds.length) return false;
      return answer.selectedChoiceIds.every((id: string) => correctChoiceIds.includes(id));

    case 'Essay':
      if (answer.type !== 'Essay') return false;
      // Essays are graded manually, for mock we consider them correct if there's text
      return (answer.text || '').trim().length > 20;

    case 'Recording':
      if (answer.type !== 'Recording') return false;
      // Recordings are graded manually, for mock we consider them answered if URL exists
      return !!answer.audioUrl;

    default:
      return false;
  }
}
