/**
 * Design System Export Entry Point
 * Aggregates all design tokens, utilities, and types for easy importing
 */

// Theme configuration
export { theme, type Theme } from './theme'

// Types
export type {
  ColorKey,
  ColorShade,
  SpacingKey,
  FontSize,
  FontWeight,
  FontFamily,
  BorderRadius,
  BoxShadow,
  TransitionDuration,
  TransitionTiming,
  Breakpoint,
  Variant,
  Size,
  ButtonVariant,
  ButtonSize,
  InputState,
  CSSVariableName,
  ComponentStyleProps,
  ButtonProps,
  InputProps,
  CardProps,
  ColorPalette,
  ThemeConfig,
  ClassBuilder,
  ResponsiveValue,
  SemanticColors,
  StatusColor,
  TypographyScale,
  HeadingLevel,
  HeadingProps,
  TextProps,
  MediaQueryBuilder,
  AnimationName,
  FocusConfig,
  DarkModeConfig,
  DesignSystemConfig,
} from './types'

// Utility functions
export {
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
} from './utils'

// React hooks
export {
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
} from './hooks'

/**
 * Re-export everything for convenience
 * Usage:
 * import { theme, useColor, getColor, type ButtonProps } from '@/styles'
 */
