<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>
        <i-ep-menu />
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/home' }"> 首页 </el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-carousel class="carousel">
        <el-carousel-item>
          <img
            src="https://www.ycust.edu.cn/wp-content/uploads/sites/15/2022/02/1011.jpg"
            alt="1"
          />
        </el-carousel-item>
        <el-carousel-item>
          <img
            src="https://www.ycust.edu.cn/wp-content/uploads/sites/15/2023/01/2.jpg"
            alt="2"
          />
        </el-carousel-item>
        <el-carousel-item>
          <img
            src="https://www.ycust.edu.cn/wp-content/uploads/sites/15/2023/01/3-scaled.jpg"
            alt="3"
          />
        </el-carousel-item>
      </el-carousel>
      <el-row :gutter="10" style="margin-top: 10px">
        <el-col :span="6">
          <el-card style="height: 150px">
            <el-row>
              <el-col :span="8" style="height: 150px">
                <i-ep-Coin
                  style="
                    display: block;
                    width: 70%;
                    height: 70%;
                    margin: auto auto;
                  "
                >
                </i-ep-Coin>
              </el-col>
              <el-col :span="16" tyle="height: 150px">
                <div style="height: 150px; text-align: center">
                  <el-statistic :value="268500">
                    <template #title>
                      <span style="font-size: 20px">贷款总金额</span>
                    </template>
                  </el-statistic>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card style="height: 150px">
            <el-row>
              <el-col :span="8" style="height: 150px">
                <i-ep-CreditCard
                  style="
                    display: block;
                    width: 70%;
                    height: 70%;
                    margin: auto auto;
                  "
                >
                </i-ep-CreditCard>
              </el-col>
              <el-col :span="16" tyle="height: 150px">
                <div style="height: 150px; text-align: center">
                  <el-statistic :value="68500">
                    <template #title>
                      <span style="font-size: 20px">剩余还款金额</span>
                    </template>
                  </el-statistic>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card style="height: 150px">
            <el-row>
              <el-col :span="8" style="height: 150px">
                <i-ep-Clock
                  style="
                    display: block;
                    width: 70%;
                    height: 70%;
                    margin: auto auto;
                  "
                >
                </i-ep-Clock>
              </el-col>
              <el-col :span="16" tyle="height: 150px">
                <div style="height: 150px; text-align: center">
                  <el-statistic :value="value2">
                    <template #title>
                      <span style="font-size: 20px">下次还款时间</span>
                    </template>
                  </el-statistic>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card style="height: 150px">
            <el-row>
              <el-col :span="8" style="height: 150px">
                <i-ep-ChatDotRound
                  style="
                    display: block;
                    width: 70%;
                    height: 70%;
                    margin: auto auto;
                  "
                >
                </i-ep-ChatDotRound>
              </el-col>
              <el-col :span="16" tyle="height: 150px">
                <div style="height: 150px; text-align: center">
                  <el-statistic :value="6666">
                    <template #title>
                      <span style="font-size: 20px">剩余处理消息</span>
                    </template>
                  </el-statistic>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="12" style="margin-top: 10px">
        <el-col :span="12">
          <el-card style="height: 464px; overflow: auto">
            <template #header>
              <div>最新消息</div>
            </template>
            <div>
              <el-row v-for="item in 10" :key="item" style="height: 36px">
                <el-col :span="21">
                  <el-link
                    href="https://www.ycust.edu.cn/"
                    target="_blank"
                    :underline="false"
                  >
                    银川科技学院官网
                  </el-link>
                </el-col>
                <el-col :span="3">
                  <span style="text-align: right">2023-03-16</span>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <div
            style="
              height: 227px;
              display: flex;
              flex-direction: column;

              justify-content: space-around;
            "
          >
            <el-button
              type="primary"
              style="width: 100%; height: 60px; margin: 0"
            >
              申请贷款
            </el-button>
            <el-button
              type="primary"
              style="width: 100%; height: 60px; margin: 0"
            >
              申请贷款
            </el-button>
            <el-button
              type="primary"
              style="width: 100%; height: 60px; margin: 0"
            >
              申请贷款
            </el-button>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { dayjs } from "element-plus";

const value2 = ref("2023-04-06");
</script>

<style scoped lang="scss">
.box-card {
  display: block;
  min-height: 88vh;
  margin-top: 8px;
  overflow: auto;
}

.carousel {
  text-align: center;
  width: 100%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
  }
}

.el-statistic {
  height: 150px;
  padding-top: 25px;
}
</style>
