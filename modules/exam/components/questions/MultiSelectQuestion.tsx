'use client'

import React from 'react'
import { useExam } from '../../hooks/useExam'
import type { Question } from '../../types'

interface MultiSelectQuestionProps {
  question: Question
}

/**
 * MultiSelectQuestion
 * 
 * Multiple Choice - Multiple Select.
 * User can select MULTIPLE options.
 */
export function MultiSelectQuestion({ question }: MultiSelectQuestionProps) {
  const { answerQuestion, getAnswer } = useExam()
  const currentAnswers = (getAnswer(question.id) as string[]) || []

  const handleChange = (choiceId: string, isChecked: boolean) => {
    let newAnswers = [...currentAnswers]
    if (isChecked) {
      newAnswers.push(choiceId)
    } else {
      newAnswers = newAnswers.filter(id => id !== choiceId)
    }
    answerQuestion(question.id, newAnswers)
  }

  return (
    <div className="space-y-3">
      {question.choices?.map(choice => (
        <label
          key={choice.id}
          className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors"
        >
          <input
            type="checkbox"
            checked={currentAnswers.includes(choice.id)}
            onChange={e => handleChange(choice.id, e.target.checked)}
            className="w-4 h-4 cursor-pointer"
          />
          <span className="ml-3 text-gray-800">{choice.label}</span>
        </label>
      ))}
    </div>
  )
}
