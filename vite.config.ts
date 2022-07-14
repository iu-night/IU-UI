import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Markdown from 'vite-plugin-vue-markdown'
import Prism from 'markdown-it-prism'
import LinkAttributes from 'markdown-it-link-attributes'
import Unocss from 'unocss/vite'
import Pages from 'vite-plugin-pages'
import generateSitemap from 'vite-ssg-sitemap'
import Layouts from 'vite-plugin-vue-layouts'
import Inspect from 'vite-plugin-inspect'
import DefineOptions from 'unplugin-vue-define-options/vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',

  resolve: {
    alias: {
      'iu-ui': `${resolve(__dirname, 'packages')}`,
      '@/': `${resolve(__dirname, 'src')}/`,
      '#/': `${resolve(__dirname, 'type')}/`,
    },
  },

  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
      reactivityTransform: true,
    }),

    DefineOptions(),

    Pages({
      dirs: [
        { dir: 'src/pages', baseRoute: '' },
      ],
      extensions: ['vue', 'md'],
    }),

    Layouts(),

    Unocss(),

    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'vue/macros',
        '@vueuse/head',
        '@vueuse/core',
      ],
      dts: 'src/auto-imports.d.ts',
      dirs: [
        'src/stores',
        'src/dark',
      ],
      vueTemplate: true,
    }),

    Components({
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: 'src/components.d.ts',
      resolvers: [
        (name: string) => {
          if (name.match(/^(Iu[A-Z]|iu-[a-z])/))
            return { name, from: 'iu-ui' }
        },
      ],
    }),

    Markdown({
      wrapperClasses: 'prose prose-sm text-left',
      headEnabled: true,
      markdownItSetup(md) {
        // https://prismjs.com/
        md.use(Prism)
        md.use(LinkAttributes, {
          matcher: (link: string) => /^https?:\/\//.test(link),
          attrs: {
            target: '_blank',
            rel: 'noopener',
          },
        })
      },
    }),

    Inspect(),
  ],

  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    // onFinished() { generateSitemap() },
  },

  build: {
    outDir: 'docs/iu-night.github.io/docs',
    // outDir: 'dist',
  },
})
