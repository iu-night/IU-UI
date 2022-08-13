import { createApp } from 'vue'
// import { ViteSSG } from 'vite-ssg'
import { createHead } from '@vueuse/head'
import { createRouter, createWebHashHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import { setupIu, setupNprogress, setupPinia, setupStarport } from './modules'
import App from './App.vue'

// import type { UserModule } from './types'
import generatedRoutes from '~pages'

import '@unocss/reset/tailwind.css'
import './styles/main.css'

import 'iu-ui/styles/var.scss'
import 'uno.css'

const head = createHead()
const routes = setupLayouts(generatedRoutes)

const app = createApp(App)

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

app.use(router)
app.use(head)

setupStarport(app)
setupNprogress(router)
setupPinia(app)
setupIu(app)

app.mount('#app')

// export const createApp = ViteSSG(
//   App,
//   { routes, base: import.meta.env.BASE_URL },
//   (ctx) => {
//     Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true })).forEach(i => i.install?.(ctx))
//   },
// )
