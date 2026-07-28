'use client'

import React from 'react'
import { useExam } from '../hooks/useExam'
import { HeaderPanel, AudioPanel, QuestionPanel, NavigationPanel } from '../components/panels'
import { QuestionRenderer } from '../components/questions'

/**
 * Layout 3: Listening Layout
 * 
 * Features:
 * - Header with exam title
 * - Audio player
 * - Question area below audio
 * - Navigation at bottom
 * 
 * Perfect for: Listening exams (IELTS, TOEFL, TOEIC Speaking)
 */
export function Layout3Listening() {
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
        subtitle={section.title || 'Listening Section'}
      />

      {/* Audio Player */}
      <AudioPanel 
        title="Listen to the audio"
      />

      {/* Question Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
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
  )
}
