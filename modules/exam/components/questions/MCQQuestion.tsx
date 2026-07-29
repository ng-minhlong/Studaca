'use client';

import React from 'react';
import type { Answer } from '../../types';

interface MCQQuestionProps {
  question: any;
  selectedAnswer?: Answer;
  onAnswer: (answer: Answer) => void;
}

export function MCQQuestion({ question, selectedAnswer, onAnswer }: MCQQuestionProps) {
  const selectedId = selectedAnswer?.type === 'MCQ' ? selectedAnswer.selectedChoiceId : null;

  return (
    <div className="space-y-3">
      {question.choices.map((choice: any) => (
        <button
          key={choice.id}
          onClick={() =>
            onAnswer({
              type: 'MCQ',
              selectedChoiceId: choice.id,
            })
          }
          className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
            selectedId === choice.id
              ? 'border-primary bg-primary/5'
              : 'border-border hover:border-primary/50 bg-muted/30'
          }`}
        >
          <div className="flex items-start gap-3">
            <div
              className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 transition-colors ${
                selectedId === choice.id
                  ? 'border-primary bg-primary'
                  : 'border-border group-hover:border-primary'
              }`}
            >
              {selectedId === choice.id && (
                <div className="w-2 h-2 rounded-full bg-primary-foreground" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-foreground">{choice.text}</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
