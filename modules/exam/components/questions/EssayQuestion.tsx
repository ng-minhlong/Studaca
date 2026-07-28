'use client'

import React from 'react'
import { useExam } from '../../hooks/useExam'
import type { Question } from '../../types'

interface EssayQuestionProps {
  question: Question
}

/**
 * EssayQuestion
 * 
 * Free-form text/essay question.
 * User enters longer text in a textarea.
 */
export function EssayQuestion({ question }: EssayQuestionProps) {
  const { answerQuestion, getAnswer } = useExam()
  const currentAnswer = (getAnswer(question.id) as string) || ''

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    answerQuestion(question.id, e.target.value)
  }

  const wordCount = currentAnswer.trim().split(/\s+/).filter(w => w.length > 0).length

  return (
    <div>
      <textarea
        value={currentAnswer}
        onChange={handleChange}
        placeholder={question.placeholder || 'Enter your essay...'}
        rows={10}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
      />
      <div className="mt-2 text-sm text-gray-600">Words: {wordCount}</div>
    </div>
  )
}
