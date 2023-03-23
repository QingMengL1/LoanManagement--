import { useUserStore } from "@/store/user";
import { isLogin } from "@/utils/auth";
import { ElMessage } from "element-plus";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login",
    meta: {
      isShow: false,
      roles: ["*"],
    },
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      isShow: false,
      roles: ["*"],
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
      roles: ["*"],
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
          roles: ["student", "teacher", "bank", "*"],
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
      roles: ["student", "*"],
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
          roles: ["student", "*"],
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
          roles: ["student", "bank", "*"],
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
      roles: ["*"],
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
          roles: ["student", "*"],
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
          roles: ["student", "*"],
        },
        component: () => import("@/views/user/commonUser/index.vue"),
      },
      {
        path: "/user/setting",
        name: "Setting",
        meta: {
          title: "账号设置",
          isShow: true,
          requiresAuth: true,
          Icon: "Setting",
          roles: ["*"],
        },
        component: () => import("@/views/user/setting/index.vue"),
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
      roles: ["teacher", "bank", "*"],
    },
    component: () => import("@/layout/index-layout.vue"),
  },
];

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHistory(),
  routes, // `routes: routes` 的缩写
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  if (isLogin()) {
    if (userStore.role) {
      next();
    } else {
      try {
        await userStore.info();
        next();
      } catch (error) {
        await userStore.logout();
        next({
          name: "Login",
        });
      }
    }
  } else {
    if (to.name === "Login") {
      next();
      return;
    }
    next({
      name: "Login",
    });
  }
});

export default router;
