'use client'

import React from 'react'
import { useExam } from '../../hooks/useExam'

interface NavigationPanelProps {
  onFinish?: () => void
  showFinish?: boolean
}

/**
 * NavigationPanel
 * 
 * Navigation buttons: Previous, Next, Review, Finish.
 */
export function NavigationPanel({ onFinish, showFinish = true }: NavigationPanelProps) {
  const { nextQuestion, previousQuestion, navigationState, getTotalQuestions, finishExam } = useExam()
  const { currentSectionIndex, currentBlockIndex, currentQuestionIndex } = navigationState
  const totalQuestions = getTotalQuestions()
  const isFirstQuestion = currentSectionIndex === 0 && currentBlockIndex === 0 && currentQuestionIndex === 0
  const isLastQuestion = totalQuestions > 0 && getTotalQuestions() === getTotalQuestions()

  const handleFinish = () => {
    finishExam()
    onFinish?.()
  }

  return (
    <div className="border-t border-gray-200 bg-white px-6 py-4 flex items-center justify-between gap-4">
      <button
        onClick={previousQuestion}
        disabled={isFirstQuestion}
        className={`
          px-4 py-2 rounded-lg font-medium transition-colors
          ${
            isFirstQuestion
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
          }
        `}
      >
        ← Previous
      </button>

      <div className="flex-1 text-center text-sm text-gray-600">
        Question {navigationState.currentQuestionIndex + 1} of {totalQuestions}
      </div>

      <div className="flex gap-2">
        <button
          onClick={nextQuestion}
          className={`
            px-4 py-2 rounded-lg font-medium transition-colors
            ${
              isLastQuestion
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }
          `}
        >
          Next →
        </button>

        {showFinish && (
          <button
            onClick={handleFinish}
            className="px-4 py-2 rounded-lg font-medium bg-green-500 text-white hover:bg-green-600 transition-colors"
          >
            Finish
          </button>
        )}
      </div>
    </div>
  )
}
