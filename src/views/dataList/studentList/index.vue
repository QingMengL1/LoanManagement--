<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">
        <i-ep-menu />
      </el-breadcrumb-item>
      <el-breadcrumb-item> 数据管理 </el-breadcrumb-item>
      <el-breadcrumb-item> 学生信息 </el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <el-form label-width="100px" style="margin-top: 16px">
        <el-row>
          <el-col :span="3">
            <el-form-item label="姓名">
              <el-input style="width: 100%" v-model="searchValue.name">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="学号">
              <el-input style="width: 100%" v-model="searchValue.studentId">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="年级">
              <el-select style="width: 100%" v-model="searchValue.ruxueyear">
                <el-option value="2018">2018</el-option>
                <el-option value="2019">2019</el-option>
                <el-option value="2020">2020</el-option>
                <el-option value="2021">2021</el-option>
                <el-option value="2022">2022</el-option>
                <el-option value="2023">2023</el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="班级">
              <el-input style="width: 100%" v-model="searchValue.classnumber">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="专业">
              <el-select style="width: 100%" v-model="searchValue.zhuanye">
                <el-option
                  v-for="item in zhuanYeOptions"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="学院">
              <el-select style="width: 100%" v-model="searchValue.xueyuan">
                <el-option
                  v-for="item in xueYuanOptions"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3" style="text-align: right">
            <el-button type="primary" @click="searchData">查找</el-button>
            <el-button @click="resetSearch">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
      <el-divider> </el-divider>
      <el-row style="margin-bottom: 16px">
        <el-col :span="12">
          <el-button type="primary" @click="addStudentVisible = true">
            添加学生
          </el-button>
        </el-col>
        <el-col :span="12">
          <div style="text-align: right">
            <el-button
              :disabled="!allAgreeApplyList.length"
              type="primary"
              @click="allDelete"
            >
              批量删除
            </el-button>
          </div>
        </el-col>
      </el-row>
      <el-table
        :data="tableData"
        style="width: 100%"
        :cell-style="{ textAlign: 'center' }"
        :header-cell-style="{ 'text-align': 'center' }"
        :border="true"
        row-key="studentId"
        @select-all="selectAll"
        @selection-change="selectChange"
      >
        <el-table-column type="selection" width="50" />
        <el-table-column prop="studentId" label="学号" min-width="120" />
        <el-table-column prop="name" label="姓名" min-width="80" />
        <el-table-column prop="ruxueyear" label="年级" min-width="80" />
        <el-table-column prop="xueyuan" label="学院" min-width="120" />
        <el-table-column prop="zhuanye" label="专业" min-width="150" />
        <el-table-column prop="classnumber" label="班级" min-width="80" />
        <el-table-column prop="xueli" label="学历" min-width="80" />
        <el-table-column prop="phone" label="联系电话" min-width="120" />
        <el-table-column prop="wechat" label="微信" min-width="120" />
        <el-table-column prop="minzu" label="民族" min-width="120">
          <template #default="row">
            <div>
              {{ minzuValue(row.row.minzu) }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="xingbie" label="性别" min-width="80" />
        <el-table-column label="操作" fixed="right" width="220">
          <template #default="row">
            <el-button
              link
              type="primary"
              size="small"
              @click="watchStudent(row.row)"
              >查看详情</el-button
            >
            <el-button
              link
              type="primary"
              size="small"
              @click="resetPassword(row.row.studentId)"
              >重置密码</el-button
            >
            <el-popconfirm
              title="确认删除？"
              @confirm="deleatStudent([row.row.studentId])"
            >
              <template #reference>
                <el-button link type="primary" size="small"> 删除 </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 16px; text-align: center">
        <el-pagination
          v-model:current-page="pageData.currentPage"
          v-model:page-size="pageData.pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :small="true"
          layout="total, sizes, prev, pager, next"
          :total="pageData.total"
          style="float: right"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
  <el-dialog v-model="dialogVisible" :destroy-on-close="true">
    <studentBasicEdit :basic-form-data="recordData"></studentBasicEdit>
    <!-- <el-descriptions title="基本信息" :column="2">
      <el-descriptions-item label="姓名">
        {{ recordData.name }}
      </el-descriptions-item>
      <el-descriptions-item label="身份证号">
        {{ recordData.idCard }}
      </el-descriptions-item>
      <el-descriptions-item label="户口性质">
        {{ recordData.hukouxingzhi }}
      </el-descriptions-item>
      <el-descriptions-item label="民族">
        {{ recordData.minzu }}
      </el-descriptions-item>
      <el-descriptions-item label="性别">
        {{ recordData.xingbie }}
      </el-descriptions-item>
      <el-descriptions-item label="年龄">
        {{ recordData.age }}
      </el-descriptions-item>
      <el-descriptions-item label="毕业中学">
        {{ recordData.biyezhongxue }}
      </el-descriptions-item>
    </el-descriptions>
    <el-descriptions title="通讯信息" :column="2">
      <el-descriptions-item label="手机">
        {{ recordData.phone }}
      </el-descriptions-item>
      <el-descriptions-item label="电子邮件">
        {{ recordData.email }}
      </el-descriptions-item>
      <el-descriptions-item label="QQ">
        {{ recordData.qqNumber }}
      </el-descriptions-item>
      <el-descriptions-item label="微信">
        {{ recordData.wechat }}
      </el-descriptions-item>
      <el-descriptions-item label="通信地址">
        {{ recordData.tongxindizhi }}
      </el-descriptions-item>
    </el-descriptions>
    <el-descriptions title="就学信息" :column="2">
      <el-descriptions-item label="学校名称">
        {{ recordData.schoolname }}
      </el-descriptions-item>
      <el-descriptions-item label="学院">
        {{ recordData.xueyuan }}
      </el-descriptions-item>
      <el-descriptions-item label="专业名称">
        {{ recordData.zhuanye }}
      </el-descriptions-item>
      <el-descriptions-item label="班级">
        {{ recordData.classnumber }}
      </el-descriptions-item>
      <el-descriptions-item label="学历">
        {{ recordData.xueli }}
      </el-descriptions-item>
      <el-descriptions-item label="入学年份">
        {{ recordData.ruxueyear }}
      </el-descriptions-item>
      <el-descriptions-item label="学号">
        {{ recordData.studentId }}
      </el-descriptions-item>
      <el-descriptions-item label="专业类别">
        {{ recordData.zhuanyeType }}
      </el-descriptions-item>
      <el-descriptions-item label="学制">
        {{ recordData.xuezhi }}
      </el-descriptions-item>
      <el-descriptions-item label="毕业时间">
        {{ timeFormat(recordData.biyeshijian) }}
      </el-descriptions-item>
    </el-descriptions> -->
  </el-dialog>
  <el-dialog
    v-model="addStudentVisible"
    title="添加学生"
    :width="600"
    :destroy-on-close="true"
    @close="addStudentForm = getAddForm()"
  >
    <el-form
      ref="addStudentFormRef"
      :model="addStudentForm"
      label-width="120px"
      :rules="rulesForm"
    >
      <el-form-item label="学号" prop="studentId">
        <el-input v-model="addStudentForm.studentId" style="width: 320px" />
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="addStudentForm.name" style="width: 320px" />
      </el-form-item>
      <el-form-item label="年级" :required="true" prop="ruxueyear">
        <el-select style="width: 100%" v-model="addStudentForm.ruxueyear">
          <el-option value="2018">2018</el-option>
          <el-option value="2019">2019</el-option>
          <el-option value="2020">2020</el-option>
          <el-option value="2021">2021</el-option>
          <el-option value="2022">2022</el-option>
          <el-option value="2023">2023</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学院" :required="true" prop="xueyuan">
        <el-select style="width: 100%" v-model="addStudentForm.xueyuan">
          <el-option
            v-for="item in xueYuanOptions"
            :label="item.name"
            :value="item.name"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="专业" :required="true" prop="zhuanye">
        <el-select style="width: 100%" v-model="addStudentForm.zhuanye">
          <el-option
            v-for="item in zhuanYeOptions"
            :label="item.name"
            :value="item.name"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="班级" :required="true" prop="classnumber">
        <el-input style="width: 100%" v-model="addStudentForm.classnumber">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="okAddStudent">添加</el-button>
        <el-button @click="addStudentVisible = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import {
  getStudentData,
  studentTypes,
  editPassword,
  deleteData,
  queryAddStudent,
} from "@/api/dataList";
import { reactive, ref } from "vue";
import {
  getXueYuanData,
  getZhuanYeData,
  OptionType,
  queryMinzuOption,
} from "@/api/system";
import { ElMessage, FormRules } from "element-plus";
import studentBasicEdit from "@/components/studentBasicEdit.vue";
import { nameTest } from "@/utils/tegTest";

const pageData = reactive({
  pageSize: 10,
  total: 0,
  currentPage: 1,
});
const searchValue = reactive({
  name: "",
  studentId: "",
  classnumber: null,
  zhuanye: "",
  ruxueyear: "",
  xueyuan: "",
});
const tableData = ref([]);
const dialogVisible = ref(false);

const getTableData = async (params: studentTypes) => {
  const { data } = await getStudentData(params);
  tableData.value = data.data;
  pageData.total = data.total;
};
getTableData({
  pageSize: pageData.pageSize,
  currentPage: pageData.currentPage,
});

// 改变分页大小
const handleSizeChange = (value: number) => {
  pageData.pageSize = value;
  pageData.currentPage = 1;
  getTableData({
    pageSize: value,
    currentPage: pageData.currentPage,
  });
};
// 切换页数
const handleCurrentChange = (value: number) => {
  pageData.currentPage = value;
  getTableData({
    pageSize: pageData.pageSize,
    currentPage: value,
  });
};

const searchData = () => {
  pageData.currentPage = 1;
  getTableData({
    pageSize: pageData.pageSize,
    currentPage: pageData.currentPage,
    search: searchValue,
  });
};
const resetSearch = () => {
  searchValue.classnumber = null;
  searchValue.name = "";
  searchValue.ruxueyear = "";
  searchValue.studentId = "";
  searchValue.zhuanye = "";
  searchValue.xueyuan = "";
  pageData.currentPage = 1;
  getTableData({
    pageSize: pageData.pageSize,
    currentPage: pageData.currentPage,
  });
};

// 多选操作
const allAgreeApplyList = ref<string[]>([]);
const selectAll = (row: any) => {
  allAgreeApplyList.value = [];
  for (const key in row) {
    allAgreeApplyList.value.push(row[key].studentId);
  }
};
const selectChange = (row: any) => {
  allAgreeApplyList.value = [];
  for (const key in row) {
    allAgreeApplyList.value.push(row[key].studentId);
  }
};

const recordData = ref<any>({});
const watchStudent = (row: any) => {
  recordData.value = row;
  dialogVisible.value = true;
};

const xueYuanOptions = ref<OptionType[]>([]);
const zhuanYeOptions = ref<OptionType[]>([]);
const xueYuanData = async () => {
  const { data } = await getXueYuanData();
  xueYuanOptions.value = data;
};
xueYuanData();

const zhuanyeData = async () => {
  const { data } = await getZhuanYeData();
  zhuanYeOptions.value = data;
};

zhuanyeData();

// 重置密码
const resetPassword = async (studentId: string) => {
  const { data } = await editPassword(studentId);
  ElMessage.success(data);
};

const minZuoptions = ref<OptionType[]>([]);
const getMinzuOption = async () => {
  const { data } = await queryMinzuOption();
  minZuoptions.value = data;
};
getMinzuOption();
const minzuValue = (id: number) => {
  let name = "";
  minZuoptions.value.forEach((element) => {
    if (element.code === id) {
      name = element.name;
    }
  });
  return name;
};

// 删除学生
const deleatStudent = async (id: string[]) => {
  const { data } = await deleteData({ ids: id, type: "student" });
  ElMessage.success(data);
  getTableData({
    pageSize: pageData.pageSize,
    currentPage: pageData.currentPage,
    search: searchValue,
  });
};

const allDelete = () => {
  deleatStudent(allAgreeApplyList.value);
};

const addStudentVisible = ref(false);

const getAddForm = () => {
  return {
    studentId: "",
    name: "",
    ruxueyear: "",
    xueyuan: "",
    zhuanye: "",
    classnumber: "",
  };
};

const addStudentFormRef = ref();
const addStudentForm = ref(getAddForm());

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
  xueyuan: [{ required: true, message: "请输入学院名称", trigger: "change" }],
  zhuanye: [{ required: true, message: "请输入专业名称", trigger: "change" }],
  ruxueyear: [{ required: true, message: "请选择入学年份", trigger: "change" }],
  studentId: [{ required: true, message: "请输入学号", trigger: "blur" }],
  classnumber: [{ required: true, message: "请输入班级", trigger: "blur" }],
});

const okAddStudent = async () => {
  let flog = true;
  await addStudentFormRef.value.validate((valid: any, fields: any) => {
    if (!valid) {
      flog = false;
      return false;
    }
  });
  if (flog) {
    const { data } = await queryAddStudent(addStudentForm.value);
    ElMessage.success(data);
    addStudentVisible.value = false;
    addStudentForm.value = getAddForm();
    getTableData({
      pageSize: pageData.pageSize,
      currentPage: pageData.currentPage,
    });
  }
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
</style>
