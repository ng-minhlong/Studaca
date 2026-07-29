'use client';

import React from 'react';
import type { Answer } from '../../types';

interface CompletionQuestionProps {
  question: any;
  selectedAnswer?: Answer;
  onAnswer: (answer: Answer) => void;
}

export function CompletionQuestion({ question, selectedAnswer, onAnswer }: CompletionQuestionProps) {
  const text = selectedAnswer?.type === 'Completion' ? selectedAnswer.text : '';

  return (
    <div className="space-y-4">
      <div className="p-4 bg-muted rounded-lg">
        <p className="text-foreground whitespace-pre-wrap">{question.text}</p>
      </div>
      <input
        type="text"
        value={text}
        onChange={(e) =>
          onAnswer({
            type: 'Completion',
            text: e.target.value,
          })
        }
        placeholder="Type your answer here..."
        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <p className="text-xs text-muted-foreground">
        Acceptable answers: {question.correctAnswers.join(', ')}
      </p>
    </div>
  );
}
