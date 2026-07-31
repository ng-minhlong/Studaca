"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useRef,
  useCallback,
} from "react";
import type {
  PracticeEngineState,
  PracticeEngineAction,
  AnyPractice,
} from "../types";

// ─── Reducer ──────────────────────────────────────────────────────────────────

function practiceReducer(
  state: PracticeEngineState,
  action: PracticeEngineAction
): PracticeEngineState {
  switch (action.type) {
    case "SET_DICTATION_ANSWER":
      return {
        ...state,
        dictationAnswers: {
          ...state.dictationAnswers,
          [action.sentenceId]: action.value,
        },
      };

    case "SET_SHADOWING_LISTENED":
      return {
        ...state,
        shadowingProgress: {
          ...state.shadowingProgress,
          [action.segmentId]: {
            ...state.shadowingProgress[action.segmentId],
            listened: true,
            recorded: state.shadowingProgress[action.segmentId]?.recorded ?? false,
          },
        },
      };

    case "SET_SHADOWING_RECORDED":
      return {
        ...state,
        shadowingProgress: {
          ...state.shadowingProgress,
          [action.segmentId]: {
            listened: state.shadowingProgress[action.segmentId]?.listened ?? false,
            recorded: true,
          },
        },
      };

    case "NEXT":
      return { ...state, currentIndex: state.currentIndex + 1 };

    case "PREV":
      return { ...state, currentIndex: Math.max(0, state.currentIndex - 1) };

    case "JUMP":
      return { ...state, currentIndex: action.index };

    case "FINISH":
      return { ...state, isFinished: true };

    case "TICK":
      return { ...state, elapsedSeconds: state.elapsedSeconds + 1 };

    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface PracticeContextValue {
  practice: AnyPractice;
  state: PracticeEngineState;
  dispatch: React.Dispatch<PracticeEngineAction>;
  totalItems: number;
  setDictationAnswer: (id: string, value: string) => void;
  markListened: (id: string) => void;
  markRecorded: (id: string) => void;
  next: () => void;
  prev: () => void;
  jump: (index: number) => void;
  finish: () => void;
}

const PracticeContext = createContext<PracticeContextValue | null>(null);

export function usePractice(): PracticeContextValue {
  const ctx = useContext(PracticeContext);
  if (!ctx) throw new Error("usePractice must be used inside PracticeProvider");
  return ctx;
}

// ─── Provider ─────────────────────────────────────────────────────────────────

interface PracticeProviderProps {
  practice: AnyPractice;
  children: React.ReactNode;
  onFinish?: () => void;
}

export function PracticeProvider({
  practice,
  children,
  onFinish,
}: PracticeProviderProps) {
  const totalItems =
    practice.type === "dictation"
      ? practice.sentences.length
      : practice.segments.length;

  const [state, dispatch] = useReducer(practiceReducer, {
    currentIndex: 0,
    dictationAnswers: {},
    shadowingProgress: {},
    isFinished: false,
    elapsedSeconds: 0,
  });

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => dispatch({ type: "TICK" }), 1000);
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

  const setDictationAnswer = useCallback(
    (id: string, value: string) =>
      dispatch({ type: "SET_DICTATION_ANSWER", sentenceId: id, value }),
    []
  );
  const markListened = useCallback(
    (id: string) => dispatch({ type: "SET_SHADOWING_LISTENED", segmentId: id }),
    []
  );
  const markRecorded = useCallback(
    (id: string) => dispatch({ type: "SET_SHADOWING_RECORDED", segmentId: id }),
    []
  );
  const next = useCallback(() => dispatch({ type: "NEXT" }), []);
  const prev = useCallback(() => dispatch({ type: "PREV" }), []);
  const jump = useCallback(
    (index: number) => dispatch({ type: "JUMP", index }),
    []
  );
  const finish = useCallback(() => dispatch({ type: "FINISH" }), []);

  return (
    <PracticeContext.Provider
      value={{
        practice,
        state,
        dispatch,
        totalItems,
        setDictationAnswer,
        markListened,
        markRecorded,
        next,
        prev,
        jump,
        finish,
      }}
    >
      {children}
    </PracticeContext.Provider>
  );
}
