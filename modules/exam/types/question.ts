/**
 * Question Type Definitions
 * Defines all question types and their variants with strict discriminated unions
 */

// Exam question types
export type ExamType = 'MCQ' | 'Completion' | 'MultiSelect' | 'Essay' | 'Recording';

// Choice type for MCQ and MultiSelect
export interface Choice {
  id: string;
  text: string;
  isCorrect?: boolean; // For results/review
}

// Answer types for different question formats
export type Answer = 
  | { type: 'MCQ'; selectedChoiceId: string | null }
  | { type: 'Completion'; text: string }
  | { type: 'MultiSelect'; selectedChoiceIds: string[] }
  | { type: 'Essay'; text: string }
  | { type: 'Recording'; audioUrl: string | null };

// Question discriminated union
export type Question = 
  | {
      type: 'MCQ';
      id: string;
      text: string;
      explanation?: string;
      choices: Choice[];
      metadata?: Record<string, any>;
    }
  | {
      type: 'Completion';
      id: string;
      text: string; // Contains blank (e.g., "The capital of France is ____")
      correctAnswers: string[]; // Multiple acceptable answers
      explanation?: string;
      metadata?: Record<string, any>;
    }
  | {
      type: 'MultiSelect';
      id: string;
      text: string;
      explanation?: string;
      choices: Choice[];
      correctCount: number; // Number of correct answers
      metadata?: Record<string, any>;
    }
  | {
      type: 'Essay';
      id: string;
      text: string;
      explanation?: string;
      metadata?: Record<string, any>;
    }
  | {
      type: 'Recording';
      id: string;
      text: string;
      explanation?: string;
      metadata?: Record<string, any>;
    };

// Block represents a group of questions (like a passage in IELTS)
export interface Block {
  id: string;
  type: 'passage' | 'audio' | 'video' | 'generic';
  title?: string;
  content?: string; // For passages
  audioUrl?: string; // For audio blocks
  videoUrl?: string; // For video blocks
  duration?: number; // For audio/video in seconds
  questions: Question[];
}

// Section represents a major section of an exam
export interface Section {
  id: string;
  title: string;
  instructions?: string;
  duration?: number; // In seconds
  blocks: Block[];
}

// Main Exam interface
export interface Exam {
  id: string;
  title: string;
  examType: string; // e.g., 'HSK', 'IELTS', 'JLPT'
  totalDuration: number; // In seconds
  sections: Section[];
  layout: {
    id: string; // e.g., 'layout_1', 'layout_2', 'layout_3'
    config?: Record<string, any>;
  };
  metadata?: {
    difficulty?: 'easy' | 'medium' | 'hard';
    tags?: string[];
    description?: string;
  };
}
