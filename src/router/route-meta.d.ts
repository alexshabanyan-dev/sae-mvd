import type { RouteLocationRaw } from 'vue-router'
import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    /** Human-readable page title. */
    pageTitle: string
    /** Optional custom breadcrumb label (falls back to pageTitle). */
    breadcrumbLabel?: string
    /**
     * Цепочка хлебных крошек; у последнего элемента не указывайте `to` — это текущая страница.
     * Если не задано, в шапке показывается один сегмент из `breadcrumbLabel` / `pageTitle`.
     */
    breadcrumbs?: ReadonlyArray<{
      readonly label: string
      readonly to?: RouteLocationRaw
    }>
    /** Скрыть кнопку «Назад» в подзаголовке (редкие экраны без навигации назад). */
    hideSubHeaderBack?: boolean
    /**
     * Куда вести при «Назад», если в истории браузера нет шага назад (прямой заход по URL).
     * По умолчанию — главная (`name: 'home'`).
     */
    subHeaderBackFallback?: RouteLocationRaw
  }
}
