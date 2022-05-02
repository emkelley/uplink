import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";
import "./app.css";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

createApp(App)
  .use(router)
  .use(Toast, {
    transition: "Vue-Toastification__bounce",
    maxToasts: 20,
    newestOnTop: true,
    position: "bottom-right",
    toastClassName: "primary",
  })
  .mount("#app");
