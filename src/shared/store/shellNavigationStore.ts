import { defineStore } from "pinia";
import { ref } from "vue";
import type { RouteLocationNormalized } from "vue-router";

/**
 * Один шаг навигации в shell (экран + view), как в URL Tesler.
 * Цепочка крошек строится по фактическим переходам; при переходе на уже
 * посещённую пару (в т.ч. клик по крошке) хвост обрезается до этого шага.
 */
export interface ShellTrailStep {
  readonly screenName: string;
  readonly viewName: string;
}

export const useShellNavigationStore = defineStore("shellNavigation", () => {
  const trail = ref<ShellTrailStep[]>([]);

  function reset() {
    trail.value = [];
  }

  /**
   * Вызывать из `router.afterEach` для маршрута `view`.
   * Если пара (screen, view) уже есть в трейле — обрезаем хвост (возврат к прошлому шагу).
   * Иначе добавляем новый шаг в конец.
   */
  function onViewRoute(to: RouteLocationNormalized) {
    if (to.name !== "view") return;
    const sn = to.params.screenName;
    const vn = to.params.viewName;
    if (typeof sn !== "string" || typeof vn !== "string") return;

    const existing = trail.value.findIndex((s) => s.screenName === sn && s.viewName === vn);
    if (existing >= 0) {
      trail.value = trail.value.slice(0, existing + 1);
      return;
    }

    trail.value = [...trail.value, { screenName: sn, viewName: vn }];
  }

  return {
    trail,
    reset,
    onViewRoute,
  };
});
