import type { Rule } from 'eslint'

import { extractClassString } from './utils'

export const preventMultipleWhitespaceCharacters: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Prevent multiple consecutive whitespace characters in Tailwind CSS class strings',
      recommended: true,
      url: 'https://github.com/dherault/eslint-plugin-tailwindcss-order',
    },
    fixable: 'code',
    messages: {
      multipleWhitespace: 'Multiple consecutive whitespace characters are not allowed in className',
    },
  },
  create(context) {
    return {
      JSXAttribute(node: any) {
        if (node.name.name !== 'className') return

        const classStrings = extractClassString(node, context)

        for (const { classString, valueNode, quoteChar } of classStrings) {
          if (!classString || !valueNode) continue

          if (/\s{2,}|^\s|\s$/.test(classString)) {
            context.report({
              node,
              messageId: 'multipleWhitespace',
              fix(fixer) {
                const normalized = classString.replace(/\s+/g, ' ').trim()
                return fixer.replaceText(valueNode, `${quoteChar}${normalized}${quoteChar}`)
              },
            })
          }
        }
      },
    }
  },
}
