'use client'

import React from 'react'
import { useExam } from '../../hooks/useExam'
import type { Question } from '../../types'

interface CompletionQuestionProps {
  question: Question
}

/**
 * CompletionQuestion
 * 
 * Fill-in-the-blank / Completion question.
 * User enters text in a text field.
 */
export function CompletionQuestion({ question }: CompletionQuestionProps) {
  const { answerQuestion, getAnswer } = useExam()
  const currentAnswer = (getAnswer(question.id) as string) || ''

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    answerQuestion(question.id, e.target.value)
  }

  return (
    <div>
      <input
        type="text"
        value={currentAnswer}
        onChange={handleChange}
        placeholder={question.placeholder || 'Enter your answer...'}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}
