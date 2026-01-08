import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/utils/cn'

/**
 * Navigation Links Configuration
 * Define all primary navigation items here
 */
const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Leads', path: '/contacts' },
  { label: 'Settings', path: '/settings' },
]

/**
 * Header Component
 * Responsive navigation header with mobile hamburger menu
 * Features:
 * - Mobile-first responsive design
 * - Hamburger menu for mobile devices
 * - Active route highlighting
 * - Smooth transitions and animations
 */
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  /**
   * Check if a link is the active route
   */
  const isActive = (path: string) => location.pathname === path

  /**
   * Close menu when a link is clicked
   */
  const handleNavClick = () => {
    setIsMenuOpen(false)
  }

  /**
   * Toggle hamburger menu state
   */
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white shadow-sm transition-all duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between py-4">
          {/* Logo/Brand */}
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold text-primary-600 transition-colors hover:text-primary-700"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white font-semibold">
              CF
            </div>
            <span className="hidden sm:inline">ConvertFlow</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'relative px-4 py-2 text-sm font-medium transition-colors duration-200',
                  isActive(link.path)
                    ? 'text-primary-600'
                    : 'text-neutral-600 hover:text-primary-600'
                )}
              >
                {link.label}
                {/* Active indicator line */}
                {isActive(link.path) && (
                  <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary-600" />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Hamburger Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            <svg
              className="h-6 w-6 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                // X icon when menu is open
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                // Hamburger icon when menu is closed
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="animate-in fade-in slide-in-from-top-2 border-t border-neutral-200 md:hidden">
            <div className="space-y-1 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={handleNavClick}
                  className={cn(
                    'block rounded-lg px-4 py-2 text-base font-medium transition-colors duration-200',
                    isActive(link.path)
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-neutral-600 hover:bg-neutral-50 hover:text-primary-600'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
