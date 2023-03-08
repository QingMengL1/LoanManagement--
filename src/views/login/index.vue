<template>
  <div class="center">
    <div class="logo">
      <img src="@/assets/images/logo.png" alt="logo" width="200" />
    </div>
    <div class="login">
      <loginForm class="login-form" />
    </div>
  </div>
</template>

<script setup lang="ts">
import loginForm from "./compoents/loginForm.vue";
</script>

<style scoped lang="less">
.center {
  position: relative;
  height: 100vh;
  background: url("@/assets/images/loginBg.svg") no-repeat center;
  background-size: 100%;
  .logo {
    position: absolute;
    top: 40px;
    left: 40px;
  }
  .login {
    position: absolute;
    width: 1200px;
    height: 670px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgb(255, 255, 255);
    border-radius: 20px;
    background-image: url("@/assets/images/logingFromBg.svg");
    background-size: 60%;
    background-repeat: no-repeat;
    background-position: 18px;
    .login-form {
      position: absolute;
      width: 40%;
      left: 60%;
      height: 100%;
    }
  }
}
</style>
