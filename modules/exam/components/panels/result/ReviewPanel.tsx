'use client';

import React, { useState } from 'react';
import { useResult } from '../../../engine/result';

export function ReviewPanel() {
  const { getAllQuestionResults } = useResult();
  const questionResults = getAllQuestionResults();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-foreground mb-4">Question Review</h3>
      {questionResults.map((result) => (
        <div
          key={result.questionId}
          className="bg-muted rounded-lg border border-border overflow-hidden"
        >
          <button
            onClick={() =>
              setExpandedId(expandedId === result.questionId ? null : result.questionId)
            }
            className="w-full p-4 flex items-start gap-3 hover:bg-muted/80 transition-colors"
          >
            <div
              className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                result.isCorrect ? 'bg-green-500' : 'bg-red-500'
              }`}
            >
              {result.isCorrect ? '✓' : '✕'}
            </div>
            <div className="flex-1 text-left">
              <p className="text-foreground font-medium">{result.question.text}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Type: {result.question.type}
              </p>
            </div>
            <div className="text-xs font-semibold px-2 py-1 rounded-full">
              {result.isCorrect ? (
                <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100">
                  Correct
                </span>
              ) : (
                <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100">
                  Incorrect
                </span>
              )}
            </div>
          </button>

          {expandedId === result.questionId && (
            <div className="border-t border-border p-4 bg-background/50 space-y-3">
              {result.userAnswer ? (
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">Your Answer:</p>
                  <p className="text-sm text-muted-foreground">
                    {JSON.stringify(result.userAnswer)}
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-sm font-semibold text-yellow-700 dark:text-yellow-200">
                    ⚠️ Not Answered
                  </p>
                </div>
              )}

              {result.explanation && (
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">Explanation:</p>
                  <p className="text-sm text-muted-foreground">{result.explanation}</p>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
