"use client";

import { createContext, useContext, useReducer, useCallback, useRef, useEffect } from "react";
import type { AnyTest } from "../types";

// ─── State ────────────────────────────────────────────────────────────────────

export interface ExamState {
  test: AnyTest;
  currentPartIndex: number;
  currentQuestionIndex: number;
  answers: Record<string, string | string[]>;
  bookmarks: Set<string>;
  timeRemainingSeconds: number;
  isFinished: boolean;
}

// ─── Actions ──────────────────────────────────────────────────────────────────

type ExamAction =
  | { type: "SET_ANSWER"; questionId: string; answer: string | string[] }
  | { type: "TOGGLE_BOOKMARK"; questionId: string }
  | { type: "SET_PART"; partIndex: number }
  | { type: "SET_QUESTION"; questionIndex: number }
  | { type: "NEXT_QUESTION" }
  | { type: "PREV_QUESTION" }
  | { type: "NEXT_PART" }
  | { type: "PREV_PART" }
  | { type: "TICK" }
  | { type: "FINISH" };

// ─── Reducer ──────────────────────────────────────────────────────────────────

function examReducer(state: ExamState, action: ExamAction): ExamState {
  switch (action.type) {
    case "SET_ANSWER":
      return {
        ...state,
        answers: { ...state.answers, [action.questionId]: action.answer },
      };
    case "TOGGLE_BOOKMARK": {
      const next = new Set(state.bookmarks);
      if (next.has(action.questionId)) next.delete(action.questionId);
      else next.add(action.questionId);
      return { ...state, bookmarks: next };
    }
    case "SET_PART":
      return {
        ...state,
        currentPartIndex: action.partIndex,
        currentQuestionIndex: 0,
      };
    case "SET_QUESTION":
      return { ...state, currentQuestionIndex: action.questionIndex };
    case "NEXT_QUESTION":
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
      };
    case "PREV_QUESTION":
      return {
        ...state,
        currentQuestionIndex: Math.max(0, state.currentQuestionIndex - 1),
      };
    case "NEXT_PART":
      return {
        ...state,
        currentPartIndex: state.currentPartIndex + 1,
        currentQuestionIndex: 0,
      };
    case "PREV_PART":
      return {
        ...state,
        currentPartIndex: Math.max(0, state.currentPartIndex - 1),
        currentQuestionIndex: 0,
      };
    case "TICK":
      if (state.timeRemainingSeconds <= 0) return { ...state, isFinished: true };
      return { ...state, timeRemainingSeconds: state.timeRemainingSeconds - 1 };
    case "FINISH":
      return { ...state, isFinished: true };
    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface ExamContextValue {
  state: ExamState;
  setAnswer: (questionId: string, answer: string | string[]) => void;
  toggleBookmark: (questionId: string) => void;
  setPart: (partIndex: number) => void;
  setQuestion: (questionIndex: number) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  nextPart: () => void;
  prevPart: () => void;
  finish: () => void;
}

import React from "react";

export const ExamContext = createContext<ExamContextValue | null>(null);

export function useExam() {
  const ctx = useContext(ExamContext);
  if (!ctx) throw new Error("useExam must be used within ExamProvider");
  return ctx;
}

// ─── Provider component ───────────────────────────────────────────────────────

interface ExamProviderProps {
  test: AnyTest;
  children: React.ReactNode;
  onFinish?: () => void;
}

export function ExamProvider({ test, children, onFinish }: ExamProviderProps) {
  const [state, dispatch] = useReducer(examReducer, {
    test,
    currentPartIndex: 0,
    currentQuestionIndex: 0,
    answers: {},
    bookmarks: new Set<string>(),
    timeRemainingSeconds: test.duration_minutes * 60,
    isFinished: false,
  });

  // Timer
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    timerRef.current = setInterval(() => {
      dispatch({ type: "TICK" });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (state.isFinished) {
      if (timerRef.current) clearInterval(timerRef.current);
      onFinish?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.isFinished]);

  const setAnswer = useCallback((questionId: string, answer: string | string[]) => {
    dispatch({ type: "SET_ANSWER", questionId, answer });
  }, []);
  const toggleBookmark = useCallback((questionId: string) => {
    dispatch({ type: "TOGGLE_BOOKMARK", questionId });
  }, []);
  const setPart = useCallback((partIndex: number) => {
    dispatch({ type: "SET_PART", partIndex });
  }, []);
  const setQuestion = useCallback((questionIndex: number) => {
    dispatch({ type: "SET_QUESTION", questionIndex });
  }, []);
  const nextQuestion = useCallback(() => dispatch({ type: "NEXT_QUESTION" }), []);
  const prevQuestion = useCallback(() => dispatch({ type: "PREV_QUESTION" }), []);
  const nextPart = useCallback(() => dispatch({ type: "NEXT_PART" }), []);
  const prevPart = useCallback(() => dispatch({ type: "PREV_PART" }), []);
  const finish = useCallback(() => dispatch({ type: "FINISH" }), []);

  return (
    React.createElement(ExamContext.Provider, {
      value: {
        state,
        setAnswer,
        toggleBookmark,
        setPart,
        setQuestion,
        nextQuestion,
        prevQuestion,
        nextPart,
        prevPart,
        finish,
      },
      children,
    })
  );
}
