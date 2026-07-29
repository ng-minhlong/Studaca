import type { Metadata, Viewport } from 'next'
import '../../../globals.css'
import { ExamModuleProvider } from './providers'


export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ExamModuleProvider>
          {children}
        </ExamModuleProvider>
      </body>
    </html>
  )
}
