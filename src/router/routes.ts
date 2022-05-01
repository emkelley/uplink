import { RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/feed",
    name: "feed",
    component: () =>
      import(/* webpackChunkName: "feed" */ "../views/FeedView.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/settings",
    name: "settings",
    component: () =>
      import(/* webpackChunkName: "settings" */ "../views/SettingsView.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/auth/LoginView.vue"),
    meta: {
      requiresUnauth: true,
    },
  },
];
