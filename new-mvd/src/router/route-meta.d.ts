import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    /** Human-readable page title. */
    pageTitle: string
    /** Optional custom breadcrumb label (falls back to pageTitle). */
    breadcrumbLabel?: string
  }
}
