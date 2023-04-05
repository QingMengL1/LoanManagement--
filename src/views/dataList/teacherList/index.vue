<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">
        <i-ep-menu />
      </el-breadcrumb-item>
      <el-breadcrumb-item> 数据管理 </el-breadcrumb-item>
      <el-breadcrumb-item> 教师信息 </el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <el-form label-width="100px" style="margin-top: 16px">
        <el-row>
          <el-col :span="5">
            <el-form-item label="姓名">
              <el-input style="width: 100%" v-model="searchValue.name">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="教师号">
              <el-input style="width: 100%" v-model="searchValue.teacherId">
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="5">
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
          <el-col :span="5">
            <el-form-item label="性别">
              <el-select style="width: 100%" v-model="searchValue.xingbie">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4" style="text-align: right">
            <el-button type="primary" @click="searchData">查找</el-button>
            <el-button @click="resetSearch">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
      <el-divider> </el-divider>
      <div
        style="width: 100%; margin-bottom: 16px; text-align: right"
        @click="allDelete"
      >
        <span>
          <el-button :disabled="!allAgreeApplyList.length" type="primary"
            >批量删除</el-button
          >
        </span>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        :cell-style="{ textAlign: 'center' }"
        :header-cell-style="{ 'text-align': 'center' }"
        :border="true"
        row-key="teacherId"
        @select-all="selectAll"
        @selection-change="selectChange"
      >
        <el-table-column type="selection" width="50" />
        <el-table-column prop="teacherId" label="教师号" min-width="120" />
        <el-table-column prop="name" label="姓名" min-width="80" />
        <el-table-column prop="xueyuan" label="学院" min-width="120" />
        <el-table-column prop="phone" label="联系电话" min-width="120" />
        <el-table-column prop="email" label="邮箱" min-width="80" />
        <el-table-column prop="xingbie" label="性别" min-width="80" />
        <el-table-column label="操作" fixed="right" width="180">
          <template #default="row">
            <el-button
              link
              type="primary"
              size="small"
              @click="watchTeacher(row.row)"
              >查看详情</el-button
            >
            <el-button
              link
              type="primary"
              size="small"
              @click="deleatTeacher([row.row.teacherId])"
              >删除</el-button
            >
            <!-- <el-button link type="primary" size="small">操作</el-button> -->
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
  <el-dialog title="修改信息" v-model="dialogVisible" :destroy-on-close="true">
    <teacherBasicEdit :teacher-id="recordData"></teacherBasicEdit>
  </el-dialog>
</template>

<script setup lang="ts">
import { deleteData, getTeacherData, teacherTypes } from "@/api/dataList";
import { reactive, ref } from "vue";
import { getXueYuanData, OptionType } from "@/api/system";
import teacherBasicEdit from "@/components/teacherBasicEdit.vue";
import { ElMessage } from "element-plus";

const pageData = reactive({
  pageSize: 10,
  total: 0,
  currentPage: 1,
});
const searchValue = reactive({
  name: "",
  teacherId: "",
  xueyuan: "",
  xingbie: "",
});
const tableData = ref([]);
const dialogVisible = ref(false);

const getTableData = async (params: teacherTypes) => {
  const { data } = await getTeacherData(params);
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
  getTableData({
    pageSize: pageData.pageSize,
    currentPage: pageData.currentPage,
    search: searchValue,
  });
};
const resetSearch = () => {
  searchValue.name = "";
  searchValue.xueyuan = "";
  searchValue.teacherId = "";
  searchValue.xingbie = "";
  getTableData({
    pageSize: pageData.pageSize,
    currentPage: pageData.currentPage,
  });
};

const recordData = ref<any>();
const watchTeacher = (row: any) => {
  recordData.value = row.id;
  dialogVisible.value = true;
};

const xueYuanOptions = ref<OptionType[]>([]);
const xueYuanData = async () => {
  const { data } = await getXueYuanData();
  xueYuanOptions.value = data;
};
xueYuanData();

// 多选操作
const allAgreeApplyList = ref<string[]>([]);
const selectAll = (row: any) => {
  allAgreeApplyList.value = [];
  for (const key in row) {
    allAgreeApplyList.value.push(row[key].teacherId);
  }
};
const selectChange = (row: any) => {
  allAgreeApplyList.value = [];
  for (const key in row) {
    allAgreeApplyList.value.push(row[key].teacherId);
  }
};

// 删除教师
const deleatTeacher = async (id: string[]) => {
  const { data } = await deleteData({ ids: id, type: "teacher" });
  ElMessage.success(data);
  getTableData({
    pageSize: pageData.pageSize,
    currentPage: pageData.currentPage,
    search: searchValue,
  });
};

const allDelete = () => {
  deleatTeacher(allAgreeApplyList.value);
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
