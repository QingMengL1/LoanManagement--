<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">
        <i-ep-menu />
      </el-breadcrumb-item>
      <el-breadcrumb-item> 学生管理 </el-breadcrumb-item>
      <el-breadcrumb-item> 贷款信息 </el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card"> </el-card>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.box-card {
  display: block;
  min-height: 88vh;
  margin-top: 8px;
  overflow: auto;
  padding-bottom: 26px;
}
</style>
