import { resolve } from 'node:path'
import type { ConfigEnv } from 'vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Markdown from 'vite-plugin-vue-markdown'
import Prism from 'markdown-it-prism'
import MarkdownItAnchor from 'markdown-it-anchor'
import LinkAttributes from 'markdown-it-link-attributes'
import Unocss from 'unocss/vite'
import Pages from 'vite-plugin-pages'
// import generateSitemap from 'vite-ssg-sitemap'
import Layouts from 'vite-plugin-vue-layouts'
import Inspect from 'vite-plugin-inspect'
import DefineOptions from 'unplugin-vue-define-options/vite'
// import Preview from 'vite-plugin-vue-component-preview'
// import prismjs from 'vite-plugin-prismjs'
import Inspector from 'vite-plugin-vue-inspector'

import { IuVueResolver } from 'iu-vue'

// const PreviewFunc = (Preview as any).default

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv) => {
  return {
    base: '/',

    resolve: {
      alias: {
        '@/': `${resolve(__dirname, './src')}/`,
      },
    },

    plugins: [
      // PreviewFunc(),

      vue({
        include: [/\.vue$/, /\.md$/],
        reactivityTransform: true,
      }),

      vueJsx(),

      // Inspector({
      //   toggleButtonVisibility: 'never',
      // }),

      // prismjs({
      //   languages: ['markup'],
      //   css: true,
      // }),

      DefineOptions(),

      Pages({
        dirs: [
          { dir: './src/pages', baseRoute: '' },
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
        dirs: [
          'src/stores',
          'src/dark',
        ],
        dts: './auto-imports.d.ts',
        vueTemplate: true,
      }),

      Components({
        extensions: ['vue', 'md'],
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        resolvers: [
          IuVueResolver(),
        ],
        dts: './components.d.ts',
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
          md.use(MarkdownItAnchor, {
            tabIndex: false,
          })
        },
      }),

      Inspect(),

      // dts(),
    ],

    // ssgOptions: {
    //   script: 'async',
    //   formatting: 'minify',
    //   // onFinished() { generateSitemap() },
    // },

    build: {
      outDir: 'dist',
    },
  }
})
