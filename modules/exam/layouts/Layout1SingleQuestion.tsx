'use client'

import React, { useState } from 'react'
import { useExam } from '../hooks/useExam'
import { HeaderPanel, SidebarPanel, QuestionPanel, NavigationPanel, FooterPanel } from '../components/panels'
import { QuestionRenderer } from '../components/questions'

/**
 * Layout 1: Single Question Layout
 * 
 * Features:
 * - Header with exam title
 * - Sidebar with question numbers
 * - Main area with one question
 * - Navigation buttons
 * - Timer (right-aligned in header)
 * 
 * Perfect for: Linear exams (TOEIC, JLPT, etc.)
 */
export function Layout1SingleQuestion() {
  const { exam, getCurrentQuestion, nextQuestion, previousQuestion, jumpToQuestion, toggleBookmark, isBookmarked } =
    useExam()
  const [showBookmarkOnly, setShowBookmarkOnly] = useState(false)

  if (!exam) return <div>Loading...</div>

  const currentQuestion = getCurrentQuestion()
  if (!currentQuestion) return <div>No questions available</div>

  const { section, block, question, sectionIndex, blockIndex, questionIndex, totalQuestions, currentNumber } =
    currentQuestion

  const allQuestions = block.questions

  // Filter bookmarked if toggle is on
  const displayQuestions = showBookmarkOnly
    ? allQuestions.filter(q => isBookmarked(q.id))
    : allQuestions

  return (
    <div className="flex h-screen flex-col bg-white">
      {/* Header with timer */}
      <HeaderPanel
        title={exam.title}
        subtitle={section.title}
        rightContent={
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">
              {Math.floor(exam.totalDuration || 0)} min
            </div>
          </div>
        }
      />

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-48 flex-shrink-0">
          <div className="p-2 border-b border-gray-200">
            <button
              onClick={() => setShowBookmarkOnly(!showBookmarkOnly)}
              className={`
                w-full px-3 py-2 rounded text-sm font-medium transition-colors
                ${
                  showBookmarkOnly
                    ? 'bg-yellow-100 text-yellow-900'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              {showBookmarkOnly ? '🔖 Bookmarked Only' : 'Show All'}
            </button>
          </div>
          <SidebarPanel
            questions={displayQuestions}
            onQuestionClick={(section, block, question) => {
              jumpToQuestion(sectionIndex, blockIndex, question)
            }}
            sectionIndex={sectionIndex}
            blockIndex={blockIndex}
          />
        </div>

        {/* Question Panel */}
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
