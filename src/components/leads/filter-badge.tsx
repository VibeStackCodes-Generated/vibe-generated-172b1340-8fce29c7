/**
 * Filter Badge Component
 * Displays a clickable filter badge with optional remove button
 */

import { cn } from '@/utils/cn'

interface FilterBadgeProps {
  label: string
  selected?: boolean
  onClick?: () => void
  onRemove?: () => void
  variant?: 'source' | 'tag'
  size?: 'sm' | 'md'
}

const sourceColors: Record<string, string> = {
  web_form: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100',
  landing_page: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100',
  sms: 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100',
  email: 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100',
  manual: 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100',
}

const sourceColorsDark: Record<string, string> = {
  web_form: 'bg-blue-100 text-blue-800 border-blue-300',
  landing_page: 'bg-purple-100 text-purple-800 border-purple-300',
  sms: 'bg-green-100 text-green-800 border-green-300',
  email: 'bg-orange-100 text-orange-800 border-orange-300',
  manual: 'bg-gray-100 text-gray-800 border-gray-300',
}

export function FilterBadge({
  label,
  selected = false,
  onClick,
  onRemove,
  variant = 'tag',
  size = 'md',
}: FilterBadgeProps) {
  const getColor = () => {
    if (variant === 'source') {
      return selected ? sourceColorsDark[label] : sourceColors[label]
    }
    return selected
      ? 'bg-primary-100 text-primary-800 border-primary-300'
      : 'bg-neutral-100 text-neutral-700 border-neutral-200 hover:bg-neutral-150'
  }

  const sizeClasses = size === 'sm' ? 'text-xs px-2 py-1' : 'text-sm px-3 py-1.5'

  return (
    <button
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-2 rounded-full border transition-colors duration-200',
        sizeClasses,
        getColor(),
        onClick && 'cursor-pointer'
      )}
    >
      {variant === 'source' && (
        <span className="inline-block h-2 w-2 rounded-full bg-current opacity-60" />
      )}
      <span className="font-medium">{label}</span>
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
          }}
          className="ml-1 inline-flex items-center rounded hover:opacity-70"
          aria-label={`Remove ${label} filter`}
        >
          <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </button>
  )
}
