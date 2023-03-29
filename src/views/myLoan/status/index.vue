<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">
        <i-ep-menu />
      </el-breadcrumb-item>
      <el-breadcrumb-item> 我的贷款 </el-breadcrumb-item>
      <el-breadcrumb-item> 贷款状态 </el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="12">
        <el-col
          :span="6"
          style="margin-bottom: 12px"
          :key="index"
          v-for="(item, index) in contractData"
        >
          <el-card
            shadow="hover"
            style="width: 100%; height: 240px; position: relative"
            @click="showContract(item)"
          >
            <span>编号 </span>
            <span> {{ item.hetongbianhao }}</span>

            <div style="margin-top: 24px; font-size: 20px">
              <span>{{ item.academicYear }}</span
              ><span>合同</span>
            </div>

            <el-row style="margin-top: 24px">
              <el-col :span="12">
                <span>合同金额</span>
                <div
                  style="
                    color: rgb(247, 101, 96);
                    margin-top: 10px;
                    font-weight: 1000;
                    font-size: 24px;
                  "
                >
                  <span>{{ item.daikuanjine }}</span> <span>元</span>
                </div>
              </el-col>
              <el-col :span="12">
                <span>合同状态</span>
                <div
                  style="
                    color: rgb(64, 128, 255);
                    margin-top: 10px;
                    font-weight: 1000;
                    font-size: 24px;
                  "
                >
                  <span>{{ item.status }}</span>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card
            shadow="hover"
            style="width: 100%; height: 240px; position: relative"
            @click="router.push({ name: 'Application' })"
          >
            <i-ep-CirclePlusFilled
              style="
                display: block;
                width: 30%;
                height: 100%;
                margin: 15 auto;
                color: #e4e7ed;
              "
            >
            </i-ep-CirclePlusFilled>
            <p style="text-align: center">申请贷款</p>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
    <el-dialog title="合同信息" v-model="dialogTableVisible">
      <el-row>
        <el-col :span="12">
          <el-descriptions :column="1">
            <el-descriptions-item
              v-for="item in contractDataValue"
              :label="item.name"
            >
              {{ item.value }}
            </el-descriptions-item>
          </el-descriptions>
        </el-col>
        <el-col :span="12">
          <el-timeline>
            <el-timeline-item
              :timestamp="timeLineData.shenqingtime"
              :hollow="true"
              :type="timeLineData.shenqingtime ? 'primary' : ''"
              size="large"
            >
              申请时间
            </el-timeline-item>
            <el-timeline-item
              :timestamp="timeLineData.shenpitime"
              :hollow="true"
              :type="timeLineData.shenpitime ? 'primary' : ''"
              size="large"
            >
              审批时间
            </el-timeline-item>
            <el-timeline-item
              :timestamp="timeLineData.fafangriqi"
              :hollow="true"
              :type="timeLineData.fafangriqi ? 'primary' : ''"
              size="large"
            >
              放款时间
            </el-timeline-item>
          </el-timeline>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { getLoanStatus, LoanStatusType } from "@/api/myLoan";
import router from "@/router";
import { reactive, ref } from "vue";

const dialogTableVisible = ref(false);
const advanceVisible = ref(false);

const contractData = ref<LoanStatusType[]>([]);

const queryLoanStatus = async () => {
  const { data } = await getLoanStatus();
  contractData.value = data;
};
queryLoanStatus();

const contractDataValue = ref<{ name: string; value: string }[]>([]);
const timeLineData = reactive({
  shenqingtime: "",
  shenpitime: "",
  fafangriqi: "",
});
const showContract = (record: LoanStatusType) => {
  timeLineData.shenqingtime = record.shenqingtime;
  timeLineData.shenpitime = record.shenpitime;
  timeLineData.fafangriqi = record.fafangriqi;
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
      value: record.fafangriqi || "暂无",
    },
    {
      name: "剩余还款",
      value: record.hetongyve + "元",
    },
    {
      name: "到期时间",
      value: record.daoqiriqi,
    },
  ];
  dialogTableVisible.value = true;
};

const advanceClick = () => {
  advanceVisible.value = true;
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
