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
          <el-form-item label="密码" prop="password1">
            <el-input
              v-model="userFormData.password1"
              type="password"
              placeholder="如果需要修改密码请输入"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="password2">
            <el-input
              v-model="userFormData.password2"
              type="password"
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
            <el-button @click="resetForm">重置</el-button>
            <el-button type="primary" @click="submitEdit">提交修改</el-button>
          </el-form-item>
          <el-form-item>
            <span style="color: #c8c9cc">
              <i-ep-InfoFilled></i-ep-InfoFilled>
              此部分只影响登录信息中的内容，并不会对基本信息进行修改
            </span>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ElMessage, FormInstance, FormRules } from "element-plus";
import { useUserStore } from "@/store/user";
import { reactive, ref } from "vue";
import { userSettingType, userSetting } from "@/api/user";
import { emailTest, passwordTest, phoneTest } from "@/utils/tegTest";

const userForm = ref<FormInstance>();
const userStore = useUserStore();

const userFormData = ref<userSettingType>({
  id: userStore.id,
  password1: "",
  password2: "",
  phone: userStore.phone || "",
  email: userStore.email || "",
  qq: userStore.qq || "",
});
const rulesUserForm = reactive<FormRules>({
  phone: [
    { required: true, message: "手机号不能为空", trigger: "blur" },
    {
      asyncValidator: (rule, value) => {
        return new Promise((resolve, reject) => {
          if (!phoneTest.test(value)) {
            reject("请输入正确的手机号");
          } else {
            resolve();
          }
        });
      },
      trigger: "blur",
    },
  ],
  email: [
    { required: true, message: "邮箱不能为空", trigger: "blur" },
    {
      asyncValidator: (rule, value) => {
        return new Promise((resolve, reject) => {
          if (!emailTest.test(value)) {
            reject("请输入正确的邮箱");
          } else {
            resolve();
          }
        });
      },
      trigger: "blur",
    },
  ],
  qq: [{ required: true, message: "QQ不能为空", trigger: "blur" }],
  password1: [
    {
      asyncValidator: (rule, value) => {
        return new Promise((resolve, reject) => {
          if (!passwordTest.test(value) && value.length > 0) {
            reject("密码请包括大写字母，小写字母，数字，特殊符号中任意3项");
          } else {
            resolve();
          }
        });
      },
      trigger: "blur",
    },
  ],
  password2: [
    {
      asyncValidator: (rule, value) => {
        return new Promise((resolve, reject) => {
          if (userFormData.value.password1 !== value) {
            reject("确认密码和上一次密码不相同");
          } else {
            resolve();
          }
        });
      },
      trigger: "blur",
    },
  ],
});

const submitEdit = async () => {
  let flog = true;
  await userForm.value.validate((valid: any, fields: any) => {
    if (!valid) {
      flog = false;
      return false;
    }
  });
  if (flog) {
    const { data } = await userSetting(userFormData.value);
    ElMessage.success(data);
    await userStore.info();
    resetForm();
  }
};

const resetForm = () => {
  userFormData.value.id = userStore.id;
  userFormData.value.password1 = "";
  userFormData.value.password2 = "";
  userFormData.value.phone = userStore.phone || "";
  userFormData.value.email = userStore.email || "";
  userFormData.value.qq = userStore.qq || "";
};
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
