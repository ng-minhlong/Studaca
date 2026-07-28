import React from 'react'

interface AudioPanelProps {
  audioUrl?: string
  title?: string
}

/**
 * AudioPanel
 * 
 * Placeholder for audio player in listening exams.
 * Can be replaced with actual audio player implementation.
 */
export function AudioPanel({ audioUrl, title = 'Audio' }: AudioPanelProps) {
  return (
    <div className="border-b border-gray-200 bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <h3 className="font-semibold text-gray-900 mb-4">{title}</h3>
        <div className="flex items-center gap-4">
          <div className="bg-gray-300 rounded-lg p-4 flex-1">
            {audioUrl ? (
              <audio controls className="w-full">
                <source src={audioUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            ) : (
              <div className="text-center py-8 text-gray-600">
                <div className="text-4xl mb-2">🔊</div>
                <p className="text-sm">Audio player placeholder</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
