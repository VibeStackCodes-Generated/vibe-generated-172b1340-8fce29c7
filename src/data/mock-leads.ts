/**
 * Mock leads data for development and testing
 * Provides realistic sample data for the leads list
 */

import { Lead } from '@/types/lead'

export const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '(555) 123-4567',
    company: 'Tech Startup Inc',
    source: 'web_form',
    status: 'new',
    score: 85,
    tags: ['high-priority', 'enterprise'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-18'),
    notes: 'Interested in booking a demo',
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    phone: '(555) 234-5678',
    company: 'Digital Solutions LLC',
    source: 'landing_page',
    status: 'contacted',
    score: 72,
    tags: ['smb', 'marketing'],
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-17'),
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.r@example.com',
    phone: '(555) 345-6789',
    company: 'Growth Marketing Co',
    source: 'sms',
    status: 'qualified',
    score: 92,
    tags: ['hot-lead', 'enterprise', 'urgent'],
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-18'),
    notes: 'Ready to schedule call',
  },
  {
    id: '4',
    name: 'David Kim',
    email: 'dkim@example.com',
    phone: '(555) 456-7890',
    company: 'Finance Partners',
    source: 'email',
    status: 'new',
    score: 58,
    tags: ['finance', 'mid-market'],
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-16'),
  },
  {
    id: '5',
    name: 'Jessica Martinez',
    email: 'jmartinez@example.com',
    phone: '(555) 567-8901',
    company: 'Consulting Plus',
    source: 'manual',
    status: 'booked',
    score: 88,
    tags: ['booked', 'enterprise', 'consulting'],
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-17'),
    notes: 'Meeting scheduled for Jan 25',
  },
  {
    id: '6',
    name: 'Robert Thompson',
    email: 'rthompson@example.com',
    phone: '(555) 678-9012',
    company: 'Innovation Labs',
    source: 'web_form',
    status: 'contacted',
    score: 65,
    tags: ['tech', 'startup'],
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-18'),
  },
  {
    id: '7',
    name: 'Amanda Wilson',
    email: 'amandaw@example.com',
    phone: '(555) 789-0123',
    company: 'Retail Solutions',
    source: 'landing_page',
    status: 'new',
    score: 45,
    tags: ['retail', 'follow-up'],
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-18'),
  },
  {
    id: '8',
    name: 'Christopher Davis',
    email: 'cdavis@example.com',
    phone: '(555) 890-1234',
    company: 'Healthcare Plus',
    source: 'sms',
    status: 'qualified',
    score: 79,
    tags: ['healthcare', 'qualified', 'priority'],
    createdAt: new Date('2024-01-11'),
    updatedAt: new Date('2024-01-17'),
  },
  {
    id: '9',
    name: 'Natalie Brown',
    email: 'nbrown@example.com',
    phone: '(555) 901-2345',
    company: 'Education Corp',
    source: 'email',
    status: 'new',
    score: 52,
    tags: ['education', 'new'],
    createdAt: new Date('2024-01-13'),
    updatedAt: new Date('2024-01-18'),
  },
  {
    id: '10',
    name: 'Kevin Lee',
    email: 'klee@example.com',
    phone: '(555) 012-3456',
    company: 'Manufacturing Pro',
    source: 'manual',
    status: 'paid',
    score: 95,
    tags: ['paid', 'enterprise', 'long-term'],
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-15'),
    notes: 'Active customer',
  },
]

/**
 * Get all unique sources from leads
 */
export function getUniqueSources(leads: Lead[]): string[] {
  const sources = new Set(leads.map((l) => l.source))
  return Array.from(sources).sort()
}

/**
 * Get all unique tags from leads
 */
export function getUniqueTags(leads: Lead[]): string[] {
  const tags = new Set<string>()
  leads.forEach((l) => {
    l.tags.forEach((t) => tags.add(t))
  })
  return Array.from(tags).sort()
}
