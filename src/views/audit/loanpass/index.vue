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
          <el-col :span="11">
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
          <el-col :span="11">
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
          <el-col :span="2" style="text-align: right">
            <el-button type="primary" @click="searchData">查找</el-button>
            <el-button @click="resetSearch">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
      <el-divider></el-divider>
      <div
        style="width: 100%; margin-bottom: 16px; text-align: right"
        @click="allAgreeApply"
      >
        <span>
          <el-button :disabled="!allAgreeApplyList.length" type="primary"
            >批量同意</el-button
          >
        </span>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        :cell-style="{ textAlign: 'center' }"
        :header-cell-style="{ 'text-align': 'center' }"
        :stripe="true"
        :border="true"
        row-key="number"
        @select-all="selectAll"
        @selection-change="selectChange"
      >
        <el-table-column type="selection" width="50" />
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
        <el-table-column fixed="right" label="操作" min-width="180">
          <template #default="row">
            <el-button
              link
              type="primary"
              size="small"
              @click="showMessage(row.row)"
            >
              查看详情</el-button
            >
            <el-button
              link
              type="primary"
              size="small"
              :disabled="buttonLoading"
              @click="agreeApply(row.row)"
              >同意</el-button
            >
            <el-button
              link
              type="primary"
              size="small"
              :disabled="buttonLoading"
              @click="refuseApply(row.row)"
              >驳回</el-button
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
  <el-dialog v-model="dialogVisible" @close="recordData = []">
    <LoanMessage :recordData="recordData"></LoanMessage>
  </el-dialog>
  <el-dialog
    v-model="refuseValueVisible"
    title="填写驳回原因"
    @closed="
      {
        refuseNumber = '';
        refuseValue = '';
        buttonLoading = false;
      }
    "
  >
    <el-input type="textarea" v-model="refuseValue"></el-input>
    <div style="height: 50px">
      <el-button
        type="primary"
        style="margin-top: 16px; float: right"
        :disabled="buttonLoading"
        @click="okRefuseApply"
      >
        确定
      </el-button>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import {
  getLoanData,
  LoanDataParamsType,
  sendAgreeApply,
  sendRefuseApply,
} from "@/api/audit";
import { OptionType, queryMinzuOption } from "@/api/system";
import { reactive, ref } from "vue";
import { hourFormat } from "@/utils/timeformat";
import { ElMessage } from "element-plus";
import LoanMessage from "../common/loanMessage.vue";

const dialogVisible = ref(false);
const recordData = ref<any>();
const tableData = ref([]);

const pageData = reactive({
  pageSize: 10,
  total: 0,
  currentPage: 1,
});

const searchValue = reactive({
  academicYear: "",

  cause: "",
});

const queryLoanData = async (params: LoanDataParamsType) => {
  const { data } = await getLoanData(params);
  tableData.value = data.data;
  pageData.total = data.total;
};
queryLoanData({
  status: "申请中",
  pageSize: pageData.pageSize,
  currentPage: pageData.currentPage,
});

const minZuoptions = ref<OptionType[]>([]);
const getMinzuOption = async () => {
  const { data } = await queryMinzuOption();
  minZuoptions.value = data;
};
getMinzuOption();

const showMessage = (row: any) => {
  recordData.value = row;
  dialogVisible.value = true;
};

const selectAll = (row: any) => {
  allAgreeApplyList.value = [];
  for (const key in row) {
    allAgreeApplyList.value.push(row[key].number);
  }
};
const selectChange = (row: any) => {
  allAgreeApplyList.value = [];
  for (const key in row) {
    allAgreeApplyList.value.push(row[key].number);
  }
};

// 改变分页大小
const handleSizeChange = (value: number) => {
  pageData.pageSize = value;
  pageData.currentPage = 1;
  queryLoanData({
    status: "申请中",
    pageSize: value,
    currentPage: pageData.currentPage,
  });
};
// 切换页数
const handleCurrentChange = (value: number) => {
  pageData.currentPage = value;
  queryLoanData({
    status: "申请中",
    pageSize: pageData.pageSize,
    currentPage: value,
  });
};
const buttonLoading = ref(false);
const refuseValue = ref("");
const refuseValueVisible = ref(false);
let refuseNumber = "";
// 同意申请
const agreeApply = async (row: any) => {
  buttonLoading.value = true;
  try {
    const { data } = await sendAgreeApply({
      number: [row.number],
    });
    ElMessage.success(data);

    queryLoanData({
      status: "申请中",
      pageSize: pageData.pageSize,
      currentPage: pageData.currentPage,
    });
  } catch (error) {
    console.log(error);
  } finally {
    buttonLoading.value = false;
  }
};
const allAgreeApplyList = ref<string[]>([]);

const allAgreeApply = async () => {
  buttonLoading.value = true;
  try {
    const { data } = await sendAgreeApply({
      number: allAgreeApplyList.value,
    });
    ElMessage.success(data);

    queryLoanData({
      status: "申请中",
      pageSize: pageData.pageSize,
      currentPage: pageData.currentPage,
    });
  } catch (error) {
    console.log(error);
  } finally {
    buttonLoading.value = false;
  }
};

// 拒绝申请
const okRefuseApply = async (row: any) => {
  try {
    const { data } = await sendRefuseApply({
      number: refuseNumber,
      refuseValue: refuseValue.value,
    });
    ElMessage.success(data);
    queryLoanData({
      status: "申请中",
      pageSize: pageData.pageSize,
      currentPage: pageData.currentPage,
    });
  } catch (error) {
    console.log(error);
  } finally {
    refuseValueVisible.value = false;
    buttonLoading.value = false;
    refuseValue.value = "";
  }
};

const refuseApply = async (row: any) => {
  refuseNumber = row.number;
  refuseValueVisible.value = true;
};

const causeFilter = (value: string, row: any, column: any) => {
  return row.cause === value;
};
const academicYearFilter = (value: string, row: any, column: any) => {
  return row.academicYear === value;
};

const searchData = () => {
  pageData.currentPage = 1;
  queryLoanData({
    pageSize: pageData.pageSize,
    currentPage: pageData.currentPage,
    search: searchValue,
  });
};

const resetSearch = () => {
  searchValue.academicYear = "";
  searchValue.cause = "";

  queryLoanData({
    status: "申请中",
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
