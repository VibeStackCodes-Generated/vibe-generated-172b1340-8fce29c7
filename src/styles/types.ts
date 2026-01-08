/**
 * Design System Type Definitions
 * Provides TypeScript types for theme configuration and styling utilities
 */

import type { theme } from './theme'

/**
 * Complete theme type
 */
export type Theme = typeof theme

/**
 * Color key paths for type-safe color access
 */
export type ColorKey =
  | 'primary'
  | 'secondary'
  | 'neutral'
  | 'success'
  | 'warning'
  | 'error'
  | 'background'
  | 'foreground'
  | 'muted'
  | 'muted-foreground'
  | 'border'
  | 'input'
  | 'ring'

/**
 * Color shade options (50-900)
 */
export type ColorShade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900

/**
 * Spacing scale keys
 */
export type SpacingKey = keyof Theme['spacing']

/**
 * Typography keys
 */
export type FontSize = keyof Theme['typography']['fontSize']
export type FontWeight = keyof Theme['typography']['fontWeight']
export type FontFamily = 'sans' | 'mono'

/**
 * Border radius options
 */
export type BorderRadius = keyof Theme['borderRadius']

/**
 * Box shadow options
 */
export type BoxShadow = keyof Theme['boxShadow']

/**
 * Transition duration options
 */
export type TransitionDuration = keyof Theme['transitionDuration']

/**
 * Transition timing function options
 */
export type TransitionTiming = keyof Theme['transitionTiming']

/**
 * Breakpoint options
 */
export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl'

/**
 * Variant type for component props
 */
export type Variant = 'primary' | 'secondary' | 'success' | 'warning' | 'error'

/**
 * Size type for component props
 */
export type Size = 'sm' | 'md' | 'lg'

/**
 * Button variant options
 */
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'

/**
 * Button size options
 */
export type ButtonSize = 'sm' | 'md' | 'lg'

/**
 * Input state options
 */
export type InputState = 'default' | 'error' | 'success' | 'disabled'

/**
 * CSS variable names (without -- prefix)
 */
export type CSSVariableName =
  | `color-${ColorKey}`
  | `spacing-${SpacingKey}`
  | `font-size-${FontSize}`
  | `font-weight-${FontWeight}`
  | `border-radius-${BorderRadius}`
  | `shadow-${BoxShadow}`
  | `transition-${TransitionDuration}`

/**
 * Component style props
 */
export interface ComponentStyleProps {
  className?: string
  style?: React.CSSProperties
}

/**
 * Button component props
 */
export interface ButtonProps extends ComponentStyleProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  fullWidth?: boolean
  icon?: React.ReactNode
}

/**
 * Input component props
 */
export interface InputProps extends ComponentStyleProps, React.InputHTMLAttributes<HTMLInputElement> {
  state?: InputState
  label?: string
  error?: string
  helper?: string
  icon?: React.ReactNode
}

/**
 * Card component props
 */
export interface CardProps extends ComponentStyleProps {
  header?: React.ReactNode
  footer?: React.ReactNode
  children: React.ReactNode
  variant?: Variant
}

/**
 * Color palette definition
 */
export interface ColorPalette {
  50: string
  100: string
  200: string
  300: string
  400: string
  500: string
  600: string
  700: string
  800: string
  900: string
}

/**
 * Theme configuration object
 */
export interface ThemeConfig {
  colors: Record<ColorKey, string | ColorPalette>
  spacing: Record<string, string>
  typography: {
    fontFamily: Record<FontFamily, string>
    fontSize: Record<FontSize, [string, { lineHeight: string; letterSpacing: string }]>
    fontWeight: Record<FontWeight, number>
  }
  borderRadius: Record<BorderRadius, string>
  boxShadow: Record<BoxShadow, string>
  transitionDuration: Record<TransitionDuration, string>
  transitionTiming: Record<TransitionTiming, string>
  breakpoints: Record<Breakpoint, string>
}

/**
 * Utility type for CSS class builder functions
 */
export type ClassBuilder = (config: Record<string, boolean | string | undefined>) => string

/**
 * Utility type for responsive styles
 */
export interface ResponsiveValue<T> {
  base?: T
  sm?: T
  md?: T
  lg?: T
  xl?: T
  '2xl'?: T
}

/**
 * Semantic color mapping
 */
export interface SemanticColors {
  primary: string
  secondary: string
  success: string
  warning: string
  error: string
  muted: string
  background: string
  foreground: string
  border: string
}

/**
 * Status color type
 */
export type StatusColor = 'success' | 'warning' | 'error' | 'info'

/**
 * Typography scale
 */
export type TypographyScale = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl'

/**
 * Heading level type
 */
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

/**
 * Props for heading components
 */
export interface HeadingProps extends ComponentStyleProps, React.HTMLAttributes<HTMLHeadingElement> {
  level: HeadingLevel
  children: React.ReactNode
}

/**
 * Props for text components
 */
export interface TextProps extends ComponentStyleProps, React.HTMLAttributes<HTMLParagraphElement> {
  variant?: TypographyScale
  weight?: FontWeight
  color?: ColorKey
  children: React.ReactNode
}

/**
 * Breakpoint media query builder type
 */
export type MediaQueryBuilder = Record<Breakpoint, string>

/**
 * Animation name type
 */
export type AnimationName =
  | 'fadeIn'
  | 'slideInUp'
  | 'slideInDown'
  | 'slideInLeft'
  | 'slideInRight'
  | 'scaleIn'
  | 'spinLoader'

/**
 * Focus management configuration
 */
export interface FocusConfig {
  ringWidth: string
  ringOffset: string
  ringColor: string
  borderRadius: BorderRadius
}

/**
 * Dark mode configuration
 */
export interface DarkModeConfig {
  enabled: boolean
  strategy: 'media' | 'class'
}

/**
 * Complete design system configuration
 */
export interface DesignSystemConfig {
  theme: ThemeConfig
  darkMode: DarkModeConfig
  focus: FocusConfig
  animations: Record<AnimationName, { duration: string; timingFunction: string }>
}
