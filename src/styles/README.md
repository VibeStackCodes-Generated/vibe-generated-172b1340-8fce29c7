# Design System Documentation

This directory contains the complete design system for the ConvertFlow application, including CSS variables, global styles, theme configuration, and component styling strategies.

## 📁 File Structure

```
src/styles/
├── theme.ts                    # Design tokens and theme configuration
├── variables.css               # CSS custom properties (variables)
├── globals.css                 # Global styles, CSS reset, and base element styling
├── examples.module.css         # CSS Module examples for component styling
├── component-strategy.md        # Component styling approach and best practices
├── README.md                   # This file
```

## 🎨 Design Tokens

All design tokens are defined in `theme.ts` and available as TypeScript types. These tokens include:

### Colors
- **Primary**: Sky blue palette (primary brand color)
- **Secondary**: Purple palette (accent color)
- **Semantic**: Success (green), Warning (amber), Error (red)
- **Neutral**: Grayscale (50-900 shades)
- **UI Colors**: Background, foreground, borders, etc.

### Spacing
8px-based spacing scale (4px to 128px) with semantic naming:
- `spacing-1` = 4px
- `spacing-2` = 8px
- `spacing-4` = 16px
- `spacing-8` = 32px
- etc.

### Typography
- **Font Families**: System sans-serif, monospace
- **Font Sizes**: 12px (xs) to 60px (6xl)
- **Font Weights**: 100 (thin) to 900 (black)
- **Line Heights**: 1 (tight) to 2 (loose)
- **Letter Spacing**: -0.05em to 0.1em

### Borders & Shadows
- **Border Radius**: 0 to 9999px with semantic names
- **Box Shadows**: From subtle (sm) to dramatic (2xl)

### Transitions
- **Durations**: 75ms to 1000ms
- **Timing Functions**: Linear, In, Out, In-Out

## 🎯 CSS Variables

Global CSS variables are defined in `variables.css` for runtime theming. All variables follow a consistent naming convention:

```css
--color-primary-500
--spacing-4
--font-size-base
--border-radius-md
--box-shadow-lg
--transition-300
```

### Accessing CSS Variables

In CSS:
```css
.element {
  color: var(--color-primary-500);
  padding: var(--spacing-4);
  font-size: var(--font-size-base);
}
```

In TypeScript/React:
```tsx
const color = 'var(--color-primary-500)'
<div style={{ color }}>Text</div>
```

## 🌍 Global Styles

`globals.css` provides:

1. **CSS Reset**
   - Normalizes default browser styles
   - Removes unwanted margins/paddings
   - Resets form elements

2. **Base Element Styles**
   - Typography defaults for headings, paragraphs, lists
   - Link styling with focus states
   - Button reset
   - Form input styling
   - Code and pre formatting

3. **Accessibility Features**
   - Focus ring utilities for keyboard navigation
   - High contrast mode support
   - Reduced motion support (respects `prefers-reduced-motion`)
   - Skip links for screen readers

4. **Dark Mode Support**
   - Media query-based theme switching
   - Automatic color inversion
   - CSS variables updated for dark mode

5. **Print Styles**
   - Optimized styles for printing
   - Hides non-essential UI elements

## 🎨 Styling Strategies

### Approach 1: Tailwind CSS (Recommended)

Use Tailwind utility classes for 90% of styling. This is the fastest and most maintainable approach.

```tsx
export function Card() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md hover:shadow-lg transition-smooth">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Title</h2>
      <p className="text-gray-600">Content here</p>
    </div>
  )
}
```

**When to use:**
- Simple components
- Standard layouts
- Responsive designs
- Quick prototyping

### Approach 2: CSS Modules

Use CSS modules for complex component styles requiring:
- Complex animations/keyframes
- Component-specific scoping
- Dynamic state styling
- Pseudo-elements

```tsx
// Button.module.css
.button {
  padding: var(--spacing-3) var(--spacing-4);
  border-radius: var(--radius-md);
  transition: all var(--transition-200) var(--ease-in-out);
}

.button:hover {
  box-shadow: var(--shadow-md);
}

// Button.tsx
import styles from './Button.module.css'

export function Button({ children }) {
  return <button className={styles.button}>{children}</button>
}
```

**When to use:**
- Complex animations
- Component-specific transitions
- Scoped styles to avoid conflicts
- Media queries beyond breakpoints

### Approach 3: Inline Styles (Rarely)

Use inline styles ONLY for truly dynamic values that can't be expressed with classes.

```tsx
<div style={{ width: `${percentage}%` }} />
```

## 🛠️ Utility Functions

### `cn()` - Class Name Combiner

Safely combine Tailwind classes with conditional logic:

```tsx
import { cn } from '@/utils/cn'

// Usage
const classes = cn(
  'px-4 py-2',
  isActive && 'bg-blue-500 text-white',
  disabled && 'opacity-50 cursor-not-allowed'
)
```

### `useTheme()` - Theme Access Hook

Get type-safe access to theme configuration:

```tsx
import { useTheme } from '@/hooks/useTheme'

const theme = useTheme()
const primaryColor = theme.colors.primary[600]
```

## 🌈 Semantic Color Utilities

Pre-built utility classes for common color patterns:

```tsx
// Text colors
<p className="text-primary">Primary text</p>
<p className="text-success">Success text</p>
<p className="text-error">Error text</p>

// Background colors
<div className="bg-primary-soft">Soft primary background</div>
<div className="bg-success-soft">Soft success background</div>

// Border colors
<div className="border border-error">Error border</div>
```

## 🎬 Animation Examples

Pre-built animation utilities in `examples.module.css`:

```css
.fadeIn { animation: fadeIn 200ms ease-out; }
.slideInUp { animation: slideUp 300ms ease-out; }
.slideInDown { animation: slideDown 300ms ease-out; }
.scaleIn { animation: scaleIn 300ms ease-out; }
.spinLoader { animation: spinLoader 1s linear infinite; }
```

## 📱 Responsive Design

Tailwind breakpoints are configured from the theme:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* Responsive grid */}
</div>

<div className="text-sm md:text-base lg:text-lg">
  {/* Responsive typography */}
</div>
```

## 🔐 Dark Mode

All colors automatically support dark mode through:
1. CSS variables updated via media query
2. Tailwind's `dark:` prefix for utilities

```tsx
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  Automatically adjusts for dark mode
</div>
```

## ♿ Accessibility

### Focus States

All interactive elements have visible focus rings:

```tsx
<button className="focus-ring">
  Keyboard accessible button
</button>
```

### Color Contrast

All color combinations meet WCAG AA contrast standards. Check system preferences for high contrast mode support.

### Reduced Motion

Respects `prefers-reduced-motion` system preference - animations are disabled for users who prefer no motion.

## 📊 Component Examples

See `examples.module.css` for complete implementations of:
- Button component (multiple variants and sizes)
- Card component with header/footer
- Input component (normal, error, success states)
- Modal component with overlay
- Layout utilities (flex, grid, stack)
- Animation utilities (fade, slide, scale)

## 🚀 Best Practices

### ✅ Do

- Use Tailwind CSS for most styling
- Reference CSS variables for semantic values
- Create reusable component classes
- Test keyboard navigation and focus states
- Support dark mode with `dark:` prefix
- Use semantic color utilities
- Extract long class strings to CSS modules

### ❌ Don't

- Hardcode color values (use CSS variables)
- Mix CSS methodologies unnecessarily
- Create overly long className strings
- Use `!important` (except in utilities)
- Forget about accessibility
- Ignore dark mode support
- Use inline styles for static values

## 📚 Resources

- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Design Tokens Configuration](./theme.ts)
- [CSS Variables Reference](./variables.css)
- [Global Styles](./globals.css)
- [Component Styling Guide](./component-strategy.md)
- [CSS Module Examples](./examples.module.css)

## 🔄 Extending the Design System

### Adding a New Color

1. Add to `theme.ts` colors object:
   ```ts
   new: {
     50: '#...',
     500: '#...',
     600: '#...',
   }
   ```

2. Add to `variables.css`:
   ```css
   --color-new-50: #...;
   --color-new-500: #...;
   ```

3. Update `tailwind.config.ts` if needed

### Adding Custom Spacing

1. Extend in `theme.ts` spacing object
2. Add CSS variables in `variables.css`
3. Update Tailwind config if needed

### Adding Custom Typography

1. Extend `typography` in `theme.ts`
2. Add font and size variables in `variables.css`
3. Apply to HTML elements in `globals.css`

## 🐛 Troubleshooting

**Q: Dark mode not working?**
A: Ensure your system has dark mode enabled. The project uses `prefers-color-scheme` media query.

**Q: CSS variables not found?**
A: Make sure `src/styles/globals.css` is imported in your CSS entry point (`src/index.css`).

**Q: Tailwind classes not being recognized?**
A: Check that `tailwind.config.ts` is properly configured with the theme extensions.

**Q: Focus ring not visible?**
A: Use the `.focus-ring` utility class or ensure outline styles aren't being overridden.

---

For more detailed information, refer to the individual files in this directory.
