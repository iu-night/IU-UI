import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: {
    'btn': 'px-4 py-1 rounded inline-block bg-teal-700 text-white cursor-pointer hover:bg-teal-800 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50',
    'icon-btn': 'inline-block cursor-pointer select-none transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600',
    'flex-center': 'flex justify-center items-center',
    'in-flex-center': 'inline-flex justify-center items-center',
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetTypography(),
  ],
  transformers: [
    transformerDirectives({
      varStyle: '--i-',
    }),
    transformerVariantGroup(),
  ],
  safelist: 'prose prose-sm text-left'.split(' '),
})