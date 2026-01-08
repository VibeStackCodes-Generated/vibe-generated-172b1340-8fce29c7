# Component-Level Style Strategy

This document outlines the recommended approaches for styling components in this design system. We use a hybrid approach combining **Tailwind CSS**, **CSS Modules**, and **CSS Variables**.

## Overview

The ConvertFlow application uses a multi-layered styling strategy:

1. **Global CSS Variables** (`variables.css`) - Design tokens
2. **Global Styles** (`globals.css`) - Base resets and utilities
3. **Tailwind CSS** - Utility-first styling
4. **CSS Modules** - Component-scoped styles
5. **Inline Styles** - Dynamic, computed styles
6. **Design System Hooks** - React hooks for theme access

## Strategy Guide

### 1. Tailwind CSS (Preferred for Most Components)

**When to use:** For simple components with predictable styling needs.

**Advantages:**
- Fast development
- Consistent spacing and sizing
- Built-in dark mode support
- Responsive design with breakpoint prefixes
- No naming conventions to learn

**Example:**

```tsx
// Button component using Tailwind
export function Button({ variant = 'primary', size = 'md', ...props }) {
  const variantStyles = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700',
    secondary: 'bg-neutral-100 text-foreground hover:bg-neutral-200',
    outline: 'border border-primary-600 text-primary-600 hover:bg-primary-50',
  }

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  return (
    <button
      className={`
        inline-flex items-center justify-center
        font-medium rounded-md
        transition-colors duration-200
        focus-visible:outline-ring
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantStyles[variant]}
        ${sizeStyles[size]}
      `}
      {...props}
    />
  )
}
```

### 2. CSS Modules (For Complex Components)

**When to use:** For components with complex styling logic, nested selectors, or shared styles.

**Advantages:**
- Scoped styles (no naming conflicts)
- Composable styles
- Complex selectors and pseudo-elements
- Animations and keyframes
- Maintainable component-specific styles

**File Structure:**
```
components/
├── Button/
│   ├── Button.tsx
│   └── Button.module.css
├── Card/
│   ├── Card.tsx
│   └── Card.module.css
```

**Example:**

```tsx
// Button.tsx
import styles from './Button.module.css'

export function Button({ variant = 'primary', size = 'md', loading, ...props }) {
  return (
    <button
      className={`
        ${styles.button}
        ${styles[`variant${variant.charAt(0).toUpperCase() + variant.slice(1)}`]}
        ${styles[`size${size.charAt(0).toUpperCase() + size.slice(1)}`]}
        ${loading ? styles.loading : ''}
      `}
      disabled={loading || props.disabled}
      {...props}
    />
  )
}
```

```css
/* Button.module.css */
.button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);
  border: 2px solid transparent;
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all var(--transition-200) var(--ease-in-out);
  user-select: none;
}

.button:hover:not(:disabled) {
  transform: translateY(-1px);
}

.button:focus-visible {
  outline: var(--focus-ring);
  outline-offset: 2px;
}

.button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.variantPrimary {
  background-color: var(--color-primary-600);
  color: white;
  border-color: var(--color-primary-600);
}

.variantPrimary:hover:not(:disabled) {
  background-color: var(--color-primary-700);
  box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3);
}

.variantSecondary {
  background-color: var(--color-neutral-100);
  color: var(--color-foreground);
  border-color: var(--color-border);
}

.variantSecondary:hover:not(:disabled) {
  background-color: var(--color-neutral-200);
}

.sizeSm {
  padding: var(--spacing-1) var(--spacing-2);
  font-size: var(--font-size-sm);
}

.sizeMd {
  padding: var(--spacing-2) var(--spacing-4);
  font-size: var(--font-size-base);
}

.sizeLg {
  padding: var(--spacing-3) var(--spacing-6);
  font-size: var(--font-size-lg);
}

.loading {
  opacity: 0.75;
  pointer-events: none;
}

.loading::after {
  content: '';
  position: absolute;
  width: 1rem;
  height: 1rem;
  border: 2px solid currentColor;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
```

### 3. Inline Styles (For Dynamic Values)

**When to use:** For computed, dynamic, or data-driven styles.

**Advantages:**
- Generated at runtime
- Responsive to prop changes
- No class naming needed
- Good for animations and transitions

**Example:**

```tsx
export function DynamicCard({ backgroundColor, padding = 'md' }) {
  const paddingMap = {
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
  }

  return (
    <div
      style={{
        backgroundColor: backgroundColor,
        padding: paddingMap[padding],
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-base)',
      }}
    >
      Content
    </div>
  )
}
```

### 4. Design System Hooks (For Type-Safe Theme Access)

**When to use:** When you need theme values in JavaScript (useCallback, animations, calculations).

**Available Hooks:**

```tsx
import {
  useColor,
  useSpacing,
  useClassName,
  useVariantClasses,
  useSizeConfig,
  useDarkMode,
  usePrefersReducedMotion,
} from '@/styles/hooks'

export function MyComponent() {
  const primaryColor = useColor('primary', 600)
  const spacing4 = useSpacing(4)
  const isDarkMode = useDarkMode()
  const buttonClasses = useVariantClasses('primary', 'md', { isActive: true })

  return <button className={buttonClasses}>Click me</button>
}
```

## Responsive Design

### Tailwind Breakpoints

```tsx
<div className="text-base md:text-lg lg:text-xl">
  Responsive text
</div>
```

### CSS Module Media Queries

```css
.container {
  padding: var(--spacing-4);
}

@media (min-width: 768px) {
  .container {
    padding: var(--spacing-6);
  }
}

@media (min-width: 1024px) {
  .container {
    padding: var(--spacing-8);
  }
}
```

### Mobile-First Approach

Always design for mobile first, then enhance for larger screens:

```tsx
<div className="flex flex-col gap-4 md:flex-row md:gap-6">
  <aside className="md:w-1/4">Sidebar</aside>
  <main className="flex-1">Content</main>
</div>
```

## Dark Mode

Dark mode is automatically supported through:

1. CSS variable overrides in `variables.css`
2. Tailwind dark mode classes
3. `useDarkMode()` hook for conditional logic

**Example:**

```tsx
<div className="bg-white dark:bg-neutral-900 text-foreground dark:text-white">
  Content
</div>
```

Or with CSS variables:

```css
.component {
  background-color: var(--color-background);
  color: var(--color-foreground);
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #111827;
    --color-foreground: #f9fafb;
  }
}
```

## Accessibility Considerations

### Focus Management

Always include focus styles:

```tsx
<button className="focus-visible:outline-ring">
  Accessible Button
</button>
```

### Color Contrast

Use semantic colors instead of arbitrary colors:

```tsx
// Good
<p className="text-error">Error message</p>

// Avoid
<p style={{ color: '#ff0000' }}>Error message</p>
```

### Reduced Motion

Respect user preferences:

```tsx
import { usePrefersReducedMotion } from '@/styles/hooks'

export function AnimatedComponent() {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <div
      style={{
        transition: prefersReducedMotion ? 'none' : 'all 0.3s ease-in-out',
      }}
    >
      Content
    </div>
  )
}
```

## Component Patterns

### Button Component Pattern

```tsx
// components/Button.tsx
import { forwardRef } from 'react'
import styles from './Button.module.css'
import type { ButtonProps } from '@/styles/types'

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, fullWidth, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`
          ${styles.button}
          ${styles[`variant${variant.charAt(0).toUpperCase() + variant.slice(1)}`]}
          ${styles[`size${size.charAt(0).toUpperCase() + size.slice(1)}`]}
          ${fullWidth ? styles.fullWidth : ''}
          ${loading ? styles.loading : ''}
        `}
        disabled={loading || props.disabled}
        {...props}
      />
    )
  },
)

Button.displayName = 'Button'
```

### Input Component Pattern

```tsx
// components/Input.tsx
import { forwardRef } from 'react'
import styles from './Input.module.css'

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ state = 'default', label, error, helper, icon, ...props }, ref) => {
    return (
      <div className={styles.inputWrapper}>
        {label && <label className={styles.label}>{label}</label>}
        <div className={styles.inputContainer}>
          {icon && <span className={styles.icon}>{icon}</span>}
          <input
            ref={ref}
            className={`${styles.input} ${styles[`state${state}`]}`}
            {...props}
          />
        </div>
        {error && <span className={styles.error}>{error}</span>}
        {helper && <span className={styles.helper}>{helper}</span>}
      </div>
    )
  },
)

Input.displayName = 'Input'
```

### Card Component Pattern

```tsx
// components/Card.tsx
import styles from './Card.module.css'

export function Card({ header, footer, children, variant = 'default' }) {
  return (
    <div className={`${styles.card} ${styles[`variant${variant}`]}`}>
      {header && <div className={styles.cardHeader}>{header}</div>}
      <div className={styles.cardContent}>{children}</div>
      {footer && <div className={styles.cardFooter}>{footer}</div>}
    </div>
  )
}
```

## Utility Classes

Commonly used utility classes are defined in `variables.css`:

```css
.text-primary { @apply text-primary-600 dark:text-primary-400; }
.bg-primary-soft { @apply bg-primary-50 dark:bg-primary-950; }
.border-primary { @apply border-primary-200 dark:border-primary-700; }
.focus-ring { outline: var(--focus-ring); border-radius: var(--radius-base); }
.transition-smooth { transition: all var(--transition-300) var(--ease-in-out); }
.truncate-line { @apply overflow-hidden text-ellipsis whitespace-nowrap; }
.disabled-state { @apply cursor-not-allowed opacity-50; }
```

## Performance Considerations

1. **Prefer Tailwind** for most styles - it's already optimized
2. **Use CSS Modules** for component-specific complex styles
3. **Minimize inline styles** - use computed classes when possible
4. **Avoid repeated calculations** - use React hooks to memoize values
5. **Lazy load** heavy style files if needed

## Testing Styles

```tsx
import { render, screen } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('applies correct variant classes', () => {
    const { container } = render(<Button variant="primary">Click</Button>)
    expect(container.querySelector('button')).toHaveClass('variantPrimary')
  })

  it('applies correct size classes', () => {
    const { container } = render(<Button size="lg">Click</Button>)
    expect(container.querySelector('button')).toHaveClass('sizeLg')
  })
})
```

## Migration Guide

### From Inline Styles to Design System

**Before:**
```tsx
<button style={{ backgroundColor: '#0284c7', padding: '1rem' }}>
  Click me
</button>
```

**After:**
```tsx
<button className="bg-primary-600 px-4 py-2">
  Click me
</button>
```

### From Arbitrary Colors to Theme Colors

**Before:**
```tsx
<div style={{ color: '#ef4444' }}>Error</div>
```

**After:**
```tsx
<div className="text-error">Error</div>
```

## Resources

- Design tokens: `src/styles/theme.ts`
- CSS variables: `src/styles/variables.css`
- Global styles: `src/styles/globals.css`
- Utilities: `src/styles/utils.ts`
- Hooks: `src/styles/hooks.ts`
- Examples: `src/styles/examples.module.css`
- Tailwind config: `tailwind.config.ts`

## Best Practices Summary

1. ✅ Use Tailwind for 80% of styling
2. ✅ Use CSS Modules for complex components
3. ✅ Use design system hooks for theme access
4. ✅ Use CSS variables for dynamic colors
5. ✅ Respect user accessibility preferences
6. ✅ Follow mobile-first responsive design
7. ✅ Maintain consistent naming conventions
8. ✅ Document component variations
9. ✅ Test style logic and accessibility
10. ✅ Keep components small and focused
