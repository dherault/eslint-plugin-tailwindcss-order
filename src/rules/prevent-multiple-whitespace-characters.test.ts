import { RuleTester } from 'eslint'

import { preventMultipleWhitespaceCharacters } from './prevent-multiple-whitespace-characters'
import { createCodes } from './test-helpers'

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
})

describe('prevent-multiple-whitespace-characters', () => {
  createCodes.forEach(([name, createCode]) => {
    ruleTester.run(`prevent-multiple-whitespace-characters (${name})`, preventMultipleWhitespaceCharacters, {
      valid: [
        { code: createCode('flex grow') },
        { code: createCode('flex items-center') },
        { code: createCode('bg-blue-500 text-white') },
        { code: createCode('') },
        { code: createCode('bg-blue-500') },
      ],
      invalid: [
        {
          code: createCode('flex  grow'),
          errors: [{ messageId: 'multipleWhitespace' }],
          output: createCode('flex grow'),
        },
        {
          code: createCode('flex   grow'),
          errors: [{ messageId: 'multipleWhitespace' }],
          output: createCode('flex grow'),
        },
        {
          code: createCode('flex  items-center  grow'),
          errors: [{ messageId: 'multipleWhitespace' }],
          output: createCode('flex items-center grow'),
        },
      ],
    })
  })
})
