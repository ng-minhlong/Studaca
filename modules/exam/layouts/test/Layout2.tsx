'use client';

/**
 * Layout 2: Reading Split Layout
 * For IELTS Reading
 * Structure: Header | Timer | [Passage (left) | Questions (right)] | Navigation
 */

import React from 'react';
import type { Exam } from '../../types';
import { ExamProvider, useExam } from '../../engine';
import { HeaderPanel } from '../../components/panels/exam/HeaderPanel';
import { TimerPanel } from '../../components/panels/exam/TimerPanel';
import { QuestionPanel } from '../../components/panels/exam/QuestionPanel';
import { NavigationPanel } from '../../components/panels/exam/NavigationPanel';

interface Layout2Props {
  exam: Exam;
}

function Layout2Content({ exam }: Layout2Props) {
  const { getCurrentQuestion, answerQuestion, answers, currentBlockId } = useExam();
  const currentQuestion = getCurrentQuestion();
  
  // Find the passage/block for the current question
  const currentBlock = exam.sections
    .flatMap(s => s.blocks)
    .find(b => b.id === currentBlockId);

  return (
    <div className="flex flex-col h-screen bg-background">
      <HeaderPanel exam={exam} />
      <TimerPanel exam={exam} />
      
      <div className="flex-1 flex overflow-hidden gap-0">
        {/* Passage Section (Left) */}
        <div className="w-1/2 border-r border-border overflow-y-auto bg-muted/50 p-6">
          <div className="max-w-2xl">
            {currentBlock?.type === 'passage' && (
              <div>
                {currentBlock.title && (
                  <h2 className="text-lg font-bold text-foreground mb-4">{currentBlock.title}</h2>
                )}
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <p className="text-foreground whitespace-pre-wrap leading-relaxed text-justify">
                    {currentBlock.content}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Questions Section (Right) */}
        <div className="w-1/2 overflow-y-auto">
          {currentQuestion && (
            <QuestionPanel
              question={currentQuestion}
              selectedAnswer={answers[currentQuestion.id]}
              onAnswer={(answer) => answerQuestion(currentQuestion.id, answer)}
            />
          )}
        </div>
      </div>

      <NavigationPanel exam={exam} />
    </div>
  );
}

export function Layout2({ exam }: Layout2Props) {
  return (
    <ExamProvider exam={exam}>
      <Layout2Content exam={exam} />
    </ExamProvider>
  );
}
