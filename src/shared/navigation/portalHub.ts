import type { ScreenMetaJson } from "@tesler-ui-crm/schema";

/** Пункты меню с `screenName` — межэкранная навигация (портальный хаб). */
export function navigationMenuHasCrossScreenLinks(
  navigation: ScreenMetaJson["navigation"] | null | undefined,
): boolean {
  const menu = navigation?.menu;
  if (!menu?.length) return false;
  for (const entry of menu) {
    if ("child" in entry && Array.isArray(entry.child)) {
      for (const c of entry.child) {
        if (
          typeof c === "object" &&
          c !== null &&
          "screenName" in c &&
          typeof (c as { screenName?: unknown }).screenName === "string" &&
          (c as { screenName: string }).screenName.length > 0
        ) {
          return true;
        }
      }
    }
  }
  return false;
}

/** Дефолтный экран с межэкранным меню — «портал» (плитки по screens, без primaryMenu в meta). */
export function screenIsPortalHub(screen: {
  defaultScreen: boolean;
  navigation: ScreenMetaJson["navigation"];
}): boolean {
  return Boolean(screen.defaultScreen && navigationMenuHasCrossScreenLinks(screen.navigation));
}
