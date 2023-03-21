<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">
        <i-ep-menu />
      </el-breadcrumb-item>
      <el-breadcrumb-item> 我的信息 </el-breadcrumb-item>
      <el-breadcrumb-item> 账号设置 </el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <div class="form_class">
        <el-form
          ref="userForm"
          :rules="rulesUserForm"
          :model="userFormData"
          label-width="80px"
          style="width: 500px; margin: 0 auto"
        >
          <el-form-item label="账号">
            {{ userFormData.id }}
          </el-form-item>
          <el-form-item label="密码">
            <el-input
              v-model="userFormData.password1"
              placeholder="如果需要修改密码请输入"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input
              v-model="userFormData.password2"
              placeholder="请再次输入要修改的密码"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="userFormData.phone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="userFormData.email"></el-input>
          </el-form-item>
          <el-form-item label="QQ" prop="qq">
            <el-input v-model="userFormData.qq"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button>重置</el-button>
            <el-button type="primary">提交修改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { FormInstance, FormRules } from "element-plus";
import { reactive, ref } from "vue";

const userForm = ref<FormInstance>();
const userFormData = reactive({
  id: "1902020318",
  password1: "",
  password2: "",
  phone: "",
  email: "",
  qq: "",
});
const rulesUserForm = reactive<FormRules>({
  phone: [{ required: true, message: "手机号不能为空", trigger: "blur" }],
  email: [{ required: true, message: "邮箱不能为空", trigger: "blur" }],
  qq: [{ required: true, message: "QQ不能为空", trigger: "blur" }],
});
</script>

<style scoped lang="scss">
.box-card {
  display: block;
  min-height: 88vh;
  margin-top: 8px;
  overflow: auto;
  padding-bottom: 26px;
}
.form_class {
  width: 60%;
  padding: 0 auto;
  margin: 0 auto;
  margin-top: 26px;
}
</style>
