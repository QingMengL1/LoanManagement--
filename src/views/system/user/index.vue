<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">
        <i-ep-menu />
      </el-breadcrumb-item>
      <el-breadcrumb-item> 系统管理 </el-breadcrumb-item>
      <el-breadcrumb-item> 用户管理 </el-breadcrumb-item>
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
            <el-form-item label="学年">
              <el-select style="width: 100%" v-model="searchValue.academicYear">
                <el-option value="2019-2020学年">2019-2020学年</el-option>
                <el-option value="2020-2021学年">2020-2021学年</el-option>
                <el-option value="2021-2022学年">2021-2022学年</el-option>
                <el-option value="2022-2023学年">2022-2023学年</el-option>
                <el-option value="2023-2024学年">2023-2024学年</el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="贷款状态">
              <el-select style="width: 100%" v-model="searchValue.status">
                <el-option value="申请中">申请中</el-option>
                <el-option value="已通过">已通过</el-option>
                <el-option value="已放款">已放款</el-option>
                <el-option value="已结束">已结束</el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="申请原因">
              <el-select style="width: 100%" v-model="searchValue.cause">
                <el-option value="因病致困">因病致困</el-option>
                <el-option value="因灾致困">因灾致困</el-option>
                <el-option value="劳动力少，无稳定收入"
                  >劳动力少，无稳定收入</el-option
                >
                <el-option value="其他">其他</el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4" style="text-align: right">
            <el-button type="primary" @click="serachData">查找</el-button>
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
        row-key="number"
      >
        <el-table-column prop="number" label="贷款编号" min-width="220" />
        <el-table-column
          prop="academicYear"
          label="申请学年"
          min-width="220"
          :filters="[
            { text: '2019-2020学年', value: '2019-2020学年' },
            { text: '2020-2021学年', value: '2020-2021学年' },
            { text: '2021-2022学年', value: '2021-2022学年' },
            { text: '2022-2023学年', value: '2022-2023学年' },
            { text: '2023-2024学年', value: '2023-2024学年' },
          ]"
          :filter-method="academicYearFilter"
        />
        <el-table-column prop="username" label="姓名" min-width="160" />
        <el-table-column prop="userIdCard" label="身份证号" min-width="220" />
        <el-table-column prop="amount" label="借款金额" min-width="140" />
        <el-table-column prop="year" label="借款年限" min-width="120" />
        <el-table-column prop="userphone" label="联系电话" min-width="180" />
        <el-table-column prop="tijiaoTime" label="申请时间" min-width="240">
          <template #default="row">
            {{ hourFormat(row.row.tijiaoTime) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="贷款状态"
          min-width="140"
          :filters="[
            { text: '申请中', value: '申请中' },
            { text: '已通过', value: '已通过' },
            { text: '已放款', value: '已放款' },
            { text: '已结束', value: '已结束' },
          ]"
          :filter-method="statusFilter"
        >
          <template #default="row">
            <el-tag v-if="row.row.status === '申请中'">
              {{ row.row.status }}</el-tag
            >
            <el-tag v-if="row.row.status === '已通过'" causetype="success">
              {{ row.row.status }}</el-tag
            >
            <el-tag v-if="row.row.status === '已放款'" causetype="warning">
              {{ row.row.status }}</el-tag
            >
            <el-tag v-if="row.row.status === '已结束'" causetype="danger">
              {{ row.row.status }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="cause"
          label="申请原因"
          min-width="160"
          :filters="[
            { text: '因病致困', value: '因病致困' },
            { text: '因灾致困', value: '因灾致困' },
            { text: '劳动力少，无稳定收入', value: '劳动力少，无稳定收入' },
            { text: '其他', value: '其他' },
          ]"
          :filter-method="causeFilter"
        />
        <el-table-column fixed="right" label="操作" width="180">
          <template #default="row">
            <el-button
              link
              type="primary"
              size="small"
              @click="showMessage(row.row)"
            >
              查看详情</el-button
            >
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
import { reactive } from "vue";

const pageData = reactive({
  pageSize: 10,
  total: 0,
  currentPage: 1,
});

const searchValue = reactive({
  username: "",
  academicYear: "",
  status: "",
  cause: "",
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
</style>
