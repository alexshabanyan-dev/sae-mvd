import naive from "naive-ui";
import { createApp } from "vue";
import { createPinia } from "pinia";
import { applyMvdCssVariables } from "@mvd/ui-kit-custom";
import "@mvd/ui-kit-custom/global.css";
import "@mvd/ui-kit-custom/styles.css";

import App from "./App.vue";
import router from "./router";
import { useAppMetaStore } from "@/shared/store";

applyMvdCssVariables();

async function bootstrap() {
  const app = createApp(App);
  const pinia = createPinia();
  app.use(pinia);

  try {
    await useAppMetaStore().loadContractMeta();
  } catch (error) {
    console.error("Failed to load MasterServiceMeta from backend:", error);
  }

  app.use(router);
  app.use(naive);
  app.mount("#app");
}

void bootstrap();
