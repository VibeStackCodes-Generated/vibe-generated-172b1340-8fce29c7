/**
 * Lead Filters Component
 * Displays filter options for sources and tags with toggle functionality
 */

import { useState } from 'react'
import { Lead } from '@/types/lead'
import { FilterBadge } from './filter-badge'
import { cn } from '@/utils/cn'
import { getUniqueSources, getUniqueTags } from '@/data/mock-leads'

interface LeadFiltersProps {
  leads: Lead[]
  selectedSources: string[]
  selectedTags: string[]
  onSourceToggle: (source: string) => void
  onTagToggle: (tag: string) => void
  onClearAll?: () => void
}

export function LeadFilters({
  leads,
  selectedSources,
  selectedTags,
  onSourceToggle,
  onTagToggle,
  onClearAll,
}: LeadFiltersProps) {
  const [expandedSections, setExpandedSections] = useState({
    sources: true,
    tags: true,
  })

  const sources = getUniqueSources(leads)
  const tags = getUniqueTags(leads)

  const toggleSection = (section: 'sources' | 'tags') => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const hasActiveFilters = selectedSources.length > 0 || selectedTags.length > 0

  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-4">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-neutral-900">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={onClearAll}
            className="text-xs text-primary-600 hover:text-primary-700 transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Sources Filter */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('sources')}
          className="mb-2 flex w-full items-center justify-between text-left"
        >
          <span className="text-xs font-semibold uppercase text-neutral-600">Sources</span>
          <svg
            className={cn(
              'h-4 w-4 text-neutral-400 transition-transform duration-200',
              expandedSections.sources && 'rotate-180'
            )}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>

        {expandedSections.sources && (
          <div className="flex flex-wrap gap-2">
            {sources.map((source) => (
              <FilterBadge
                key={source}
                label={source.replace(/_/g, ' ')}
                selected={selectedSources.includes(source)}
                onClick={() => onSourceToggle(source)}
                variant="source"
                size="sm"
              />
            ))}
          </div>
        )}
      </div>

      {/* Tags Filter */}
      <div>
        <button
          onClick={() => toggleSection('tags')}
          className="mb-2 flex w-full items-center justify-between text-left"
        >
          <span className="text-xs font-semibold uppercase text-neutral-600">Tags</span>
          <svg
            className={cn(
              'h-4 w-4 text-neutral-400 transition-transform duration-200',
              expandedSections.tags && 'rotate-180'
            )}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>

        {expandedSections.tags && (
          <div className="flex flex-wrap gap-2">
            {tags.length > 0 ? (
              tags.map((tag) => (
                <FilterBadge
                  key={tag}
                  label={tag}
                  selected={selectedTags.includes(tag)}
                  onClick={() => onTagToggle(tag)}
                  variant="tag"
                  size="sm"
                />
              ))
            ) : (
              <p className="text-xs text-neutral-500">No tags available</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
