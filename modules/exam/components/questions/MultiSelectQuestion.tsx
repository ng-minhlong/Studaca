'use client';

import React from 'react';
import type { Answer } from '../../types';

interface MultiSelectQuestionProps {
  question: any;
  selectedAnswer?: Answer;
  onAnswer: (answer: Answer) => void;
}

export function MultiSelectQuestion({ question, selectedAnswer, onAnswer }: MultiSelectQuestionProps) {
  const selectedIds = selectedAnswer?.type === 'MultiSelect' ? selectedAnswer.selectedChoiceIds : [];

  const toggleChoice = (choiceId: string) => {
    const newIds = selectedIds.includes(choiceId)
      ? selectedIds.filter(id => id !== choiceId)
      : [...selectedIds, choiceId];
    onAnswer({
      type: 'MultiSelect',
      selectedChoiceIds: newIds,
    });
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Select {question.correctCount} correct answer(s)
      </p>
      <div className="space-y-3">
        {question.choices.map((choice: any) => (
          <button
            key={choice.id}
            onClick={() => toggleChoice(choice.id)}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
              selectedIds.includes(choice.id)
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50 bg-muted/30'
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 transition-colors ${
                  selectedIds.includes(choice.id)
                    ? 'border-primary bg-primary'
                    : 'border-border'
                }`}
              >
                {selectedIds.includes(choice.id) && (
                  <svg className="w-3 h-3 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <p className="text-foreground">{choice.text}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
