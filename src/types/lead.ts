/**
 * Lead type definitions
 * Defines the structure of a lead in the ConvertFlow system
 */

export interface Lead {
  id: string
  name: string
  email: string
  phone: string
  company: string
  source: 'web_form' | 'landing_page' | 'sms' | 'email' | 'manual'
  status: 'new' | 'contacted' | 'qualified' | 'booked' | 'paid'
  score: number
  tags: string[]
  createdAt: Date
  updatedAt: Date
  notes?: string
}

export type SortField = 'name' | 'createdAt' | 'score'
export type SortDirection = 'asc' | 'desc'

export interface FilterState {
  searchQuery: string
  sources: string[]
  tags: string[]
  scoreRange: [number, number]
}

export interface SortState {
  field: SortField
  direction: SortDirection
}
