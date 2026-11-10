import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import i18n from "./i18n";
import App from "./App.vue";
import router from "./router";
import { createHead } from "@unhead/vue/client";
import "./assets/css/main.css";

const app = createApp(App);

const pinia = createPinia();
const head = createHead();


pinia.use(piniaPluginPersistedstate);
app.use(head);
app.use(pinia);
app.use(router);
app.use(i18n);
app.mount("#app");