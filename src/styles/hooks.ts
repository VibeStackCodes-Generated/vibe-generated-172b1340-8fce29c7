/**
 * Design System React Hooks
 * Custom hooks for accessing design tokens and theme utilities in components
 */

import { useCallback, useMemo } from 'react'
import { theme } from './theme'
import {
  getColor,
  getSpacing,
  getFontSize,
  mergeClasses,
  createResponsiveClass,
  getSizeConfig,
} from './utils'
import type { Breakpoint, ColorKey, ColorShade, Variant, Size, ResponsiveValue } from './types'

/**
 * Hook to access color values from the design system
 * Provides type-safe color access with optional shade
 * @example
 * const primaryColor = useColor('primary', 600)
 * const successPalette = useColor('success')
 */
export function useColor(colorKey: ColorKey, shade?: ColorShade): string {
  return useMemo(() => getColor(colorKey, shade), [colorKey, shade])
}

/**
 * Hook to access spacing values from the design system
 * @example const spacing4 = useSpacing(4)
 */
export function useSpacing(scale: keyof typeof theme.spacing): string {
  return useMemo(() => getSpacing(scale), [scale])
}

/**
 * Hook to get all spacing values at once
 * Useful when you need multiple spacing values
 */
export function useAllSpacing() {
  return useMemo(() => theme.spacing, [])
}

/**
 * Hook to get typography scale values
 */
export function useTypography() {
  return useMemo(() => theme.typography, [])
}

/**
 * Hook to merge and apply conditional Tailwind classes
 * @example
 * const buttonClasses = useClassName(
 *   'px-4 py-2',
 *   isActive && 'bg-primary text-white',
 *   isDisabled && 'opacity-50 cursor-not-allowed'
 * )
 */
export function useClassName(...classes: (string | false | undefined)[]): string {
  return useMemo(() => mergeClasses(...classes), classes)
}

/**
 * Hook to generate responsive Tailwind classes
 * @example
 * const textSize = useResponsiveClass({
 *   base: 'text-base',
 *   md: 'text-lg',
 *   lg: 'text-xl'
 * })
 */
export function useResponsiveClass(values: Partial<Record<'base' | Breakpoint, string>>): string {
  return useMemo(() => createResponsiveClass(values), [values])
}

/**
 * Hook to get size configuration for scalable components
 * @example
 * const { padding, fontSize, height } = useSizeConfig('md')
 */
export function useSizeConfig(size: Size) {
  return useMemo(() => getSizeConfig(size), [size])
}

/**
 * Hook to get all theme colors
 * Useful for color pickers or color selection interfaces
 */
export function useColors() {
  return useMemo(() => theme.colors, [])
}

/**
 * Hook to get all breakpoints
 * Useful for responsive design logic
 */
export function useBreakpoints() {
  return useMemo(() => theme.breakpoints, [])
}

/**
 * Hook to handle responsive values based on breakpoint
 * Returns a callback to access the appropriate value for a breakpoint
 * @example
 * const getValue = useResponsiveValue({ base: 8, md: 16, lg: 24 })
 * const padding = getValue('md') // returns 16
 */
export function useResponsiveValue<T>(values: ResponsiveValue<T>) {
  return useCallback(
    (breakpoint: 'base' | Breakpoint = 'base'): T | undefined => {
      return breakpoint in values ? values[breakpoint as keyof typeof values] : values.base
    },
    [values],
  )
}

/**
 * Hook to detect if dark mode is enabled
 * Checks system preference using media query
 */
export function useDarkMode(): boolean {
  // Note: In a real implementation, you might want to check for a context provider
  // This is a simple fallback to system preference
  if (typeof window === 'undefined') return false

  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
}

/**
 * Hook to get all available variants
 * Useful for variant selection or documentation
 */
export function useVariants(): Variant[] {
  return useMemo(() => ['primary', 'secondary', 'success', 'warning', 'error'], [])
}

/**
 * Hook to get all available sizes
 * Useful for size selection or documentation
 */
export function useSizes(): Size[] {
  return useMemo(() => ['sm', 'md', 'lg'], [])
}

/**
 * Hook to create computed class names for a component variant
 * Combines variant selection with size and additional modifiers
 * @example
 * const buttonClasses = useVariantClasses(variant, size, { isActive, isLoading })
 */
export function useVariantClasses(
  variant: Variant,
  size: Size = 'md',
  modifiers?: Record<string, boolean>,
) {
  return useMemo(() => {
    const variantClasses: Record<Variant, string> = {
      primary: 'bg-primary-600 text-white hover:bg-primary-700',
      secondary: 'bg-neutral-100 text-foreground hover:bg-neutral-200',
      success: 'bg-success-600 text-white hover:bg-success-700',
      warning: 'bg-warning-600 text-white hover:bg-warning-700',
      error: 'bg-error-600 text-white hover:bg-error-700',
    }

    const sizeClasses: Record<Size, string> = {
      sm: 'px-2 py-1 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    }

    let classes = [variantClasses[variant], sizeClasses[size]]

    if (modifiers) {
      if (modifiers.isActive) classes.push('ring-2 ring-offset-2')
      if (modifiers.isLoading) classes.push('opacity-75 cursor-wait')
      if (modifiers.isDisabled) classes.push('opacity-50 cursor-not-allowed')
    }

    return classes.join(' ')
  }, [variant, size, modifiers])
}

/**
 * Hook to get transition styles
 * Returns CSS properties for animations
 */
export function useTransition(
  duration: keyof typeof theme.transitionDuration = '200',
  timing: keyof typeof theme.transitionTiming = 'in-out',
) {
  return useMemo(
    () => ({
      transition: `all ${theme.transitionDuration[duration]} ${theme.transitionTiming[timing]}`,
    }),
    [duration, timing],
  )
}

/**
 * Hook to get shadow styles
 */
export function useShadow(shadow: keyof typeof theme.boxShadow = 'base') {
  return useMemo(() => ({ boxShadow: theme.boxShadow[shadow] }), [shadow])
}

/**
 * Hook to get border radius styles
 */
export function useBorderRadius(radius: keyof typeof theme.borderRadius = 'md') {
  return useMemo(() => ({ borderRadius: theme.borderRadius[radius] }), [radius])
}

/**
 * Hook to detect reduced motion preference
 * Useful for respecting user accessibility preferences
 */
export function usePrefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false

  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Hook to detect high contrast mode preference
 * Useful for high contrast UI variants
 */
export function useHighContrast(): boolean {
  if (typeof window === 'undefined') return false

  return window.matchMedia && window.matchMedia('(prefers-contrast: more)').matches
}

/**
 * Hook to create theme-aware styles based on responsive value
 * Combines useResponsiveValue with style generation
 */
export function useResponsiveStyle<T extends Record<string, any>>(
  styleMap: ResponsiveValue<T>,
  breakpoint: 'base' | Breakpoint = 'base',
) {
  const getValue = useResponsiveValue(styleMap)
  return useMemo(() => getValue(breakpoint), [getValue, breakpoint])
}

export default {
  useColor,
  useSpacing,
  useAllSpacing,
  useTypography,
  useClassName,
  useResponsiveClass,
  useSizeConfig,
  useColors,
  useBreakpoints,
  useResponsiveValue,
  useDarkMode,
  useVariants,
  useSizes,
  useVariantClasses,
  useTransition,
  useShadow,
  useBorderRadius,
  usePrefersReducedMotion,
  useHighContrast,
  useResponsiveStyle,
}
