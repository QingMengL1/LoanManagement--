import { createApp } from "vue";
import "./style.css";
import router from "./router/index";
import App from "./App.vue";
import "element-plus/dist/index.css";
import { createPinia } from "pinia";

import '@/api/interceptor';

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.mount("#app");
