import type { Screen, View, WidgetField } from "@master-service/meta-model-ui";
import type { JsonRpcSuccess } from "./rpc";
import { rpcClient } from "./rpcClient";

export interface PlayerViewParams {
  service: string;
  screen: string;
  view: string;
}

export interface PlayerDatamodelBoSystem {
  metaNodeId: number;
  systemId: string;
}

export interface PlayerDatamodelNodeInfo {
  id: number;
  type: string;
  tableName: string;
}

export interface PlayerDatamodelFieldInfo {
  id: number;
  type: string;
  required: boolean;
}

export interface PlayerDatamodelItem {
  id: number;
  parentId: number;
  code: string;
  name: string;
  order_: number;
  discriminator: string;
  storageKind: string;
  list: boolean;
  boSystem?: PlayerDatamodelBoSystem;
  node?: PlayerDatamodelNodeInfo;
  field?: PlayerDatamodelFieldInfo;
}

export interface PlayerWidgetPermission {
  type: string;
  name: string;
}

export interface PlayerWidgetDescriptor {
  id: number;
  boSystemId: string;
  title: string;
  type: string;
  fields: WidgetField[];
  options?: Record<string, unknown>;
}

export interface PlayerViewWidgetItem {
  position: number;
  gridWidth?: number;
  widgetName: string;
  permissions?: PlayerWidgetPermission[];
  widget: PlayerWidgetDescriptor;
}

export type PlayerPrimaryView = Omit<View, "widgets"> & {
  widgets: PlayerViewWidgetItem[];
};

export type PlayerPrimaryScreen = Omit<Screen, "primaryViews"> & {
  roles?: unknown[];
  primaryViews: PlayerPrimaryView[];
};

export interface PlayerBusinessComponent {
  primaryScreens: PlayerPrimaryScreen[];
}

export interface PlayerViewResult {
  screenName: string;
  viewName: string;
  datamodel: PlayerDatamodelItem[];
  businessComponents: PlayerBusinessComponent[];
}

export type PlayerViewResponse = JsonRpcSuccess<PlayerViewResult>;

export function fetchPlayerView(params: PlayerViewParams): Promise<PlayerViewResult> {
  return rpcClient.call<PlayerViewResult, PlayerViewParams>("player.view", params);
}
