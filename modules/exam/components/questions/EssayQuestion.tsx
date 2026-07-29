'use client';

import React from 'react';
import type { Answer } from '../../types';

interface EssayQuestionProps {
  question: any;
  selectedAnswer?: Answer;
  onAnswer: (answer: Answer) => void;
}

export function EssayQuestion({ question, selectedAnswer, onAnswer }: EssayQuestionProps) {
  const text = selectedAnswer?.type === 'Essay' ? selectedAnswer.text : '';

  return (
    <div className="space-y-4">
      <textarea
        value={text}
        onChange={(e) =>
          onAnswer({
            type: 'Essay',
            text: e.target.value,
          })
        }
        placeholder="Write your essay here..."
        rows={10}
        className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none font-mono text-sm"
      />
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>{text.length} characters</span>
        <span>{text.split(/\s+/).filter(w => w).length} words</span>
      </div>
    </div>
  );
}
