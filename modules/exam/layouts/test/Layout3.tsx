'use client';

/**
 * Layout 3: Listening Layout
 * For IELTS Listening
 * Structure: Header | Timer | Audio Player | Questions | Navigation
 */

import React from 'react';
import type { Exam } from '../../types';
import { ExamProvider, useExam } from '../../engine';
import { HeaderPanel } from '../../components/panels/exam/HeaderPanel';
import { TimerPanel } from '../../components/panels/exam/TimerPanel';
import { QuestionPanel } from '../../components/panels/exam/QuestionPanel';
import { NavigationPanel } from '../../components/panels/exam/NavigationPanel';

interface Layout3Props {
  exam: Exam;
}

function Layout3Content({ exam }: Layout3Props) {
  const { getCurrentQuestion, answerQuestion, answers, currentBlockId } = useExam();
  const currentQuestion = getCurrentQuestion();
  
  // Find the audio block for the current question
  const currentBlock = exam.sections
    .flatMap(s => s.blocks)
    .find(b => b.id === currentBlockId);

  return (
    <div className="flex flex-col h-screen bg-background">
      <HeaderPanel exam={exam} />
      <TimerPanel exam={exam} />
      
      {/* Audio Player Section */}
      {currentBlock?.type === 'audio' && (
        <div className="bg-muted border-b border-border p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-2">
                  {currentBlock.title}
                </h2>
                {currentBlock.duration && (
                  <p className="text-sm text-muted-foreground">
                    Duration: {Math.floor(currentBlock.duration / 60)} minutes {currentBlock.duration % 60} seconds
                  </p>
                )}
              </div>
              
              {currentBlock.audioUrl && (
                <div className="bg-background rounded-lg p-4">
                  <audio
                    src={currentBlock.audioUrl}
                    controls
                    className="w-full h-12"
                  />
                </div>
              )}

              <p className="text-sm text-muted-foreground italic">
                You can replay the audio as many times as needed. Answer the questions below.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Questions Section */}
      <div className="flex-1 overflow-y-auto">
        {currentQuestion && (
          <QuestionPanel
            question={currentQuestion}
            selectedAnswer={answers[currentQuestion.id]}
            onAnswer={(answer) => answerQuestion(currentQuestion.id, answer)}
          />
        )}
      </div>

      <NavigationPanel exam={exam} />
    </div>
  );
}

export function Layout3({ exam }: Layout3Props) {
  return (
    <ExamProvider exam={exam}>
      <Layout3Content exam={exam} />
    </ExamProvider>
  );
}
