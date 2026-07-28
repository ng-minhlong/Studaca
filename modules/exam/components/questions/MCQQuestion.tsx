'use client'

import React from 'react'
import { useExam } from '../../hooks/useExam'
import type { Question } from '../../types'

interface MCQQuestionProps {
  question: Question
}

/**
 * MCQQuestion
 * 
 * Multiple Choice Question component.
 * User selects ONE option.
 */
export function MCQQuestion({ question }: MCQQuestionProps) {
  const { answerQuestion, getAnswer } = useExam()
  const currentAnswer = getAnswer(question.id) as string | undefined

  const handleChange = (choiceId: string) => {
    answerQuestion(question.id, choiceId)
  }

  return (
    <div className="space-y-3">
      {question.choices?.map(choice => (
        <label
          key={choice.id}
          className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors"
        >
          <input
            type="radio"
            name={question.id}
            value={choice.id}
            checked={currentAnswer === choice.id}
            onChange={() => handleChange(choice.id)}
            className="w-4 h-4 cursor-pointer"
          />
          <span className="ml-3 text-gray-800">{choice.label}</span>
        </label>
      ))}
    </div>
  )
}
