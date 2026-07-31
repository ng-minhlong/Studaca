"use client";

import type { AnyPractice } from "../types";
import { DictationLayout } from "../layouts/DictationLayout";
import { ShadowingLayout } from "../layouts/ShadowingLayout";

interface PracticeRendererProps {
  practice: AnyPractice;
}

export function PracticeRenderer({ practice }: PracticeRendererProps) {
  switch (practice.layout) {
    case "dictation_layout":
      return <DictationLayout />;
    case "shadowing_layout":
      return <ShadowingLayout />;
    default:
      return null;
  }
}
