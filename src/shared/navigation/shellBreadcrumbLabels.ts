import type { PlayerScreenSummary } from "@/shared/api";

/**
 * Подпись шага (screen + view) из bootstrap-меты, в духе Tesler: view.title, иначе screen.title.
 */
export function resolveShellStepLabel(
  screens: PlayerScreenSummary[],
  screenName: string,
  viewName: string,
): string {
  const screen = screens.find((s) => s.name === screenName);
  const view = screen?.views?.find((v) => v.name === viewName);
  const raw = view?.title?.trim() || screen?.title?.trim() || viewName;
  return raw || "Раздел";
}
