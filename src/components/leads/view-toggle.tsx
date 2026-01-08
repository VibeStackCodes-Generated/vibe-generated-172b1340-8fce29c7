/**
 * View Toggle Component
 * Allows switching between table and card views
 */

import { cn } from '@/utils/cn'

interface ViewToggleProps {
  view: 'table' | 'card'
  onChange: (view: 'table' | 'card') => void
}

export function ViewToggle({ view, onChange }: ViewToggleProps) {
  return (
    <div className="inline-flex items-center gap-1 rounded-lg border border-neutral-200 bg-white p-1">
      <button
        onClick={() => onChange('table')}
        className={cn(
          'inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200',
          view === 'table'
            ? 'bg-primary-50 text-primary-600'
            : 'text-neutral-600 hover:text-neutral-900'
        )}
        title="Table view"
      >
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6z" />
        </svg>
        <span className="hidden sm:inline">List</span>
      </button>

      <button
        onClick={() => onChange('card')}
        className={cn(
          'inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200',
          view === 'card'
            ? 'bg-primary-50 text-primary-600'
            : 'text-neutral-600 hover:text-neutral-900'
        )}
        title="Card view"
      >
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
        </svg>
        <span className="hidden sm:inline">Cards</span>
      </button>
    </div>
  )
}
