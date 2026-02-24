# eslint-plugin-tailwindcss-order

An ESLint v10 plugin to sort Tailwind CSS classes with a custom order.

## Installation

```bash
npm install --save-dev eslint-plugin-tailwindcss-order
```

## Usage

Add the plugin to your ESLint configuration:

```json
{
  "plugins": ["tailwindcss-order"],
  "rules": {
    "tailwindcss-order/sort-tailwind-classes": "warn"
  }
}
```

Or use the recommended configuration:

```json
{
  "extends": ["plugin:tailwindcss-order/recommended"]
}
```

## Rules

### `sort-tailwind-classes`

Automatically sorts Tailwind CSS classes in alphabetical order.

**Options:** None

**Fixable:** Yes

## Development

### Build

```bash
npm run build
```

### Test

```bash
npm test
```

Watch mode:

```bash
npm run test:watch
```

## License

MIT
