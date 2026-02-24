import { RuleTester } from 'eslint'

import { sortTailwindCssClasses } from '../rules/sort-tailwind-css-classes'

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
})

function createDivCode(className: string) {
  return `
function Component() {
  return <div className="${className}" />
}
  `
}

function createVariableDivCode(className: string) {
  return `
function Component() {
  const classes = "${className}"
  return <div className={classes} />
}
  `
}

function createConditionDivCode(className: string) {
  return `
function Component() {
  const bool = Math.random() > 0.5
  const classes = "${className}"
  return <div className={bool ? classes : null} />
}
  `
}

function createCnDivCode(className: string) {
  return `
import { cn } from 'classnames'
function Component() {
  return (
    <div
      className={cn({
        ["${className}"]: true,
      })}
    />
  )
}
  `
}

function createDoubleCnDivCode(className: string) {
  return `
import { cn } from 'classnames'
function Component() {
  return (
    <div
      className={cn({
        ["${className}"]: true,
        ["flex items-center"]: false,
      })}
    />
  )
}
  `
}

function createCnNoBracketsDivCode(className: string) {
  return `
import { cn } from 'classnames'
function Component() {
  return (
    <div
      className={cn({
        "${className}": true,
      })}
    />
  )
}
  `
}

function createDoubleCnNoBracketsDivCode(className: string) {
  return `
import { cn } from 'classnames'
function Component() {
  return (
    <div
      className={cn({
        "${className}": true,
        "flex items-center": false,
      })}
    />
  )
}
  `
}

function createStringInterpolationDivCode(className: string) {
  return `
function Component() {
  const classes = "${className}"
  return <div className={\`\${classes}\`} />
}
  `
}

function createMixedAfterStringInterpolationDivCode(className: string) {
  return `
function Component() {
  const classes = "${className}"
  return <div className={\`\${classes} flex items-center\`} />
}
  `
}

function createMixedBeforeStringInterpolationDivCode(className: string) {
  return `
function Component() {
  const classes = "${className}"
  return <div className={\`flex items-center \${classes}\`} />
}
  `
}

function createComponentCode(className: string) {
  return `
function Component1({ className }) {
  return <div className={className} />
}
function Component2() {
  return <Component1 className="${className}" />
}
`
}

const createCodes = Object.entries({
  createDivCode,
  createVariableDivCode,
  createConditionDivCode,
  createCnDivCode,
  createDoubleCnDivCode,
  createCnNoBracketsDivCode,
  createDoubleCnNoBracketsDivCode,
  createStringInterpolationDivCode,
  createMixedAfterStringInterpolationDivCode,
  createMixedBeforeStringInterpolationDivCode,
  createComponentCode,
})

describe('sort-tailwind-classes', () => {
  createCodes.forEach(([name, createCode]) => {
    // Base class ordering
    ruleTester.run(`sort-tailwind-classes (base class ordering, ${name})`, sortTailwindCssClasses, {
      valid: [
        {
          code: createCode('flex items-center'),
        },
        {
          code: createCode('bg-red-500 text-white'),
        },
        {
          code: createCode('flex justify-between'),
        },
      ],
      invalid: [
        {
          code: createCode('text-white bg-red-500'),
          errors: [{ messageId: 'unsorted' }],
          output: createCode('bg-red-500 text-white'),
        },
        {
          code: createCode('items-center flex'),
          errors: [{ messageId: 'unsorted' }],
          output: createCode('flex items-center'),
        },
        {
          code: createCode('flex @container items-center'),
          errors: [{ messageId: 'unsorted' }],
          output: createCode('@container flex items-center'),
        },
        {
          code: createCode('flex group items-center'),
          errors: [{ messageId: 'unsorted' }],
          output: createCode('group flex items-center'),
        },
        {
          code: createCode('flex group @container items-center'),
          errors: [{ messageId: 'unsorted' }],
          output: createCode('@container group flex items-center'),
        },
        {
          code: createCode('z-10 flex items-center'),
          errors: [{ messageId: 'unsorted' }],
          output: createCode('flex items-center z-10'),
        },
      ],
    })

    // Variant ordering: base first, state modifiers alphabetized, dark variants last
    ruleTester.run(`sort-tailwind-classes (variant ordering, ${name})`, sortTailwindCssClasses, {
      valid: [
        {
          code: createCode('bg-blue-500 hover:bg-blue-600'),
        },
        {
          code: createCode('bg-blue-500 active:bg-blue-700 hover:bg-blue-600'),
        },
        {
          code: createCode('bg-blue-500 active:bg-blue-700 hover:bg-blue-600 dark:bg-gray-800'),
        },
        {
          code: createCode('bg-blue-500 active:bg-blue-700 hover:bg-blue-600 dark:bg-gray-800 dark:hover:bg-gray-700'),
        },
      ],
      invalid: [
        {
          code: createCode('hover:bg-blue-600 bg-blue-500'),
          errors: [{ messageId: 'unsorted' }],
          output: createCode('bg-blue-500 hover:bg-blue-600'),
        },
        {
          code: createCode('hover:bg-blue-600 active:bg-blue-700 bg-blue-500'),
          errors: [{ messageId: 'unsorted' }],
          output: createCode('bg-blue-500 active:bg-blue-700 hover:bg-blue-600'),
        },
        {
          code: createCode('dark:bg-gray-800 bg-blue-500'),
          errors: [{ messageId: 'unsorted' }],
          output: createCode('bg-blue-500 dark:bg-gray-800'),
        },
        {
          code: createCode('dark:hover:bg-gray-700 bg-blue-500'),
          errors: [{ messageId: 'unsorted' }],
          output: createCode('bg-blue-500 dark:hover:bg-gray-700'),
        },
        {
          code: createCode('dark:hover:bg-gray-700 dark:bg-gray-800 bg-blue-500'),
          errors: [{ messageId: 'unsorted' }],
          output: createCode('bg-blue-500 dark:bg-gray-800 dark:hover:bg-gray-700'),
        },
        {
          code: createCode('hover:bg-blue-600 dark:bg-gray-800 bg-blue-500 active:bg-blue-700'),
          errors: [{ messageId: 'unsorted' }],
          output: createCode('bg-blue-500 active:bg-blue-700 hover:bg-blue-600 dark:bg-gray-800'),
        },
        {
          code: createCode('dark:active:bg-gray-900 dark:hover:bg-gray-700 bg-blue-500'),
          errors: [{ messageId: 'unsorted' }],
          output: createCode('bg-blue-500 dark:active:bg-gray-900 dark:hover:bg-gray-700'),
        },
      ],
    })

    // Media queries come after state modifiers and dark
    ruleTester.run(`sort-tailwind-classes (media queries, ${name})`, sortTailwindCssClasses, {
      valid: [
        {
          code: createCode('bg-blue-500 hover:bg-blue-600 dark:bg-gray-800 md:bg-green-500'),
        },
        {
          code: createCode('bg-blue-500 hover:bg-blue-600 dark:bg-gray-800 md:bg-green-500 lg:bg-red-500'),
        },
        {
          code: createCode('bg-blue-500 hover:bg-blue-600 dark:bg-gray-800 dark:hover:bg-gray-700 md:bg-green-500 md:hover:bg-green-600'),
        },
        {
          code: createCode('bg-blue-500 hover:bg-blue-600 dark:bg-gray-800 md:bg-green-500 md:dark:bg-purple-500'),
        },
        {
          code: createCode('bg-blue-500 hover:bg-blue-600 dark:bg-gray-800 md:bg-green-500 md:dark:hover:bg-purple-700'),
        },
      ],
      invalid: [
        {
          code: createCode('md:bg-green-500 bg-blue-500'),
          errors: [{ messageId: 'unsorted' }],
          output: createCode('bg-blue-500 md:bg-green-500'),
        },
        {
          code: createCode('md:bg-green-500 hover:bg-blue-600 bg-blue-500'),
          errors: [{ messageId: 'unsorted' }],
          output: createCode('bg-blue-500 hover:bg-blue-600 md:bg-green-500'),
        },
        {
          code: createCode('md:bg-green-500 dark:bg-gray-800 bg-blue-500'),
          errors: [{ messageId: 'unsorted' }],
          output: createCode('bg-blue-500 dark:bg-gray-800 md:bg-green-500'),
        },
        {
          code: createCode('md:bg-green-500 dark:bg-gray-800 hover:bg-blue-600 bg-blue-500'),
          errors: [{ messageId: 'unsorted' }],
          output: createCode('bg-blue-500 hover:bg-blue-600 dark:bg-gray-800 md:bg-green-500'),
        },
        {
          code: createCode('lg:bg-red-500 md:bg-green-500 bg-blue-500'),
          errors: [{ messageId: 'unsorted' }],
          output: createCode('bg-blue-500 md:bg-green-500 lg:bg-red-500'),
        },
        {
          code: createCode('md:hover:bg-green-600 md:bg-green-500 bg-blue-500'),
          errors: [{ messageId: 'unsorted' }],
          output: createCode('bg-blue-500 md:bg-green-500 md:hover:bg-green-600'),
        },
        {
          code: createCode('md:dark:bg-purple-500 md:bg-green-500 bg-blue-500'),
          errors: [{ messageId: 'unsorted' }],
          output: createCode('bg-blue-500 md:bg-green-500 md:dark:bg-purple-500'),
        },
        {
          code: createCode('md:dark:hover:bg-purple-700 dark:bg-gray-800 hover:bg-blue-600 bg-blue-500'),
          errors: [{ messageId: 'unsorted' }],
          output: createCode('bg-blue-500 hover:bg-blue-600 dark:bg-gray-800 md:dark:hover:bg-purple-700'),
        },
      ],
    })

    // Focus-within and other state modifiers
    ruleTester.run(`sort-tailwind-classes (focus and state modifiers, ${name})`, sortTailwindCssClasses, {
      valid: [
        {
          code: createCode('bg-blue-500 focus-within:bg-blue-600'),
        },
        {
          code: createCode('bg-blue-500 focus:bg-blue-600 focus-within:bg-blue-700'),
        },
        {
          code: createCode('bg-blue-500 active:bg-blue-600 disabled:bg-gray-300 focus:bg-blue-700 hover:bg-blue-800'),
        },
      ],
      invalid: [
        {
          code: createCode('focus-within:bg-blue-600 bg-blue-500'),
          errors: [{ messageId: 'unsorted' }],
          output: createCode('bg-blue-500 focus-within:bg-blue-600'),
        },
        {
          code: createCode('focus-within:bg-blue-700 focus:bg-blue-600 bg-blue-500'),
          errors: [{ messageId: 'unsorted' }],
          output: createCode('bg-blue-500 focus:bg-blue-600 focus-within:bg-blue-700'),
        },
        {
          code: createCode('hover:bg-blue-800 focus:bg-blue-700 disabled:bg-gray-300 active:bg-blue-600 bg-blue-500'),
          errors: [{ messageId: 'unsorted' }],
          output: createCode('bg-blue-500 active:bg-blue-600 disabled:bg-gray-300 focus:bg-blue-700 hover:bg-blue-800'),
        },
      ],
    })

    // Media query size ordering
    ruleTester.run(`sort-tailwind-classes (media query size ordering, ${name})`, sortTailwindCssClasses, {
      valid: [
        {
          code: createCode('bg-blue-500 sm:bg-green-500 md:bg-yellow-500 lg:bg-red-500 xl:bg-purple-500'),
        },
      ],
      invalid: [
        {
          code: createCode('xl:bg-purple-500 lg:bg-red-500 md:bg-yellow-500 sm:bg-green-500 bg-blue-500'),
          errors: [{ messageId: 'unsorted' }],
          output: createCode('bg-blue-500 sm:bg-green-500 md:bg-yellow-500 lg:bg-red-500 xl:bg-purple-500'),
        },
      ],
    })

    // Mixed utilities with variants
    ruleTester.run(`sort-tailwind-classes (mixed utilities with variants, ${name})`, sortTailwindCssClasses, {
      valid: [],
      invalid: [
        {
          code: createCode('text-white active:text-gray-200 hover:text-gray-100 dark:text-gray-900 dark:hover:text-gray-800'),
          errors: [{ messageId: 'unsorted' }],
          output: createCode('active:text-gray-200 hover:text-gray-100 dark:text-gray-900 dark:hover:text-gray-800 text-white'),
        },
        {
          code: createCode('bg-blue-500 hover:bg-blue-600 text-white hover:text-gray-100'),
          errors: [{ messageId: 'unsorted' }],
          output: createCode('bg-blue-500 hover:bg-blue-600 hover:text-gray-100 text-white'),
        },
      ],
    })

    const customOrder = ['text-', 'bg-', 'flex', 'items-center', 'gap-']

    ruleTester.run(`sort-tailwind-classes (custom order, ${name})`, sortTailwindCssClasses, {
      valid: [
        {
          code: createCode('text-white bg-red-500 flex items-center gap-2'),
          options: [customOrder],
        },
        {
          code: createCode('text-white bg-blue-500 hover:bg-blue-600'),
          options: [customOrder],
        },
      ],
      invalid: [
        {
          code: createCode('bg-red-500 text-white flex items-center gap-2'),
          errors: [{ messageId: 'unsorted' }],
          output: createCode('text-white bg-red-500 flex items-center gap-2'),
          options: [customOrder],
        },
        {
          code: createCode('items-center flex bg-red-500 text-white'),
          errors: [{ messageId: 'unsorted' }],
          output: createCode('text-white bg-red-500 flex items-center'),
          options: [customOrder],
        },
        {
          code: createCode('hover:bg-blue-600 bg-blue-500 text-white'),
          errors: [{ messageId: 'unsorted' }],
          output: createCode('text-white bg-blue-500 hover:bg-blue-600'),
          options: [customOrder],
        },
        {
          code: createCode('gap-2 items-center flex text-white bg-red-500'),
          errors: [{ messageId: 'unsorted' }],
          output: createCode('text-white bg-red-500 flex items-center gap-2'),
          options: [customOrder],
        },
      ],
    })

    ruleTester.run(`sort-tailwind-classes (custom order with negative margins, ${name})`, sortTailwindCssClasses, {
      valid: [
        {
          code: createCode('-mx-4 mt-2'),
        },
        {
          code: createCode('mx-4 -mt-1'),
        },
      ],
      invalid: [
        {
          code: createCode('-mt-1 mx-4'),
          errors: [{ messageId: 'unsorted' }],
          output: createCode('mx-4 -mt-1'),
        },
      ],
    })

    const partialOrder = ['my-', 'mx-', 'flex', 'items-center', 'bg-', 'text-']

    ruleTester.run(`sort-tailwind-classes (custom order with unspecified, ${name})`, sortTailwindCssClasses, {
      valid: [
        {
          code: createCode('flex items-center bg-blue-500 text-white p-4 border-2 rounded'),
          options: [partialOrder],
        },
        {
          code: createCode('p-4 border-2 rounded'),
          options: [partialOrder],
        },
        {
          code: createCode('my-4 mx-2 flex items-center bg-blue-500 text-white'),
          options: [partialOrder],
        },
      ],
      invalid: [
        {
          code: createCode('p-4 flex rounded text-white bg-blue-500 items-center border-2'),
          errors: [{ messageId: 'unsorted' }],
          output: createCode('flex items-center bg-blue-500 text-white p-4 border-2 rounded'),
          options: [partialOrder],
        },
        {
          code: createCode('rounded border-2 p-4 flex items-center bg-blue-500 text-white'),
          errors: [{ messageId: 'unsorted' }],
          output: createCode('flex items-center bg-blue-500 text-white p-4 border-2 rounded'),
          options: [partialOrder],
        },
        {
          code: createCode('p-4 rounded border-2'),
          errors: [{ messageId: 'unsorted' }],
          output: createCode('p-4 border-2 rounded'),
          options: [partialOrder],
        },
        {
          code: createCode('mx-2 my-4 p-4 rounded border-2'),
          errors: [{ messageId: 'unsorted' }],
          output: createCode('my-4 mx-2 p-4 border-2 rounded'),
          options: [partialOrder],
        },
      ],
    })

    // Edge case: empty className
    ruleTester.run(`sort-tailwind-classes (edge case: empty className, ${name})`, sortTailwindCssClasses, {
      valid: [
        {
          code: createCode(''),
        },
      ],
      invalid: [],
    })

    // Edge case: single class
    ruleTester.run(`sort-tailwind-classes (edge case: single class, ${name})`, sortTailwindCssClasses, {
      valid: [
        {
          code: createCode('bg-blue-500'),
        },
        {
          code: createCode('hover:bg-blue-600'),
        },
        {
          code: createCode('dark:bg-gray-800'),
        },
        {
          code: createCode('md:bg-green-500'),
        },
      ],
      invalid: [],
    })

    // Edge case: duplicate classes
    ruleTester.run(`sort-tailwind-classes (edge case: duplicates, ${name})`, sortTailwindCssClasses, {
      valid: [
        {
          code: createCode('bg-blue-500 bg-blue-500'),
        },
      ],
      invalid: [
        {
          code: createCode('text-white bg-blue-500 text-white'),
          errors: [{ messageId: 'unsorted' }],
          output: createCode('bg-blue-500 text-white text-white'),
        },
      ],
    })

    // Edge case: arbitrary values
    ruleTester.run(`sort-tailwind-classes (edge case: arbitrary values, ${name})`, sortTailwindCssClasses, {
      valid: [
        {
          code: createCode('bg-[#ff0000] text-white'),
        },
        {
          code: createCode('w-[100px] h-[200px]'),
        },
        {
          code: createCode('bg-[#ff0000] hover:bg-[#00ff00]'),
        },
      ],
      invalid: [],
    })

    // Edge case: group variants
    ruleTester.run(`sort-tailwind-classes (edge case: group variants, ${name})`, sortTailwindCssClasses, {
      valid: [
        {
          code: createCode('bg-blue-500 group-hover:bg-blue-600'),
        },
        {
          code: createCode('bg-blue-500 group-hover:bg-blue-600 dark:bg-gray-800'),
        },
      ],
      invalid: [
        {
          code: createCode('group-hover:bg-blue-600 bg-blue-500'),
          errors: [{ messageId: 'unsorted' }],
          output: createCode('bg-blue-500 group-hover:bg-blue-600'),
        },
      ],
    })

    // Edge case: complex nested modifiers
    ruleTester.run(`sort-tailwind-classes (edge case: complex nested modifiers, ${name})`, sortTailwindCssClasses, {
      valid: [
        {
          code: createCode('bg-blue-500 sm:hover:bg-blue-600'),
        },
        {
          code: createCode('bg-blue-500 sm:dark:hover:bg-blue-600'),
        },
        {
          code: createCode('bg-blue-500 lg:dark:focus:bg-blue-700 sm:dark:hover:bg-blue-600'),
        },
      ],
      invalid: [
        {
          code: createCode('sm:hover:bg-blue-600 bg-blue-500'),
          errors: [{ messageId: 'unsorted' }],
          output: createCode('bg-blue-500 sm:hover:bg-blue-600'),
        },
        {
          code: createCode('sm:dark:hover:bg-blue-600 bg-blue-500'),
          errors: [{ messageId: 'unsorted' }],
          output: createCode('bg-blue-500 sm:dark:hover:bg-blue-600'),
        },
      ],
    })

    // Edge case: only variant classes (no base classes)
    ruleTester.run(`sort-tailwind-classes (edge case: only variants, ${name})`, sortTailwindCssClasses, {
      valid: [
        {
          code: createCode('active:bg-blue-700 hover:bg-blue-600'),
        },
        {
          code: createCode('hover:bg-blue-600 dark:bg-gray-800'),
        },
        {
          code: createCode('hover:bg-blue-600 md:bg-green-500'),
        },
      ],
      invalid: [
        {
          code: createCode('dark:bg-gray-800 hover:bg-blue-600'),
          errors: [{ messageId: 'unsorted' }],
          output: createCode('hover:bg-blue-600 dark:bg-gray-800'),
        },
        {
          code: createCode('md:bg-green-500 hover:bg-blue-600'),
          errors: [{ messageId: 'unsorted' }],
          output: createCode('hover:bg-blue-600 md:bg-green-500'),
        },
      ],
    })

    // Edge case: many classes
    ruleTester.run(`sort-tailwind-classes (edge case: many classes, ${name})`, sortTailwindCssClasses, {
      valid: [
        {
          code: createCode('p-4 md:p-6 flex items-center justify-between gap-4 lg:gap-6 dark:bg-gray-900 text-gray-900 dark:text-white bg-white rounded-lg shadow-md hover:shadow-lg'),
        },
      ],
      invalid: [
        {
          code: createCode('lg:gap-6 md:p-6 dark:text-white dark:bg-gray-900 hover:shadow-lg text-gray-900 shadow-md bg-white rounded-lg p-4 gap-4 justify-between items-center flex'),
          errors: [{ messageId: 'unsorted' }],
          output: createCode('p-4 md:p-6 flex items-center justify-between gap-4 lg:gap-6 dark:bg-gray-900 text-gray-900 dark:text-white bg-white rounded-lg shadow-md hover:shadow-lg'),
        },
      ],
    })

    // Edge case: multiple state modifiers in sequence
    ruleTester.run(`sort-tailwind-classes (edge case: multiple state modifiers, ${name})`, sortTailwindCssClasses, {
      valid: [
        {
          code: createCode('bg-blue-500 active:bg-blue-600 disabled:bg-gray-300 focus:bg-blue-700 focus-within:bg-blue-800 group-hover:bg-blue-900 hover:bg-blue-700'),
        },
      ],
      invalid: [
        {
          code: createCode('hover:bg-blue-700 group-hover:bg-blue-900 focus-within:bg-blue-800 focus:bg-blue-700 disabled:bg-gray-300 active:bg-blue-600 bg-blue-500'),
          errors: [{ messageId: 'unsorted' }],
          output: createCode('bg-blue-500 active:bg-blue-600 disabled:bg-gray-300 focus:bg-blue-700 focus-within:bg-blue-800 group-hover:bg-blue-900 hover:bg-blue-700'),
        },
      ],
    })

    // Edge case: mixed property types with variants
    ruleTester.run(`sort-tailwind-classes (edge case: mixed properties with variants, ${name})`, sortTailwindCssClasses, {
      valid: [
        {
          code: createCode('m-0 p-4 bg-blue-500 text-white'),
        },
        {
          code: createCode('m-0 p-4 bg-blue-500 hover:bg-blue-600 hover:text-gray-100 text-white'),
        },
      ],
      invalid: [
        {
          code: createCode('text-white bg-blue-500 p-4 m-0'),
          errors: [{ messageId: 'unsorted' }],
          output: createCode('m-0 p-4 bg-blue-500 text-white'),
        },
      ],
    })

    // Edge case: media query ordering with all breakpoints
    ruleTester.run(`sort-tailwind-classes (edge case: all breakpoints, ${name})`, sortTailwindCssClasses, {
      valid: [
        {
          code: createCode('bg-blue-500 sm:bg-green-500 md:bg-yellow-500 lg:bg-orange-500 xl:bg-red-500 2xl:bg-purple-500'),
        },
      ],
      invalid: [
        {
          code: createCode('2xl:bg-purple-500 lg:bg-orange-500 sm:bg-green-500 md:bg-yellow-500 bg-blue-500 xl:bg-red-500'),
          errors: [{ messageId: 'unsorted' }],
          output: createCode('bg-blue-500 sm:bg-green-500 md:bg-yellow-500 lg:bg-orange-500 xl:bg-red-500 2xl:bg-purple-500'),
        },
      ],
    })

    // Edge case: combining dark with all media queries
    ruleTester.run(`sort-tailwind-classes (edge case: dark with all breakpoints, ${name})`, sortTailwindCssClasses, {
      valid: [
        {
          code: createCode('bg-blue-500 hover:bg-blue-600 dark:bg-gray-800 dark:hover:bg-gray-700 sm:bg-green-500 md:bg-yellow-500 md:hover:bg-yellow-600 sm:dark:bg-gray-600 md:dark:bg-gray-700'),
        },
      ],
      invalid: [
        {
          code: createCode('md:dark:bg-gray-700 md:hover:bg-yellow-600 md:bg-yellow-500 sm:dark:bg-gray-600 sm:bg-green-500 dark:hover:bg-gray-700 dark:bg-gray-800 hover:bg-blue-600 bg-blue-500'),
          errors: [{ messageId: 'unsorted' }],
          output: createCode('bg-blue-500 hover:bg-blue-600 dark:bg-gray-800 dark:hover:bg-gray-700 sm:bg-green-500 md:bg-yellow-500 md:hover:bg-yellow-600 sm:dark:bg-gray-600 md:dark:bg-gray-700'),
        },
      ],
    })

    // Edge case: whitespace handling with extra spaces
    ruleTester.run(`sort-tailwind-classes (edge case: whitespace, ${name})`, sortTailwindCssClasses, {
      valid: [
        {
          code: createCode('flex  items-center'),
        },
      ],
      invalid: [
        {
          code: createCode('items-center  flex'),
          errors: [{ messageId: 'unsorted' }],
          output: createCode('flex items-center'),
        },
      ],
    })

    // Edge case: negative values
    ruleTester.run(`sort-tailwind-classes (edge case: negative values, ${name})`, sortTailwindCssClasses, {
      valid: [
        {
          code: createCode('-ml-2 -mt-4 flex'),
        },
      ],
      invalid: [
        {
          code: createCode('flex -mt-4 -ml-2'),
          errors: [{ messageId: 'unsorted' }],
          output: createCode('-ml-2 -mt-4 flex'),
        },
      ],
    })

    // Edge case: aspect ratio and custom utilities
    ruleTester.run(`sort-tailwind-classes (edge case: aspect ratio, ${name})`, sortTailwindCssClasses, {
      valid: [
        {
          code: createCode('aspect-video bg-blue-500'),
        },
        {
          code: createCode('aspect-square bg-blue-500'),
        },
      ],
      invalid: [
        {
          code: createCode('bg-blue-500 aspect-video'),
          errors: [{ messageId: 'unsorted' }],
          output: createCode('aspect-video bg-blue-500'),
        },
      ],
    })

    // Edge case: first-letter, first-line, and pseudo-elements
    ruleTester.run(`sort-tailwind-classes (edge case: pseudo-elements, ${name})`, sortTailwindCssClasses, {
      valid: [
        {
          code: createCode('first-letter:uppercase first-line:no-underline'),
        },
      ],
      invalid: [
        {
          code: createCode('first-line:no-underline first-letter:uppercase'),
          errors: [{ messageId: 'unsorted' }],
          output: createCode('first-letter:uppercase first-line:no-underline'),
        },
      ],
    })

    // Edge case: container and print variants
    ruleTester.run(`sort-tailwind-classes (edge case: print variant, ${name})`, sortTailwindCssClasses, {
      valid: [
        {
          code: createCode('bg-blue-500 print:bg-white'),
        },
      ],
      invalid: [
        {
          code: createCode('print:bg-white bg-blue-500'),
          errors: [{ messageId: 'unsorted' }],
          output: createCode('bg-blue-500 print:bg-white'),
        },
      ],
    })

    // Edge case: edge orders
    ruleTester.run(`sort-tailwind-classes (edge case: edge orders, ${name})`, sortTailwindCssClasses, {
      valid: [
        {
          code: createCode('border-r last:border-r-0 '),
        },
      ],
      invalid: [
        {
          code: createCode('last:border-r-0 border-r'),
          errors: [{ messageId: 'unsorted' }],
          output: createCode('border-r last:border-r-0'),
        },
      ],
    })
  })
})
