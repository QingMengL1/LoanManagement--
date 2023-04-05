<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">
        <i-ep-menu />
      </el-breadcrumb-item>
      <el-breadcrumb-item> 我的信息 </el-breadcrumb-item>
      <el-breadcrumb-item> 基本信息 </el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <div class="form_class">
        <div class="basic_form" style="margin-top: 26px">
          <TeacherBasicEdit :teacher-id="id"></TeacherBasicEdit>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import TeacherBasicEdit from "@/components/teacherBasicEdit.vue";
import { useUserStore } from "@/store/user";
const { id } = useUserStore();
</script>

<style scoped lang="scss">
.form_class {
  width: 60%;
  padding: 0 auto;
  margin: 0 auto;
}
.box-card {
  display: block;
  min-height: 88vh;
  margin-top: 8px;
  overflow: auto;
  padding-bottom: 26px;
}
</style>
