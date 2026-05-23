import { createRouter, createWebHistory } from 'vue-router'
import { resolveShellStepLabel } from '@/shared/navigation/shellBreadcrumbLabels'
import { useAppMetaStore } from '@/shared/store/appMetaStore'
import { useShellNavigationStore } from '@/shared/store/shellNavigationStore'
import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.afterEach((to) => {
  const shell = useShellNavigationStore()
  if (to.name === 'home') {
    shell.reset()
  } else if (to.name === 'view') {
    shell.onViewRoute(to)
  }

  const appSuffix = 'ИСОД'
  if (to.name === 'view') {
    const shell = useShellNavigationStore()
    const appMeta = useAppMetaStore()
    const last = shell.trail[shell.trail.length - 1]
    const page =
      last != null
        ? resolveShellStepLabel(appMeta.screens, last.screenName, last.viewName)
        : (to.meta.pageTitle as string)
    document.title = `${page} · ${appSuffix}`
  } else {
    document.title = `${to.meta.pageTitle} · ${appSuffix}`
  }
})

export default router
