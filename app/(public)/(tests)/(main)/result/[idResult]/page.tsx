/**
 * Result Page
 * Displays exam results after completion
 */

import React from 'react';
import { getMockResult, ResultRenderer, ResultProvider, getMockExam } from '@/modules/exam';

interface ResultPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ answers?: string }>;
}

export default async function ResultPage({ params, searchParams }: ResultPageProps) {
  const { id } = await params;
  const { answers: answersParam } = await searchParams;

  try {
    // Parse answers from query param (demo only)
    const mockAnswers = answersParam 
      ? JSON.parse(decodeURIComponent(answersParam))
      : {};

    const exam = await getMockExam(id);
    const result = await getMockResult(id, mockAnswers);

    return (
      <ResultProvider result={result}>
        <ResultRenderer result={result} />
      </ResultProvider>
    );
  } catch (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Result Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The result with ID &quot;{id}&quot; could not be found.
          </p>
          <a
            href="/"
            className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }
}

export async function generateMetadata({ params }: ResultPageProps) {
  const { id } = await params;
  return {
    title: `Results - ${id}`,
    description: 'View your exam results',
  };
}
