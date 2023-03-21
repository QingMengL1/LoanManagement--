import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

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
      isShow: false,
      Icon: "House",
    },
    component: () => import("@/layout/index-layout.vue"),
    children: [
      {
        path: "/home",
        name: "HomeIndex",
        meta: {
          title: "首页",
          isShow: true,
          requiresAuth: true,
          Icon: "House",
        },
        component: () => import("@/views/home/index.vue"),
      },
    ],
  },
  {
    path: "/myLoan",
    name: "MyLoan",
    meta: {
      title: "我的贷款",
      isShow: true,
      Icon: "MessageBox",
    },
    component: () => import("@/layout/index-layout.vue"),
    children: [
      {
        path: "/myLoan/application",
        name: "Application",
        meta: {
          title: "申请贷款",
          isShow: true,
          requiresAuth: true,
          Icon: "Finished",
        },
        component: () => import("@/views/myLoan/application/index.vue"),
      },
      {
        path: "/myLoan/repay",
        name: "Repay",
        meta: {
          title: "还款申请",
          isShow: true,
          requiresAuth: true,
          Icon: "Discount",
        },
        component: () => import("@/views/myLoan/repay/index.vue"),
      },
    ],
  },
  {
    path: "/user",
    name: "User",
    meta: {
      title: "我的信息",
      isShow: true,
      Icon: "User",
    },
    component: () => import("@/layout/index-layout.vue"),
    children: [
      {
        path: "/user/basic",
        name: "Basic",
        meta: {
          title: "基本信息",
          isShow: true,
          requiresAuth: true,
          Icon: "User",
        },
        component: () => import("@/views/user/basic/index.vue"),
      },
      {
        path: "/user/common",
        name: "Common",
        meta: {
          title: "共同借款人信息",
          isShow: true,
          requiresAuth: true,
          Icon: "Tickets",
        },
        component: () => import("@/views/user/commonUser/index.vue"),
      },
      {
        path: "/user/account",
        name: "Account",
        meta: {
          title: "账号设置",
          isShow: true,
          requiresAuth: true,
          Icon: "Setting",
        },
        component: () => import("@/views/user/account/index.vue"),
      },
    ],
  },
  {
    path: "/audit",
    name: "Audit",
    meta: {
      title: "贷款审核",
      isShow: true,
      Icon: "EditPen",
    },
    component: () => import("@/layout/index-layout.vue"),
  },
];

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHistory(),
  routes, // `routes: routes` 的缩写
});

export default router;
