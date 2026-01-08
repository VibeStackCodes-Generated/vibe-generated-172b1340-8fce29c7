import { ReactNode } from 'react'
import { Header } from './header'

interface LayoutProps {
  children: ReactNode
}

/**
 * Main Layout Component
 * Provides consistent layout structure with header and responsive container
 * Features:
 * - Sticky header at top
 * - Responsive max-width container
 * - Proper padding and spacing on all screen sizes
 * - Flexible content area that adapts to viewport
 */
export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header/Navigation - sticky at top */}
      <Header />

      {/* Main content area - flex-grow to fill space */}
      <main className="flex flex-1 flex-col">
        {/* Responsive container with max-width */}
        <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>

      {/* Optional Footer placeholder for future expansion */}
      <footer className="border-t border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-neutral-600 sm:px-6 lg:px-8">
          <p>&copy; 2024 ConvertFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
