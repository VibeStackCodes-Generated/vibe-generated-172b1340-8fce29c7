/**
 * Design System Utility Functions
 * Helper functions for working with design tokens and creating dynamic styles
 */

import type { Theme } from './theme'
import type { Breakpoint, ColorKey, ColorShade, Size, Variant } from './types'
import { theme } from './theme'

/**
 * Get a color value from the theme
 * @example getColor('primary', 600) // returns '#0284c7'
 * @example getColor('success') // returns color palette object
 */
export function getColor(colorKey: ColorKey, shade?: ColorShade): string {
  const color = theme.colors[colorKey]
  if (typeof color === 'string') return color
  if (shade !== undefined && typeof color === 'object' && shade in color) {
    return color[shade as keyof typeof color]
  }
  return typeof color === 'object' ? color[500] : color
}

/**
 * Get spacing value from theme
 * @example getSpacing(4) // returns '1rem'
 */
export function getSpacing(key: keyof Theme['spacing']): string {
  return theme.spacing[key]
}

/**
 * Get typography value from theme
 */
export function getFontSize(size: keyof Theme['typography']['fontSize']) {
  return theme.typography.fontSize[size]
}

/**
 * Get font weight value from theme
 */
export function getFontWeight(weight: keyof Theme['typography']['fontWeight']): number {
  return theme.typography.fontWeight[weight]
}

/**
 * Get border radius value from theme
 */
export function getBorderRadius(radius: keyof Theme['borderRadius']): string {
  return theme.borderRadius[radius]
}

/**
 * Get box shadow value from theme
 */
export function getBoxShadow(shadow: keyof Theme['boxShadow']): string {
  return theme.boxShadow[shadow]
}

/**
 * Get breakpoint value from theme
 */
export function getBreakpoint(breakpoint: Breakpoint): string {
  return theme.breakpoints[breakpoint]
}

/**
 * Create a media query string for responsive design
 * @example createMediaQuery('md') // returns '@media (min-width: 768px)'
 */
export function createMediaQuery(breakpoint: Breakpoint): string {
  return `@media (min-width: ${getBreakpoint(breakpoint)})`
}

/**
 * Build CSS variable reference string
 * @example getCSSVar('color-primary-500') // returns 'var(--color-primary-500)'
 */
export function getCSSVar(variableName: string): string {
  return `var(--${variableName})`
}

/**
 * Merge multiple class names together
 * Useful for combining Tailwind classes with conditional logic
 * @example mergeClasses('px-4', isActive && 'bg-primary', 'rounded-md')
 */
export function mergeClasses(...classes: (string | false | undefined)[]): string {
  return classes.filter(Boolean).join(' ')
}

/**
 * Create a color palette variant styles object
 * Useful for component styling with color variants
 */
export function createColorVariantStyles(variant: Variant) {
  const colorMap: Record<Variant, { bg: string; text: string; border: string }> = {
    primary: {
      bg: getCSSVar('color-primary-50'),
      text: getCSSVar('color-primary-600'),
      border: getCSSVar('color-primary-200'),
    },
    secondary: {
      bg: getCSSVar('color-secondary-50'),
      text: getCSSVar('color-secondary-600'),
      border: getCSSVar('color-secondary-200'),
    },
    success: {
      bg: getCSSVar('color-success-50'),
      text: getCSSVar('color-success-600'),
      border: getCSSVar('color-success-200'),
    },
    warning: {
      bg: getCSSVar('color-warning-50'),
      text: getCSSVar('color-warning-600'),
      border: getCSSVar('color-warning-200'),
    },
    error: {
      bg: getCSSVar('color-error-50'),
      text: getCSSVar('color-error-600'),
      border: getCSSVar('color-error-200'),
    },
  }

  return colorMap[variant]
}

/**
 * Get size-specific values for components
 * Useful for button, input, and other scalable components
 */
export function getSizeConfig(size: Size) {
  const sizes = {
    sm: {
      padding: 'var(--spacing-1) var(--spacing-2)',
      fontSize: 'var(--font-size-sm)',
      borderRadius: 'var(--radius-sm)',
      height: '2rem',
    },
    md: {
      padding: 'var(--spacing-2) var(--spacing-4)',
      fontSize: 'var(--font-size-base)',
      borderRadius: 'var(--radius-md)',
      height: '2.5rem',
    },
    lg: {
      padding: 'var(--spacing-3) var(--spacing-6)',
      fontSize: 'var(--font-size-lg)',
      borderRadius: 'var(--radius-lg)',
      height: '3rem',
    },
  }

  return sizes[size]
}

/**
 * Create responsive class string based on breakpoint and values
 * Useful for Tailwind responsive classes
 * @example createResponsiveClass({ base: 'text-base', md: 'text-lg', lg: 'text-xl' })
 */
export function createResponsiveClass(
  values: Partial<Record<'base' | Breakpoint, string>>,
): string {
  const { base = '', sm, md, lg, xl } = values
  const classes = [base]

  if (sm) classes.push(`sm:${sm}`)
  if (md) classes.push(`md:${md}`)
  if (lg) classes.push(`lg:${lg}`)
  if (xl) classes.push(`xl:${xl}`)

  return classes.join(' ')
}

/**
 * Generate a theme-aware color with opacity
 * Useful for hover states and interactive elements
 * @example addOpacity('--color-primary-600', 0.8)
 */
export function addOpacity(cssVariable: string, opacity: number): string {
  // This is a placeholder - actual implementation depends on CSS variable value
  // In practice, use rgba() with color values
  return `${cssVariable}cc`
}

/**
 * Create focus ring styles based on theme configuration
 * Used for keyboard navigation and accessibility
 */
export function createFocusRingStyles(): Record<string, string> {
  return {
    outline: getCSSVar('focus-ring'),
    outlineOffset: '2px',
  }
}

/**
 * Create transition styles based on theme configuration
 * Used for smooth animations and interactions
 */
export function createTransitionStyles(
  duration: keyof Theme['transitionDuration'] = '200',
  timing: keyof Theme['transitionTiming'] = 'in-out',
): Record<string, string> {
  return {
    transition: `all ${getCSSVar(`transition-${duration}`)} ${getCSSVar(`ease-${timing}`)}`,
  }
}

/**
 * Convert a spacing scale value to rem
 * Useful for calculations and responsive spacing
 */
export function spacingToRem(spacingValue: string): number {
  const value = parseFloat(spacingValue)
  return value / 16 // 16px = 1rem
}

/**
 * Create a z-index utility for consistent layering
 */
export const zIndex = {
  hide: '-10',
  base: '0',
  dropdown: '40',
  sticky: '20',
  fixed: '30',
  modal: '50',
  popover: '60',
  tooltip: '70',
  notification: '80',
} as const

/**
 * Create component class factory for consistent naming
 * Useful for scoped CSS or CSS modules
 */
export function createComponentClass(componentName: string, suffix?: string): string {
  if (suffix) {
    return `.${componentName}__${suffix}`
  }
  return `.${componentName}`
}

/**
 * Check if a value is a valid CSS color
 */
export function isValidColor(color: string): boolean {
  const element = document.createElement('div')
  element.style.color = color
  return element.style.color !== ''
}

/**
 * Create a semantic color mapping for consistent theming
 */
export function getSemanticColor(semantic: 'info' | 'success' | 'warning' | 'error') {
  const semanticMap = {
    info: 'primary',
    success: 'success',
    warning: 'warning',
    error: 'error',
  } as const

  return semanticMap[semantic]
}

/**
 * Calculate accessible contrast ratio for text
 * Helper for ensuring WCAG compliance
 */
export function createContrastSafeColor(baseColor: string, isDark: boolean): string {
  // This is a placeholder for contrast calculation
  // In production, use a library like chroma.js or contrast-ratio
  return baseColor
}

/**
 * Create a consistent gutter/gap utility based on spacing scale
 */
export function createGapUtility(scale: keyof Theme['spacing']): Record<string, string> {
  return {
    gap: getCSSVar(`spacing-${scale}`),
  }
}

/**
 * Type-safe theme accessor
 */
export function getTheme(): Theme {
  return theme
}

export default {
  getColor,
  getSpacing,
  getFontSize,
  getFontWeight,
  getBorderRadius,
  getBoxShadow,
  getBreakpoint,
  createMediaQuery,
  getCSSVar,
  mergeClasses,
  createColorVariantStyles,
  getSizeConfig,
  createResponsiveClass,
  addOpacity,
  createFocusRingStyles,
  createTransitionStyles,
  spacingToRem,
  zIndex,
  createComponentClass,
  isValidColor,
  getSemanticColor,
  createContrastSafeColor,
  createGapUtility,
  getTheme,
}
