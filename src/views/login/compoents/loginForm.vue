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
          type="password"
        >
          <template #prefix>
            <i-ep-Lock color="rgb(64, 158, 255)"></i-ep-Lock>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="userInfo.rememberPassword" />
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
import { login } from "@/api/user";
import router from "@/router";
import { reactive } from "vue";

const userInfo = reactive({
  rememberPassword: true,
  username: "",
  password: "",
});

const onSubmit = async () => {
  const { data } = await login(userInfo);
  // router.push({ name: "Home" });
};
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
