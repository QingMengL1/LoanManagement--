<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">
        <i-ep-menu />
      </el-breadcrumb-item>
      <el-breadcrumb-item> 我的贷款 </el-breadcrumb-item>
      <el-breadcrumb-item> 还款申请 </el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-empty v-if="!contractData.length" :image-size="200" />
      <el-row :gutter="12">
        <el-col
          v-for="item in contractData"
          :span="6"
          style="margin-bottom: 12px"
        >
          <el-card
            shadow="hover"
            style="width: 100%; height: 260px; position: relative"
            @click="showContract(item)"
          >
            <strong style="color: skyblue">生源地 </strong>
            <span> {{ item.hetongbianhao }}</span>

            <div style="margin-top: 24px; font-size: 20px">
              <span>{{ item.academicYear }}</span>
              <span>合同</span>
            </div>

            <el-row style="margin-top: 24px">
              <el-col :span="12">
                <span>合同金额</span>
                <div
                  style="
                    color: rgb(252, 78, 73);
                    margin-top: 10px;
                    font-weight: 1000;
                    font-size: 24px;
                  "
                >
                  <span>{{ item.daikuanjine }}</span> <span>元</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div v-if="item.status !== '申请中'">
                  <span>剩余还款</span>
                  <div
                    style="
                      color: rgb(252, 78, 73);
                      margin-top: 10px;
                      font-weight: 1000;
                      font-size: 24px;
                    "
                  >
                    <el-tag
                      v-if="item.hetongyve === 0"
                      size="large"
                      type="success"
                    >
                      已还清
                    </el-tag>
                    <span v-else>
                      <span>{{ item.hetongyve }}</span>
                      <span>元</span>
                    </span>
                  </div>
                </div>
                <div v-else>
                  <span>合同状态</span>
                  <div
                    style="
                      color: rgb(64, 128, 255);
                      margin-top: 10px;
                      font-weight: 1000;
                      font-size: 24px;
                    "
                  >
                    <el-tag v-if="item.status === '申请中'" size="large">
                      {{ item.status }}
                    </el-tag>
                  </div>
                </div>
              </el-col>
            </el-row>
            <div style="position: absolute; bottom: 12px">
              <el-button
                :disabled="item.status !== '已放款' || item.hetongyve === 0"
                type="primary"
                @click.stop="advanceClick(item)"
              >
                提前还款申请
              </el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
    <el-dialog title="合同信息" v-model="dialogTableVisible">
      <el-descriptions :column="1">
        <el-descriptions-item
          v-for="item in contractDataValue"
          :label="item.name"
        >
          {{ item.value }}
        </el-descriptions-item>
      </el-descriptions>
    </el-dialog>
    <el-dialog
      title="提前还款申请"
      v-model="advanceVisible"
      style="width: 800px"
    >
      <el-card v-for="item in advanceData" style="margin: 12px 0">
        <div class="card-header">
          <span>{{ item.academicYear }}</span>
        </div>
        <el-divider style="margin: 12px 0" />
        <div class="card-conter">
          <div>
            <span>剩余还款</span>
            <div style="margin-top: 10px; font-weight: 8000; font-size: 20px">
              <span>{{ item.yve }}</span> <span>元</span>
            </div>
          </div>
          <div>
            <span>近期应还金额</span>
            <div style="margin-top: 10px; font-weight: 8000; font-size: 20px">
              <span>{{ item.jinqi }}</span> <span>元</span>
            </div>
          </div>
          <div>
            <span>部分还款金额</span>
            <div style="margin-top: 10px; font-weight: 8000; font-size: 20px">
              <el-input
                placeholder="请输入提前还款金额"
                v-model="item.huankuan"
                :precision="2"
                :controls="false"
              >
              </el-input>
            </div>
          </div>
          <div>
            <el-button
              :disabled="item.yve == 0 || buttonLoading"
              type="primary"
              @click="allHuankuan(item)"
            >
              全部结清
            </el-button>
            <el-button
              :disabled="item.yve == 0 || buttonLoading"
              type="primary"
              @click="huankuan(item)"
            >
              部分还款
            </el-button>
          </div>
        </div>
      </el-card>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {
  getLoanStatus,
  LoanStatusType,
  advanceDataType,
  repayment,
} from "@/api/myLoan";
import { numberText } from "@/utils/tegTest";
import { ElMessage } from "element-plus";
import { ref } from "vue";

const dialogTableVisible = ref(false);
const advanceVisible = ref(false);

const contractData = ref<LoanStatusType[]>([]);
const queryLoanStatus = async () => {
  const { data } = await getLoanStatus();
  contractData.value = data;
};
queryLoanStatus();
const contractDataValue = ref();
const showContract = (record: any) => {
  contractDataValue.value = [
    {
      name: "合同编号",
      value: record.hetongbianhao,
    },
    {
      name: "贷款金额",
      value: record.daikuanjine + "元",
    },
    {
      name: "发放日期",
      value: record.fafangriqi,
    },
    {
      name: "剩余还款",
      value: record.hetongyve + "元",
    },
    {
      name: "到期日期",
      value: record.daoqiriqi,
    },
  ];
  dialogTableVisible.value = true;
};

const advanceData = ref<advanceDataType[]>([]);
const advanceClick = (record: any) => {
  advanceData.value = [
    {
      hetongbianhao: record.hetongbianhao,
      academicYear: record.academicYear,
      yve: record.hetongyve,
      jinqi: record.hetongyve,
      huankuan: 0,
    },
  ];
  advanceVisible.value = true;
};

const buttonLoading = ref(false);

const allHuankuan = async (record: advanceDataType) => {
  buttonLoading.value = true;
  try {
    const { data } = await repayment({
      hetongbianhao: record.hetongbianhao,
      huankuan: Number(record.yve),
    });
    ElMessage.success(data);
    advanceVisible.value = false;
    queryLoanStatus();
  } catch (error) {
    console.log(error);
  } finally {
    buttonLoading.value = false;
  }
};
const huankuan = async (record: advanceDataType) => {
  buttonLoading.value = true;
  try {
    if (numberText.test(record.huankuan.toString())) {
      if (record.huankuan <= Number(record.yve)) {
        const { data } = await repayment({
          hetongbianhao: record.hetongbianhao,
          huankuan: Number(record.huankuan),
        });
        ElMessage.success(data);
        advanceVisible.value = false;
        queryLoanStatus();
      } else {
        ElMessage.error("还款金额大于剩余金额，请重新输入");
      }
    } else {
      ElMessage.error("请输入整数");
    }
  } catch (error) {
    console.log(error);
  } finally {
    buttonLoading.value = false;
  }
};
</script>

<style scoped lang="scss">
.box-card {
  display: block;
  min-height: 88vh;
  margin-top: 8px;
  overflow: auto;
}
.el-link {
  padding: 10px 10px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: 1000;
}

.card-conter {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
