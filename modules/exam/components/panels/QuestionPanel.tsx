import React from 'react'
import type { Question } from '../../types'

interface QuestionPanelProps {
  question: Question
  questionNumber: number
  totalQuestions: number
  children: React.ReactNode
}

/**
 * QuestionPanel
 * 
 * Wraps question content and displays question metadata.
 */
export function QuestionPanel({
  question,
  questionNumber,
  totalQuestions,
  children,
}: QuestionPanelProps) {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">
              Question {questionNumber} of {totalQuestions}
            </p>
            {question.title && <h2 className="text-xl font-semibold text-gray-900 mt-1">{question.title}</h2>}
          </div>
        </div>

        {question.instruction && (
          <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500">
            <p className="text-sm text-blue-900">{question.instruction}</p>
          </div>
        )}

        <div className="mb-8">
          <p className="text-gray-800 whitespace-pre-wrap">{question.content}</p>
        </div>

        <div className="mt-8">{children}</div>
      </div>
    </div>
  )
}
