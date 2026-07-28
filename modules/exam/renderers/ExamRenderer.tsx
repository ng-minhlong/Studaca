'use client'

import React from 'react'
import { LayoutId } from '../types'
import { Layout1SingleQuestion, Layout2ReadingSplit, Layout3Listening } from '../layouts'
import { useExam } from '../hooks/useExam'

/**
 * ExamRenderer
 * 
 * Routes exam rendering based on layout.id
 * Switch ONLY by layout.id - NEVER by exam type.
 * 
 * This is the core rendering decision point.
 * Every exam (IELTS, TOEIC, SAT, etc.) uses one of these layouts.
 */
export function ExamRenderer() {
  const { exam } = useExam()

  if (!exam) {
    return <div className="flex items-center justify-center h-screen text-gray-600">Loading exam...</div>
  }

  const layoutId = exam.layout.id

  switch (layoutId) {
    case LayoutId.SINGLE_QUESTION:
      return <Layout1SingleQuestion />

    case LayoutId.READING_SPLIT:
      return <Layout2ReadingSplit />

    case LayoutId.LISTENING:
      return <Layout3Listening />

    default:
      return (
        <div className="flex items-center justify-center h-screen text-red-600">
          <div className="text-center">
            <p className="text-xl font-semibold mb-2">Unknown Layout</p>
            <p className="text-gray-600">Layout ID: {layoutId}</p>
          </div>
        </div>
      )
  }
}
