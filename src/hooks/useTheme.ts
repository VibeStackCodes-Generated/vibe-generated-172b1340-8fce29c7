/**
 * useTheme Hook
 * Provides access to theme configuration and utilities
 */

import { useMemo } from 'react'
import { theme } from '@/styles/theme'

export type ThemeType = typeof theme

/**
 * Hook to access theme configuration
 * Provides type-safe access to design tokens
 */
export function useTheme() {
  return useMemo(() => theme, [])
}

/**
 * Hook to get CSS variable value by key
 * @param variableName - CSS variable name without '--'
 * @example
 * const primaryColor = useCSSVariable('color-primary-500')
 */
export function useCSSVariable(variableName: string): string {
  return useMemo(() => {
    const cssVar = `var(--${variableName})`
    return cssVar
  }, [variableName])
}

/**
 * Hook to check if user prefers dark mode
 */
export function usePrefersDarkMode(): boolean {
  return useMemo(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }, [])
}

/**
 * Hook to check if user prefers reduced motion
 */
export function usePrefersReducedMotion(): boolean {
  return useMemo(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])
}

/**
 * Hook to get a color from the theme
 * @param colorPath - Path to color in theme (e.g., 'primary.600', 'success.500')
 * @example
 * const primaryColor = useThemeColor('primary.600')
 */
export function useThemeColor(colorPath: string): string {
  const themeData = useTheme()

  return useMemo(() => {
    const keys = colorPath.split('.')
    let value: any = themeData.colors

    for (const key of keys) {
      value = value?.[key]
    }

    return value || colorPath
  }, [colorPath])
}

/**
 * Hook to get spacing value from theme
 * @param spacingKey - Spacing key (e.g., '4', '8', '16')
 * @example
 * const spacing = useSpacing('4')
 */
export function useSpacing(spacingKey: string | number): string {
  const themeData = useTheme()

  return useMemo(() => {
    const value = themeData.spacing[spacingKey as keyof typeof themeData.spacing]
    return value || `var(--spacing-${spacingKey})`
  }, [spacingKey])
}

/**
 * Hook to get font configuration
 */
export function useTypography() {
  const themeData = useTheme()
  return useMemo(() => themeData.typography, [])
}
