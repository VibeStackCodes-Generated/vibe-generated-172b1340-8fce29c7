/**
 * Lead Card Component
 * Individual lead card for card view display
 */

import { Lead } from '@/types/lead'
import { FilterBadge } from './filter-badge'
import { cn } from '@/utils/cn'

interface LeadCardProps {
  lead: Lead
}

const statusColors: Record<Lead['status'], { bg: string; text: string }> = {
  new: { bg: 'bg-blue-50', text: 'text-blue-700' },
  contacted: { bg: 'bg-purple-50', text: 'text-purple-700' },
  qualified: { bg: 'bg-green-50', text: 'text-green-700' },
  booked: { bg: 'bg-orange-50', text: 'text-orange-700' },
  paid: { bg: 'bg-emerald-50', text: 'text-emerald-700' },
}

const scoreColors: Record<string, string> = {
  high: 'text-green-600 bg-green-50',
  medium: 'text-yellow-600 bg-yellow-50',
  low: 'text-red-600 bg-red-50',
}

function getScoreColor(score: number): string {
  if (score >= 80) return scoreColors.high
  if (score >= 60) return scoreColors.medium
  return scoreColors.low
}

export function LeadCard({ lead }: LeadCardProps) {
  const status = statusColors[lead.status]

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white transition-all duration-200 hover:border-primary-300 hover:shadow-md">
      {/* Header */}
      <div className={cn('px-4 py-3', status.bg)}>
        <div className="flex items-center justify-between">
          <div>
            <a
              href="#"
              className="text-base font-semibold text-neutral-900 hover:text-primary-600 transition-colors"
            >
              {lead.name}
            </a>
            <p className="text-sm text-neutral-600">{lead.company}</p>
          </div>
          <span
            className={cn(
              'inline-flex items-center rounded-lg border border-current px-2.5 py-1 text-xs font-medium',
              status.text
            )}
          >
            {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-4 px-4 py-4">
        {/* Contact Info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <svg className="h-4 w-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <a href={`mailto:${lead.email}`} className="hover:text-primary-600 transition-colors">
              {lead.email}
            </a>
          </div>
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <svg className="h-4 w-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 00.948-.684l1.498-4.493a1 1 0 011.502-.684l1.498 4.493a1 1 0 00.948.684H19a2 2 0 012 2v2M3 5v12a2 2 0 002 2h14a2 2 0 002-2V5m-5 10a5 5 0 11-10 0 5 5 0 0110 0z"
              />
            </svg>
            <a href={`tel:${lead.phone}`} className="hover:text-primary-600 transition-colors">
              {lead.phone}
            </a>
          </div>
        </div>

        {/* Score */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase text-neutral-600">Qualification Score</p>
            <span className={cn('text-sm font-bold', getScoreColor(lead.score))}>
              {lead.score}
            </span>
          </div>
          <div className="h-2 rounded-full bg-neutral-200">
            <div
              className={cn(
                'h-full rounded-full transition-all duration-300',
                lead.score >= 80 ? 'bg-green-500' :
                lead.score >= 60 ? 'bg-yellow-500' :
                'bg-red-500'
              )}
              style={{ width: `${lead.score}%` }}
            />
          </div>
        </div>

        {/* Source Badge */}
        <div>
          <p className="mb-2 text-xs font-semibold uppercase text-neutral-600">Source</p>
          <FilterBadge
            label={lead.source.replace(/_/g, ' ')}
            variant="source"
            size="sm"
          />
        </div>

        {/* Tags */}
        {lead.tags.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-semibold uppercase text-neutral-600">Tags</p>
            <div className="flex flex-wrap gap-1.5">
              {lead.tags.map((tag) => (
                <FilterBadge key={tag} label={tag} variant="tag" size="sm" />
              ))}
            </div>
          </div>
        )}

        {/* Dates */}
        <div className="border-t border-neutral-200 pt-3 text-xs text-neutral-500">
          <p>
            Added {lead.createdAt.toLocaleDateString()} •{' '}
            {Math.floor((Date.now() - lead.createdAt.getTime()) / (1000 * 60 * 60 * 24))} days ago
          </p>
        </div>
      </div>
    </div>
  )
}
