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
                  <span>￥</span><span>1200</span>
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
                  <span>￥</span><span>1200</span>
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
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.box-card {
  display: block;
  min-height: 88vh;
  margin-top: 8px;
  overflow: auto;
}
</style>
