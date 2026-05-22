import type { Rule } from 'eslint'

import { DEFAULT_ORDER } from '../constants'
import { extractClassString } from './utils'

/**
 * Parses a Tailwind class into its modifiers and base class.
 * E.g., "dark:hover:bg-blue-500" -> { modifiers: "dark:hover:", base: "bg-blue-500" }
 */
const parseClass = (cls: string): { modifiers: string, base: string } => {
  const lastColonIndex = cls.lastIndexOf(':')
  if (lastColonIndex === -1) {
    return { modifiers: '', base: cls }
  }

  return {
    modifiers: cls.substring(0, lastColonIndex + 1),
    base: cls.substring(lastColonIndex + 1),
  }
}

/**
 * Compares two modifier strings for sorting.
 * Order: no modifier < state modifiers (hover, focus, etc.) < dark < media queries (sm, md, lg, etc.)
 */
const compareModifiers = (a: string, b: string): number => {
  if (a === b) return 0
  if (a === '') return -1 // no modifier comes first
  if (b === '') return 1

  // Parse modifiers into categories
  const parseModifierCategories = (mod: string) => {
    const parts = mod.slice(0, -1).split(':') // Remove trailing ':' and split
    const mediaQueries = ['sm', 'md', 'lg', 'xl', '2xl']
    const stateModifiers = [
      'hover', 'focus', 'active', 'focus-within', 'focus-visible',
      'disabled', 'enabled', 'checked', 'indeterminate', 'default',
      'required', 'valid', 'invalid', 'in-range', 'out-of-range',
      'placeholder-shown', 'autofill', 'read-only',
      'visited', 'target', 'first', 'last', 'only', 'odd', 'even',
      'first-of-type', 'last-of-type', 'only-of-type',
      'empty', 'open', 'group-hover', 'peer-hover',
      'group-focus', 'peer-focus', 'group-active', 'peer-active',
    ]

    const hasDark = parts.includes('dark')
    const mediaList = parts.filter(p => mediaQueries.includes(p))
    const stateList = parts.filter(p => stateModifiers.includes(p) || p.startsWith('group-') || p.startsWith('peer-'))
    const hasMedia = mediaList.length > 0

    return { hasMedia, hasDark, stateList, mediaList, parts }
  }

  const parsedA = parseModifierCategories(a)
  const parsedB = parseModifierCategories(b)

  // First sort by presence of media query (no media < has media)
  if (parsedA.hasMedia !== parsedB.hasMedia) {
    return parsedA.hasMedia ? 1 : -1
  }

  // Then by dark mode (no dark < has dark)
  if (parsedA.hasDark !== parsedB.hasDark) {
    return parsedA.hasDark ? 1 : -1
  }

  // Then by state modifiers alphabetically
  const stateCompare = parsedA.stateList.join(':').localeCompare(parsedB.stateList.join(':'))
  if (stateCompare !== 0) return stateCompare

  // Then by media query in size order
  if (parsedA.mediaList.length > 0 || parsedB.mediaList.length > 0) {
    const mediaOrder = ['sm', 'md', 'lg', 'xl', '2xl']
    const mediaStrA = parsedA.mediaList
      .map(m => mediaOrder.indexOf(m))
      .join(',')
    const mediaStrB = parsedB.mediaList
      .map(m => mediaOrder.indexOf(m))
      .join(',')

    const mediaCompare = mediaStrA.localeCompare(mediaStrB)
    if (mediaCompare !== 0) return mediaCompare
  }

  // Fallback to full string comparison for any edge cases
  return a.localeCompare(b)
}

const getOrderIndex = (cls: string, order: readonly string[]): number => {
  // First try exact match
  const exactIndex = order.indexOf(cls)
  if (exactIndex !== -1) {
    return exactIndex
  }

  // Strip leading '-' for negative values when checking prefixes
  const classToCheck = cls.startsWith('-') ? cls.substring(1) : cls

  // Then try prefix match
  for (let i = 0; i < order.length; i++) {
    const prefix = order[i]
    if (prefix.endsWith('-') || prefix.endsWith(':')) {
      if (classToCheck.startsWith(prefix)) {
        return i
      }
    }
  }

  // Not found, return Infinity to sort at the end
  return Infinity
}

const sortClasses = (classes: string[], order?: string[]): string[] => {
  const orderToUse = order ?? DEFAULT_ORDER

  if (orderToUse.length === 0) {
    // Fallback to alphabetical sorting if no order provided
    return [...classes].sort()
  }

  // Sort: classes in custom order come first, then unspecified classes sorted by DEFAULT_ORDER
  return [...classes].sort((a, b) => {
    const parsedA = parseClass(a)
    const parsedB = parseClass(b)

    const getPriorityRank = (base: string): number => {
      if (base === '@container' || base.startsWith('@container/')) return 0
      if (base === 'group' || base.startsWith('group/')) return 1

      return 2
    }

    const priorityA = getPriorityRank(parsedA.base)
    const priorityB = getPriorityRank(parsedB.base)

    if (priorityA !== priorityB) {
      return priorityA - priorityB
    }

    if (priorityA < 2) {
      const baseCompare = parsedA.base.localeCompare(parsedB.base)
      if (baseCompare !== 0) return baseCompare

      return compareModifiers(parsedA.modifiers, parsedB.modifiers)
    }

    // First, sort by base class using custom order
    const indexA = getOrderIndex(parsedA.base, orderToUse)
    const indexB = getOrderIndex(parsedB.base, orderToUse)

    // If at least one class is not in custom order, check DEFAULT_ORDER
    if (indexA === Infinity || indexB === Infinity) {
      // If both are not in custom order, sort using DEFAULT_ORDER
      if (indexA === Infinity && indexB === Infinity) {
        const defaultIndexA = getOrderIndex(parsedA.base, DEFAULT_ORDER)
        const defaultIndexB = getOrderIndex(parsedB.base, DEFAULT_ORDER)

        if (defaultIndexA !== defaultIndexB) {
          return defaultIndexA - defaultIndexB
        }

        // If both are also not in DEFAULT_ORDER, sort alphabetically
        const baseCompare = parsedA.base.localeCompare(parsedB.base)
        if (baseCompare !== 0) return baseCompare
      }
      // One is not in custom order but one is - sort the one in custom order first
      else {
        return indexA - indexB
      }
    }
    // Both are in custom order, sort by custom order position
    else if (indexA !== indexB) {
      return indexA - indexB
    }

    // Base classes are the same (or have the same order index), now sort by modifiers
    return compareModifiers(parsedA.modifiers, parsedB.modifiers)
  })
}

export const sortTailwindCssClasses: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Sort Tailwind CSS classes in a custom order',
      recommended: true,
      url: 'https://github.com/dherault/eslint-plugin-tailwindcss-order',
    },
    fixable: 'code',
    schema: [
      {
        type: 'array',
        items: {
          type: 'string',
        },
        uniqueItems: true,
      },
    ],
    messages: {
      unsorted: 'Tailwind classes are not properly sorted',
    },
  },
  create(context) {
    const customOrder = context.options[0] as string[] | undefined

    return {
      JSXAttribute(node: any) {
        // Check if this is a className attribute
        if (node.name.name !== 'className') {
          return
        }

        const classStrings = extractClassString(node, context)

        for (const { classString, valueNode, quoteChar } of classStrings) {
          if (!classString || !valueNode) {
            continue
          }

          const classes = classString.split(/\s+/).filter(Boolean)
          const sorted = sortClasses(classes, customOrder)

          // Check if already sorted
          if (classes.join(' ') !== sorted.join(' ')) {
            context.report({
              node,
              messageId: 'unsorted',
              fix(fixer) {
                return fixer.replaceText(
                  valueNode,
                  `${quoteChar}${sorted.join(' ')}${quoteChar}`,
                )
              },
            })
          }
        }
      },
    }
  },
}
