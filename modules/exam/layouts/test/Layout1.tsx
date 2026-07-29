'use client';

/**
 * Layout 1: Single Question Layout
 * For HSK, JLPT, TOPIK, THPT, Aptitude tests
 * Structure: Header | Timer | Question | Sidebar | Navigation
 */

import React, { useMemo } from 'react';
import type { Exam } from '../../types';
import { ExamProvider, useExam } from '../../engine';
import { HeaderPanel } from '../../components/panels/exam/HeaderPanel';
import { TimerPanel } from '../../components/panels/exam/TimerPanel';
import { QuestionPanel } from '../../components/panels/exam/QuestionPanel';
import { SidebarPanel } from '../../components/panels/exam/SidebarPanel';
import { NavigationPanel } from '../../components/panels/exam/NavigationPanel';

interface Layout1Props {
  exam: Exam;
}

function Layout1Content({ exam }: Layout1Props) {
  const { getCurrentQuestion, answerQuestion, answers } = useExam();
  const currentQuestion = getCurrentQuestion();

  return (
    <div className="flex flex-col h-screen bg-background">
      <HeaderPanel exam={exam} />
      <TimerPanel exam={exam} />
      
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          {currentQuestion && (
            <QuestionPanel
              question={currentQuestion}
              selectedAnswer={answers[currentQuestion.id]}
              onAnswer={(answer) => answerQuestion(currentQuestion.id, answer)}
            />
          )}
        </div>
        <SidebarPanel exam={exam} />
      </div>

      <NavigationPanel exam={exam} />
    </div>
  );
}

export function Layout1({ exam }: Layout1Props) {
  return (
    <ExamProvider exam={exam}>
      <Layout1Content exam={exam} />
    </ExamProvider>
  );
}
