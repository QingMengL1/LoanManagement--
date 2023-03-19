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
                  <el-statistic :value="totalData.totalAmount">
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
                  <el-statistic :value="totalData.residualAmount">
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
                  <p style="font-size: 20px">下次还款时间</p>
                  <p
                    style="
                      margin-top: -15px;
                      color: rgb(48, 49, 51);
                      font-size: 20px;
                    "
                  >
                    {{ totalData.nextTime }}
                  </p>
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
                  <el-statistic :value="totalData.message">
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
                  <el-link :href="item.link" target="_blank" :underline="false">
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
              @click="clickTo('Application')"
            >
              申请贷款
            </el-button>
            <el-button
              type="success"
              style="width: 100%; height: 60px; margin: 0"
              @click="clickTo('Repay')"
            >
              提前还款
            </el-button>
            <el-button
              type="danger"
              style="width: 100%; height: 60px; margin: 0"
            >
              进度查询
            </el-button>
          </div>
          <div
            style="
              height: 227px;
              display: flex;
              flex-direction: column;

              justify-content: space-around;
            "
          >
            <el-row :gutter="12">
              <el-col :span="12">
                <el-button
                  type="primary"
                  style="width: 100%; height: 88px; margin: 0"
                  @click="firstApplication"
                >
                  首贷申请流程
                </el-button>
              </el-col>
              <el-col :span="12">
                <el-button
                  type="primary"
                  style="width: 100%; height: 88px; margin: 0"
                >
                  续贷流程
                </el-button>
              </el-col>
            </el-row>
            <el-row :gutter="12">
              <el-col :span="12">
                <el-button
                  type="warning"
                  style="width: 100%; height: 88px; margin: 0"
                  @click="questionShow"
                >
                  常见问题
                </el-button>
              </el-col>
              <el-col :span="12">
                <el-button
                  type="warning"
                  style="width: 100%; height: 88px; margin: 0"
                >
                  提前还款帮助
                </el-button>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-dialog v-model="questionDialogVisible" title="常见问题" width="60%">
      <div class="fields">
        <fieldset id="agreeConfirm">
          <div class="form-group text-group">
            <div>
              <div>
                <strong>一、还款、还利息、提前还款、扣款日、扣款审批中 </strong>
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;建议您登录学生在线系统或阅读借款合同查询您的还款计划，并按期足额还款。
                要还未到期的本金必须先登录学生在线系统申请提前还款。每月（除了11月）的15日（含）前的申请在当月20日扣款（扣款处理可能会持续到21号），
                15日之后的申请下月20日扣款。<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;如果您的助学贷款账户为<b>支付宝账户</b>(****.cdb@sina.cn)，那么您可以使用主动还款功能，
                或存钱到此支付宝余额里（不能存在余额宝里）等待系统自动扣款。<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;如果您的助学贷款账户是<span
                  style="color: red"
                  ><b>代理结算银行账户</b></span
                >，您可以登录代理结算银行手机终端App
                搜索“助学贷款”进入国家开发银行助学贷款专区的“我要还款”功能中进行还款，
                或存钱到绑定的代理结算银行账户中等待系统自动扣款。<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;另外您或家人朋友也可以通过云闪付APP或去全国任意一个支持POS机还款的县级资助管理部门，用银联卡（须为借记卡）还款。
                扣款后在学生在线系统显示“扣款审批中”是正常的，您可以在下个月初再次登录学生在线系统查询还款完成情况。<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;如果申请了提前还款，却没还钱，不影响信用，下月可继续申请。<span
                  style="color: red"
                  ><b>贴息截止日前还清贷款无需自付利息</b></span
                >
                （注意：如合同约定贴息截止日为8月31日，需要在8月15日之前做提前还款申请，并于8月20日之前完成还款操作），无需做毕业确认。
                被动扣款时间为每月20日24点开始陆续扣款（除11月）。<br />
                <br />
                <strong>二、结清证明、消除逾期记录 </strong>
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;贷款结清后，次月初您可以联系县级资助管理部门或开发银行分行开具结清证明。根据征信业管理相关规定，
                逾期记录将在逾期事件终止（贷款结清）5年后自动清除。<br />
                <br />
                <strong>三、初次贷款申请，续贷 </strong>
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;申请时间、截止时间：请咨询县级资助管理部门，各地时间不同。申请条件：考取了教育部门认可的全日制普通本科学校、高等职业学校
                和高等专科学校（含民办高校和独立学院）、科研院所、党校、行政学院、会计学院（学校名单以教育部公布的为准），且家庭经济困难。
                贷款金额：本专科生每生每年不超过<span style="color: red"
                  ><b>12000元</b></span
                >，研究生每生每年不超过<span style="color: red"
                  ><b>16000元</b></span
                >，
                助学贷款优先用于支付在校期间学费和住宿费，超出部分可用于弥补日常生活费。借款学生应根据实际情况，合理确定贷款金额。<br />
                <div style="margin-top: 10px">1.首次贷款：</div>
                <div style="margin-top: 10px">
                  您可以登录学生在线系统在线填写申请信息并下载打印申请表。未通过预申请学生需要提供家庭经济困难认定申请表，
                  已通过预申请的首贷学生无需进行填写。然后，您需携带您的
                  <span style="color: red"
                    ><b
                      >身份证、学生证或录取通知书、户口簿、申请表、认定表</b
                    ></span
                  >等材料和共同借款人（生源地）的
                  <span style="color: red"><b>身份证</b></span
                  >，和共同借款人一起前往县级资助管理部门办理贷款申请。
                </div>
                <div style="margin-top: 10px">2.续贷：</div>
                <div style="margin-top: 10px">
                  现场办理：需要您或共同借款人<span style="color: red"
                    ><b>任意一方</b></span
                  >携带<span style="color: red"><b>身份证</b></span> 和<span
                    style="color: red"
                    ><b>申请表</b></span
                  >前往县级资助管理部门办理续贷手续即可。续贷无需进行资格审查，申请表无需盖章。<br />
                  网上签订：<span style="color: red"
                    ><b>(需县级资助管理部门开通远程受理)</b></span
                  >无需前往县级资助管理部门办理续贷手续，
                  只需按照学生在线系统网上签订流程并通过身份认证，老师受理审核后即完成续贷合同签订，可在学生在线查看下载电子合同和受理证明。
                </div>
                <br />
                <strong>四、贷款发放 </strong>
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;如您的合同审批通过，贷款将在11月左右发放。助学贷款发放金额为合同金额，贷款发放时按照高校录入的电子回执金额，
                开发银行将相应学费和住宿费资金转给高校。当贷款发放到高校后<span
                  style="color: red"
                  ><b>仍有结余时，请到对应代理结算机构APP</b></span
                >
                （您可以在“学生在线系统-我的贷款-合同信息”查看代理结算机构）的国家开发银行助学贷款专区查询或提取结余资金用于日常生活费。<br />
                <br />
                <strong
                  >五、支付宝密码、学生在线系统密码、支付宝账号不存在、被动扣款
                </strong>
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;您可以登录学生在线系统查询还款账号(****.cdb@sina.cn)和支付宝初始密码（也是新浪邮箱账号密码），
                如果忘记支付宝登录密码，您可以通过新浪邮箱找回，或拨打支付宝24小时服务热线
                95188。支付宝账号不存在，可能是登录名改了，您可以问95188，
                查一下你身份证号有哪几个支付宝账号，哪个是由助学贷款改过来的，用改后的登录名登录就行。<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;支付宝被动扣款需要满足的条件：<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.使用银行卡对支付宝账户充值，需对指定支付宝账号进行实名认证<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.学生在线系统显示还款日期之前充值到指定支付宝账户余额<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.还款金额充足<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: red"
                  ><b>注意</b></span
                >：如您开通了余额支付功能或余额宝等自动转款功能，您支付宝账户的还款金额可能会被自动转出，
                请您关闭自动转款功能，并确保每月20日前（11月除外）账户余额充足，避免还款失败。<br />
                <br />
                <strong
                  >六、代理结算银行指定账户编号、绑定账户时效、绑定账户的操作方式</strong
                >
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;您可以登录学生在线系统查询代理结算<span
                  style="color: red"
                  ><b>指定账户编号</b></span
                >
                或在贷款合同“第二条
                账户开立”中“指定账户”处查看编号信息。该编号用于关联国家开发银行借款发放、资金划付和本息回收信息。
                您可在在借款合同签订次日或收到代理结算银行发送的短信通知后，登录代理结算银行App，搜索“助学贷款”进入助学贷款专区，
                点击“绑定助学贷款账户”，将该编号与银行账户进行绑定后，绑定的银行账户可作为贷款收款及还款账户。<br />
                <br />
                <strong
                  >七、考研（硕士/博士）、专升本、入伍、休学、留级、修改学制/入学年份</strong
                >
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;您应带相关证明，联系所在县级资助管理部门请老师帮忙<span
                  style="color: red"
                  ><b>尽快做好就学信息变更和还款计划变更</b></span
                >。
                我行没有明确办理截止日期，但建议您在贴息截止日前办理，并按照借款合同约定办理相关手续。考研或专升本，还想续贷，
                <span style="color: red"
                  ><b>请做完上述变更后，再申请续贷</b></span
                >。当月提交提前还款申请，
                在系统更新还款记录之前无法做就学信息变更和还款计划变更，需删除提前还款申请后再进行操作。<br />
                <br />
                <strong>八、毕业确认 </strong>
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: red"
                  ><b
                    >毕业前还清贷款可以不做毕业确认。毕业后升学的需要做毕业确认</b
                  ></span
                >。毕业后升学续贷的也需要做毕业确认。
                毕业确认操作：学生登录学生在线系统，在“毕业确认申请”功能中提交毕业确认申请。高校老师对学生的毕业确认申请进行审核。
                <span style="color: red"
                  ><b>毕业后按期足额还款就行，无其它手续</b></span
                >。<br />
                <br />
                <strong>九、贷款期限与宽限期时间 </strong>
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;贷款期限为学制加15年，最长不超过22年，其中，还本宽限期时间为5年。<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：该政策为2020年开始实施，对于2020年新增合同，还本宽限期为5年；2020年以前的存量合同，
                未开始偿还本金的助学贷款合同（即学生未毕业或已毕业但未开始偿还本金的贷款），可由借款学生提出申请，
                通过还款计划变更，在原合同约定的贷款期限内，将宽限期延长至5年。<br />
                <br />
              </div>
            </div>
          </div>
        </fieldset>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {
  getMessageListData,
  getTotalListData,
  MessageListData,
} from "@/api/home";
import router from "@/router";
import { first } from "lodash";
import { reactive, ref } from "vue";

const totalData = reactive({
  totalAmount: 0,
  residualAmount: 0,
  nextTime: "",
  message: 0,
});

const getTotalData = async () => {
  const { data } = await getTotalListData();
  totalData.totalAmount = data.totalAmount;
  totalData.residualAmount = data.residualAmount;
  totalData.nextTime = data.nextTime;
  totalData.message = data.message;
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

const getMessage = async () => {
  const { data } = await getMessageListData();
  messageList.value = data;
};
getMessage();

const clickTo = (value: string) => {
  router.push({ name: value });
};

const questionDialogVisible = ref(false);

const firstApplication = () => {
  questionDialogVisible.value = true;
};

const questionShow = () => {
  questionDialogVisible.value = true;
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
