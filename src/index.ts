import { sortTailwindCssClasses } from './rules/sort-tailwind-css-classes'
import type {Config} from 'eslint/config'

type ConfigurationName = 'recommended'

const plugin = {
  meta: {
    name: 'eslint-plugin-tailwindcss-order',
    version: '1.0.0',
  },
  rules: {
    'sort-tailwind-css-classes': sortTailwindCssClasses,
  },
  configs: {} as Record<ConfigurationName, Config>,
}

Object.assign(plugin.configs, {
  recommended: {
    plugins: {
      'tailwind-css-order': plugin,
    },
    rules: {
      'tailwind-css-order/sort-tailwind-css-classes': 'error',
    },
  },
})

export default plugin
