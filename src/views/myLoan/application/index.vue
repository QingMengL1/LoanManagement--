<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">
        <i-ep-menu />
      </el-breadcrumb-item>
      <el-breadcrumb-item> 我的贷款 </el-breadcrumb-item>
      <el-breadcrumb-item> 申请贷款 </el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-steps :active="stepsNumber" align-center style="margin-top: 40px">
        <el-step title="第一步" description="基本信息" />
        <el-step title="第二步" description="共同借款人信息" />
        <el-step title="第三步" description="贷款信息确认" />
        <el-step title="完成" />
      </el-steps>
      <div class="form_div">
        <div class="form_1">
          <el-form
            v-if="stepsNumber === 1"
            ref="formOne"
            :rules="rulesOne"
            :model="formOneData"
            label-width="120px"
          >
            <el-form-item label="姓名">
              {{ formOneData.username }}
            </el-form-item>
            <el-form-item label="申请学年">
              {{ formOneData.academicYear }}
            </el-form-item>
            <el-form-item label="联系电话" prop="userphone">
              <el-input
                v-model="formOneData.userphone"
                placeholder="请输入联系电话"
                style="width: 300px"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="身份证号" prop="userIdCard">
              <el-input
                v-model="formOneData.userIdCard"
                placeholder="请输入身份证号"
                style="width: 300px"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="贷款金额" prop="amount">
              <el-input
                v-model="formOneData.amount"
                placeholder="1000-12000"
                style="width: 300px"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="贷款年限" prop="year">
              <el-select
                v-model="formOneData.year"
                placeholder="请选择"
                style="width: 300px"
              >
                <el-option label="6" value="6" />
                <el-option label="7" value="7" />
                <el-option label="8" value="8" />
                <el-option label="9" value="9" />
                <el-option label="10" value="10" />
                <el-option label="11" value="11" />
                <el-option label="12" value="12" />
                <el-option label="13" value="13" />
                <el-option label="14" value="14" />
                <el-option label="15" value="15" />
                <el-option label="16" value="16" />
              </el-select>
            </el-form-item>
            <el-form-item label="申请原因" prop="cause">
              <el-select
                v-model="formOneData.cause"
                placeholder="请选择"
                style="width: 300px"
              >
                <el-option label="因病致困" value="因病致困" />
                <el-option label="因灾致困" value="因灾致困" />
                <el-option
                  label="劳动力少，无稳定收入"
                  value="劳动力少，无稳定收入"
                />
                <el-option label="其他" value="其他" />
              </el-select>
            </el-form-item>
            <el-form-item v-if="formOneData.cause === '其他'" required>
              <el-input v-model="formOneData.causeValue" type="textarea" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="nextForm(formOne)">
                下一步
              </el-button>
            </el-form-item>
          </el-form>
          <el-form
            v-if="stepsNumber === 2"
            ref="formTwo"
            :rules="rulesTwo"
            :model="formTwoData"
            label-width="130px"
          >
            <el-form-item>
              <el-select
                v-model="commonSelechName"
                placeholder="请选择共同借款人"
                @change="commonSelechChange"
              >
                <el-option
                  v-for="item in commonList"
                  :label="item.commonName"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item label="姓名" prop="commonName">
                  <el-input v-model="formTwoData.commonName" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="关系" prop="relation">
                  <el-select
                    v-model="formTwoData.relation"
                    placeholder="请选择"
                    style="width: 100%"
                  >
                    <el-option label="父亲" value="父亲" />
                    <el-option label="母亲" value="母亲" />
                    <el-option label="近亲属" value="近亲属" />
                    <el-option label="其他" value="其他" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="身份证号" prop="idCard">
                  <el-input v-model="formTwoData.idCard" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="手机" prop="phone">
                  <el-input v-model="formTwoData.phone" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="国籍" prop="guoji">
                  <el-select
                    v-model="formTwoData.guoji"
                    placeholder="请选择"
                    style="width: 100%"
                  >
                    <el-option label="中国" value="中国" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="身份证类型" prop="idCardType">
                  <el-select
                    v-model="formTwoData.idCardType"
                    placeholder="请选择"
                    style="width: 100%"
                  >
                    <el-option label="居民身份证" value="居民身份证" />
                    <el-option label="临时身份证" value="临时身份证" />
                    <el-option label="军人身份证件" value="军人身份证件" />
                    <el-option label="武警身份证件" value="武警身份证件" />
                    <el-option label="通行证" value="通行证" />
                    <el-option label="护照" value="护照" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="户口性质" prop="hukouxingzhi">
                  <el-select
                    v-model="formTwoData.hukouxingzhi"
                    placeholder="请选择"
                    style="width: 100%"
                  >
                    <el-option label="农村户口" value="农村户口" />
                    <el-option label="城镇户口" value="城镇户口" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="民族" prop="minzu">
                  <el-select
                    v-model="formTwoData.minzu"
                    placeholder="请选择"
                    style="width: 100%"
                  >
                    <el-option
                      v-for="item in minZuoptions"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="性别" prop="xingbie">
                  <el-radio-group v-model="formTwoData.xingbie">
                    <el-radio label="男" value="男" />
                    <el-radio label="女" value="女" />
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="婚姻状况" prop="hunyinzhuangkuang">
                  <el-select
                    v-model="formTwoData.hunyinzhuangkuang"
                    placeholder="请选择"
                    style="width: 100%"
                  >
                    <el-option label="已婚" value="已婚" />
                    <el-option label="未婚" value="未婚" />
                    <el-option label="离婚" value="离婚" />
                    <el-option label="丧偶" value="丧偶" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="职业" prop="zhiye">
                  <el-select
                    v-model="formTwoData.zhiye"
                    placeholder="请选择"
                    style="width: 100%"
                  >
                    <el-option value="学生">学生</el-option>
                    <el-option
                      value="党的机关、国家机关、群众团体和社会组织、企事业单位负责人"
                    >
                      党的机关、国家机关、群众团体和社会组织、企事业单位负责人
                    </el-option>
                    <el-option value="科学研究人员">科学研究人员</el-option>
                    <el-option value="工程技术人员">工程技术人员</el-option>
                    <el-option value="卫生专业技术人员"
                      >卫生专业技术人员</el-option
                    >
                    <el-option value="经济金融业务人员"
                      >经济金融业务人员</el-option
                    >
                    <el-option value="法律、社会和宗教专业人员"
                      >法律、社会和宗教专业人员</el-option
                    >
                    <el-option value="教学人员">教学人员</el-option>
                    <el-option value="文学艺术工作人员"
                      >文学艺术工作人员</el-option
                    >
                    <el-option value="体育工作人员">体育工作人员</el-option>
                    <el-option value="新闻出版、文化工作人员"
                      >新闻出版、文化工作人员</el-option
                    >
                    <el-option value="其他专业技术人员"
                      >其他专业技术人员</el-option
                    >
                    <el-option value="安全和消防人员">安全和消防人员</el-option>
                    <el-option value="邮政和电信业务人员"
                      >邮政和电信业务人员</el-option
                    >
                    <el-option value="建筑施工人员">建筑施工人员</el-option>
                    <el-option value="其他办事人员和有关人员"
                      >其他办事人员和有关人员</el-option
                    >
                    <el-option value="商业、服务业人员"
                      >商业、服务业人员</el-option
                    >
                    <el-option value="农、林、牧、渔生产及辅助人员">
                      农、林、牧、渔生产及辅助人员
                    </el-option>
                    <el-option value="生产、运输设备操作人员及有关人员">
                      生产、运输设备操作人员及有关人员
                    </el-option>
                    <el-option value="军人">军人</el-option>
                    <el-option value="个体经营者">个体经营者</el-option>
                    <el-option value="自由职业">自由职业</el-option>
                    <el-option value="无职业活动人员">无职业活动人员</el-option>
                    <el-option value="离退休人员">离退休人员</el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="家庭电话" prop="jiatingdianhua">
                  <el-input v-model="formTwoData.jiatingdianhua" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="邮编" prop="youbian">
                  <el-input v-model="formTwoData.youbian" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="身份证起始日期" prop="idCardQishi">
                  <el-date-picker
                    v-model="formTwoData.idCardQishi"
                    type="date"
                    placeholder="请选择日期"
                    style="width: 100%"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="身份证结束日期" prop="idCardJieshu">
                  <el-date-picker
                    v-model="formTwoData.idCardJieshu"
                    :disabled="foreverIdcard"
                    type="date"
                    placeholder="请选择日期"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="1">
                <el-checkbox
                  v-model="foreverIdcard"
                  label="永久"
                  size="large"
                  @change="foreverIdcardChange"
                />
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="健康状况" prop="jiankangzhuangkuang">
                  <el-radio-group v-model="formTwoData.jiankangzhuangkuang">
                    <el-radio label="健康" value="健康" />
                    <el-radio label="患病" value="患病" />
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="户籍地址" :required="true">
              <el-row :gutter="12">
                <el-col :span="8">
                  <el-form-item prop="hujiSheng">
                    <el-select
                      v-model:model-value="formTwoData.hujiSheng"
                      placeholder="请选择"
                      style="width: 100%"
                      @change="huJiShengOptionChange"
                    >
                      <el-option
                        v-for="item in huJiShengOptions"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="hujiShi">
                    <el-select
                      v-model="formTwoData.hujiShi"
                      placeholder="请选择"
                      style="width: 100%"
                      @change="hujiShiOptionChange"
                    >
                      <el-option
                        v-for="item in huJiShiOptions"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="hujiXian">
                    <el-select
                      v-model="formTwoData.hujiXian"
                      placeholder="请选择"
                      style="width: 100%"
                    >
                      <el-option
                        v-for="item in huJiXianOptions"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item prop="hujiDetailed">
              <el-input v-model="formTwoData.hujiDetailed" type="textarea">
              </el-input>
            </el-form-item>
            <el-form-item label="家庭地址" :required="true">
              <el-row :gutter="12">
                <el-col :span="8">
                  <el-form-item prop="jiatingSheng">
                    <el-select
                      v-model="formTwoData.jiatingSheng"
                      placeholder="请选择"
                      style="width: 100%"
                      @change="jiaTingShengOptionChange"
                    >
                      <el-option
                        v-for="item in jiaTingShengOptions"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="jiatingShi">
                    <el-select
                      v-model="formTwoData.jiatingShi"
                      placeholder="请选择"
                      style="width: 100%"
                      @change="jiaTingShiOptionChange"
                    >
                      <el-option
                        v-for="item in jiaTingShiOptions"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="jiatingXian">
                    <el-select
                      v-model="formTwoData.jiatingXian"
                      placeholder="请选择"
                      style="width: 100%"
                    >
                      <el-option
                        v-for="item in jiaTingXianOptions"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item prop="jiatingDetailed">
              <el-input v-model="formTwoData.jiatingDetailed" type="textarea">
              </el-input>
            </el-form-item>
            <el-form-item style="width: 100%">
              <el-upload
                ref="uploadRef"
                v-model:file-list="fileList"
                class="upload-demo"
                action="none"
                multiple
                :on-remove="handleRemove"
                :limit="1"
                :on-exceed="handleExceed"
                :auto-upload="false"
                :http-request="httpRequest"
              >
                <template #trigger>
                  <el-button type="primary" style="margin-right: 16px">
                    选择申请表文件
                  </el-button>
                </template>

                <template #tip>
                  <div class="el-upload__tip">
                    最多可上传1个文件，如果资料较多可以放入一个Word文档中
                  </div>
                </template>
                <el-button class="ml-3" type="success" @click="uploadFile">
                  上传文件
                </el-button>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="upForm()"> 上一步 </el-button>
              <el-button type="primary" @click="nextForm(formTwo)">
                下一步
              </el-button>
            </el-form-item>
          </el-form>
          <el-descriptions
            v-if="stepsNumber === 3"
            title="贷款信息确认"
            :column="2"
          >
            <el-descriptions-item label="姓名">
              {{ formOneData.username }}
            </el-descriptions-item>
            <el-descriptions-item label="申请学年">
              {{ formOneData.academicYear }}
            </el-descriptions-item>
            <el-descriptions-item label="贷款金额">
              {{ formOneData.amount }}
            </el-descriptions-item>
            <el-descriptions-item label="贷款年限">
              {{ formOneData.year }}年
            </el-descriptions-item>
            <el-descriptions-item label="申请原因">
              <span v-if="formOneData.cause === '其他'">
                {{ formOneData.causeValue }}
              </span>
              <span v-else>
                {{ formOneData.cause }}
              </span>
            </el-descriptions-item>
          </el-descriptions>
          <el-descriptions
            v-if="stepsNumber === 3"
            title="共同借款人信息"
            :column="2"
          >
            <el-descriptions-item label="姓名">
              {{ formTwoData.commonName }}
            </el-descriptions-item>
            <el-descriptions-item label="身份证号">
              {{ formTwoData.idCard }}
            </el-descriptions-item>
            <el-descriptions-item label="关系">
              {{ formTwoData.relation }}
            </el-descriptions-item>
            <el-descriptions-item label="联系电话">
              {{ formTwoData.phone }}
            </el-descriptions-item>
            <el-descriptions-item label="国籍">
              {{ formTwoData.guoji }}
            </el-descriptions-item>
            <el-descriptions-item label="身份证类型">
              {{ formTwoData.idCardType }}
            </el-descriptions-item>
            <el-descriptions-item label="户口性质">
              {{ formTwoData.hukouxingzhi }}
            </el-descriptions-item>
            <el-descriptions-item label="民族">
              {{ minzuValue }}
            </el-descriptions-item>
            <el-descriptions-item label="性别">
              {{ formTwoData.xingbie }}
            </el-descriptions-item>
            <el-descriptions-item label="婚姻状况">
              {{ formTwoData.hunyinzhuangkuang }}
            </el-descriptions-item>
            <el-descriptions-item label="职业" :span="2">
              {{ formTwoData.zhiye }}
            </el-descriptions-item>
            <el-descriptions-item label="家庭电话">
              {{ formTwoData.jiatingdianhua }}
            </el-descriptions-item>
            <el-descriptions-item label="邮编">
              {{ formTwoData.youbian }}
            </el-descriptions-item>
            <el-descriptions-item label="身份证有效期起始日">
              {{ qishiValue }}
            </el-descriptions-item>
            <el-descriptions-item label="身份证有效期结束日">
              {{ jieshuValue }}
            </el-descriptions-item>
            <el-descriptions-item label="健康状况" :span="2">
              {{ formTwoData.jiankangzhuangkuang }}
            </el-descriptions-item>
            <el-descriptions-item label="户籍地址" :span="2">
              {{ hujiValue }}
            </el-descriptions-item>
            <el-descriptions-item label="家庭地址" :span="2">
              {{ jiatingValue }}
            </el-descriptions-item>
          </el-descriptions>
          <div v-if="stepsNumber === 3">
            <el-button type="primary" @click="upForm"> 上一步 </el-button>
            <el-button type="primary" @click="sendApplication">
              提交申请
            </el-button>
          </div>
          <div
            v-if="stepsNumber === 4"
            style="text-align: center; margin-top: 20px"
          >
            <el-result
              v-if="submitMessage === '提交成功，请等待审核'"
              icon="success"
              title="提交成功"
              :sub-title="submitMessage"
            >
            </el-result>
            <el-result
              v-else
              icon="error"
              title="提交失败"
              :sub-title="submitMessage"
            >
              <template #extra>
                <el-button type="primary" @click="upForm"> 上一步 </el-button>
              </template>
            </el-result>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import {
  queryMinzuOption,
  queryShengOption,
  queryShiOption,
  queryXianOption,
  OptionType,
  uploadAxios,
} from "@/api/system";

import { submitLoan } from "@/api/myLoan";
import {
  ElMessage,
  FormInstance,
  FormRules,
  UploadProps,
  UploadUserFile,
} from "element-plus";
import { computed, reactive, ref } from "vue";
import { useUserStore } from "@/store/user";
import { idCardTest, nameTest, phoneTest, youbianTest } from "@/utils/tegTest";
import { timeFormat } from "@/utils/timeformat";
import { conmmonDataType, getCommonData } from "@/api/user";

const stepsNumber = ref(1);
const formOne = ref<FormInstance>();
const formTwo = ref<FormInstance>();
const { name } = useUserStore();

const commonList = ref<conmmonDataType[]>([]);
// 获取所有用户信息
const queryCommonData = async () => {
  const { data } = await getCommonData();
  commonList.value = data;
};
queryCommonData();

const formOneData = reactive({
  username: name,
  academicYear: "2023-2024学年", // 学年
  amount: null,
  year: "",
  cause: "",
  causeValue: "",
  userphone: "",
  userIdCard: "",
});

const formTwoData = reactive({
  commonName: "",
  relation: "",
  idCard: "",
  phone: "",
  guoji: "",
  idCardType: "",
  hukouxingzhi: "",
  minzu: null,
  xingbie: "",
  hunyinzhuangkuang: "",
  zhiye: "",
  jiatingdianhua: "",
  youbian: "",
  idCardQishi: "",
  idCardJieshu: "",
  jiankangzhuangkuang: "",
  hujiSheng: null,
  hujiShi: null,
  hujiXian: null,
  hujiDetailed: "",
  jiatingSheng: null,
  jiatingShi: null,
  jiatingXian: null,
  jiatingDetailed: "",
  fileId: 0,
});

const foreverIdcard = ref(false);

const foreverIdcardChange = (value: boolean) => {
  if (value) {
    formTwoData.idCardJieshu = "永久";
  } else {
    formTwoData.idCardJieshu = "";
  }
};

const nextForm = async (formEl: any) => {
  // stepsNumber.value = stepsNumber.value + 1;
  if (!formEl) return;
  // console.log(fileList.value);
  await formEl.validate((valid: any, fields: any) => {
    if (valid && stepsNumber.value !== 4) {
      console.log(fileList.value);
      stepsNumber.value = stepsNumber.value + 1;
    }
  });
};

const upForm = () => {
  if (stepsNumber.value !== 1) {
    stepsNumber.value = stepsNumber.value - 1;
  }
};

const rulesOne = reactive<FormRules>({
  amount: [
    { required: true, message: "请输入贷款金额", trigger: "blur" },
    {
      type: "number",
      asyncValidator: (rule, value) => {
        return new Promise((resolve, reject) => {
          if (parseInt(value, 10) < 1000 || parseInt(value, 10) > 12000) {
            reject("贷款金额为1000-12000");
          } else {
            resolve();
          }
        });
      },
      trigger: "blur",
    },
  ],
  year: [{ required: true, message: "请选择贷款年限", trigger: "change" }],
  cause: [{ required: true, message: "请选择申请原因", trigger: "change" }],
  userphone: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    {
      asyncValidator: (rule, value) => {
        return new Promise((resolve, reject) => {
          if (!phoneTest.test(value)) {
            reject("请输入正确的手机号");
          } else {
            resolve();
          }
        });
      },
      trigger: "blur",
    },
  ],
  userIdCard: [
    { required: true, message: "请输入身份证号", trigger: "blur" },
    {
      asyncValidator: (rule, value) => {
        return new Promise((resolve, reject) => {
          if (!idCardTest.test(value)) {
            reject("请输入正确的身份证号");
          } else {
            resolve();
          }
        });
      },
      trigger: "blur",
    },
  ],
});
const rulesTwo = reactive<FormRules>({
  commonName: [
    { required: true, message: "请输入姓名", trigger: "blur" },
    {
      type: "string",
      asyncValidator: (rule, value) => {
        return new Promise((resolve, reject) => {
          if (!nameTest.test(value)) {
            reject("请输入正确的姓名");
          } else {
            resolve();
          }
        });
      },
      trigger: "blur",
    },
  ],
  relation: [{ required: true, message: "请选择关系", trigger: "change" }],
  idCard: [
    { required: true, message: "请输入身份证号", trigger: "blur" },
    {
      asyncValidator: (rule, value) => {
        return new Promise((resolve, reject) => {
          if (!idCardTest.test(value)) {
            reject("请输入正确的身份证号");
          } else {
            resolve();
          }
        });
      },
      trigger: "blur",
    },
  ],
  phone: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    {
      asyncValidator: (rule, value) => {
        return new Promise((resolve, reject) => {
          if (!phoneTest.test(value)) {
            reject("请输入正确的手机号");
          } else {
            resolve();
          }
        });
      },
      trigger: "blur",
    },
  ],
  guoji: [{ required: true, message: "请选择国籍", trigger: "change" }],
  idCardType: [
    { required: true, message: "请选择身份证类型", trigger: "change" },
  ],
  hukouxingzhi: [
    { required: true, message: "请选择户口性质", trigger: "change" },
  ],
  minzu: [{ required: true, message: "请选择民族", trigger: "change" }],
  xingbie: [{ required: true, message: "请选择性别", trigger: "change" }],
  hunyinzhuangkuang: [
    { required: true, message: "请选择婚姻状况", trigger: "change" },
  ],
  zhiye: [{ required: true, message: "请选择职业", trigger: "change" }],
  jiatingdianhua: [
    { required: true, message: "请输入家庭电话", trigger: "blur" },
    {
      asyncValidator: (rule, value) => {
        return new Promise((resolve, reject) => {
          if (!phoneTest.test(value)) {
            reject("请输入正确的手机号");
          } else {
            resolve();
          }
        });
      },
      trigger: "blur",
    },
  ],
  youbian: [
    { required: true, message: "请输入邮编", trigger: "blur" },
    {
      asyncValidator: (rule, value) => {
        return new Promise((resolve, reject) => {
          if (!youbianTest.test(value)) {
            reject("请输入正确的六位数邮编");
          } else {
            resolve();
          }
        });
      },
      trigger: "blur",
    },
  ],
  idCardQishi: [
    { required: true, message: "请选择身份证有效起始日期", trigger: "change" },
  ],
  idCardJieshu: [
    { required: true, message: "请选择身份证有效结束日期", trigger: "change" },
  ],
  jiankangzhuangkuang: [
    { required: true, message: "请选择健康状况", trigger: "change" },
  ],
  hujiSheng: [
    { required: true, message: "请选择地址", trigger: "change" },
    {
      asyncValidator: (rule, value) => {
        return new Promise((resolve, reject) => {
          if (!formTwoData.hujiSheng) {
            reject("请选择地址");
          } else {
            resolve();
          }
        });
      },
      trigger: "blur",
    },
  ],
  hujiShi: [
    { required: true, message: "请选择市", trigger: "change" },
    {
      asyncValidator: (rule, value) => {
        return new Promise((resolve, reject) => {
          if (!formTwoData.hujiShi) {
            reject("请选择地址");
          } else {
            resolve();
          }
        });
      },
      trigger: "blur",
    },
  ],
  hujiXian: [
    { required: true, message: "请选择县", trigger: "change" },
    {
      asyncValidator: (rule, value) => {
        return new Promise((resolve, reject) => {
          if (!formTwoData.hujiXian) {
            reject("请选择地址");
          } else {
            resolve();
          }
        });
      },
      trigger: "blur",
    },
  ],
  jiatingSheng: [
    { required: true, message: "请选择地址", trigger: "change" },
    {
      asyncValidator: (rule, value) => {
        return new Promise((resolve, reject) => {
          if (!formTwoData.jiatingSheng) {
            reject("请选择地址");
          } else {
            resolve();
          }
        });
      },
      trigger: "blur",
    },
  ],
  jiatingShi: [
    { required: true, message: "请选择市", trigger: "change" },
    {
      asyncValidator: (rule, value) => {
        return new Promise((resolve, reject) => {
          if (!formTwoData.jiatingShi) {
            reject("请选择地址");
          } else {
            resolve();
          }
        });
      },
      trigger: "blur",
    },
  ],
  jiatingXian: [
    { required: true, message: "请选择县", trigger: "change" },
    {
      asyncValidator: (rule, value) => {
        return new Promise((resolve, reject) => {
          if (!formTwoData.jiatingXian) {
            reject("请选择地址");
          } else {
            resolve();
          }
        });
      },
      trigger: "blur",
    },
  ],
  hujiDetailed: [
    {
      asyncValidator: (rule, value) => {
        return new Promise((resolve, reject) => {
          if (!formTwoData.hujiDetailed) {
            reject("请输入详细地址");
          } else {
            resolve();
          }
        });
      },
      trigger: "blur",
    },
  ],
  jiatingDetailed: [
    {
      asyncValidator: (rule, value) => {
        return new Promise((resolve, reject) => {
          if (!formTwoData.jiatingDetailed) {
            reject("请输入详细地址");
          } else {
            resolve();
          }
        });
      },
      trigger: "blur",
    },
  ],
});

const submitMessage = ref("");
const sendApplication = async () => {
  stepsNumber.value += 1;
  const { data } = await submitLoan(Object.assign(formOneData, formTwoData));
  submitMessage.value = data;
};

const huJiShengOptions = ref<OptionType[]>([]);
const huJiShiOptions = ref<OptionType[]>([]);
const huJiXianOptions = ref<OptionType[]>([]);

const jiaTingShengOptions = ref<OptionType[]>([]);
const jiaTingShiOptions = ref<OptionType[]>([]);
const jiaTingXianOptions = ref<OptionType[]>([]);

const getShengOption = async () => {
  const { data } = await queryShengOption();
  huJiShengOptions.value = data;
  jiaTingShengOptions.value = data;
};
getShengOption();
// 市级菜单
const huJiShengOptionChange = async (shengId: number) => {
  const { data } = await queryShiOption({ Id: shengId });
  huJiShiOptions.value = data;
  formTwoData.hujiShi = null;
  formTwoData.hujiXian = null;
};
const jiaTingShengOptionChange = async (shengId: number) => {
  const { data } = await queryShiOption({ Id: shengId });
  jiaTingShiOptions.value = data;
  formTwoData.jiatingShi = null;
  formTwoData.jiatingXian = null;
};
// 县级菜单
const hujiShiOptionChange = async (shiId: number) => {
  const { data } = await queryXianOption({ Id: shiId });
  huJiXianOptions.value = data;
  formTwoData.hujiXian = null;
};
const jiaTingShiOptionChange = async (shiId: number) => {
  const { data } = await queryXianOption({ Id: shiId });
  jiaTingXianOptions.value = data;
  formTwoData.jiatingXian = null;
};

const minZuoptions = ref<OptionType[]>([]);
const getMinzuOption = async () => {
  const { data } = await queryMinzuOption();
  minZuoptions.value = data;
};
getMinzuOption();

const minzuValue = computed(() => {
  let minzuValue = "";
  minZuoptions.value.forEach((element) => {
    if (element.code === formTwoData.minzu) {
      minzuValue = element.name;
    }
  });
  return minzuValue;
});

const qishiValue = computed(() => {
  return timeFormat(formTwoData.idCardQishi);
});

const jieshuValue = computed(() => {
  if (formTwoData.idCardJieshu === "永久") {
    return "永久";
  } else {
    return timeFormat(formTwoData.idCardJieshu);
  }
});

const hujiValue = computed(() => {
  let zhuzhi = "";

  huJiShengOptions.value.forEach((element) => {
    if (element.code === formTwoData.hujiSheng) {
      zhuzhi += element.name;
    }
  });

  huJiShiOptions.value.forEach((element) => {
    if (element.code === formTwoData.hujiShi) {
      zhuzhi += element.name;
    }
  });

  huJiXianOptions.value.forEach((element) => {
    if (element.code === formTwoData.hujiXian) {
      zhuzhi += element.name;
    }
  });

  zhuzhi += formTwoData.hujiDetailed;
  return zhuzhi;
});

const jiatingValue = computed(() => {
  let zhuzhi = "";

  jiaTingShengOptions.value.forEach((element) => {
    if (element.code === formTwoData.jiatingSheng) {
      zhuzhi += element.name;
    }
  });

  jiaTingShiOptions.value.forEach((element) => {
    if (element.code === formTwoData.jiatingShi) {
      zhuzhi += element.name;
    }
  });

  jiaTingXianOptions.value.forEach((element) => {
    if (element.code === formTwoData.jiatingXian) {
      zhuzhi += element.name;
    }
  });
  zhuzhi += formTwoData.hujiDetailed;
  return zhuzhi;
});

const commonSelechName = ref("");
const commonSelechChange = async (row: any) => {
  await huJiShengOptionChange(row.hujiSheng);
  await jiaTingShengOptionChange(row.jiatingSheng);
  await hujiShiOptionChange(row.hujiShi);
  await jiaTingShiOptionChange(row.jiatingShi);
  commonSelechName.value = row.commonName;
  for (const key in formTwoData) {
    formTwoData[key] = row[key];
  }
  if (row.idCardJieshu === "永久") {
    formTwoData.idCardJieshu = "永久";
    foreverIdcard.value = true;
  }
};

const uploadRef = ref();
const fileList = ref<UploadUserFile[]>([]);

const handleRemove: UploadProps["onRemove"] = (file, uploadFiles) => {
  // console.log(file, uploadFiles);
};

const handleExceed: UploadProps["onExceed"] = (file, uploadFiles) => {
  ElMessage.error("最多上传1个文件");
};

const httpRequest = async (file: any) => {
  let formData = new FormData();
  if (file.file.size < 5242880 * 2) {
    formData.append("file", file.file);
    formData.append("fileName", file.file.name);
    const { data } = await uploadAxios(formData);
    if (data.msg === "上传成功") {
      ElMessage.success(data.msg);
      fileList.value = [];
      formTwoData.fileId = data.data;
    } else {
      ElMessage.error("上传失败请稍后重试");
    }
  } else {
    ElMessage.error("上传文件最大为10M");
  }
};

const uploadFile = () => {
  uploadRef.value.submit();
};
</script>

<style scoped lang="scss">
.box-card {
  display: block;
  min-height: 88vh;
  margin-top: 8px;
  overflow: auto;
}

.form_div {
  margin: 0 auto;
  margin-top: 40px;
  width: 60%;
}
</style>
