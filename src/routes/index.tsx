import { createBrowserRouter } from 'react-router-dom'
import App from '@/App'
import { LeadList } from '@/components/leads/lead-list'
import { mockLeads } from '@/data/mock-leads'

/**
 * Get basename dynamically from window location or environment
 * Supports both preview proxy and direct deployment
 */
function getBasename(): string {
  // Check if basename is set by preview proxy script
  if (typeof window !== 'undefined') {
    const previewBasename = (window as { __PREVIEW_BASENAME__?: string }).__PREVIEW_BASENAME__
    if (previewBasename) {
      console.log('[Router] Using basename from window.__PREVIEW_BASENAME__:', previewBasename)
      return previewBasename
    }

    // Fallback: detect basename from current URL pathname
    // This handles cases where the script hasn't run yet or for preview proxy URLs
    if (window.location.pathname.startsWith('/api/preview/')) {
      const pathMatch = window.location.pathname.match(/^(\/api\/preview\/[^/]+)/)
      if (pathMatch) {
        const detectedBasename = pathMatch[1]
        console.log('[Router] Detected basename from URL pathname:', detectedBasename)
        // Also set it on window for consistency
        ;(window as { __PREVIEW_BASENAME__?: string }).__PREVIEW_BASENAME__ = detectedBasename
        return detectedBasename
      }
    }
  }

  // Check environment variable (for build-time configuration)
  if (import.meta.env.VITE_BASENAME) {
    return import.meta.env.VITE_BASENAME
  }

  // Default: no basename (root deployment)
  console.log('[Router] No basename detected, using root')
  return ''
}

/**
 * Home Page
 */
function HomePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-neutral-900">Welcome to ConvertFlow</h1>
        <p className="mt-4 text-lg text-neutral-600">
          Turn contacts into booked revenue reliably and with minimal manual work.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-6">
          <div className="mb-3 text-2xl">📋</div>
          <h3 className="font-semibold text-neutral-900">Lead Capture</h3>
          <p className="mt-2 text-sm text-neutral-600">
            Embeddable forms, landing pages, and SMS intake.
          </p>
        </div>

        <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-6">
          <div className="mb-3 text-2xl">⭐</div>
          <h3 className="font-semibold text-neutral-900">Qualification</h3>
          <p className="mt-2 text-sm text-neutral-600">
            Scoring rules and automated qualification workflows.
          </p>
        </div>

        <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-6">
          <div className="mb-3 text-2xl">📅</div>
          <h3 className="font-semibold text-neutral-900">Booking</h3>
          <p className="mt-2 text-sm text-neutral-600">
            Calendar integration and one-click booking links.
          </p>
        </div>
      </div>
    </div>
  )
}

/**
 * Placeholder Pages for Navigation
 */
function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-neutral-900">Dashboard</h1>
      <p className="mt-4 text-neutral-600">Dashboard content coming soon...</p>
    </div>
  )
}

function ContactsPage() {
  return <LeadList leads={mockLeads} />
}

function SettingsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-neutral-900">Settings</h1>
      <p className="mt-4 text-neutral-600">Settings coming soon...</p>
    </div>
  )
}

/**
 * Application routes
 * Add new routes here for code splitting
 */
export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: '/dashboard',
          element: <DashboardPage />,
        },
        {
          path: '/contacts',
          element: <ContactsPage />,
        },
        {
          path: '/settings',
          element: <SettingsPage />,
        },
      ],
    },
  ],
  {
    basename: getBasename(),
  }
)
