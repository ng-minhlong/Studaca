import React from 'react'
import type { Question } from '../../types'
import { MCQQuestion } from './MCQQuestion'
import { CompletionQuestion } from './CompletionQuestion'
import { MultiSelectQuestion } from './MultiSelectQuestion'
import { EssayQuestion } from './EssayQuestion'
import { RecordingQuestion } from './RecordingQuestion'

interface QuestionRendererProps {
  question: Question
}

/**
 * QuestionRenderer
 * 
 * Routes question rendering based on question type.
 * Switches ONLY by question.type - never by exam type.
 */
export function QuestionRenderer({ question }: QuestionRendererProps) {
  switch (question.type) {
    case 'mcq':
      return <MCQQuestion question={question} />

    case 'completion':
      return <CompletionQuestion question={question} />

    case 'multi-select':
      return <MultiSelectQuestion question={question} />

    case 'essay':
      return <EssayQuestion question={question} />

    case 'recording':
      return <RecordingQuestion question={question} />

    default:
      return <div className="text-red-600">Unknown question type: {question.type}</div>
  }
}
