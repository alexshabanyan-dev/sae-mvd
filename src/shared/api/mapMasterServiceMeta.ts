import type { MasterServiceMeta } from "@example/ui-backend-model";

import type { PlayerMenuResult, PlayerScreenSummary, PlayerViewSummary } from "./menu";

/**
 * Адаптер контракта SSOT → форма, которую ожидает shell (screens / navigation).
 */
export function mapMasterServiceMetaToPlayerMenu(meta: MasterServiceMeta): PlayerMenuResult {
  const screens: PlayerScreenSummary[] = [];

  for (const component of meta.businessComponents ?? []) {
    const defaultScreenName =
      component.defaultScreen ?? component.primaryScreens?.[0]?.name ?? "";

    for (const screen of component.primaryScreens ?? []) {
      const views: PlayerViewSummary[] = (screen.primaryViews ?? []).map((view) => ({
        name: view.name,
        title: view.title,
        url: view.url,
      }));

      screens.push({
        name: screen.name,
        title: screen.title,
        defaultScreen: screen.name === defaultScreenName,
        primaryViewName: screen.primaryViewName,
        navigation: meta.navigation ?? null,
        views,
      });
    }
  }

  return {
    name: meta.name ?? "",
    header: meta.header ?? "",
    footer: meta.footer ?? "",
    screens,
  };
}
