import type { MasterServiceMeta } from "@example/ui-backend-model";
import type { ScreenMetaJson, ViewMetaJson } from "@tesler-ui-crm/schema";
import type { JsonRpcSuccess } from "./rpc";
import { rpcClient } from "./rpcClient";

export interface PlayerMenuParams {
  service: string;
}

export interface PlayerMenuResult {
  name: string;
  header: string;
  footer: string;
  screens: PlayerScreenSummary[];
}

export type PlayerViewSummary = Pick<ViewMetaJson, "name" | "title" | "url">;

/** Элемент списка экранов: как {@code SessionScreen} в tesler-ui (поле {@code defaultScreen}). */
export interface PlayerScreenSummary {
  name: string;
  title: string;
  defaultScreen: boolean;
  primaryViewName: string;
  navigation: ScreenMetaJson["navigation"];
  views: PlayerViewSummary[];
}

export type PlayerMenuResponse = JsonRpcSuccess<PlayerMenuResult>;

/** Корень meta с бэкенда (`player.menu`) — тип из Nexus `@example/ui-backend-model`. */
export function fetchPlayerMenu(params: PlayerMenuParams): Promise<MasterServiceMeta> {
  return rpcClient.call<MasterServiceMeta, PlayerMenuParams>("player.menu", params);
}
