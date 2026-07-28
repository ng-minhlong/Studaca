'use client'

import React, { useState } from 'react'
import { useExam } from '../../hooks/useExam'
import type { Question } from '../../types'

interface RecordingQuestionProps {
  question: Question
}

/**
 * RecordingQuestion
 * 
 * Speaking/Recording question.
 * Placeholder for actual audio recording implementation.
 */
export function RecordingQuestion({ question }: RecordingQuestionProps) {
  const { answerQuestion, getAnswer } = useExam()
  const [isRecording, setIsRecording] = useState(false)
  const currentAnswer = (getAnswer(question.id) as string) || ''

  const handleStartRecording = () => {
    setIsRecording(true)
    // In a real app, would start actual recording
    answerQuestion(question.id, 'recording-started')
  }

  const handleStopRecording = () => {
    setIsRecording(false)
    // In a real app, would stop and save recording
    answerQuestion(question.id, 'recording-completed')
  }

  return (
    <div className="space-y-4">
      <div className="p-6 bg-gray-50 rounded-lg text-center">
        {isRecording ? (
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-red-600 font-semibold">Recording...</span>
            </div>
            <button
              onClick={handleStopRecording}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Stop Recording
            </button>
          </div>
        ) : (
          <div>
            <div className="text-4xl mb-4">🎤</div>
            <button
              onClick={handleStartRecording}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Start Recording
            </button>
          </div>
        )}
      </div>

      {currentAnswer && currentAnswer !== 'recording-started' && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
          ✓ Recording saved
        </div>
      )}
    </div>
  )
}
