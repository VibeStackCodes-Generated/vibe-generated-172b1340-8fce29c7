# Component Styling Strategy

This document outlines the styling approach for components in this project.

## Overview

We use a **utility-first approach with Tailwind CSS** as the primary styling method, combined with **optional CSS modules** for complex component-specific styles.

### Key Principles

1. **Utility-First Default**: Use Tailwind CSS classes for most styling
2. **Scoped Styles When Needed**: Use CSS modules only for complex, component-specific styles
3. **Design Tokens**: Always reference CSS variables for colors, spacing, and typography
4. **Consistency**: Follow the design system defined in `theme.ts` and `variables.css`
5. **Accessibility**: Ensure focus states, contrast, and semantic HTML

---

## Styling Methods

### 1. Tailwind CSS Classes (Preferred)

Use Tailwind's utility classes for rapid component development.

```tsx
// Button component with Tailwind
export function Button({ children, variant = 'primary' }) {
  const baseStyles = 'px-4 py-2 rounded-md font-medium transition-colors focus-ring'

  const variants = {
    primary: 'bg-sky-600 text-white hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600',
    secondary: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-700',
    ghost: 'text-sky-600 hover:bg-sky-50 dark:text-sky-400 dark:hover:bg-neutral-800',
  }

  return (
    <button className={`${baseStyles} ${variants[variant]}`}>
      {children}
    </button>
  )
}
```

**Pros:**
- Quick development
- Small bundle size
- Responsive variants built-in
- Dark mode support

**When to use:**
- Simple components
- Standard layouts
- Responsive designs

---

### 2. CSS Modules (For Complex Styles)

Use CSS modules when you need:
- Complex animations
- Component-specific transitions
- Scoped styling to avoid conflicts
- Media queries beyond breakpoints
- Pseudo-elements and advanced selectors

**File naming:** `ComponentName.module.css`

```css
/* Button.module.css */
.buttonBase {
  padding: var(--spacing-4);
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-medium);
  transition: all var(--transition-200) var(--ease-in-out);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);
}

.buttonPrimary {
  composes: buttonBase;
  background-color: var(--color-primary-600);
  color: white;
}

.buttonPrimary:hover {
  background-color: var(--color-primary-700);
  box-shadow: var(--shadow-md);
}

.buttonPrimary:active {
  transform: scale(0.98);
}

.buttonPrimary:focus-visible {
  outline: var(--focus-ring);
}

.loadingSpinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```

```tsx
// Button.tsx
import styles from './Button.module.css'

export function Button({ children, variant = 'primary', loading = false }) {
  return (
    <button className={styles[`button${variant}`]}>
      {loading && <span className={styles.loadingSpinner} />}
      {children}
    </button>
  )
}
```

**When to use:**
- Complex animations/keyframes
- Component-specific scoped styles
- Multiple interdependent states
- Hover/active effects with transforms

---

### 3. Inline Styles (For Dynamic Values Only)

Use inline styles ONLY for truly dynamic values that can't be expressed with classes.

```tsx
export function ProgressBar({ percentage }) {
  return (
    <div className="h-2 w-full bg-neutral-100 rounded-full overflow-hidden">
      <div
        className="h-full bg-primary-500 transition-all duration-300"
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
}
```

---

## Design System Usage

### CSS Variables

Always use CSS variables for semantic values:

```tsx
// ❌ Bad - hardcoded values
<div style={{ color: '#0ea5e9', fontSize: '16px' }} />

// ✅ Good - using CSS variables
<div style={{ color: 'var(--color-primary-500)', fontSize: 'var(--font-size-base)' }} />

// ✅ Better - using Tailwind with design tokens
<div className="text-primary-500 text-base" />
```

### Colors

```tsx
// Using Tailwind color utilities (maps to design system)
<div className="bg-primary-50 text-primary-900">
  <h2 className="text-primary-700 font-semibold">Primary</h2>
</div>

// Using semantic helpers
<div className="bg-success-soft text-success">Success</div>
<div className="bg-error-soft text-error">Error</div>
<div className="bg-warning-soft text-warning">Warning</div>
```

### Spacing

```tsx
// Using Tailwind spacing scale
<div className="p-4 mb-6">
  <button className="px-4 py-2 gap-3">Click me</button>
</div>

// Using CSS variables in custom CSS
.customCard {
  padding: var(--spacing-6);
  margin-bottom: var(--spacing-8);
}
```

### Typography

```tsx
// Using Tailwind text utilities
<h1 className="text-5xl font-bold">Heading 1</h1>
<p className="text-base font-normal leading-relaxed">Body text</p>

// Using semantic classes
<code className="text-xs font-mono bg-neutral-100 px-2 py-1 rounded">code</code>
```

### Focus States

```tsx
// Using focus-ring utility
<button className="focus-ring">
  Keyboard accessible button
</button>

// Using focus-ring-sm for subtle rings
<input className="focus-ring-sm border border-neutral-200" />
```

---

## Component Examples

### Simple Button (Tailwind Only)

```tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-smooth focus-ring disabled-state'

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm rounded-md',
    md: 'px-4 py-2 text-base rounded-md',
    lg: 'px-6 py-3 text-lg rounded-lg',
  }

  const variantStyles = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600',
    secondary: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-700',
    ghost: 'text-primary-600 hover:bg-primary-50 dark:text-primary-400 dark:hover:bg-neutral-800',
  }

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
```

### Complex Card (CSS Module + Tailwind)

```tsx
// Card.module.css
.card {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background-color: var(--color-background);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-200) var(--ease-in-out);
}

.card:hover {
  box-shadow: var(--shadow-md);
  border-color: var(--color-primary-200);
}

.cardHeader {
  padding: var(--spacing-6);
  border-bottom: 1px solid var(--color-border);
}

.cardContent {
  padding: var(--spacing-6);
}

.cardFooter {
  padding: var(--spacing-6);
  border-top: 1px solid var(--color-border);
  background-color: var(--color-input);
  display: flex;
  gap: var(--spacing-4);
  justify-content: flex-end;
}
```

```tsx
// Card.tsx
import styles from './Card.module.css'

interface CardProps {
  header?: React.ReactNode
  footer?: React.ReactNode
  children: React.ReactNode
}

export function Card({ header, footer, children }: CardProps) {
  return (
    <div className={styles.card}>
      {header && <div className={styles.cardHeader}>{header}</div>}
      <div className={styles.cardContent}>{children}</div>
      {footer && <div className={styles.cardFooter}>{footer}</div>}
    </div>
  )
}
```

---

## Best Practices

### ✅ Do's

- Use Tailwind for most styling
- Group related utilities with pipes: `px-4 py-2 text-base`
- Use CSS variables for colors, spacing, typography
- Create reusable component classes for repeated patterns
- Use CSS modules for complex animations/transitions
- Test focus states with keyboard navigation
- Support dark mode with `dark:` prefix
- Use semantic color utilities (`.text-primary`, `.bg-success-soft`)

### ❌ Don'ts

- Hardcode color values like `#0ea5e9`
- Mix CSS methodologies unnecessarily
- Create overly long className strings (extract to CSS module)
- Use `!important` (except in utilities)
- Forget about accessibility (focus states, contrast)
- Ignore dark mode support
- Use inline styles for static values

---

## Dark Mode Support

All colors automatically support dark mode through CSS variables and Tailwind's dark mode:

```tsx
// Color automatically adjusts for dark mode
<div className="bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-50">
  Content
</div>

// Using semantic utilities (includes dark mode)
<div className="bg-primary-soft text-primary">
  Content
</div>
```

---

## Responsive Design

Use Tailwind's responsive prefixes:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Items */}
</div>

<div className="text-sm md:text-base lg:text-lg px-4 md:px-6 lg:px-8">
  Responsive text and spacing
</div>
```

---

## Performance Considerations

1. **Tailwind CSS**: Automatically purges unused styles in production
2. **CSS Modules**: Scope styles to components (no conflicts)
3. **Dynamic Classes**: Build class strings from arrays to reduce size
4. **Keyframes**: Define once in CSS modules, reuse with class names

---

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Design Tokens Reference](./theme.ts)
- [CSS Variables Reference](./variables.css)
- [Global Styles](./globals.css)
