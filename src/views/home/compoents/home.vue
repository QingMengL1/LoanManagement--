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
      <el-row :gutter="12" style="margin-top: 10px">
        <el-col :span="8">
          <el-card style="height: 150px">
            <el-row>
              <el-col :span="8" style="height: 150px">
                <i-ep-Coin
                  style="
                    display: block;
                    width: 70%;
                    height: 70%;
                    margin: 0 auto;
                  "
                >
                </i-ep-Coin>
              </el-col>
              <el-col :span="16" tyle="height: 150px">
                <div style="height: 150px; text-align: center">
                  <el-statistic :value="totalData.total">
                    <template #title>
                      <span style="font-size: 20px">助学金发放总金额</span>
                    </template>
                  </el-statistic>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="8">
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
                  <el-statistic :value="totalData.shengyv">
                    <template #title>
                      <span style="font-size: 20px">剩余待还金额</span>
                    </template>
                  </el-statistic>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>

        <el-col :span="8">
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
                  <el-statistic :value="totalData.messages">
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
              <el-row
                v-for="item in messageList"
                :key="item.id"
                style="height: 36px"
              >
                <el-col :span="21">
                  <el-link :href="item.link" target="_blank">
                    {{ item.title }}
                  </el-link>
                </el-col>
                <el-col :span="3">
                  <span style="text-align: right">{{ item.time }}</span>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card style="height: 235px; overflow: auto">
            <template #header>
              <div>文件下载</div>
            </template>
            <el-row>
              <el-col v-for="item in fileDataList" :span="12">
                <el-button
                  link
                  type="primary"
                  @click="
                    download({
                      Id: item.id,
                      fileName: item.name,
                    })
                  "
                >
                  {{ item.name }}
                </el-button>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import {
  fileListType,
  getMessageListData,
  getTotalListData,
  MessageListData,
} from "@/api/home";
import { downloadType, downloadAxios } from "@/api/system";
import router from "@/router";
import { reactive, ref } from "vue";

const totalData = reactive({
  total: 0,
  shengyv: 0,
  messages: 0,
});

const getTotalData = async () => {
  const { data } = await getTotalListData();
  totalData.total = data.total;
  totalData.shengyv = data.shengyv;
  totalData.messages = data.messages;
};
getTotalData();

const messageList = ref<MessageListData[]>([
  {
    id: 0,
    link: "0",
    title: "",
    time: "",
  },
]);

const fileDataList = ref<fileListType[]>([]);

const getMessage = async () => {
  const { data } = await getMessageListData();
  messageList.value = data.messageData;
  fileDataList.value = data.fileData;
};
getMessage();

const clickTo = (value: string) => {
  router.push({ path: value });
};

const questionDialogVisible = ref(false);

const firstApplication = () => {
  questionDialogVisible.value = true;
};

const questionShow = () => {
  questionDialogVisible.value = true;
};

const download = async (params: downloadType) => {
  await downloadAxios(params);
};
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
.el-link {
  font-size: 16px;
}
.el-button {
  font-size: 18px;
}
</style>
