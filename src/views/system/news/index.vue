<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">
        <i-ep-menu />
      </el-breadcrumb-item>
      <el-breadcrumb-item> 系统管理 </el-breadcrumb-item>
      <el-breadcrumb-item> 新闻管理 </el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-form label-width="100px" style="margin-top: 16px">
        <el-row>
          <el-col :span="5">
            <el-form-item label="标题">
              <el-input style="width: 100%" v-model="searchValue.title">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5"> </el-col>
          <el-col :span="5"> </el-col>
          <el-col :span="5"> </el-col>
          <el-col :span="4" style="text-align: right">
            <el-button type="primary" @click="searchData">查找</el-button>
            <el-button @click="resetSearch">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
      <el-divider></el-divider>
      <el-button
        type="primary"
        style="margin-bottom: 16px"
        @click="addNewsVisible = true"
      >
        添加新闻
      </el-button>
      <el-table
        :data="tableData"
        style="width: 100%"
        :cell-style="{ textAlign: 'center' }"
        :header-cell-style="{ 'text-align': 'center' }"
        :stripe="true"
        :border="true"
      >
        <el-table-column type="selection" width="50" />
        <el-table-column prop="title" label="标题" min-width="220" />
        <el-table-column prop="link" label="链接" min-width="140">
          <template #default="row">
            <div>
              <el-link :href="row.row.link" target="_blank">
                {{ row.row.link }}
              </el-link>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="time" label="时间" min-width="240">
          <template #default="row">
            {{ hourFormat(row.row.time) }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template #default="row">
            <el-popconfirm title="确认删除？" @confirm="deleteNews(row.row.id)">
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
    <el-dialog
      v-model="addNewsVisible"
      title="添加新闻"
      :width="500"
      @close="
        {
          addNewsForm.link = '';
          addNewsForm.title = '';
        }
      "
    >
      <el-form :model="addNewsForm" label-width="120px">
        <el-form-item label="标题">
          <el-input v-model="addNewsForm.title" />
        </el-form-item>
        <el-form-item label="链接">
          <el-input v-model="addNewsForm.link" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="okAddNews">添加</el-button>
          <el-button @click="addNewsVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {
  NewsType,
  getNewsData,
  queryAddNews,
  queryDeleteNews,
} from "@/api/system";
import { hourFormat } from "@/utils/timeformat";
import { ElMessage } from "element-plus";
import { reactive, ref } from "vue";

const pageData = reactive({
  pageSize: 10,
  total: 0,
  currentPage: 1,
});

const searchValue = reactive({
  title: "",
  user: "",
  userType: "",
});

const tableData = ref([]);

const getTableData = async (params: NewsType) => {
  const { data } = await getNewsData(params);
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
    title: searchValue.title,
  });
};
const resetSearch = () => {
  searchValue.title = "";
  getTableData({
    pageSize: pageData.pageSize,
    currentPage: pageData.currentPage,
  });
};

const addNewsVisible = ref(false);

const addNewsForm = ref({
  title: "",
  link: "",
});

const okAddNews = async () => {
  const { data } = await queryAddNews(addNewsForm.value);
  ElMessage.success(data);
  addNewsVisible.value = false;
  addNewsForm.value.link = "";
  addNewsForm.value.title = "";
  getTableData({
    pageSize: pageData.pageSize,
    currentPage: pageData.currentPage,
  });
};

const deleteNews = async (id: string) => {
  const { data } = await queryDeleteNews(id);
  ElMessage.success(data);
  getTableData({
    pageSize: pageData.pageSize,
    currentPage: pageData.currentPage,
  });
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
