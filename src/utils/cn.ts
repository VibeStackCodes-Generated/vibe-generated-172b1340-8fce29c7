/**
 * Utility function for combining and conditionally adding CSS class names
 * This is useful for building dynamic class strings with Tailwind CSS
 */

/**
 * Combines multiple class strings and conditionally includes classes based on boolean values
 * Removes falsy values and extra whitespace
 *
 * @param classes - Array of class strings, objects with boolean conditions, or plain strings
 * @returns Combined class string
 *
 * @example
 * // Basic usage
 * cn('px-4 py-2', 'text-white')
 * // => 'px-4 py-2 text-white'
 *
 * // Conditional classes
 * cn('px-4 py-2', isActive && 'bg-blue-500')
 * // => 'px-4 py-2' (if isActive is false)
 *
 * // With objects
 * cn('px-4 py-2', {
 *   'bg-blue-500': isActive,
 *   'bg-gray-100': !isActive,
 * })
 *
 * // Mixed usage
 * cn('px-4 py-2', isActive && ['bg-blue-500', 'text-white'])
 */
export function cn(
  ...classes: (
    | string
    | undefined
    | null
    | false
    | Record<string, boolean>
    | (string | undefined | null | false)[]
  )[]
): string {
  const result: string[] = []

  for (const cls of classes) {
    if (!cls) continue

    if (typeof cls === 'string') {
      result.push(cls)
    } else if (Array.isArray(cls)) {
      const joined = cn(...cls)
      if (joined) result.push(joined)
    } else if (typeof cls === 'object') {
      for (const [key, value] of Object.entries(cls)) {
        if (value) result.push(key)
      }
    }
  }

  return result.join(' ').replace(/\s+/g, ' ').trim()
}

/**
 * Alternative import alias for cn function
 * Some projects prefer 'clsx' naming
 */
export const clsx = cn

/**
 * Merges Tailwind CSS class strings, removing duplicates and respecting precedence
 * Useful for combining component base styles with additional classes
 *
 * @example
 * mergeClasses('px-4 py-2', 'px-6')
 * // => 'py-2 px-6' (px-6 overrides px-4)
 */
export function mergeClasses(...classes: (string | undefined)[]): string {
  const classMap = new Map<string, string>()
  const order: string[] = []

  for (const classStr of classes) {
    if (!classStr) continue

    for (const cls of classStr.split(/\s+/)) {
      if (!cls) continue

      // Get the base class (everything before the last dash or number)
      const baseClass = cls.replace(/^(.*?)(-\d+)?$/, '$1')

      if (classMap.has(baseClass)) {
        // Remove the old one
        const oldValue = classMap.get(baseClass)!
        const oldIndex = order.indexOf(oldValue)
        if (oldIndex > -1) {
          order.splice(oldIndex, 1)
        }
      } else {
        order.push(baseClass)
      }

      classMap.set(baseClass, cls)
    }
  }

  return order.map((base) => classMap.get(base)).join(' ')
}

/**
 * Checks if a string is a valid Tailwind CSS class
 * Useful for validating dynamic class strings
 *
 * @example
 * isValidTailwindClass('px-4')
 * // => true
 */
export function isValidTailwindClass(cls: string): boolean {
  // Simple validation - can be enhanced based on your needs
  const validPatterns = [
    /^[a-z]+-\d+/, // e.g., px-4, mb-2
    /^[a-z]+-\[.+\]/, // e.g., w-[400px]
    /^(w|h|text|bg|border|m|p|flex|grid|inline|block|hidden|absolute|relative|fixed|sticky)/, // common utilities
  ]

  return validPatterns.some((pattern) => pattern.test(cls))
}

/**
 * Creates a responsive class string based on breakpoint
 * Useful for building responsive Tailwind classes dynamically
 *
 * @example
 * responsive('px-4', { md: 'px-6', lg: 'px-8' })
 * // => 'px-4 md:px-6 lg:px-8'
 */
export function responsive(
  base: string,
  breakpoints: Partial<Record<'sm' | 'md' | 'lg' | 'xl' | '2xl', string>>
): string {
  const classes = [base]

  if (breakpoints.sm) classes.push(`sm:${breakpoints.sm}`)
  if (breakpoints.md) classes.push(`md:${breakpoints.md}`)
  if (breakpoints.lg) classes.push(`lg:${breakpoints.lg}`)
  if (breakpoints.xl) classes.push(`xl:${breakpoints.xl}`)
  if (breakpoints['2xl']) classes.push(`2xl:${breakpoints['2xl']}`)

  return classes.join(' ')
}

/**
 * Converts a style object to a string of Tailwind classes
 * Useful for mapping style objects to Tailwind utilities
 *
 * @example
 * styleToClasses({ padding: '4', textColor: 'blue-600' })
 * // => 'p-4 text-blue-600'
 */
export function styleToClasses(
  styles: Record<string, string | number | boolean>
): string {
  const classMap: Record<string, string> = {
    padding: 'p',
    paddingX: 'px',
    paddingY: 'py',
    paddingTop: 'pt',
    paddingRight: 'pr',
    paddingBottom: 'pb',
    paddingLeft: 'pl',
    margin: 'm',
    marginX: 'mx',
    marginY: 'my',
    marginTop: 'mt',
    marginRight: 'mr',
    marginBottom: 'mb',
    marginLeft: 'ml',
    width: 'w',
    height: 'h',
    fontSize: 'text',
    fontWeight: 'font',
    textColor: 'text',
    backgroundColor: 'bg',
    borderColor: 'border',
    borderRadius: 'rounded',
    textAlign: 'text',
  }

  const result: string[] = []

  for (const [key, value] of Object.entries(styles)) {
    if (!value) continue

    const tailwindKey = classMap[key] || key
    result.push(`${tailwindKey}-${value}`)
  }

  return result.join(' ')
}
