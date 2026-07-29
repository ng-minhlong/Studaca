/**
 * Test Page
 * Displays exam interface for taking tests
 */

import React from 'react';
import { getMockExam, ExamRenderer, ExamProvider } from '@/modules/exam';

interface TestPageProps {
  params: Promise<{ id: string }>;
}

export default async function TestPage({ params }: TestPageProps) {
  const { id } = await params;
  
  try {
    const exam = await getMockExam(id);
    
    return (
      <ExamProvider exam={exam}>
        <ExamRenderer exam={exam} />
      </ExamProvider>
    );
  } catch (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Exam Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The exam with ID &quot;{id}&quot; could not be found.
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

export async function generateMetadata({ params }: TestPageProps) {
  const { id } = await params;
  return {
    title: `${id} - Exam Engine`,
    description: 'Take the exam',
  };
}
