import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.afterEach((to) => {
  const appSuffix = 'ИСОД'
  document.title = `${to.meta.pageTitle} · ${appSuffix}`
})

export default router
