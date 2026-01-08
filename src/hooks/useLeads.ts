/**
 * Hook for managing lead list state, filtering, sorting, and pagination
 * Handles all logic for the lead list functionality
 */

import { useState, useMemo, useCallback } from 'react'
import { Lead, FilterState, SortState, SortField, SortDirection } from '@/types/lead'

const ITEMS_PER_PAGE = 10

interface UseLeadsOptions {
  initialLeads: Lead[]
}

export interface UseLeadsResult {
  // Data
  filteredLeads: Lead[]
  paginatedLeads: Lead[]
  totalLeads: number
  totalPages: number
  currentPage: number
  itemsPerPage: number

  // State
  searchQuery: string
  selectedSources: string[]
  selectedTags: string[]
  sortField: SortField
  sortDirection: SortDirection
  viewMode: 'table' | 'card'

  // Actions
  setSearchQuery: (query: string) => void
  toggleSource: (source: string) => void
  toggleTag: (tag: string) => void
  setSortField: (field: SortField) => void
  setSortDirection: (direction: SortDirection) => void
  setViewMode: (mode: 'table' | 'card') => void
  setCurrentPage: (page: number) => void
  clearFilters: () => void
  resetPagination: () => void
}

export function useLeads({ initialLeads }: UseLeadsOptions): UseLeadsResult {
  // Filter state
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSources, setSelectedSources] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  // Sort state
  const [sortField, setSortField] = useState<SortField>('createdAt')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')

  // View state
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table')

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)

  // Filter leads based on search, sources, and tags
  const filteredLeads = useMemo(() => {
    return initialLeads.filter((lead) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesSearch =
          lead.name.toLowerCase().includes(query) ||
          lead.email.toLowerCase().includes(query) ||
          lead.company.toLowerCase().includes(query) ||
          lead.phone.includes(query)

        if (!matchesSearch) return false
      }

      // Source filter
      if (selectedSources.length > 0 && !selectedSources.includes(lead.source)) {
        return false
      }

      // Tag filter - lead must have at least one selected tag
      if (selectedTags.length > 0) {
        const hasTag = selectedTags.some((tag) => lead.tags.includes(tag))
        if (!hasTag) return false
      }

      return true
    })
  }, [initialLeads, searchQuery, selectedSources, selectedTags])

  // Sort leads
  const sortedLeads = useMemo(() => {
    const sorted = [...filteredLeads]

    sorted.sort((a, b) => {
      let aVal: string | number
      let bVal: string | number

      switch (sortField) {
        case 'name':
          aVal = a.name.toLowerCase()
          bVal = b.name.toLowerCase()
          break
        case 'score':
          aVal = a.score
          bVal = b.score
          break
        case 'createdAt':
          aVal = a.createdAt.getTime()
          bVal = b.createdAt.getTime()
          break
        default:
          return 0
      }

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1
      return 0
    })

    return sorted
  }, [filteredLeads, sortField, sortDirection])

  // Paginate leads
  const paginatedLeads = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    return sortedLeads.slice(startIndex, endIndex)
  }, [sortedLeads, currentPage])

  const totalPages = Math.ceil(sortedLeads.length / ITEMS_PER_PAGE)

  // Toggle source filter
  const toggleSource = useCallback((source: string) => {
    setSelectedSources((prev) => {
      if (prev.includes(source)) {
        return prev.filter((s) => s !== source)
      } else {
        return [...prev, source]
      }
    })
    setCurrentPage(1) // Reset pagination when filtering
  }, [])

  // Toggle tag filter
  const toggleTag = useCallback((tag: string) => {
    setSelectedTags((prev) => {
      if (prev.includes(tag)) {
        return prev.filter((t) => t !== tag)
      } else {
        return [...prev, tag]
      }
    })
    setCurrentPage(1) // Reset pagination when filtering
  }, [])

  // Update search query
  const handleSetSearchQuery = useCallback((query: string) => {
    setSearchQuery(query)
    setCurrentPage(1) // Reset pagination when searching
  }, [])

  // Update sort field
  const handleSetSortField = useCallback((field: SortField) => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortField(field)
      setSortDirection('desc')
    }
  }, [sortField])

  // Clear all filters
  const clearFilters = useCallback(() => {
    setSearchQuery('')
    setSelectedSources([])
    setSelectedTags([])
    setCurrentPage(1)
  }, [])

  // Reset pagination
  const resetPagination = useCallback(() => {
    setCurrentPage(1)
  }, [])

  return {
    // Data
    filteredLeads,
    paginatedLeads,
    totalLeads: sortedLeads.length,
    totalPages,
    currentPage,
    itemsPerPage: ITEMS_PER_PAGE,

    // State
    searchQuery,
    selectedSources,
    selectedTags,
    sortField,
    sortDirection,
    viewMode,

    // Actions
    setSearchQuery: handleSetSearchQuery,
    toggleSource,
    toggleTag,
    setSortField: handleSetSortField,
    setSortDirection,
    setViewMode,
    setCurrentPage,
    clearFilters,
    resetPagination,
  }
}
