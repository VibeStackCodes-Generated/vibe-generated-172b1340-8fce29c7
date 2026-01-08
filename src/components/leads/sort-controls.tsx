/**
 * Sort Controls Component
 * Provides sorting options and direction toggle
 */

import { SortField, SortDirection } from '@/types/lead'
import { cn } from '@/utils/cn'

interface SortControlsProps {
  currentField: SortField
  currentDirection: SortDirection
  onFieldChange: (field: SortField) => void
  onDirectionToggle: () => void
}

const sortOptions: Array<{ value: SortField; label: string }> = [
  { value: 'createdAt', label: 'Date Created' },
  { value: 'name', label: 'Name' },
  { value: 'score', label: 'Score' },
]

export function SortControls({
  currentField,
  currentDirection,
  onFieldChange,
  onDirectionToggle,
}: SortControlsProps) {
  return (
    <div className="flex items-center gap-3">
      {/* Sort Field Select */}
      <div className="flex items-center gap-2">
        <label htmlFor="sort-field" className="text-sm font-medium text-neutral-700">
          Sort by:
        </label>
        <select
          id="sort-field"
          value={currentField}
          onChange={(e) => onFieldChange(e.target.value as SortField)}
          className={cn(
            'rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900',
            'transition-colors duration-200',
            'focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100',
            'hover:border-neutral-300'
          )}
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Sort Direction Button */}
      <button
        onClick={onDirectionToggle}
        className={cn(
          'flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-2',
          'text-sm font-medium text-neutral-700',
          'transition-colors duration-200 hover:border-neutral-300 hover:bg-neutral-50',
          'focus:outline-none focus:ring-2 focus:ring-primary-100'
        )}
        title={`Sort ${currentDirection === 'asc' ? 'descending' : 'ascending'}`}
      >
        {currentDirection === 'asc' ? (
          <>
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h9a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h3a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>A-Z</span>
          </>
        ) : (
          <>
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>Z-A</span>
          </>
        )}
      </button>
    </div>
  )
}
