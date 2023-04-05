<template>
  <div>
    <el-form
      ref="basicForm"
      :rules="rulesForm"
      :model="editTeacherData"
      label-width="130px"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="editTeacherData.name" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="教师号" prop="teacherId">
            <el-input v-model="editTeacherData.teacherId" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="学院" prop="xueyuan">
            <el-select v-model="editTeacherData.xueyuan">
              <el-option
                v-for="item in xueYuanOptions"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="editTeacherData.phone" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="editTeacherData.email" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="性别" prop="xingbie">
            <el-input v-model="editTeacherData.xingbie" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" style="width: 100px" @click="reset">
          重置
        </el-button>
        <el-button type="primary" style="width: 100px" @click="submitBasicedit">
          提交修改
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { editTeacher } from "@/api/dataList";
import { OptionType, getXueYuanData } from "@/api/system";
import { teacherBasicData } from "@/api/user";
import { nameTest } from "@/utils/tegTest";
import { ElMessage, FormRules } from "element-plus";
import { onBeforeMount, reactive, ref } from "vue";

const props = defineProps(["teacherId"]);
const basicForm = ref();
const editTeacherData = ref({
  id: "",
  teacherId: "",
  name: "",
  email: "",
  phone: "",
  xueyuan: "",
  xingbie: "",
});
const getbasicData = async () => {
  const { data } = await teacherBasicData({ Id: props.teacherId });
  console.log(data);

  editTeacherData.value = data;
};
onBeforeMount(() => {
  getbasicData();
});

const rulesForm = reactive<FormRules>({
  name: [
    { required: true, message: "请输入姓名", trigger: "blur" },
    {
      type: "string",
      asyncValidator: (rule, value) => {
        return new Promise((resolve, reject) => {
          if (!nameTest.test(value)) {
            reject("请输入正确的姓名");
          } else {
            resolve();
          }
        });
      },
      trigger: "blur",
    },
  ],
  teacherId: [{ required: true, message: "请输入教师号", trigger: "blur" }],
});

const xueYuanOptions = ref<OptionType[]>([]);
const xueYuanData = async () => {
  const { data } = await getXueYuanData();
  xueYuanOptions.value = data;
};
xueYuanData();

const submitBasicedit = async () => {
  let flog = true;
  await basicForm.value.validate((valid: any, fields: any) => {
    if (!valid) {
      flog = false;
      return false;
    }
  });
  if (flog) {
    const { data } = await editTeacher(editTeacherData.value);
    ElMessage.success(data);
  }
};

const reset = async () => {
  await getbasicData();
};
</script>

<style scoped></style>
