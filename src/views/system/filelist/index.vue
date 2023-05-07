<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">
        <i-ep-menu />
      </el-breadcrumb-item>
      <el-breadcrumb-item> 系统管理 </el-breadcrumb-item>
      <el-breadcrumb-item> 文件管理 </el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-form label-width="100px" style="margin-top: 16px">
        <el-row>
          <el-col :span="5">
            <el-form-item label="文件名">
              <el-input style="width: 100%" v-model="searchValue.name">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="上传人">
              <el-input style="width: 100%" v-model="searchValue.user">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="上传人类型">
              <el-select style="width: 100%" v-model="searchValue.userType">
                <el-option value="学生">学生</el-option>
                <el-option value="教师">教师</el-option>
                <el-option value="管理员">管理员</el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5"> </el-col>
          <el-col :span="4" style="text-align: right">
            <el-button type="primary" @click="searchData">查找</el-button>
            <el-button @click="resetSearch">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
      <el-divider></el-divider>
      <el-upload
        ref="uploadRef"
        v-model:file-list="fileList"
        class="upload-demo"
        action="none"
        multiple
        :on-remove="handleRemove"
        :limit="5"
        :on-exceed="handleExceed"
        :auto-upload="true"
        :http-request="httpRequest"
      >
        <template #trigger>
          <el-button type="primary" style="margin-right: 16px">
            选择上传文件
          </el-button>
        </template>
        <template #tip>
          <div class="el-upload__tip">最多可上传5个文件</div>
        </template>
      </el-upload>
      <el-table
        :data="tableData"
        style="width: 100%"
        :cell-style="{ textAlign: 'center' }"
        :header-cell-style="{ 'text-align': 'center' }"
        :stripe="true"
        :border="true"
      >
        <el-table-column type="selection" width="50" />
        <el-table-column prop="name" label="文件名" min-width="220" />
        <el-table-column prop="user" label="上传人" min-width="140" />
        <el-table-column prop="userType" label="上传人身份" min-width="120" />
        <el-table-column prop="uploadedAt" label="上传时间" min-width="240">
          <template #default="row">
            {{ hourFormat(row.row.uploadedAt) }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template #default="row">
            <el-button
              link
              type="primary"
              size="small"
              @click="
                download({
                  Id: row.row.id,
                  fileName: row.row.name,
                })
              "
            >
              下载</el-button
            >

            <el-popconfirm title="确认删除？" @confirm="deleteFile(row.row.id)">
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
</template>

<script setup lang="ts">
import {
  fileType,
  getFileData,
  downloadAxios,
  downloadType,
  uploadAxios,
  deleteFileData,
} from "@/api/system";
import { hourFormat } from "@/utils/timeformat";
import { ElMessage, UploadProps, UploadUserFile } from "element-plus";
import { reactive, ref } from "vue";

const pageData = reactive({
  pageSize: 10,
  total: 0,
  currentPage: 1,
});

const searchValue = reactive({
  name: "",
  user: "",
  userType: "",
});

const tableData = ref([]);

const getTableData = async (params: fileType) => {
  const { data } = await getFileData(params);
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
  searchValue.name = "";
  searchValue.user = "";
  searchValue.userType = "";
  getTableData({
    pageSize: pageData.pageSize,
    currentPage: pageData.currentPage,
  });
};

const download = async (params: downloadType) => {
  await downloadAxios(params);
};

const fileList = ref<UploadUserFile[]>([]);

const handleRemove: UploadProps["onRemove"] = (file, uploadFiles) => {
  // console.log(file, uploadFiles);
};

const handleExceed: UploadProps["onExceed"] = (file, uploadFiles) => {
  ElMessage.error("最多上传5个文件");
};

const httpRequest = async (file: any) => {
  let formData = new FormData();
  if (file.file.size < 5242880 * 2) {
    formData.append("file", file.file);
    formData.append("fileName", file.file.name);
    const { data } = await uploadAxios(formData);
    if (data.msg === "上传成功") {
      ElMessage.success(data.msg);
      fileList.value = [];
      getTableData({
        pageSize: pageData.pageSize,
        currentPage: pageData.currentPage,
      });
    } else {
      ElMessage.error("上传失败请稍后重试");
    }
  } else {
    ElMessage.error("上传文件最大为10M");
  }
};

const deleteFile = async (id: string) => {
  const { data } = await deleteFileData(id);
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
