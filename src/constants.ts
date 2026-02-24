export const DEFAULT_ORDER = [
  // Layout & Positioning
  'absolute', 'relative', 'fixed', 'sticky', 'static',
  'inset-', 'inset-y-', 'inset-x-', 'top-', 'bottom-', 'left-', 'right-',
  'float-left', 'float-right', 'float-none', 'clear-left', 'clear-right', 'clear-both', 'clear-none',

  // Spacing
  'm-', 'my-', 'mt-', 'mb-', 'mx-', 'ml-', 'mr-',
  'p-', 'py-', 'pt-', 'pb-', 'px-', 'pl-', 'pr-',
  'space-y-', 'space-y-reverse', 'space-x-', 'space-x-reverse',
  'divide-y', 'divide-y-', 'divide-x', 'divide-x-', 'divide-',
  'divide-solid', 'divide-dashed', 'divide-dotted', 'divide-double', 'divide-none',
  'divide-color-', 'divide-opacity-',

  // Sizing
  'size-', 'h-', 'min-h-', 'max-h-', 'w-', 'min-w-', 'max-w-',
  'aspect-',

  // Col spans
  'col-span-', 'col-start-', 'col-end-',
  'row-span-', 'row-start-', 'row-end-',

  // Grow and shrink
  'grow', 'grow-', 'shrink', 'shrink-', 'basis-',

  // Display
  'block', 'inline-block', 'inline', 'flex', 'inline-flex', 'grid', 'inline-grid', 'hidden',
  'table', 'table-row', 'table-cell', 'table-column', 'table-column-group', 'table-header-group', 'table-row-group', 'table-footer-group',
  'contents', 'list-item',

  // Flex & Grid
  'flex-row', 'flex-row-', 'flex-col', 'flex-col-', 'flex-wrap', 'flex-nowrap', 'flex-wrap-reverse',
  'flex-grow', 'flex-shrink', 'flex-auto', 'flex-none', 'flex-basis',
  'order-',
  'items-start', 'items-end', 'items-center', 'items-baseline', 'items-stretch',
  'justify-start', 'justify-end', 'justify-center', 'justify-between', 'justify-around', 'justify-evenly',
  'place-content-center', 'place-content-start', 'place-content-end', 'place-content-between', 'place-content-around', 'place-content-evenly', 'place-content-baseline', 'place-content-stretch',
  'place-items-start', 'place-items-end', 'place-items-center', 'place-items-baseline', 'place-items-stretch',
  'place-self-auto', 'place-self-start', 'place-self-end', 'place-self-center', 'place-self-baseline', 'place-self-stretch',
  'self-auto', 'self-start', 'self-end', 'self-center', 'self-baseline', 'self-stretch',
  'grid-cols-', 'grid-rows-',
  'grid-flow-row', 'grid-flow-col', 'grid-flow-dense',
  'grid-auto-rows-', 'grid-auto-cols-',
  'gap-', 'gap-x-', 'gap-y-',
  'rows-', 'cols-',

  // Sizing (Margin/Padding alternatives)
  'scroll-m-', 'scroll-mt-', 'scroll-mb-', 'scroll-ml-', 'scroll-mr-', 'scroll-mx-', 'scroll-my-',
  'scroll-p-', 'scroll-pt-', 'scroll-pb-', 'scroll-pl-', 'scroll-pr-', 'scroll-px-', 'scroll-py-',

  // Backgrounds
  'bg-', 'bg-opacity-', 'bg-clip-', 'bg-attachment-',
  'bg-fixed', 'bg-local', 'bg-scroll',
  'bg-origin-border', 'bg-origin-padding', 'bg-origin-content',
  'bg-repeat', 'bg-no-repeat', 'bg-repeat-x', 'bg-repeat-y', 'bg-repeat-round', 'bg-repeat-space',
  'bg-center', 'bg-top', 'bg-right-top', 'bg-right', 'bg-right-bottom', 'bg-bottom', 'bg-left-bottom', 'bg-left', 'bg-left-top',
  'bg-auto', 'bg-cover', 'bg-contain',
  'bg-gradient-to-',
  'from-', 'via-', 'to-',

  // Text & Typography
  'text-', 'text-opacity-',
  'text-left', 'text-center', 'text-right', 'text-justify',
  'text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl', 'text-6xl', 'text-7xl', 'text-8xl', 'text-9xl',
  'font-thin', 'font-extralight', 'font-light', 'font-normal', 'font-medium', 'font-semibold', 'font-bold', 'font-extrabold', 'font-black',
  'font-', 'font-serif', 'font-sans', 'font-mono',
  'italic', 'not-italic',
  'font-variant-numeric', 'normal-nums', 'ordinal', 'slashed-zero', 'lining-nums', 'oldstyle-nums', 'proportional-nums', 'tabular-nums', 'diagonal-fractions', 'stacked-fractions',
  'font-smoothing', 'antialiased', 'subpixel-antialiased',
  'leading-', 'tracking-', 'text-transform',
  'uppercase', 'lowercase', 'capitalize', 'normal-case',
  'truncate', 'text-ellipsis', 'text-clip', 'text-wrap',
  'hyphens-none', 'hyphens-manual', 'hyphens-auto',
  'whitespace-normal', 'whitespace-nowrap', 'whitespace-pre', 'whitespace-pre-wrap', 'whitespace-pre-line',
  'word-break-normal', 'break-normal', 'break-words', 'break-all', 'break-keep',
  'line-clamp-',
  'line-height-', 'leading-tight', 'leading-snug', 'leading-normal', 'leading-relaxed', 'leading-loose',
  'text-decoration', 'underline', 'overline', 'line-through', 'no-underline',
  'decoration-solid', 'decoration-double', 'decoration-dotted', 'decoration-dashed', 'decoration-wavy',
  'decoration-', 'underline-offset-',
  'decoration-clone', 'decoration-slice',
  'text-decoration-thickness-', 'decoration-from-font',
  'text-white', 'text-black', 'text-slate-', 'text-gray-', 'text-zinc-', 'text-neutral-', 'text-stone-',
  'text-red-', 'text-orange-', 'text-amber-', 'text-yellow-', 'text-lime-', 'text-green-', 'text-emerald-', 'text-teal-', 'text-cyan-', 'text-sky-', 'text-blue-', 'text-indigo-', 'text-violet-', 'text-purple-', 'text-fuchsia-', 'text-pink-', 'text-rose-',

  // Lists
  'list-none', 'list-disc', 'list-decimal', 'list-inside', 'list-outside',
  'list-image-',
  'list-position-',

  // Opacity & Colors
  'opacity-',
  'bg-white', 'bg-black', 'bg-slate-', 'bg-gray-', 'bg-zinc-', 'bg-neutral-', 'bg-stone-',
  'bg-red-', 'bg-orange-', 'bg-amber-', 'bg-yellow-', 'bg-lime-', 'bg-green-', 'bg-emerald-', 'bg-teal-', 'bg-cyan-', 'bg-sky-', 'bg-blue-', 'bg-indigo-', 'bg-violet-', 'bg-purple-', 'bg-fuchsia-', 'bg-pink-', 'bg-rose-',
  'border-white', 'border-black', 'border-slate-', 'border-gray-', 'border-zinc-', 'border-neutral-', 'border-stone-',
  'border-red-', 'border-orange-', 'border-amber-', 'border-yellow-', 'border-lime-', 'border-green-', 'border-emerald-', 'border-teal-', 'border-cyan-', 'border-sky-', 'border-blue-', 'border-indigo-', 'border-violet-', 'border-purple-', 'border-fuchsia-', 'border-pink-', 'border-rose-',
  'caret-',
  'accent-',
  'caret-white', 'caret-black', 'caret-slate-', 'caret-gray-', 'caret-zinc-', 'caret-neutral-', 'caret-stone-',
  'caret-red-', 'caret-orange-', 'caret-amber-', 'caret-yellow-', 'caret-lime-', 'caret-green-', 'caret-emerald-', 'caret-teal-', 'caret-cyan-', 'caret-sky-', 'caret-blue-', 'caret-indigo-', 'caret-violet-', 'caret-purple-', 'caret-fuchsia-', 'caret-pink-', 'caret-rose-',
  'accent-white', 'accent-black', 'accent-slate-', 'accent-gray-', 'accent-zinc-', 'accent-neutral-', 'accent-stone-',
  'accent-red-', 'accent-orange-', 'accent-amber-', 'accent-yellow-', 'accent-lime-', 'accent-green-', 'accent-emerald-', 'accent-teal-', 'accent-cyan-', 'accent-sky-', 'accent-blue-', 'accent-indigo-', 'accent-violet-', 'accent-purple-', 'accent-fuchsia-', 'accent-pink-', 'accent-rose-',
  'fill-',
  'stroke-',

  // Borders
  'border', 'border-x', 'border-y', 'border-t', 'border-b', 'border-l', 'border-r',
  'border-', 'border-opacity-',
  'border-solid', 'border-dashed', 'border-dotted', 'border-double', 'border-hidden', 'border-none',
  'border-t-', 'border-b-', 'border-l-', 'border-r-',
  'border-collapse', 'border-separate', 'border-spacing-', 'border-spacing-x-', 'border-spacing-y-',

  // Border Radius
  'rounded', 'rounded-', 'rounded-none',
  'rounded-t', 'rounded-t-', 'rounded-b', 'rounded-b-', 'rounded-l', 'rounded-l-', 'rounded-r', 'rounded-r-',
  'rounded-tl', 'rounded-tl-', 'rounded-tr', 'rounded-tr-', 'rounded-bl', 'rounded-bl-', 'rounded-br', 'rounded-br-',

  // Outlines
  'outline', 'outline-none', 'outline-', 'outline-offset-',
  'outline-white', 'outline-black', 'outline-slate-', 'outline-gray-', 'outline-zinc-', 'outline-neutral-', 'outline-stone-',
  'outline-red-', 'outline-orange-', 'outline-amber-', 'outline-yellow-', 'outline-lime-', 'outline-green-', 'outline-emerald-', 'outline-teal-', 'outline-cyan-', 'outline-sky-', 'outline-blue-', 'outline-indigo-', 'outline-violet-', 'outline-purple-', 'outline-fuchsia-', 'outline-pink-', 'outline-rose-',

  // Ring
  'ring-', 'ring-offset-', 'ring-inset',
  'ring-white', 'ring-black', 'ring-slate-', 'ring-gray-', 'ring-zinc-', 'ring-neutral-', 'ring-stone-',
  'ring-red-', 'ring-orange-', 'ring-amber-', 'ring-yellow-', 'ring-lime-', 'ring-green-', 'ring-emerald-', 'ring-teal-', 'ring-cyan-', 'ring-sky-', 'ring-blue-', 'ring-indigo-', 'ring-violet-', 'ring-purple-', 'ring-fuchsia-', 'ring-pink-', 'ring-rose-',
  'ring-opacity-',

  // Box Shadow
  'shadow-', 'shadow-none', 'shadow-sm', 'shadow-md', 'shadow-lg', 'shadow-xl', 'shadow-2xl',
  'drop-shadow', 'drop-shadow-', 'drop-shadow-sm', 'drop-shadow-md', 'drop-shadow-lg', 'drop-shadow-xl', 'drop-shadow-2xl',

  // Filters
  'blur-', 'blur-none', 'blur-sm', 'blur-md', 'blur-lg', 'blur-xl', 'blur-2xl', 'blur-3xl',
  'brightness-', 'brightness-0', 'brightness-50', 'brightness-75', 'brightness-90', 'brightness-95', 'brightness-100', 'brightness-105', 'brightness-110', 'brightness-125', 'brightness-150', 'brightness-200',
  'contrast-', 'contrast-0', 'contrast-50', 'contrast-75', 'contrast-100', 'contrast-125', 'contrast-150', 'contrast-200',
  'grayscale-', 'grayscale-0', 'grayscale',
  'hue-rotate-', 'hue-rotate-0', 'hue-rotate-15', 'hue-rotate-30', 'hue-rotate-60', 'hue-rotate-90', 'hue-rotate-180',
  'invert-', 'invert-0', 'invert',
  'saturate-', 'saturate-0', 'saturate-50', 'saturate-100', 'saturate-150', 'saturate-200',
  'sepia-', 'sepia-0', 'sepia',
  'filter', 'filter-none',

  // Backdrop Filters
  'backdrop-blur-', 'backdrop-blur-none', 'backdrop-blur-sm', 'backdrop-blur-md', 'backdrop-blur-lg', 'backdrop-blur-xl', 'backdrop-blur-2xl', 'backdrop-blur-3xl',
  'backdrop-brightness-', 'backdrop-brightness-0', 'backdrop-brightness-50', 'backdrop-brightness-75', 'backdrop-brightness-90', 'backdrop-brightness-95', 'backdrop-brightness-100', 'backdrop-brightness-105', 'backdrop-brightness-110', 'backdrop-brightness-125', 'backdrop-brightness-150', 'backdrop-brightness-200',
  'backdrop-contrast-', 'backdrop-contrast-0', 'backdrop-contrast-50', 'backdrop-contrast-75', 'backdrop-contrast-100', 'backdrop-contrast-125', 'backdrop-contrast-150', 'backdrop-contrast-200',
  'backdrop-grayscale-', 'backdrop-grayscale-0', 'backdrop-grayscale',
  'backdrop-hue-rotate-', 'backdrop-hue-rotate-0', 'backdrop-hue-rotate-15', 'backdrop-hue-rotate-30', 'backdrop-hue-rotate-60', 'backdrop-hue-rotate-90', 'backdrop-hue-rotate-180',
  'backdrop-invert-', 'backdrop-invert-0', 'backdrop-invert',
  'backdrop-opacity-',
  'backdrop-saturate-', 'backdrop-saturate-0', 'backdrop-saturate-50', 'backdrop-saturate-100', 'backdrop-saturate-150', 'backdrop-saturate-200',
  'backdrop-sepia-', 'backdrop-sepia-0', 'backdrop-sepia',
  'backdrop-filter', 'backdrop-filter-none',

  // Transforms
  'transform', 'transform-none',
  'origin-center', 'origin-top', 'origin-top-right', 'origin-right', 'origin-bottom-right', 'origin-bottom', 'origin-bottom-left', 'origin-left', 'origin-top-left',
  'rotate-', 'rotate-0', 'rotate-1', 'rotate-2', 'rotate-3', 'rotate-6', 'rotate-12', 'rotate-45', 'rotate-90', 'rotate-180',
  'scale-', 'scale-0', 'scale-50', 'scale-75', 'scale-90', 'scale-95', 'scale-100', 'scale-105', 'scale-110', 'scale-125', 'scale-150',
  'scale-x-', 'scale-y-',
  'skew-', 'skew-x-', 'skew-y-',
  'translate-x-', 'translate-y-',
  'preserve-3d', 'preserve-flat',
  'perspective-', 'perspective-none',
  'perspective-origin-', 'perspective-origin-center', 'perspective-origin-top', 'perspective-origin-right', 'perspective-origin-bottom', 'perspective-origin-left',

  // Transitions & Animation
  'transition', 'transition-none', 'transition-all', 'transition-colors', 'transition-opacity', 'transition-shadow', 'transition-transform',
  'duration-', 'duration-0', 'duration-75', 'duration-100', 'duration-150', 'duration-200', 'duration-300', 'duration-500', 'duration-700', 'duration-1000',
  'delay-', 'delay-0', 'delay-75', 'delay-100', 'delay-150', 'delay-200', 'delay-300', 'delay-500', 'delay-700', 'delay-1000',
  'ease-linear', 'ease-in', 'ease-out', 'ease-in-out',
  'animate-', 'animate-none', 'animate-spin', 'animate-ping', 'animate-pulse', 'animate-bounce',
  'animation-',
  'animation-delay-',
  'animation-direction-',
  'animation-duration-',
  'animation-fill-',
  'animation-iteration-',
  'animation-play-',
  'animation-timing-',

  // Object Fit & Position
  'object-', 'object-bottom', 'object-center', 'object-left', 'object-left-bottom', 'object-left-top', 'object-right', 'object-right-bottom', 'object-right-top', 'object-top',

  // Overflow & Visibility
  'overflow-auto', 'overflow-hidden', 'overflow-visible', 'overflow-scroll', 'overflow-clip',
  'overflow-x-auto', 'overflow-x-hidden', 'overflow-x-visible', 'overflow-x-scroll', 'overflow-x-clip',
  'overflow-y-auto', 'overflow-y-hidden', 'overflow-y-visible', 'overflow-y-scroll', 'overflow-y-clip',
  'overscroll-auto', 'overscroll-contain', 'overscroll-none',
  'overscroll-x-auto', 'overscroll-x-contain', 'overscroll-x-none',
  'overscroll-y-auto', 'overscroll-y-contain', 'overscroll-y-none',

  // Scrolling & Z-Index
  'scroll-smooth', 'scroll-auto',
  'snap-none', 'snap-start', 'snap-end', 'snap-center', 'snap-align-none', 'snap-align-start', 'snap-align-end', 'snap-align-center',
  'snap-mandatory', 'snap-proximity',
  'scroll-snap-type-none', 'scroll-snap-type-x', 'scroll-snap-type-y', 'scroll-snap-type-both',
  'scroll-snap-align-none', 'scroll-snap-align-start', 'scroll-snap-align-end', 'scroll-snap-align-center',
  'scroll-snap-stop-normal', 'scroll-snap-stop-always',
  'z-', 'z-0', 'z-10', 'z-20', 'z-30', 'z-40', 'z-50', 'z-auto',

  // Resize & Cursor & Touch
  'resize', 'resize-none', 'resize-y', 'resize-x',
  'cursor-',
  'cursor-auto', 'cursor-default', 'cursor-pointer', 'cursor-wait', 'cursor-text', 'cursor-move', 'cursor-help', 'cursor-not-allowed', 'cursor-none', 'cursor-context-menu', 'cursor-cell', 'cursor-copy', 'cursor-alias', 'cursor-grab', 'cursor-grabbing', 'cursor-all-scroll', 'cursor-col-resize', 'cursor-row-resize', 'cursor-n-resize', 'cursor-e-resize', 'cursor-s-resize', 'cursor-w-resize', 'cursor-ne-resize', 'cursor-nw-resize', 'cursor-se-resize', 'cursor-sw-resize', 'cursor-ew-resize', 'cursor-ns-resize', 'cursor-nesw-resize', 'cursor-nwse-resize', 'cursor-zoom-in', 'cursor-zoom-out',
  'touch-auto', 'touch-none', 'touch-pan-x', 'touch-pan-left', 'touch-pan-right', 'touch-pan-y', 'touch-pan-up', 'touch-pan-down', 'touch-pinch-zoom', 'touch-manipulation',
  'select-none', 'select-text', 'select-all', 'select-auto',

  // User Interaction
  'user-select-none', 'user-select-text', 'user-select-all', 'user-select-auto',
  'pointer-events-none', 'pointer-events-auto',
  'will-change-', 'will-change-auto', 'will-change-scroll', 'will-change-contents', 'will-change-transform',
  'visible', 'invisible',

  // Box Model & Display
  'box-border', 'box-content',
  'columns-', 'columns-1', 'columns-2', 'columns-3', 'columns-auto',
  'column-auto', 'column-span-1', 'column-span-all',
  'column-gap-',
  'break-auto', 'break-avoid', 'break-page', 'break-column',
  'break-inside-auto', 'break-inside-avoid', 'break-inside-avoid-page', 'break-inside-avoid-column',
  'break-before-auto', 'break-before-avoid', 'break-before-all', 'break-before-avoid-page', 'break-before-page', 'break-before-left', 'break-before-right', 'break-before-column',
  'break-after-auto', 'break-after-avoid', 'break-after-all', 'break-after-avoid-page', 'break-after-page', 'break-after-left', 'break-after-right', 'break-after-column',

  // Blend Modes
  'mix-blend-mode-', 'mix-blend-normal', 'mix-blend-multiply', 'mix-blend-screen', 'mix-blend-overlay', 'mix-blend-darken', 'mix-blend-lighten', 'mix-blend-color-dodge', 'mix-blend-color-burn', 'mix-blend-hard-light', 'mix-blend-soft-light', 'mix-blend-difference', 'mix-blend-exclusion', 'mix-blend-hue', 'mix-blend-saturation', 'mix-blend-color', 'mix-blend-luminosity', 'mix-blend-plus-lighter', 'mix-blend-plus-darker',
  'bg-blend-mode-', 'bg-blend-normal', 'bg-blend-multiply', 'bg-blend-screen', 'bg-blend-overlay', 'bg-blend-darken', 'bg-blend-lighten', 'bg-blend-color-dodge', 'bg-blend-color-burn', 'bg-blend-hard-light', 'bg-blend-soft-light', 'bg-blend-difference', 'bg-blend-exclusion', 'bg-blend-hue', 'bg-blend-saturation', 'bg-blend-color', 'bg-blend-luminosity', 'bg-blend-plus-lighter', 'bg-blend-plus-darker',

  // Isolation
  'isolate', 'isolation-auto',

  // Accessibility
  'sr-only', 'not-sr-only',

  // Print
  'print', 'not-print',
] as const
