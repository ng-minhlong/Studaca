'use client';

import React from 'react';
import type { Question } from '../../../types';
import { QuestionRenderer } from '../../questions';

interface QuestionPanelProps {
  question: Question;
  selectedAnswer?: any;
  onAnswer: (answer: any) => void;
}

export function QuestionPanel({ question, selectedAnswer, onAnswer }: QuestionPanelProps) {
  return (
    <div className="bg-background p-6">
      <div className="max-w-3xl">
        <h2 className="text-lg font-semibold text-foreground mb-4">{question.text}</h2>
        <QuestionRenderer
          question={question}
          selectedAnswer={selectedAnswer}
          onAnswer={onAnswer}
        />
        {question.explanation && (
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-200">
              <span className="font-semibold">Explanation:</span> {question.explanation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
