<template>
  <div class="login-form">
    <div class="login-form-tital">
      <h2>欢迎登陆助学贷款管理系统</h2>
    </div>
    <el-form class="login-form-form" :model="userInfo">
      <el-form-item>
        <el-input v-model="userInfo.username" placeholder="请输入用户名">
          <template #prefix>
            <i-ep-User color="rgb(64, 158, 255)"></i-ep-User>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="userInfo.password"
          placeholder="请输入密码"
          style="margin-top: 20px"
          :type="showPassword ? 'text' : 'password'"
        >
          <template #prefix>
            <i-ep-Lock color="rgb(64, 158, 255)"></i-ep-Lock>
          </template>
          <template #suffix>
            <i-ep-View
              v-if="!showPassword"
              color="rgb(64, 158, 255)"
              @click="showPassword = true"
            >
            </i-ep-View>
            <i-ep-Hide
              v-else
              color="rgb(64, 158, 255)"
              @click="showPassword = false"
            >
            </i-ep-Hide>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="loginConfig.rememberPassword" />
        <p style="margin-left: 10px">记住密码</p>
      </el-form-item>
    </el-form>
    <el-form-item>
      <el-button type="primary" class="login-form-btn" @click="onSubmit">
        登录
      </el-button>
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/store/user";
import { useStorage } from "@vueuse/core";
import { reactive, ref } from "vue";

const userStore = useUserStore();
const loginConfig = useStorage("login-config", {
  rememberPassword: true,
  username: "",
  password: "",
});
const userInfo = reactive({
  username: loginConfig.value.username,
  password: loginConfig.value.password,
});

const onSubmit = async () => {
  router.push({ name: "HomeIndex" });
  // try {
  //   await userStore.login(userInfo);
  //   await userStore.info();
  //   router.push({ name: "HomeIndex" });
  //   const { rememberPassword } = loginConfig.value;
  //   const { username, password } = userInfo;
  //   loginConfig.value.username = rememberPassword ? username : "";
  //   loginConfig.value.password = rememberPassword ? password : "";
  // } catch (error) {
  //   router.push({ name: "Login" });
  // }
};

const showPassword = ref(false);
</script>

<style scoped lang="less">
.login-form {
  margin-top: 100px;
  &-form {
    width: 80%;
  }
  &-tital {
    margin-bottom: 100px;
  }
  &-btn {
    width: 80%;
    margin-top: 20px;
  }
}
</style>
