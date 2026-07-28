'use client'

import React, { useState } from 'react'
import { useExam } from '../hooks/useExam'
import { HeaderPanel, PassagePanel, QuestionPanel, NavigationPanel } from '../components/panels'
import { QuestionRenderer } from '../components/questions'

/**
 * Layout 2: Reading Split Layout
 * 
 * Features:
 * - Header with exam title
 * - Left side: Reading passage
 * - Right side: Questions related to passage
 * - Bottom: Navigation
 * 
 * Perfect for: Reading comprehension exams (IELTS, TOEFL, GRE)
 */
export function Layout2ReadingSplit() {
  const { exam, getCurrentQuestion, nextQuestion, previousQuestion, toggleBookmark, isBookmarked } = useExam()

  if (!exam) return <div>Loading...</div>

  const currentQuestion = getCurrentQuestion()
  if (!currentQuestion) return <div>No questions available</div>

  const { section, block, question, totalQuestions, currentNumber } = currentQuestion

  return (
    <div className="flex h-screen flex-col bg-white">
      {/* Header */}
      <HeaderPanel
        title={exam.title}
        subtitle={section.title}
      />

      {/* Main content: Passage + Questions */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Passage */}
        {block.passage && (
          <div className="w-1/2 flex-shrink-0">
            <PassagePanel 
              passage={block.passage} 
              title={block.title}
            />
          </div>
        )}

        {/* Right: Question */}
        <div className="flex-1 flex flex-col">
          <QuestionPanel
            question={question}
            questionNumber={currentNumber}
            totalQuestions={totalQuestions}
          >
            <QuestionRenderer question={question} />

            <div className="mt-6">
              <button
                onClick={() => toggleBookmark(question.id)}
                className={`
                  px-4 py-2 rounded-lg font-medium transition-colors
                  ${
                    isBookmarked(question.id)
                      ? 'bg-yellow-200 text-yellow-900'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }
                `}
              >
                {isBookmarked(question.id) ? '🔖 Bookmarked' : '☆ Bookmark'}
              </button>
            </div>
          </QuestionPanel>

          {/* Navigation */}
          <NavigationPanel showFinish={true} />
        </div>
      </div>
    </div>
  )
}
