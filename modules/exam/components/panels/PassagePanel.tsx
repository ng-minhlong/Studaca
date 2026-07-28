import React from 'react'

interface PassagePanelProps {
  passage: string
  title?: string
}

/**
 * PassagePanel
 * 
 * Displays reading material/passage for reading comprehension questions.
 */
export function PassagePanel({ passage, title }: PassagePanelProps) {
  return (
    <div className="border-r border-gray-200 bg-gray-50 p-6 overflow-y-auto">
      <div className="max-w-2xl">
        {title && <h2 className="text-lg font-semibold text-gray-900 mb-4">{title}</h2>}
        <div className="prose prose-sm max-w-none">
          <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{passage}</p>
        </div>
      </div>
    </div>
  )
}
