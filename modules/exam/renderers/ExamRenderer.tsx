'use client';

/**
 * Exam Renderer
 * Orchestrates exam rendering based on layout ID
 * Acts as a dispatcher that routes to the correct layout component
 */

import React from 'react';
import type { Exam } from '../types';
import { layoutRegistry } from '../registry';

interface ExamRendererProps {
  exam: Exam;
}

export function ExamRenderer({ exam }: ExamRendererProps) {
  const layoutId = exam.layout.id;
  const LayoutComponent = layoutRegistry.get(layoutId);

  if (!LayoutComponent) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Layout Not Found</h2>
          <p className="text-muted-foreground">
            The layout &quot;{layoutId}&quot; is not registered. Available layouts:
          </p>
          <ul className="mt-4 text-sm text-muted-foreground">
            {Object.keys(layoutRegistry.getAll()).map(id => (
              <li key={id} className="font-mono">{id}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return <LayoutComponent exam={exam} />;
}
