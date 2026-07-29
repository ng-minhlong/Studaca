'use client';

import React from 'react';
import type { Question, Answer } from '../../types';
import { MCQQuestion } from './MCQQuestion';
import { MultiSelectQuestion } from './MultiSelectQuestion';
import { CompletionQuestion } from './CompletionQuestion';
import { EssayQuestion } from './EssayQuestion';
import { RecordingQuestion } from './RecordingQuestion';

interface QuestionRendererProps {
  question: Question;
  selectedAnswer?: Answer;
  onAnswer: (answer: Answer) => void;
}

export function QuestionRenderer({
  question,
  selectedAnswer,
  onAnswer,
}: QuestionRendererProps) {
  switch (question.type) {
    case 'MCQ':
      return (
        <MCQQuestion
          question={question}
          selectedAnswer={selectedAnswer}
          onAnswer={onAnswer}
        />
      );

    case 'MultiSelect':
      return (
        <MultiSelectQuestion
          question={question}
          selectedAnswer={selectedAnswer}
          onAnswer={onAnswer}
        />
      );

    case 'Completion':
      return (
        <CompletionQuestion
          question={question}
          selectedAnswer={selectedAnswer}
          onAnswer={onAnswer}
        />
      );

    case 'Essay':
      return (
        <EssayQuestion
          question={question}
          selectedAnswer={selectedAnswer}
          onAnswer={onAnswer}
        />
      );

    case 'Recording':
      return (
        <RecordingQuestion
          question={question}
          selectedAnswer={selectedAnswer}
          onAnswer={onAnswer}
        />
      );

    default:
      return (
        <div className="p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-700 dark:text-red-200">
            Unknown question type: {(question as any).type}
          </p>
        </div>
      );
  }
}
