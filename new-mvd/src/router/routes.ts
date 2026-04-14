import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      pageTitle: 'Перечень модулей подсистемы ФР-Оповещение',
      breadcrumbLabel: 'Главная',
    },
  },
]
