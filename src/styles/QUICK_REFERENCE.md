# Design System Quick Reference

Fast lookup guide for common design system patterns.

## 🎨 Color Usage

### Text Colors
```tsx
// Using semantic classes
<p className="text-primary">Primary text</p>
<p className="text-success">Success text</p>
<p className="text-error">Error text</p>
<p className="text-warning">Warning text</p>

// Using Tailwind
<p className="text-sky-600 dark:text-sky-400">Custom blue text</p>
```

### Background Colors
```tsx
// Soft backgrounds
<div className="bg-primary-soft">Soft primary</div>
<div className="bg-success-soft">Soft success</div>
<div className="bg-error-soft">Soft error</div>

// Direct colors
<div className="bg-sky-50">Very light blue</div>
<div className="bg-sky-600">Medium blue</div>
```

### Border Colors
```tsx
<div className="border border-primary">Primary border</div>
<div className="border border-error">Error border</div>
<div className="border-2 border-warning">Thick warning border</div>
```

## 📏 Spacing

### Common Padding/Margin
```tsx
// Padding
<div className="p-4">All sides</div>
<div className="px-4 py-2">Horizontal and vertical</div>
<div className="pt-4 pb-2 pl-6 pr-3">Individual sides</div>

// Margin
<div className="m-4">All sides</div>
<div className="mx-auto">Center horizontally</div>
<div className="mb-6 mt-4">Top and bottom</div>

// Gap (for flex/grid)
<div className="flex gap-4">Flex with gap</div>
<div className="grid gap-6">Grid with gap</div>
```

### Spacing Scale
- `p-1` = 4px
- `p-2` = 8px
- `p-3` = 12px
- `p-4` = 16px (base unit)
- `p-6` = 24px
- `p-8` = 32px

## 🔤 Typography

### Font Sizes
```tsx
<h1 className="text-5xl font-bold">Heading 1 (48px)</h1>
<h2 className="text-4xl font-bold">Heading 2 (36px)</h2>
<h3 className="text-3xl font-semibold">Heading 3 (30px)</h3>
<h4 className="text-2xl font-semibold">Heading 4 (24px)</h4>
<h5 className="text-xl font-semibold">Heading 5 (20px)</h5>
<h6 className="text-lg font-semibold">Heading 6 (18px)</h6>

<p className="text-base">Body text (16px)</p>
<small className="text-sm">Small text (14px)</small>
<code className="text-xs">Code text (12px)</code>
```

### Font Weights
```tsx
<span className="font-light">Light (300)</span>
<span className="font-normal">Normal (400)</span>
<span className="font-medium">Medium (500)</span>
<span className="font-semibold">Semi-bold (600)</span>
<span className="font-bold">Bold (700)</span>
<span className="font-extrabold">Extra-bold (800)</span>
```

## 🔘 Buttons

### Basic Button
```tsx
import { cn } from '@/utils/cn'

<button className={cn(
  'px-4 py-2',
  'bg-sky-600 text-white',
  'rounded-md font-medium',
  'hover:bg-sky-700',
  'focus-ring',
  'disabled:opacity-50'
)}>
  Click me
</button>
```

### Button Variants
```tsx
// Primary
<button className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700">Primary</button>

// Secondary
<button className="px-4 py-2 bg-neutral-100 text-neutral-900 rounded-md hover:bg-neutral-200 dark:bg-neutral-800 dark:text-white">Secondary</button>

// Outline
<button className="px-4 py-2 border-2 border-sky-600 text-sky-600 rounded-md hover:bg-sky-50">Outline</button>

// Ghost
<button className="px-4 py-2 text-sky-600 hover:bg-sky-50 rounded-md">Ghost</button>
```

## 📦 Cards

### Basic Card
```tsx
<div className="rounded-lg border border-gray-200 bg-white shadow-md p-6 dark:border-gray-800 dark:bg-gray-900">
  <h3 className="text-xl font-bold mb-4">Card Title</h3>
  <p className="text-gray-600 dark:text-gray-400">Card content</p>
</div>
```

### Card with Header/Footer
```tsx
<div className="rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-800 dark:bg-gray-900">
  {/* Header */}
  <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 dark:border-gray-800 dark:bg-gray-800">
    <h3 className="text-lg font-semibold">Header</h3>
  </div>

  {/* Content */}
  <div className="px-6 py-4">
    <p>Card content</p>
  </div>

  {/* Footer */}
  <div className="border-t border-gray-200 bg-gray-50 px-6 py-4 flex justify-end gap-2 dark:border-gray-800 dark:bg-gray-800">
    <button>Cancel</button>
    <button>Save</button>
  </div>
</div>
```

## 🎯 Inputs

### Text Input
```tsx
<div className="flex flex-col gap-2">
  <label className="font-medium text-gray-900 dark:text-white">Label</label>
  <input
    className="px-4 py-2 border border-gray-200 rounded-md bg-white text-gray-900 focus:border-sky-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
    placeholder="Enter text..."
  />
  <p className="text-sm text-gray-600 dark:text-gray-400">Helper text</p>
</div>
```

### Input with Error
```tsx
<input
  className="px-4 py-2 border-2 border-red-500 rounded-md bg-red-50 dark:bg-red-950"
  placeholder="Error input"
/>
<p className="text-sm text-red-600 mt-2">Error message</p>
```

## 📱 Responsive Design

### Mobile-First Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* 1 column on mobile, 2 on tablet, 3 on desktop */}
</div>
```

### Responsive Padding
```tsx
<div className="p-4 md:p-6 lg:p-8">
  Padding scales from 16px to 32px
</div>
```

### Hide/Show Elements
```tsx
<div className="hidden md:block">Only visible on tablet and up</div>
<div className="md:hidden">Only visible on mobile</div>
<div className="lg:flex">Only visible on desktop (and flex)</div>
```

## 🌙 Dark Mode

### Manual Dark Mode
```tsx
// These automatically adjust for dark mode
<div className="bg-white dark:bg-gray-900">
  <p className="text-gray-900 dark:text-white">Content</p>
</div>

// Using semantic colors
<div className="bg-primary-soft text-primary">
  Automatically dark mode compatible
</div>
```

## ⌨️ Focus & Accessibility

### Focus Ring
```tsx
<button className="focus-ring px-4 py-2">
  Focus ring on keyboard focus
</button>

<input className="focus-ring-sm border" />
```

### Skip Link
```tsx
<a href="#main" className="skip-to-main">Skip to main content</a>
```

## ⏱️ Animations

### Transition Utilities
```tsx
<button className="transition-smooth hover:bg-sky-700">
  Smooth transition (300ms)
</button>

<div className="transition-fast">Fast transition (200ms)</div>

<div className="transition-slow">Slow transition (500ms)</div>
```

### Using CSS Module Animations
```tsx
import styles from './MyComponent.module.css'

<div className={styles.fadeIn}>Fades in</div>
<div className={styles.slideInUp}>Slides up</div>
<div className={styles.scaleIn}>Scales in</div>
```

## 🎨 Using CSS Variables

### In CSS
```css
.myElement {
  color: var(--color-primary-500);
  padding: var(--spacing-4);
  font-size: var(--font-size-base);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-300) var(--ease-in-out);
}
```

### In TypeScript
```tsx
const color = 'var(--color-primary-500)'
<div style={{ color }}>Colored text</div>
```

## 🛠️ Utility Functions

### Class Combining
```tsx
import { cn } from '@/utils/cn'

const buttonClass = cn(
  'px-4 py-2 rounded-md font-medium',
  variant === 'primary' && 'bg-sky-600 text-white',
  variant === 'secondary' && 'bg-gray-100 text-gray-900',
  disabled && 'opacity-50 cursor-not-allowed'
)
```

### Theme Access
```tsx
import { useTheme, useThemeColor } from '@/hooks/useTheme'

const theme = useTheme()
const primaryColor = useThemeColor('primary.600')
```

## 📐 Common Patterns

### Flex Center
```tsx
<div className="flex items-center justify-center h-32">
  Centered content
</div>
```

### Flex Between
```tsx
<div className="flex items-center justify-between">
  <div>Left</div>
  <div>Right</div>
</div>
```

### Grid Layout
```tsx
<div className="grid grid-cols-12 gap-4">
  <div className="col-span-6">Half width</div>
  <div className="col-span-6">Half width</div>
  <div className="col-span-12">Full width</div>
</div>
```

### Overlay
```tsx
<div className="fixed inset-0 bg-black/50 flex items-center justify-center">
  <div className="bg-white rounded-lg p-8">Modal content</div>
</div>
```

## 🔗 Useful Links

- Design Tokens: `src/styles/theme.ts`
- CSS Variables: `src/styles/variables.css`
- Global Styles: `src/styles/globals.css`
- Component Examples: `src/styles/examples.module.css`
- Full Documentation: `src/styles/README.md`
- Styling Guide: `src/styles/component-strategy.md`

## 💡 Tips

1. **Use semantic classes first**: `.text-primary`, `.bg-success-soft`
2. **Use Tailwind for 90% of styling**: Faster than CSS modules
3. **Extract long class strings**: To CSS modules for reusability
4. **Test dark mode**: Use browser dev tools to toggle dark mode
5. **Check accessibility**: Use keyboard to navigate, check focus rings
6. **Responsive mobile-first**: Start with mobile, add md:, lg: prefixes
7. **Use focus-ring**: On all interactive elements for keyboard users

---

For more details, see the full documentation in `src/styles/README.md`
