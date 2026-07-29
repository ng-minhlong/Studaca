'use client';

import React from 'react';
import type { Exam } from '../../../types';
import { useExam } from '../../../engine';

interface SidebarPanelProps {
  exam: Exam;
}

export function SidebarPanel({ exam }: SidebarPanelProps) {
  const { currentQuestionId, answers, bookmarks, navigateToQuestion } = useExam();
  
  // Get all questions
  const allQuestions = exam.sections.flatMap(s =>
    s.blocks.flatMap(b => b.questions)
  );

  return (
    <div className="w-64 bg-muted border-r border-border overflow-y-auto">
      <div className="p-4 border-b border-border sticky top-0 bg-muted">
        <h3 className="font-semibold text-foreground mb-2">Questions</h3>
        <div className="flex gap-2 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-green-500" />
            <span>Answered</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-yellow-500" />
            <span>Bookmarked</span>
          </div>
        </div>
      </div>
      
      <div className="p-2 space-y-1">
        {allQuestions.map((question, index) => {
          const isAnswered = question.id in answers;
          const isBookmarked = bookmarks.has(question.id);
          const isCurrent = question.id === currentQuestionId;

          return (
            <button
              key={question.id}
              onClick={() => navigateToQuestion(question.id)}
              className={`w-full text-left px-3 py-2 rounded transition-colors text-sm font-medium ${
                isCurrent
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-secondary text-foreground'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>Q{index + 1}</span>
                <div className="flex gap-1">
                  {isAnswered && <div className="w-2 h-2 rounded-full bg-green-500" />}
                  {isBookmarked && <div className="w-2 h-2 rounded-full bg-yellow-500" />}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
