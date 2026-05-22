# eslint-plugin-tailwindcss-order

An ESLint v10 plugin that enforces clean, consistent Tailwind CSS class strings. It automatically sorts classes in a semantic order and prevents formatting issues like multiple consecutive spaces.

## Features

- ✨ **Auto-fixable** - Automatically fixes issues with ESLint's `--fix` option
- 🎯 **Semantic ordering** - Groups classes by purpose (layout, spacing, typography, etc.)
- ⚙️ **Customizable** - Override the default order with your own preferences
- 🧩 **Smart modifier handling** - Correctly sorts responsive, state, and dark mode modifiers
- 🔍 **Deep analysis** - Works with variables, ternaries, template literals, and utility functions like `cn()`
- 📦 **Zero config** - Works out of the box with sensible defaults

## Installation

```bash
npm install --save-dev eslint-plugin-tailwindcss-order
```

## Configuration

### Flat Config (ESLint 10+)

Add the plugin to your `eslint.config.js`:

Or use the recommended configuration:

```javascript
import tailwindCssOrder from 'eslint-plugin-tailwindcss-order'

export default [
  // ... other configs
  tailwindCssOrder.configs.recommended,
]
```

## Rules

### `sort-tailwindcss-classes`

Enforces a consistent, semantic ordering of Tailwind CSS classes.

```jsx
// Bad
<div className="text-white hover:bg-blue-500 p-4 flex bg-blue-600" />

// Good
<div className="p-4 flex bg-blue-600 hover:bg-blue-500 text-white" />
```

#### Options

The rule accepts an optional array of strings to define a custom class order:

```javascript
{
  'tailwindcss-order/sort-tailwindcss-classes': ['warn', [
    'flex',
    'grid',
    'block',
    'hidden',
    // ... your custom order
  ]]
}
```

You can also copy and customize the constant in `src/constants.ts`:

```javascript
import tailwindCssOrder from 'eslint-plugin-tailwindcss-order'

// Copy this from src/constants.ts
const tailwindCssClassOrder = [
  'absolute', 'relative', 'fixed', 'sticky', 'static',
  // ... The rest of the classes, customized
]

// And then in your Eslint config:
export default [
  // ... other configs
  tailwindCssOrder.configs.recommended,
  {
    rules: {
      'tailwindcss-order/sort-tailwindcss-classes': ['error', tailwindCssClassOrder],
    }
  }
]
```

### `prevent-multiple-whitespace-characters`

Prevents multiple consecutive whitespace characters inside a `className` string.

```jsx
// Bad
<div className="flex  grow" />
<div className="flex   items-center  gap-4" />

// Good
<div className="flex grow" />
<div className="flex items-center gap-4" />
```

This rule is auto-fixable and collapses any run of whitespace into a single space.

## License

MIT
