<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">
        <i-ep-menu />
      </el-breadcrumb-item>
      <el-breadcrumb-item> 贷款审核 </el-breadcrumb-item>
      <el-breadcrumb-item> 贷款审批 </el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-form label-width="100px" style="margin-top: 16px">
        <el-row>
          <el-col :span="7">
            <el-form-item label="学年">
              <el-select style="width: 100%"></el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="贷款状态">
              <el-select style="width: 100%"></el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="申请原因">
              <el-select style="width: 100%"></el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3" style="text-align: right">
            <el-button>查找</el-button>
            <el-button>重置</el-button>
          </el-col>
        </el-row>
      </el-form>
      <el-divider></el-divider>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="number" label="申请学年" />
        <el-table-column prop="academicYear" label="申请学年" />
        <el-table-column prop="datusernamee" label="姓名" />
        <el-table-column prop="idCard" label="身份证" />
        <el-table-column prop="amount" label="借款金额" />
        <el-table-column prop="year" label="借款年限" />
        <el-table-column prop="userphone" label="联系电话" />
        <el-table-column prop="address" label="申请时间" />
        <el-table-column prop="cause" label="申请原因" />
        <el-table-column fixed="right" label="操作">
          <template #default>
            <el-button link type="primary" size="small">编辑</el-button>
            <el-button link type="primary" size="small">同意</el-button>
            <el-button link type="primary" size="small">驳回</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { getLoanData } from "@/api/audit";

const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Home",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Office",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Home",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Office",
  },
];

const queryLoanData = async () => {
  const { data } = await getLoanData();
  console.log(JSON.parse(data));
};
queryLoanData();
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
