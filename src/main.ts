import { createApp } from "vue";
import "./style.css";
import router from "./router/index";
import App from "./App.vue";
import "element-plus/dist/index.css";
import { createPinia } from "pinia";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

import "@/api/interceptor";

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(router);
app.use(createPinia());
app.mount("#app");
