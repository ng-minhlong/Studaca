'use client'

import React from 'react'
import { useExam } from '../../hooks/useExam'
import type { Question } from '../../types'

interface SidebarPanelProps {
  questions: Question[]
  onQuestionClick: (sectionIndex: number, blockIndex: number, questionIndex: number) => void
  sectionIndex: number
  blockIndex: number
}

/**
 * SidebarPanel
 * 
 * Displays all questions in the current block/section.
 * Shows which questions are answered, bookmarked, or current.
 */
export function SidebarPanel({
  questions,
  onQuestionClick,
  sectionIndex,
  blockIndex,
}: SidebarPanelProps) {
  const { navigationState, getAnswer, isBookmarked } = useExam()
  const { currentQuestionIndex } = navigationState

  return (
    <aside className="border-r border-gray-200 bg-gray-50 p-4 overflow-y-auto">
      <div className="space-y-2">
        {questions.map((question, index) => {
          const isAnswered = getAnswer(question.id) !== undefined
          const bookmarked = isBookmarked(question.id)
          const isCurrent = currentQuestionIndex === index

          return (
            <button
              key={question.id}
              onClick={() => onQuestionClick(sectionIndex, blockIndex, index)}
              className={`
                w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-2
                ${
                  isCurrent
                    ? 'bg-blue-500 text-white font-semibold'
                    : 'bg-white hover:bg-gray-100 text-gray-900'
                }
              `}
            >
              <span className="text-sm font-medium">{index + 1}</span>
              {bookmarked && <span className="text-xl">🔖</span>}
              {isAnswered && !isCurrent && <span className="ml-auto text-green-600">✓</span>}
            </button>
          )
        })}
      </div>
    </aside>
  )
}
