<template>
  <div class="common-layout">
    <el-container>
      <el-header class="common-layout-header">
        <div class="logo">
          <img src="@/assets/images/logo.png" alt="logo" height="50" />
        </div>
        <div class="tatle"><b>助学贷款管理系统</b></div>
        <!-- 头像部分 -->
        <ul class="heard-right">
          <el-badge :value="noRead" class="item" style="margin-right: 18px">
            <i-ep-ChatDotRound :size="50" @click="messageDrawer = true" />
          </el-badge>
          <li>
            <el-dropdown trigger="click">
              <el-button link>
                <template #default>
                  <el-avatar :size="45" :src="userPNG" />
                  <span style="margin-left: 10px; font-size: 18px">
                    你好，{{ name }}
                  </span>
                </template>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>
                    <span class="quitClass" @click="handleSetting">
                      <i-ep-EditPen />修改信息</span
                    >
                  </el-dropdown-item>
                </el-dropdown-menu>
                <el-dropdown-menu>
                  <el-dropdown-item>
                    <span class="quitClass" @click="handleLogout">
                      <i-ep-CloseBold />退出登录</span
                    >
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </li>
        </ul>
      </el-header>
      <el-container>
        <!-- 菜单 -->
        <el-aside class="common-layout-aside" width="200px">
          <el-menu
            mode="vertical"
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
            v-for="item in menuItem"
            router
            :default-active="activeMenu"
            @select="selectMenu"
          >
            <el-menu-item
              v-if="item.children && !item.meta?.isShow"
              :index="item.path"
            >
              <el-icon>
                <component :is="item.meta?.Icon" />
              </el-icon>
              <span>{{ item.children[0].meta?.title }}</span>
            </el-menu-item>

            <el-sub-menu v-else class="el-sub-menu" :index="item.path">
              <template #title>
                <el-icon>
                  <component :is="item.meta?.Icon" />
                </el-icon>
                {{ item.meta?.title }}
              </template>
              <div v-for="childrenItem in item.children">
                <el-menu-item class="el-menu-item" :index="childrenItem.path">
                  <el-icon>
                    <component :is="childrenItem.meta?.Icon" />
                  </el-icon>
                  {{ childrenItem.meta?.title }}
                </el-menu-item>
              </div>
            </el-sub-menu>
          </el-menu>
        </el-aside>
        <!-- 内容 -->
        <el-main class="common-layout-main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    <el-drawer v-model="messageDrawer" title="我的消息" :with-header="false">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-change="handleClick">
        <el-tab-pane label="全部消息" name="all"> </el-tab-pane>
        <el-tab-pane label="未读消息" name="no"></el-tab-pane>
      </el-tabs>
      <el-card
        v-for="item in sendMessageData"
        :key="item.id"
        class="box-card"
        style="margin-bottom: 16px"
        @click="readMessage(item)"
      >
        <template #header>
          <div class="card-header">
            <span>{{ item.send }}发来消息 </span>
            <span>
              {{ hourFormat(item.uploaded) }}
            </span>
          </div>
        </template>
        <P>{{ item.event }}</P>
      </el-card>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/store/user";
import { ref, watch } from "vue";
import { timeFormat, hourFormat } from "@/utils/timeformat";
import userPNG from "../assets/images/user.png";
import {
  SendMessageType,
  queryReadMessage,
  querySendMessage,
} from "@/api/system";
import { ElMessage } from "element-plus";

const { logout } = useUserStore();
const { role } = useUserStore();
const { name } = useUserStore();
const { nowMenu } = useUserStore();
const isCollapse = ref(false);

// const role = "*";

const filterRoutes = (router: any, role: string) => {
  const routeList = router.filter((route: any) => {
    if (route.children && route.children.length) {
      route.children = filterRoutes(route.children, role);
    }
    if (route.meta?.roles.includes(role) || route.meta?.roles.includes("*")) {
      if (route.children !== undefined || route.meta?.isShow) {
        return route;
      }
    }
  });
  return routeList;
};

// const menuItem = router.options.routes.filter(
//   (item) => item.children !== undefined || item.meta?.isShow
// );
const menuItem = filterRoutes(router.options.routes, role);
console.log();

const activeMenu = ref<string>(
  window.sessionStorage.getItem("activeMenu") || "/home/homeIndex"
);

const selectMenu = (val: string) => {
  activeMenu.value = val;
  window.sessionStorage.setItem("activeMenu", val);
};
router.beforeEach(async (to, from, next) => {
  activeMenu.value = to.path;
  window.sessionStorage.setItem("activeMenu", to.path);
  next();
});
const handleLogout = () => {
  logout();
};

const handleSetting = () => {
  router.push({ name: "Setting" });
};

const messageDrawer = ref(false);

const activeName = ref("no");

const sendMessageData = ref<SendMessageType[]>();
const noRead = ref(0);
const getSendMessage = async (type: string) => {
  const { data } = await querySendMessage({ type: type });
  sendMessageData.value = data.data;
  noRead.value = data.no;
};
getSendMessage("no");

const handleClick = (name: string) => {
  activeName.value = name;
  getSendMessage(name);
};

const readMessage = async (item: any) => {
  if (!item.read) {
    const { data } = await queryReadMessage(item.id);
    ElMessage.success(data);
    getSendMessage(activeName.value);
  }
};
</script>

<style lang="scss" scoped>
.common-layout {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
  min-width: 1600px;
  min-height: 600px;
}
.common-layout-header {
  display: flex;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 60px;
  z-index: 999;
  border-bottom: 1px solid rgb(229, 230, 235);
}
.common-layout-aside {
  height: calc(100vh - 60px);
  border-right: 1px solid rgb(229, 230, 235);
}
.common-layout-main {
  margin: 0;
  padding: 10px 10px 10px 10px;
  background-color: rgb(242, 243, 245);
}

.logo {
  display: flex;
  width: 160px;
  padding-top: 5px;
  padding-left: 10px;
}
.tatle {
  display: flex;
  height: 60px;
  font-size: 18px;
  line-height: 60px;
  margin-left: 5px;
}
.heard-right {
  display: flex;
  margin-left: auto;
  padding-right: 5px;
  list-style: none;
  li {
    display: flex;
    align-items: center;
    padding: 0 10px;
  }
}

.quitClass {
  display: flex;
  align-items: center;
}
.el-menu {
  border: 0px;
}
</style>
