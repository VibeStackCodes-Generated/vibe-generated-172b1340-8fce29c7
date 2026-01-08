/**
 * Pagination Controls Component
 * Provides navigation between pages and page info display
 */

import { cn } from '@/utils/cn'

interface PaginationControlsProps {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  onPageChange: (page: number) => void
}

export function PaginationControls({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationControlsProps) {
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  const canGoPrev = currentPage > 1
  const canGoNext = currentPage < totalPages

  return (
    <div className="flex items-center justify-between gap-4">
      {/* Info */}
      <div className="text-sm text-neutral-600">
        Showing <span className="font-medium">{startItem}</span> to{' '}
        <span className="font-medium">{endItem}</span> of <span className="font-medium">{totalItems}</span> leads
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!canGoPrev}
          className={cn(
            'inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium',
            'transition-colors duration-200',
            canGoPrev
              ? 'border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300'
              : 'border-neutral-100 bg-neutral-50 text-neutral-400 cursor-not-allowed'
          )}
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>

        {/* Page Info */}
        <div className="px-3 py-2 text-sm text-neutral-700 font-medium">
          Page <span className="text-primary-600">{currentPage}</span> of <span className="text-primary-600">{totalPages}</span>
        </div>

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!canGoNext}
          className={cn(
            'inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium',
            'transition-colors duration-200',
            canGoNext
              ? 'border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300'
              : 'border-neutral-100 bg-neutral-50 text-neutral-400 cursor-not-allowed'
          )}
        >
          Next
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}
