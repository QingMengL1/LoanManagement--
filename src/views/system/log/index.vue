<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">
        <i-ep-menu />
      </el-breadcrumb-item>
      <el-breadcrumb-item> 系统管理 </el-breadcrumb-item>
      <el-breadcrumb-item> 系统日志 </el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-form label-width="100px" style="margin-top: 16px">
        <el-row>
          <el-col :span="5">
            <el-form-item label="姓名">
              <el-input style="width: 100%" v-model="searchValue.username">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="时间">
              <el-date-picker
                v-model="searchValue.time"
                type="datetimerange"
                range-separator="-"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="角色">
              <el-select style="width: 100%" v-model="searchValue.userType">
                <el-option label="学生" value="student">学生</el-option>
                <el-option label="教师" value="teacher">教师</el-option>
                <el-option label="管理员" value="admin">管理员</el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="9" style="text-align: right">
            <el-button type="primary" @click="searchData">查找</el-button>
            <el-button @click="resetSearch">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
      <el-divider></el-divider>
      <el-table
        :data="tableData"
        style="width: 100%"
        :cell-style="{ textAlign: 'center' }"
        :header-cell-style="{ 'text-align': 'center' }"
        :stripe="true"
        :border="true"
      >
        <el-table-column prop="time" label="操作时间" min-width="220">
          <template #default="row">
            <div>
              {{ hourFormat(row.row.time) }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="用户名称" min-width="220" />
        <el-table-column prop="userType" label="角色" min-width="220" />
        <el-table-column prop="event" label="事件" min-width="220" />
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
          row-key="id"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { queryType, getLogData } from "@/api/system";
import { reactive, ref } from "vue";
import { hourFormat } from "@/utils/timeformat";

const pageData = reactive({
  pageSize: 10,
  total: 0,
  currentPage: 1,
});

const searchValue = reactive({
  username: "",
  userType: "",
  time: ["", ""],
});

const tableData = ref([]);

const queryLogData = async (params: queryType) => {
  const { data } = await getLogData(params);
  tableData.value = data.data;
  pageData.total = data.total;
};
queryLogData(pageData);

const handleSizeChange = (value: number) => {
  pageData.pageSize = value;
  pageData.currentPage = 1;
  queryLogData({
    pageSize: value,
    currentPage: pageData.currentPage,
    search: searchValue,
  });
};
const handleCurrentChange = (value: number) => {
  pageData.currentPage = value;
  queryLogData({
    pageSize: pageData.pageSize,
    currentPage: pageData.currentPage,
    search: searchValue,
  });
};

const searchData = async () => {
  pageData.currentPage = 1;
  console.log(searchValue);
  queryLogData({
    pageSize: pageData.pageSize,
    currentPage: pageData.currentPage,
    search: searchValue,
  });
};
const resetSearch = async () => {
  searchValue.time = [];
  searchValue.userType = "";
  searchValue.username = "";
  queryLogData({ pageSize: 10, currentPage: 1 });
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
