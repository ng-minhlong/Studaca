'use client';

/**
 * useResult Hook
 * Access result context
 */

import { useContext } from 'react';
import { ResultContext } from './ResultContext';

export function useResult() {
  const context = useContext(ResultContext);
  if (!context) {
    throw new Error('useResult must be used within ResultProvider');
  }
  return context;
}
