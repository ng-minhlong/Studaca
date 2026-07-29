'use client';

import React from 'react';
import type { Exam } from '../../../types';
import { useExam } from '../../../engine';

interface NavigationPanelProps {
  exam: Exam;
}

export function NavigationPanel({ exam }: NavigationPanelProps) {
  const {
    currentQuestionId,
    nextQuestion,
    previousQuestion,
    toggleBookmark,
    bookmarks,
    submitExam,
    getTotalQuestions,
  } = useExam();

  const allQuestions = exam.sections.flatMap(s =>
    s.blocks.flatMap(b => b.questions)
  );
  const currentIndex = allQuestions.findIndex(q => q.id === currentQuestionId);
  const isBookmarked = bookmarks.has(currentQuestionId);
  const isLastQuestion = currentIndex === allQuestions.length - 1;

  return (
    <div className="bg-background border-t border-border p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <button
          onClick={previousQuestion}
          disabled={currentIndex === 0}
          className="px-4 py-2 rounded bg-secondary text-foreground hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          ← Previous
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleBookmark(currentQuestionId)}
            className={`px-4 py-2 rounded font-medium transition-colors ${
              isBookmarked
                ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                : 'bg-secondary text-foreground hover:bg-secondary/80'
            }`}
          >
            {isBookmarked ? '★ Bookmarked' : '☆ Bookmark'}
          </button>
        </div>

        <div className="flex-1" />

        {isLastQuestion ? (
          <button
            onClick={submitExam}
            className="px-6 py-2 rounded bg-green-600 text-white hover:bg-green-700 font-bold"
          >
            Submit Exam
          </button>
        ) : (
          <button
            onClick={nextQuestion}
            className="px-4 py-2 rounded bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
          >
            Next →
          </button>
        )}
      </div>
    </div>
  );
}
