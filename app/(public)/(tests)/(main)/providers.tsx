'use client';

import React, { useEffect, useState } from 'react';
import { initializeExamModule } from '@/modules/exam';

// Initialize module immediately on import
initializeExamModule();

export function ExamModuleProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(true);

  useEffect(() => {
    // Ensure it's initialized
    initializeExamModule();
    setIsReady(true);
  }, []);

  return <>{isReady && children}</>;
}
