import React from 'react'

interface HeaderPanelProps {
  title: string
  subtitle?: string
  rightContent?: React.ReactNode
}

/**
 * HeaderPanel
 * 
 * Reusable header for exam layouts.
 * Contains exam title and optional right-aligned content (like timer).
 */
export function HeaderPanel({ title, subtitle, rightContent }: HeaderPanelProps) {
  return (
    <header className="border-b border-gray-200 bg-white px-6 py-4 flex items-center justify-between">
      <div className="flex-1">
        <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-gray-600">{subtitle}</p>}
      </div>
      {rightContent && <div className="flex-shrink-0">{rightContent}</div>}
    </header>
  )
}
