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
      roles: ["student"],
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
          roles: ["student"],
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
      roles: ["student"],
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
          roles: ["student"],
        },
        component: () => import("@/views/myLoan/application/index.vue"),
      },
      {
        path: "/myLoan/status",
        name: "Status",
        meta: {
          title: "贷款状态",
          isShow: true,
          requiresAuth: true,
          Icon: "Connection",
          roles: ["student"],
        },
        component: () => import("@/views/myLoan/status/index.vue"),
      },
      {
        path: "/myLoan/repay",
        name: "Repay",
        meta: {
          title: "还款申请",
          isShow: true,
          requiresAuth: true,
          Icon: "Discount",
          roles: ["student"],
        },
        component: () => import("@/views/myLoan/repay/index.vue"),
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
      roles: ["teacher", "admin"],
    },
    component: () => import("@/layout/index-layout.vue"),
    children: [
      {
        path: "/audit/loanpass",
        name: "LoanPass",
        meta: {
          title: "贷款审批",
          isShow: true,
          requiresAuth: true,
          Icon: "Pointer",
          roles: ["admin", "teacher"],
        },
        component: () => import("@/views/audit/loanpass/index.vue"),
      },
      {
        path: "/audit/send",
        name: "LoanSend",
        meta: {
          title: "贷款发放",
          isShow: true,
          requiresAuth: true,
          Icon: "FolderChecked",
          roles: ["admin", "teacher"],
        },
        component: () => import("@/views/audit/send/index.vue"),
      },
      {
        path: "/audit/delay",
        name: "Delay",
        meta: {
          title: "贷款延期",
          isShow: true,
          requiresAuth: true,
          Icon: "PieChart",
          roles: ["admin", "teacher"],
        },
        component: () => import("@/views/audit/delay/index.vue"),
      },
    ],
  },
  {
    path: "/data",
    name: "Student",
    meta: {
      title: "数据管理",
      isShow: true,
      Icon: "School",
      roles: ["teacher", "admin"],
    },
    component: () => import("@/layout/index-layout.vue"),
    children: [
      {
        path: "/dataList/studentlist",
        name: "StudentList",
        meta: {
          title: "学生信息",
          isShow: true,
          requiresAuth: true,
          Icon: "User",
          roles: ["admin", "teacher"],
        },
        component: () => import("@/views/dataList/studentList/index.vue"),
      },
      {
        path: "/data/studentlist",
        name: "TeacherList",
        meta: {
          title: "教师信息",
          isShow: true,
          requiresAuth: true,
          Icon: "User",
          roles: ["admin"],
        },
        component: () => import("@/views/dataList/teacherList/index.vue"),
      },
      {
        path: "/data/loan",
        name: "StudentLoad",
        meta: {
          title: "贷款信息",
          isShow: true,
          requiresAuth: true,
          Icon: "Coin",
          roles: ["admin", "teacher"],
        },
        component: () => import("@/views/dataList/loan/index.vue"),
      },
    ],
  },
  {
    path: "/system",
    name: "System",
    meta: {
      title: "系统管理",
      isShow: true,
      Icon: "Setting",
      roles: ["admin"],
    },
    component: () => import("@/layout/index-layout.vue"),
    children: [
      {
        path: "/system/log",
        name: "Log",
        meta: {
          title: "系统日志",
          isShow: true,
          requiresAuth: true,
          Icon: "MessageBox",
          roles: ["admin"],
        },
        component: () => import("@/views/system/log/index.vue"),
      },
      {
        path: "/system/filelist",
        name: "FileList",
        meta: {
          title: "文件管理",
          isShow: true,
          requiresAuth: true,
          Icon: "FolderChecked",
          roles: ["admin"],
        },
        component: () => import("@/views/system/filelist/index.vue"),
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
          roles: ["student"],
        },
        component: () => import("@/views/user/basic/index.vue"),
      },
      {
        path: "/user/teacherbasic",
        name: "TeacherBasic",
        meta: {
          title: "基本信息",
          isShow: true,
          requiresAuth: true,
          Icon: "User",
          roles: ["teacher"],
        },
        component: () => import("@/views/user/teacherBasic/index.vue"),
      },
      {
        path: "/user/common",
        name: "Common",
        meta: {
          title: "共同借款人信息",
          isShow: true,
          requiresAuth: true,
          Icon: "Tickets",
          roles: ["student"],
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
];

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHistory(),
  routes, // `routes: routes` 的缩写
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  window.sessionStorage.setItem("activeMenu", to.path);
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
