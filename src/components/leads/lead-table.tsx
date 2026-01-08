/**
 * Lead Table Component
 * Displays leads in a table/grid format with status badges
 */

import { Lead } from '@/types/lead'
import { cn } from '@/utils/cn'

interface LeadTableProps {
  leads: Lead[]
  isLoading?: boolean
}

const statusColors: Record<Lead['status'], string> = {
  new: 'bg-blue-50 text-blue-700 border-blue-200',
  contacted: 'bg-purple-50 text-purple-700 border-purple-200',
  qualified: 'bg-green-50 text-green-700 border-green-200',
  booked: 'bg-orange-50 text-orange-700 border-orange-200',
  paid: 'bg-emerald-50 text-emerald-700 border-emerald-200',
}

const sourceColors: Record<string, string> = {
  web_form: 'text-blue-600',
  landing_page: 'text-purple-600',
  sms: 'text-green-600',
  email: 'text-orange-600',
  manual: 'text-gray-600',
}

export function LeadTable({ leads, isLoading = false }: LeadTableProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-neutral-600">Loading leads...</p>
      </div>
    )
  }

  if (leads.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <svg className="mb-3 h-12 w-12 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M20 21l-4.35-4.35m0 0A7.465 7.465 0 005.655 3.655m14.69 14.69A7.465 7.465 0 013.655 5.655m14.69 14.69l-4.35-4.35"
          />
        </svg>
        <p className="text-neutral-600">No leads found</p>
        <p className="text-sm text-neutral-500">Try adjusting your filters or search query</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-neutral-200">
      <table className="w-full">
        <thead className="bg-neutral-50">
          <tr className="border-b border-neutral-200">
            <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">
              Name
            </th>
            <th className="hidden px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider sm:table-cell">
              Company
            </th>
            <th className="hidden px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider md:table-cell">
              Source
            </th>
            <th className="hidden px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider lg:table-cell">
              Status
            </th>
            <th className="px-6 py-3 text-right text-xs font-semibold text-neutral-700 uppercase tracking-wider">
              Score
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-200 bg-white">
          {leads.map((lead) => (
            <tr
              key={lead.id}
              className="transition-colors duration-200 hover:bg-neutral-50"
            >
              {/* Name */}
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <a
                    href="#"
                    className="font-medium text-neutral-900 hover:text-primary-600 transition-colors"
                  >
                    {lead.name}
                  </a>
                  <p className="text-xs text-neutral-500">{lead.email}</p>
                </div>
              </td>

              {/* Company */}
              <td className="hidden px-6 py-4 text-sm text-neutral-600 sm:table-cell">
                {lead.company}
              </td>

              {/* Source */}
              <td className="hidden px-6 py-4 text-sm md:table-cell">
                <span className={cn('font-medium', sourceColors[lead.source] || 'text-neutral-600')}>
                  {lead.source.replace(/_/g, ' ')}
                </span>
              </td>

              {/* Status */}
              <td className="hidden px-6 py-4 text-sm lg:table-cell">
                <span
                  className={cn(
                    'inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium',
                    statusColors[lead.status]
                  )}
                >
                  {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                </span>
              </td>

              {/* Score */}
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <div className="text-right">
                    <p className="font-semibold text-neutral-900">{lead.score}</p>
                    <div className="mt-1 h-1.5 w-16 rounded-full bg-neutral-200">
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
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
