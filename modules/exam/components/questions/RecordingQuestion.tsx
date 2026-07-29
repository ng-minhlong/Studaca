'use client';

import React, { useState } from 'react';
import type { Answer } from '../../types';

interface RecordingQuestionProps {
  question: any;
  selectedAnswer?: Answer;
  onAnswer: (answer: Answer) => void;
}

export function RecordingQuestion({ question, selectedAnswer, onAnswer }: RecordingQuestionProps) {
  const audioUrl = selectedAnswer?.type === 'Recording' ? selectedAnswer.audioUrl : null;
  const [isRecording, setIsRecording] = useState(false);

  const handleRecord = () => {
    setIsRecording(!isRecording);
    // In a real app, this would integrate with the Web Audio API
    if (!isRecording) {
      // Simulate recording completion
      onAnswer({
        type: 'Recording',
        audioUrl: 'https://example.com/audio/recording.wav',
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="p-4 bg-muted rounded-lg">
        <p className="text-foreground">{question.text}</p>
      </div>

      <div className="flex flex-col gap-4">
        <button
          onClick={handleRecord}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
            isRecording
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : 'bg-primary hover:bg-primary/90 text-primary-foreground'
          }`}
        >
          {isRecording ? '⏹ Stop Recording' : '🎤 Start Recording'}
        </button>

        {audioUrl && (
          <div className="p-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
            <p className="text-sm text-green-700 dark:text-green-200 font-medium">
              ✓ Recording saved
            </p>
            <audio
              src={audioUrl}
              controls
              className="w-full mt-2 h-8"
            />
          </div>
        )}

        <p className="text-xs text-muted-foreground">
          Speak clearly and naturally. You will have 1-2 minutes to respond.
        </p>
      </div>
    </div>
  );
}
