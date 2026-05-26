import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  /**
   * Корень: {@link ScreenPage} — загрузка meta и replace на целевой screen/view
   * (параллельно тому, как {@link ViewPage} обслуживает `/screen/.../view/...`).
   */
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/ScreenPage.vue'),
    meta: {
      pageTitle: 'Главная страница',
      breadcrumbLabel: 'Главная',
    },
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/views/TestPage.vue'),
    meta: {
      pageTitle: 'Тест layout',
      breadcrumbLabel: 'Тест layout',
    },
  },
  {
    path: '/screen/:screenName/view/:viewName',
    name: 'view',
    component: () => import('@/views/ViewPage.vue'),
    meta: {
      /** Заголовок вкладки до появления трейла; крошки строятся из `shellNavigation` + meta меню. */
      pageTitle: 'Раздел',
      breadcrumbLabel: 'Раздел',
    },
  },
]
