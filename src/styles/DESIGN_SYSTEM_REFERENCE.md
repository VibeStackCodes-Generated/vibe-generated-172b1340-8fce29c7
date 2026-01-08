# Design System Reference

Complete reference guide for the ConvertFlow design system and theme configuration.

## Color Palette

### Primary Colors (Sky Blue)
Used for primary actions, links, and highlights.

- **50**: `#f0f9ff` - Lightest background
- **100**: `#e0f2fe` - Very light background
- **200**: `#bae6fd` - Light background
- **300**: `#7dd3fc` - Light accent
- **400**: `#38bdf8` - Medium accent
- **500**: `#0ea5e9` - Primary standard
- **600**: `#0284c7` - Primary dark
- **700**: `#0369a1` - Primary darker (hover state)
- **800**: `#075985` - Primary darkest
- **900**: `#0c3d66` - Primary deep

**Usage:**
```tsx
<button className="bg-primary-600 hover:bg-primary-700">Primary Button</button>
<p className="text-primary-600">Link text</p>
<div className="border-primary-200">Container border</div>
```

### Secondary Colors (Purple)
Used for secondary actions and alternative highlights.

- **50**: `#f5f3ff` - Lightest background
- **100**: `#ede9fe` - Very light background
- **200**: `#ddd6fe` - Light background
- **300**: `#c4b5fd` - Light accent
- **400**: `#a78bfa` - Medium accent
- **500**: `#8b5cf6` - Secondary standard
- **600**: `#7c3aed` - Secondary dark
- **700**: `#6d28d9` - Secondary darker
- **800**: `#5b21b6` - Secondary darkest
- **900**: `#3f0f5c` - Secondary deep

**Usage:**
```tsx
<button className="bg-secondary-600">Secondary Button</button>
<span className="text-secondary-600">Secondary text</span>
```

### Success Colors (Green)
Used for positive actions, confirmations, and success messages.

- **50**: `#f0fdf4` - Lightest background
- **100**: `#dcfce7` - Very light background
- **200**: `#bbf7d0` - Light background
- **300**: `#86efac` - Light accent
- **400**: `#4ade80` - Medium accent
- **500**: `#22c55e` - Success standard
- **600**: `#16a34a` - Success dark
- **700**: `#15803d` - Success darker
- **800**: `#166534` - Success darkest
- **900**: `#145231` - Success deep

**Usage:**
```tsx
<div className="bg-success-50 border-success-200">Success alert</div>
<p className="text-success-600">✓ Action completed</p>
```

### Warning Colors (Amber)
Used for warnings, cautions, and attention-needed states.

- **50**: `#fffbeb` - Lightest background
- **100**: `#fef3c7` - Very light background
- **200**: `#fde68a` - Light background
- **300**: `#fcd34d` - Light accent
- **400**: `#fbbf24` - Medium accent
- **500**: `#f59e0b` - Warning standard
- **600**: `#d97706` - Warning dark
- **700**: `#b45309` - Warning darker
- **800**: `#92400e` - Warning darkest
- **900**: `#78350f` - Warning deep

**Usage:**
```tsx
<div className="bg-warning-50 border-warning-200">Warning alert</div>
<p className="text-warning-600">⚠ This action cannot be undone</p>
```

### Error Colors (Red)
Used for errors, destructive actions, and critical states.

- **50**: `#fef2f2` - Lightest background
- **100**: `#fee2e2` - Very light background
- **200**: `#fecaca` - Light background
- **300**: `#fca5a5` - Light accent
- **400**: `#f87171` - Medium accent
- **500**: `#ef4444` - Error standard
- **600**: `#dc2626` - Error dark
- **700**: `#b91c1c` - Error darker
- **800**: `#991b1b` - Error darkest
- **900**: `#7f1d1d` - Error deep

**Usage:**
```tsx
<div className="bg-error-50 border-error-200">Error alert</div>
<button className="bg-error-600 hover:bg-error-700">Delete</button>
<p className="text-error-600">✗ Error occurred</p>
```

### Neutral Colors (Grayscale)
Used for text, borders, backgrounds, and UI elements.

- **50**: `#f9fafb` - Almost white
- **100**: `#f3f4f6` - Very light gray
- **200**: `#e5e7eb` - Light gray
- **300**: `#d1d5db` - Medium-light gray
- **400**: `#9ca3af` - Medium gray
- **500**: `#6b7280` - Medium-dark gray
- **600**: `#4b5563` - Dark gray
- **700**: `#374151` - Darker gray
- **800**: `#1f2937` - Very dark gray
- **900**: `#111827` - Almost black

**Usage:**
```tsx
<p className="text-neutral-600">Secondary text</p>
<div className="border-neutral-200">Subtle border</div>
<input className="bg-neutral-100">Light input background</input>
```

### Semantic UI Colors

- **Background**: `#ffffff` (white) / `#111827` (dark mode)
- **Foreground**: `#111827` (dark) / `#f9fafb` (dark mode)
- **Muted**: `#6b7280` (gray-500)
- **Muted Foreground**: `#4b5563` (gray-600)
- **Border**: `#e5e7eb` (gray-200) / `#374151` (dark mode)
- **Input**: `#f3f4f6` (gray-100) / `#1f2937` (dark mode)
- **Ring**: `#0ea5e9` (primary-500)

## Typography

### Font Families

**Sans Serif (Default)**
```
-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif
```
- System fonts for optimal performance
- Excellent readability on all devices

**Monospace**
```
'SF Mono', Monaco, Inconsolata, 'Roboto Mono', monospace
```
- Used for code, preformatted text
- Fixed-width characters

### Font Sizes

| Size | Value | Usage |
|------|-------|-------|
| xs | 12px | Small labels, captions |
| sm | 14px | Secondary text, hints |
| base | 16px | Default body text |
| lg | 18px | Larger text, emphasis |
| xl | 20px | Subheadings |
| 2xl | 24px | H5, H4 headings |
| 3xl | 30px | H3 headings |
| 4xl | 36px | H2 headings |
| 5xl | 48px | H1 headings |
| 6xl | 60px | Display headings |

**Usage:**
```tsx
<h1 className="text-5xl">Main Title</h1>
<h2 className="text-4xl">Section Title</h2>
<p className="text-base">Body text</p>
<span className="text-xs">Small label</span>
```

### Font Weights

| Weight | Value | Usage |
|--------|-------|-------|
| thin | 100 | Extra light text |
| extralight | 200 | - |
| light | 300 | Fine text |
| normal | 400 | Standard text (default) |
| medium | 500 | Emphasized text |
| semibold | 600 | Subheadings |
| bold | 700 | Strong emphasis, labels |
| extrabold | 800 | High emphasis |
| black | 900 | Maximum emphasis |

**Usage:**
```tsx
<p className="font-light">Light text</p>
<p className="font-normal">Normal text</p>
<strong className="font-bold">Bold text</strong>
<span className="font-semibold">Semibold label</span>
```

### Line Heights

| Type | Value | Usage |
|------|-------|-------|
| none | 1 | Headings without padding |
| tight | 1.25 | Headings |
| snug | 1.375 | Labels |
| normal | 1.5 | Body text (default) |
| relaxed | 1.625 | Comfortable reading |
| loose | 2 | Extra spacing |

## Spacing

Uses an 8px base unit (0.5rem):

| Scale | Value | Pixels | Usage |
|-------|-------|--------|-------|
| 0 | 0 | 0px | No spacing |
| 1 | 0.25rem | 4px | Minimal |
| 2 | 0.5rem | 8px | Tight |
| 3 | 0.75rem | 12px | Snug |
| 4 | 1rem | 16px | Standard |
| 5 | 1.25rem | 20px | Comfortable |
| 6 | 1.5rem | 24px | Generous |
| 7 | 1.75rem | 28px | - |
| 8 | 2rem | 32px | Large |
| 10 | 2.5rem | 40px | Extra large |
| 12 | 3rem | 48px | Huge |
| 14 | 3.5rem | 56px | Massive |
| 16 | 4rem | 64px | Extra massive |
| 20 | 5rem | 80px | Extreme |
| 24 | 6rem | 96px | Extreme |
| 28 | 7rem | 112px | Extreme |
| 32 | 8rem | 128px | Extreme |

**Usage:**
```tsx
<div className="p-4">16px padding</div>
<div className="gap-2">8px gap</div>
<div className="mt-6 mb-8">Margin top 24px, bottom 32px</div>
<div className="px-4 py-2">Horizontal 16px, vertical 8px</div>
```

## Border Radius

| Scale | Value | Pixels | Usage |
|-------|-------|--------|-------|
| none | 0 | 0px | No radius |
| sm | 0.25rem | 4px | Slight round |
| base | 0.375rem | 6px | Default button |
| md | 0.5rem | 8px | Standard radius |
| lg | 0.75rem | 12px | Card radius |
| xl | 1rem | 16px | Large radius |
| 2xl | 1.5rem | 24px | Extra large |
| 3xl | 2rem | 32px | Huge radius |
| full | 9999px | - | Pill shape |

**Usage:**
```tsx
<button className="rounded-md">Standard button</button>
<div className="rounded-lg">Card</div>
<span className="rounded-full">Pill</span>
```

## Shadows

| Shadow | CSS |
|--------|-----|
| none | none |
| sm | `0 1px 2px 0 rgba(0, 0, 0, 0.05)` |
| base | `0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)` |
| md | `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)` |
| lg | `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)` |
| xl | `0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)` |
| 2xl | `0 25px 50px -12px rgba(0, 0, 0, 0.25)` |

**Usage:**
```tsx
<div className="shadow-sm">Subtle shadow</div>
<div className="shadow-md">Card shadow</div>
<div className="shadow-lg">Elevated shadow</div>
<div className="shadow-xl">Modal shadow</div>
```

## Transitions

### Durations

| Duration | Value |
|----------|-------|
| 75 | 75ms |
| 100 | 100ms |
| 150 | 150ms |
| 200 | 200ms |
| 300 | 300ms |
| 500 | 500ms |
| 700 | 700ms |
| 1000 | 1000ms |

### Timing Functions

| Function | Value |
|----------|-------|
| linear | linear |
| in | cubic-bezier(0.4, 0, 1, 1) |
| out | cubic-bezier(0, 0, 0.2, 1) |
| in-out | cubic-bezier(0.4, 0, 0.2, 1) |

**Usage:**
```tsx
<div className="transition-all duration-200 ease-in-out">Smooth</div>
<button className="hover:opacity-75 transition-opacity duration-150">Quick</button>
```

## Responsive Breakpoints (Mobile-First)

| Breakpoint | Value | Usage |
|-----------|-------|-------|
| base | - | Mobile (default) |
| sm | 640px | Small tablets |
| md | 768px | Tablets |
| lg | 1024px | Desktops |
| xl | 1280px | Large desktops |
| 2xl | 1536px | Extra large screens |

**Usage:**
```tsx
<div className="text-base md:text-lg lg:text-xl">
  Responsive text
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  Responsive grid
</div>
```

## Focus & Accessibility

### Focus Ring
```css
--focus-ring: 0 0 0 2px rgba(14, 165, 233, 0.5);
--focus-ring-width: 2px;
--focus-ring-offset: 2px;
```

**Usage:**
```tsx
<button className="focus-visible:outline-ring">Accessible button</button>
```

### Skip to Main Link
```html
<a href="#main-content" className="skip-to-main">Skip to main content</a>
```

## Dark Mode Support

All design tokens automatically support dark mode via CSS variable overrides and Tailwind dark classes.

**CSS Variable Overrides (Dark):**
```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #111827;
    --color-foreground: #f9fafb;
    --color-border: #374151;
  }
}
```

**Tailwind Dark Mode:**
```tsx
<div className="bg-white dark:bg-neutral-900">
  Content
</div>
```

## Utility Classes

### Text Colors
- `.text-primary` - Primary text color
- `.text-secondary` - Secondary text color
- `.text-success` - Success text color
- `.text-warning` - Warning text color
- `.text-error` - Error text color
- `.text-muted` - Muted text color

### Background Colors
- `.bg-primary-soft` - Soft primary background
- `.bg-secondary-soft` - Soft secondary background
- `.bg-success-soft` - Soft success background
- `.bg-warning-soft` - Soft warning background
- `.bg-error-soft` - Soft error background

### Border Colors
- `.border-primary` - Primary border
- `.border-success` - Success border
- `.border-warning` - Warning border
- `.border-error` - Error border

### Transitions
- `.transition-smooth` - Smooth 300ms transition
- `.transition-fast` - Fast 200ms transition
- `.transition-slow` - Slow 500ms transition

### Text Utilities
- `.truncate-line` - Single line truncation
- `.truncate-2-lines` - Two line truncation
- `.truncate-3-lines` - Three line truncation

### Disabled State
- `.disabled-state` - Cursor not-allowed with opacity 50%

## Animation Utilities

### Available Animations
- `fadeIn` - Fade in animation
- `slideInUp` - Slide up animation
- `slideInDown` - Slide down animation
- `slideInLeft` - Slide in from left
- `slideInRight` - Slide in from right
- `scaleIn` - Scale animation

**Usage:**
```tsx
<div className="animate-fadeIn">Content fades in</div>
```

## CSS Variables Reference

All design tokens are available as CSS variables:

```css
/* Colors */
var(--color-primary-500)
var(--color-success-600)
var(--color-error-700)
/* ... and all shade variants */

/* Spacing */
var(--spacing-4)
var(--spacing-8)
/* ... 0 to 32 */

/* Typography */
var(--font-sans)
var(--font-mono)
var(--font-size-base)
var(--font-weight-bold)
var(--line-height-normal)

/* Borders */
var(--radius-md)
var(--radius-lg)

/* Shadows */
var(--shadow-md)
var(--shadow-lg)

/* Transitions */
var(--transition-200)
var(--ease-in-out)

/* Focus */
var(--focus-ring)
```

## Integration Examples

### Button Component
```tsx
<button className="
  px-4 py-2
  bg-primary-600 hover:bg-primary-700
  text-white font-medium
  rounded-md
  transition-all duration-200
  focus-visible:outline-ring
  disabled:opacity-50 disabled:cursor-not-allowed
">
  Click me
</button>
```

### Card Component
```tsx
<div className="
  bg-white dark:bg-neutral-900
  border border-neutral-200 dark:border-neutral-700
  rounded-lg
  shadow-md hover:shadow-lg
  transition-shadow duration-200
  p-6
">
  Card content
</div>
```

### Form Input
```tsx
<input
  className="
    w-full
    px-3 py-2
    border border-neutral-200 dark:border-neutral-700
    bg-white dark:bg-neutral-900
    text-foreground
    rounded-md
    focus-visible:outline-ring focus-visible:border-primary-500
    disabled:bg-neutral-100 disabled:cursor-not-allowed
  "
  type="text"
  placeholder="Enter text..."
/>
```

## Colors in Action

All components should use these semantic colors based on their purpose:

- **Primary actions**: Primary color
- **Secondary actions**: Secondary color
- **Success states**: Success color
- **Warnings**: Warning color
- **Errors**: Error color
- **Text**: Foreground color
- **Backgrounds**: Background/Input colors
- **Borders**: Border/Neutral colors

This ensures visual consistency and accessibility across the entire application.
