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
      <el-row :gutter="12">
        <el-col :span="6" style="margin-bottom: 12px">
          <el-card
            shadow="hover"
            style="width: 100%; height: 340px; position: relative"
            @click="showContract"
          >
            <strong style="color: skyblue">生源地 </strong>
            <span> 61062101H20220000316</span>

            <div style="margin-top: 24px; font-size: 20px">
              <span>2022-2023</span><span>学年合同</span>
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
                  <span>1200</span> <span>元</span>
                </div>
              </el-col>
              <el-col :span="12">
                <span>合同余额</span>
                <div
                  style="
                    color: rgb(252, 78, 73);
                    margin-top: 10px;
                    font-weight: 1000;
                    font-size: 24px;
                  "
                >
                  <span>1200</span> <span>元</span>
                </div>
              </el-col>
            </el-row>
            <div style="position: absolute; bottom: 12px">
              <el-link>提前还款申请</el-link>
              <el-link style="margin: 0 25px">电子合同</el-link>
              <el-link>受理证明</el-link>
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
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";

const dialogTableVisible = ref(false);

const contractData = reactive({
  hetongbianhao: "61062101H20220000316",
  daikuanjine: "1200",
  fafangriqi: "3",
  hetongyve: "",
  daoqiriqi: "",
  helonglilv: "",
  tiexijiezhiri: "",
  jigoumingcheng: "",
  jigouzhanghao: "",
  jigoumima: "",
  jigoubianhao: "",
  jigouzhanghaomima: "",
  banlijigou: "",
});

const contractDataValue = computed(() => [
  {
    name: "合同编号",
    value: contractData.hetongbianhao,
  },
  {
    name: "贷款金额",
    value: contractData.daikuanjine + "元",
  },
  {
    name: "发放日期",
    value: contractData.fafangriqi,
  },
  {
    name: "合同余额",
    value: contractData.hetongyve + "元",
  },
  {
    name: "到期日期",
    value: contractData.daoqiriqi,
  },
  {
    name: "合同利率",
    value: contractData.helonglilv + "%",
  },
  {
    name: "贴息截至日期",
    value: contractData.tiexijiezhiri,
  },
  {
    name: "代理结算机构名称",
    value: contractData.jigoumingcheng,
  },
  {
    name: "代理结算机构终端登录账号",
    value: contractData.jigouzhanghao,
  },
  {
    name: "代理结算机构初始支付密码",
    value: contractData.jigoumima,
  },
  {
    name: "代理结算机构指定账户编号",
    value: contractData.jigoubianhao,
  },
  {
    name: "代理结算机构初始账号密码",
    value: contractData.jigouzhanghaomima,
  },
  {
    name: "贷款办理机构",
    value: contractData.banlijigou,
  },
]);
const showContract = () => {
  dialogTableVisible.value = true;
};
</script>

<style scoped lang="scss">
.box-card {
  display: block;
  min-height: 88vh;
  margin-top: 8px;
  overflow: auto;
}
</style>
