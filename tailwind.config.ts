import type { Config } from 'tailwindcss'
import { theme } from './src/styles/theme'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        primary: theme.colors.primary,
        secondary: theme.colors.secondary,
        success: theme.colors.success,
        warning: theme.colors.warning,
        error: theme.colors.error,
        neutral: theme.colors.neutral,
      },
      spacing: theme.spacing,
      fontSize: theme.typography.fontSize,
      fontFamily: {
        sans: theme.typography.fontFamily.sans,
        mono: theme.typography.fontFamily.mono,
      },
      fontWeight: theme.typography.fontWeight,
      borderRadius: theme.borderRadius,
      boxShadow: theme.boxShadow,
      transitionDuration: theme.transitionDuration,
      transitionTimingFunction: theme.transitionTiming,
      screens: {
        sm: theme.breakpoints.sm,
        md: theme.breakpoints.md,
        lg: theme.breakpoints.lg,
        xl: theme.breakpoints.xl,
        '2xl': theme.breakpoints['2xl'],
      },
      animation: {
        none: 'none',
        spin: 'spin 1s linear infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        bounce: 'bounce 1s infinite',
      },
      keyframes: {
        spin: {
          to: { transform: 'rotate(360deg)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        bounce: {
          '0%, 100%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(-0.25rem)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
      },
    },
  },
  plugins: [],
} as Config
