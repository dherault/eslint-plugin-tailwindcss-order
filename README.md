# eslint-plugin-tailwindcss-order

An ESLint v10 plugin that automatically sorts Tailwind CSS classes according to a customizable, semantic order. Keep your className attributes clean and consistent across your entire codebase.

## Features

- ✨ **Auto-fixable** - Automatically sorts classes with ESLint's `--fix` option
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

## Usage

The plugin automatically detects and sorts Tailwind CSS classes in JSX `className` attributes:

### Before

```jsx
<div className="text-white hover:bg-blue-500 p-4 flex bg-blue-600" />
```

### After

```jsx
<div className="p-4 flex bg-blue-600 hover:bg-blue-500 text-white" />
```

## Rule: `sort-tailwind-css-classes`

Enforces a consistent, semantic ordering of Tailwind CSS classes.

### Options

The rule accepts an optional array of strings to define a custom class order:

```javascript
{
  'tailwind-css-order/sort-tailwind-css-classes': ['warn', [
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
      'tailwind-css-order/sort-tailwind-css-classes': ['error', tailwindCssClassOrder],
    }
  }
]
```

## License

MIT
