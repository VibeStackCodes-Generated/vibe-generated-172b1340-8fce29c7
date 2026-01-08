/**
 * Main Lead List Component
 * Combines all lead list features: search, filter, sort, pagination, and view toggle
 */

import { useState, useEffect } from 'react'
import { Lead } from '@/types/lead'
import { useLeads } from '@/hooks/useLeads'
import { LeadSearchBar } from './lead-search-bar'
import { LeadFilters } from './lead-filters'
import { SortControls } from './sort-controls'
import { ViewToggle } from './view-toggle'
import { LeadTable } from './lead-table'
import { LeadCard } from './lead-card'
import { PaginationControls } from './pagination-controls'
import { FilterBadge } from './filter-badge'
import { cn } from '@/utils/cn'

interface LeadListProps {
  leads: Lead[]
}

export function LeadList({ leads }: LeadListProps) {
  const [showFilters, setShowFilters] = useState(true)
  const leads_state = useLeads({ initialLeads: leads })

  // Reset pagination when filters change
  useEffect(() => {
    leads_state.resetPagination()
  }, [leads_state.searchQuery, leads_state.selectedSources, leads_state.selectedTags])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-neutral-900">Leads</h1>
        <p className="mt-1 text-neutral-600">
          Manage and qualify your leads. {leads_state.totalLeads} total
        </p>
      </div>

      {/* Search Bar */}
      <LeadSearchBar value={leads_state.searchQuery} onChange={leads_state.setSearchQuery} />

      {/* Active Filters Display */}
      {(leads_state.selectedSources.length > 0 || leads_state.selectedTags.length > 0) && (
        <div className="flex flex-wrap gap-2">
          {leads_state.selectedSources.map((source) => (
            <FilterBadge
              key={source}
              label={source.replace(/_/g, ' ')}
              onRemove={() => leads_state.toggleSource(source)}
              variant="source"
            />
          ))}
          {leads_state.selectedTags.map((tag) => (
            <FilterBadge
              key={tag}
              label={tag}
              onRemove={() => leads_state.toggleTag(tag)}
              variant="tag"
            />
          ))}
        </div>
      )}

      {/* Main Content Area */}
      <div className="grid gap-6 lg:grid-cols-4">
        {/* Sidebar Filters - Hidden on mobile, shown on lg+ */}
        {showFilters && (
          <div className="hidden lg:block">
            <LeadFilters
              leads={leads}
              selectedSources={leads_state.selectedSources}
              selectedTags={leads_state.selectedTags}
              onSourceToggle={leads_state.toggleSource}
              onTagToggle={leads_state.toggleTag}
              onClearAll={leads_state.clearFilters}
            />
          </div>
        )}

        {/* Main Content */}
        <div className={cn('space-y-6', showFilters ? 'lg:col-span-3' : 'lg:col-span-4')}>
          {/* Controls Bar */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={cn(
                  'inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium',
                  'transition-colors duration-200 lg:hidden',
                  'border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50'
                )}
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8v-2m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6-8v-2m0 2a2 2 0 100 4m0-4a2 2 0 110 4"
                  />
                </svg>
                Filters
              </button>

              <SortControls
                currentField={leads_state.sortField}
                currentDirection={leads_state.sortDirection}
                onFieldChange={leads_state.setSortField}
                onDirectionToggle={() =>
                  leads_state.setSortDirection(
                    leads_state.sortDirection === 'asc' ? 'desc' : 'asc'
                  )
                }
              />
            </div>

            <ViewToggle view={leads_state.viewMode} onChange={leads_state.setViewMode} />
          </div>

          {/* Mobile Filters - Shown when toggled on mobile */}
          {showFilters && (
            <div className="lg:hidden">
              <LeadFilters
                leads={leads}
                selectedSources={leads_state.selectedSources}
                selectedTags={leads_state.selectedTags}
                onSourceToggle={leads_state.toggleSource}
                onTagToggle={leads_state.toggleTag}
                onClearAll={leads_state.clearFilters}
              />
            </div>
          )}

          {/* Content View */}
          {leads_state.viewMode === 'table' ? (
            <LeadTable leads={leads_state.paginatedLeads} />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
              {leads_state.paginatedLeads.length > 0 ? (
                leads_state.paginatedLeads.map((lead) => <LeadCard key={lead.id} lead={lead} />)
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-12">
                  <svg
                    className="mb-3 h-12 w-12 text-neutral-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M20 21l-4.35-4.35m0 0A7.465 7.465 0 005.655 3.655m14.69 14.69A7.465 7.465 0 013.655 5.655m14.69 14.69l-4.35-4.35"
                    />
                  </svg>
                  <p className="text-neutral-600">No leads found</p>
                  <p className="text-sm text-neutral-500">
                    Try adjusting your filters or search query
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Pagination */}
          {leads_state.totalPages > 0 && (
            <div className="border-t border-neutral-200 pt-6">
              <PaginationControls
                currentPage={leads_state.currentPage}
                totalPages={leads_state.totalPages}
                totalItems={leads_state.totalLeads}
                itemsPerPage={leads_state.itemsPerPage}
                onPageChange={leads_state.setCurrentPage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
