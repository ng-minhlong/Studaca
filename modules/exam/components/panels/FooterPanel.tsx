import React from 'react'

interface FooterPanelProps {
  content?: React.ReactNode
  children?: React.ReactNode
}

/**
 * FooterPanel
 * 
 * Generic footer panel for additional exam information or controls.
 */
export function FooterPanel({ content, children }: FooterPanelProps) {
  return (
    <footer className="border-t border-gray-200 bg-white px-6 py-4">
      <div className="max-w-5xl mx-auto">
        {children || content}
      </div>
    </footer>
  )
}
