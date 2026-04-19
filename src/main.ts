import naive from "naive-ui";
import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { applyIscodCssVariables } from "./naive/apply-iscod-css-vars";
import "./styles/global.css";
import "./naive/styles/index.css";

applyIscodCssVariables();

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(naive)

app.mount('#app')
