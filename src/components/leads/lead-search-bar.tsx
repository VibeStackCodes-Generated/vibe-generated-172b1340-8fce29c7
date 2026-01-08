/**
 * Lead Search Bar Component
 * Provides search functionality for leads by name, email, company, or phone
 */

import { cn } from '@/utils/cn'

interface LeadSearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function LeadSearchBar({
  value,
  onChange,
  placeholder = 'Search by name, email, company, or phone...',
}: LeadSearchBarProps) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <svg
          className="h-5 w-5 text-neutral-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'block w-full rounded-lg border border-neutral-200 bg-white py-2.5 pl-10 pr-4',
          'text-sm text-neutral-900 placeholder-neutral-500',
          'transition-colors duration-200',
          'focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100',
          'disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:text-neutral-500'
        )}
      />

      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-400 hover:text-neutral-600"
          aria-label="Clear search"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>
  )
}
