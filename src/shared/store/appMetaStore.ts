import type { MasterServiceMeta } from "@master-service/meta-model-ui";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import {
  fetchPlayerMenu,
  mapMasterServiceMetaToPlayerMenu,
  type PlayerMenuResult,
} from "@/shared/api";

import { useShellNavigationStore } from "./shellNavigationStore";

export const useAppMetaStore = defineStore("appMeta", () => {
  const contractMeta = ref<MasterServiceMeta | null>(null);
  const name = ref<PlayerMenuResult["name"] | null>(null);
  const header = ref<PlayerMenuResult["header"] | null>(null);
  const footer = ref<PlayerMenuResult["footer"] | null>(null);
  const screens = ref<PlayerMenuResult["screens"]>([]);
  const activeScreenName = ref<string | null>(null);
  const activeScreen = computed(
    () => screens.value.find((screen) => screen.name === activeScreenName.value) ?? null,
  );
  const navigation = computed(() => activeScreen.value?.navigation ?? null);

  function setAppMeta(payload: PlayerMenuResult) {
    name.value = payload.name;
    header.value = payload.header;
    footer.value = payload.footer;
    screens.value = payload.screens;
    const defaultScreen =
      payload.screens.find((screen) => screen.defaultScreen) ?? payload.screens[0];
    activeScreenName.value = defaultScreen?.name ?? null;
  }

  function setContractMeta(meta: MasterServiceMeta) {
    contractMeta.value = meta;
    setAppMeta(mapMasterServiceMetaToPlayerMenu(meta));
  }

  async function loadContractMeta(service = "person") {
    const meta = await fetchPlayerMenu({ service });
    setContractMeta(meta);
    return meta;
  }

  function setActiveScreen(screenName: string) {
    activeScreenName.value = screenName;
  }

  function resetAppMeta() {
    contractMeta.value = null;
    name.value = null;
    header.value = null;
    footer.value = null;
    screens.value = [];
    activeScreenName.value = null;
    useShellNavigationStore().reset();
  }

  return {
    contractMeta,
    name,
    header,
    footer,
    screens,
    activeScreenName,
    activeScreen,
    navigation,
    setAppMeta,
    setContractMeta,
    loadContractMeta,
    setActiveScreen,
    resetAppMeta,
  };
});
