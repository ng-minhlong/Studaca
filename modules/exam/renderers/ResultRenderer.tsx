'use client';

/**
 * Result Renderer
 * Orchestrates result rendering based on result layout ID
 */

import React from 'react';
import type { Result } from '../types';
import { resultLayoutRegistry } from '../registry';

interface ResultRendererProps {
  result: Result;
}

export function ResultRenderer({ result }: ResultRendererProps) {
  const layoutId = result.resultLayout.id;
  const LayoutComponent = resultLayoutRegistry.get(layoutId);

  if (!LayoutComponent) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Result Layout Not Found</h2>
          <p className="text-muted-foreground">
            The result layout &quot;{layoutId}&quot; is not registered.
          </p>
          <ul className="mt-4 text-sm text-muted-foreground">
            {Object.keys(resultLayoutRegistry.getAll()).map(id => (
              <li key={id} className="font-mono">{id}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return <LayoutComponent result={result} />;
}
