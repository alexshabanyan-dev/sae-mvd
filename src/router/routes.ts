import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/views/HomeShell.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/HomeView.vue'),
        meta: {
          pageTitle: 'Главная страница',
          breadcrumbLabel: 'Главная',
          breadcrumbs: [{ label: 'Главная' }],
        },
      },
      {
        path: 'section',
        component: () => import('@/views/SectionLayout.vue'),
        children: [
          {
            path: '',
            name: 'home.section',
            component: () => import('@/views/SectionPage.vue'),
            meta: {
              pageTitle: 'Раздел',
              breadcrumbLabel: 'Раздел',
              breadcrumbs: [
                { label: 'Главная', to: { name: 'home' } },
                { label: 'Раздел' },
              ],
            },
          },
          {
            path: 'inner',
            name: 'home.section.inner',
            component: () => import('@/views/SectionInnerPage.vue'),
            meta: {
              pageTitle: 'Вложенная страница',
              breadcrumbLabel: 'Вложенная страница',
              breadcrumbs: [
                { label: 'Главная', to: { name: 'home' } },
                { label: 'Раздел', to: { name: 'home.section' } },
                { label: 'Вложенная страница' },
              ],
              /** При прямом заходе на URL без истории — «Назад» ведёт в раздел, не на главную. */
              subHeaderBackFallback: { name: 'home.section' },
            },
          },
        ],
      },
    ],
  },
]
