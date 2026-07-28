'use client'

import React, { useState, useCallback, useEffect, useRef } from 'react'
import type { Exam, NavigationState, AnswerMap, BookmarkSet, TimerState, AnswerValue, CurrentQuestion } from '../types'
import { ExamContext, type ExamContextValue } from './ExamContext'

interface ExamProviderProps {
  exam: Exam
  children: React.ReactNode
}

/**
 * ExamProvider
 * 
 * Wraps the exam application and provides all state management.
 * Uses React Context to avoid prop drilling.
 */
export function ExamProvider({ exam, children }: ExamProviderProps) {
  // ========================================================================
  // State
  // ========================================================================

  const [navigationState, setNavigationState] = useState<NavigationState>({
    currentSectionIndex: 0,
    currentBlockIndex: 0,
    currentQuestionIndex: 0,
  })

  const [answerMap, setAnswerMap] = useState<AnswerMap>({})
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<BookmarkSet>({})
  const [timerState, setTimerState] = useState<TimerState>({
    totalSeconds: exam.totalDuration ? exam.totalDuration * 60 : 0,
    remainingSeconds: exam.totalDuration ? exam.totalDuration * 60 : 0,
    isActive: false,
  })

  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // ========================================================================
  // Computed Values
  // ========================================================================

  const getTotalQuestions = useCallback(() => {
    return exam.sections.reduce((sum, section) => {
      return sum + section.blocks.reduce((blockSum, block) => {
        return blockSum + block.questions.length
      }, 0)
    }, 0)
  }, [exam])

  const getCurrentQuestionNumber = useCallback(() => {
    let count = 0
    for (let i = 0; i < navigationState.currentSectionIndex; i++) {
      exam.sections[i].blocks.forEach(block => {
        count += block.questions.length
      })
    }
    for (let i = 0; i < navigationState.currentBlockIndex; i++) {
      exam.sections[navigationState.currentSectionIndex].blocks[i].questions.forEach(() => {
        count += 1
      })
    }
    count += navigationState.currentQuestionIndex + 1
    return count
  }, [exam, navigationState])

  const getCurrentQuestion = useCallback((): CurrentQuestion | null => {
    const section = exam.sections[navigationState.currentSectionIndex]
    if (!section) return null

    const block = section.blocks[navigationState.currentBlockIndex]
    if (!block) return null

    const question = block.questions[navigationState.currentQuestionIndex]
    if (!question) return null

    return {
      section,
      block,
      question,
      sectionIndex: navigationState.currentSectionIndex,
      blockIndex: navigationState.currentBlockIndex,
      questionIndex: navigationState.currentQuestionIndex,
      totalQuestions: getTotalQuestions(),
      currentNumber: getCurrentQuestionNumber(),
    }
  }, [exam, navigationState, getTotalQuestions, getCurrentQuestionNumber])

  // ========================================================================
  // Navigation
  // ========================================================================

  const jumpToQuestion = useCallback(
    (sectionIndex: number, blockIndex: number, questionIndex: number) => {
      setNavigationState({
        currentSectionIndex: sectionIndex,
        currentBlockIndex: blockIndex,
        currentQuestionIndex: questionIndex,
      })
    },
    []
  )

  const nextQuestion = useCallback(() => {
    setNavigationState(prev => {
      const { currentSectionIndex, currentBlockIndex, currentQuestionIndex } = prev
      const section = exam.sections[currentSectionIndex]
      if (!section) return prev

      const block = section.blocks[currentBlockIndex]
      if (!block) return prev

      // Try to move to next question in current block
      if (currentQuestionIndex < block.questions.length - 1) {
        return {
          ...prev,
          currentQuestionIndex: currentQuestionIndex + 1,
        }
      }

      // Try to move to first question of next block
      if (currentBlockIndex < section.blocks.length - 1) {
        return {
          ...prev,
          currentBlockIndex: currentBlockIndex + 1,
          currentQuestionIndex: 0,
        }
      }

      // Try to move to first question of next section
      if (currentSectionIndex < exam.sections.length - 1) {
        return {
          currentSectionIndex: currentSectionIndex + 1,
          currentBlockIndex: 0,
          currentQuestionIndex: 0,
        }
      }

      // Already at end
      return prev
    })
  }, [exam])

  const previousQuestion = useCallback(() => {
    setNavigationState(prev => {
      const { currentSectionIndex, currentBlockIndex, currentQuestionIndex } = prev

      // Try to move to previous question in current block
      if (currentQuestionIndex > 0) {
        return {
          ...prev,
          currentQuestionIndex: currentQuestionIndex - 1,
        }
      }

      // Try to move to last question of previous block
      if (currentBlockIndex > 0) {
        const block = exam.sections[currentSectionIndex].blocks[currentBlockIndex - 1]
        return {
          ...prev,
          currentBlockIndex: currentBlockIndex - 1,
          currentQuestionIndex: block.questions.length - 1,
        }
      }

      // Try to move to last question of previous section
      if (currentSectionIndex > 0) {
        const section = exam.sections[currentSectionIndex - 1]
        const lastBlock = section.blocks[section.blocks.length - 1]
        return {
          currentSectionIndex: currentSectionIndex - 1,
          currentBlockIndex: section.blocks.length - 1,
          currentQuestionIndex: lastBlock.questions.length - 1,
        }
      }

      // Already at beginning
      return prev
    })
  }, [exam])

  // ========================================================================
  // Answers
  // ========================================================================

  const answerQuestion = useCallback((questionId: string, value: AnswerValue) => {
    setAnswerMap(prev => ({
      ...prev,
      [questionId]: value,
    }))
  }, [])

  const getAnswer = useCallback(
    (questionId: string) => {
      return answerMap[questionId]
    },
    [answerMap]
  )

  // ========================================================================
  // Bookmarks
  // ========================================================================

  const toggleBookmark = useCallback((questionId: string) => {
    setBookmarkedQuestions(prev => ({
      ...prev,
      [questionId]: !prev[questionId],
    }))
  }, [])

  const isBookmarked = useCallback(
    (questionId: string) => {
      return bookmarkedQuestions[questionId] || false
    },
    [bookmarkedQuestions]
  )

  // ========================================================================
  // Timer
  // ========================================================================

  const startTimer = useCallback((seconds: number) => {
    setTimerState({
      totalSeconds: seconds,
      remainingSeconds: seconds,
      isActive: true,
    })
  }, [])

  const pauseTimer = useCallback(() => {
    setTimerState(prev => ({
      ...prev,
      isActive: false,
    }))
  }, [])

  const resumeTimer = useCallback(() => {
    setTimerState(prev => ({
      ...prev,
      isActive: true,
    }))
  }, [])

  const tick = useCallback(() => {
    setTimerState(prev => {
      if (!prev.isActive || prev.remainingSeconds <= 0) {
        return prev
      }
      return {
        ...prev,
        remainingSeconds: prev.remainingSeconds - 1,
      }
    })
  }, [])

  // Timer interval effect
  useEffect(() => {
    if (timerState.isActive && timerState.remainingSeconds > 0) {
      timerIntervalRef.current = setInterval(() => {
        tick()
      }, 1000)

      return () => {
        if (timerIntervalRef.current) {
          clearInterval(timerIntervalRef.current)
        }
      }
    }

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current)
      }
    }
  }, [timerState.isActive, timerState.remainingSeconds, tick])

  // ========================================================================
  // Exam Lifecycle
  // ========================================================================

  const finishExam = useCallback(() => {
    pauseTimer()
    // In a real app, would submit answers here
  }, [pauseTimer])

  // ========================================================================
  // Context Value
  // ========================================================================

  const contextValue: ExamContextValue = {
    exam,
    navigationState,
    answerMap,
    bookmarkedQuestions,
    timerState,
    getCurrentQuestion,
    getTotalQuestions,
    getCurrentQuestionNumber,
    nextQuestion,
    previousQuestion,
    jumpToQuestion,
    answerQuestion,
    getAnswer,
    toggleBookmark,
    isBookmarked,
    startTimer,
    pauseTimer,
    resumeTimer,
    tick,
    finishExam,
  }

  return <ExamContext.Provider value={contextValue}>{children}</ExamContext.Provider>
}
