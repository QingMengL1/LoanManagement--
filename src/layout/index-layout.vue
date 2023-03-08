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
          <li>
            <el-dropdown trigger="click">
              <el-button link>
                <template #default>
                  <el-avatar
                    :size="45"
                    src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202104%2F22%2F20210422220415_2e4bd.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1679317245&t=afd654f85eabab5d4b50cb0011748cb9"
                  />
                  <span style="margin-left: 10px; font-size: 18px">Admin</span>
                </template>
              </el-button>
              <template #dropdown>
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
        <el-aside
          class="common-layout-aside"
          :width="isCollapse ? '65px' : '200px'"
        >
          <el-button @click="toggleShow" style="width: 100%">
            <i-ep-Menu />
          </el-button>
          <el-menu
            mode="vertical"
            default-active="2"
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
            v-for="item in menuItem"
            router
          >
            <el-menu-item
              v-if="item.children && !item.meta?.isShow"
              :index="item.path"
            >
              <i :class="item.meta?.Icon"></i>
              <span>{{ item.children[0].meta?.title }}</span>
            </el-menu-item>

            <el-sub-menu v-else class="el-sub-menu" :index="item.path">
              <template #title>
                {{ item.meta?.title }}
              </template>
              <div v-for="childrenItem in item.children">
                <el-menu-item class="el-menu-item" :index="childrenItem.path">
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
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/store/user";
import { ref } from "vue";

const { logout } = useUserStore();

const isCollapse = ref(false);
// const switchValue = ref(false);
const toggleShow = () => {
  isCollapse.value = !isCollapse.value;
};
const menuItem = router.options.routes.filter(
  (item) => item.children !== undefined || item.meta?.isShow
);

const handleLogout = () => {
  logout();
};
</script>

<style lang="scss" scoped>
.common-layout {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
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
  padding: 0 20px 40px 20px;
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
