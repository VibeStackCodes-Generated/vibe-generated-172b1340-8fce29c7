import { Outlet } from 'react-router-dom'
import { Suspense } from 'react'
import { ErrorBoundary } from '@/components/error-boundary'
import { Layout } from '@/components/layout'
import { VibeStackBadge } from '@/components/vibestack-badge'

/**
 * Main App component with routing and layout
 * Uses React Router for SPA navigation
 * Wraps routes with responsive Layout component
 */
function App() {
  return (
    <ErrorBoundary>
      <Layout>
        <Suspense
          fallback={
            <div className="flex min-h-screen items-center justify-center">
              <p className="text-neutral-600">Loading...</p>
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </Layout>
      <VibeStackBadge />
    </ErrorBoundary>
  )
}

export default App
