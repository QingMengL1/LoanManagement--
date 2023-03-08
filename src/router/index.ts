import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login",
    meta: {
      isShow: false,
    },
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      isShow: false,
    },
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/home",
    name: "Home",
    meta: {
      title: "首页",
      Icon: "i-ep-House",
      isShow: false,
    },
    component: () => import("@/layout/index-layout.vue"),
    children: [
      {
        path: "/home",
        name: "Home",
        meta: {
          title: "首页",
          isShow: true,
          requiresAuth: true,
        },
        component: () => import("@/views/home/index.vue"),
      },
    ],
  },
  {
    path: "/index",
    name: "index",
    meta: {
      title: "首页",
      isShow: true,
    },
    component: () => import("@/layout/index-layout.vue"),
    children: [
      {
        path: "/index",
        name: "index",
        meta: {
          title: "首页",
          isShow: true,
          requiresAuth: true,
        },
        component: () => import("@/views/home/compoents/home.vue"),
      },
    ],
  },
];

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});
export default router;
