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
                <el-option label="因病致困" value="1" />
                <el-option label="因灾致困" value="2" />
                <el-option label="劳动力少，无稳定收入" value="3" />
                <el-option label="其他" value="4" />
              </el-select>
            </el-form-item>
            <el-form-item v-if="formOneData.cause === '4'" required>
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
            <el-row>
              <el-col :span="12">
                <el-form-item label="姓名" prop="name">
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
                <el-form-item label="身份证号码" prop="idCard">
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
              <el-col :span="12">
                <el-form-item label="身份证结束日期" prop="idCardJieshu">
                  <el-date-picker
                    v-model="formTwoData.idCardJieshu"
                    type="date"
                    placeholder="请选择日期"
                    style="width: 100%"
                  />
                </el-form-item>
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
            <el-form-item label="户籍地址" prop="sheng">
              <el-row :gutter="12">
                <el-col :span="8">
                  <el-form-item>
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
                  <el-form-item>
                    <el-select
                      v-model="formTwoData.hujishi"
                      placeholder="请选择"
                      style="width: 100%"
                      @change="hujiShiOptionChane"
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
                  <el-form-item>
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
            <el-form-item>
              <el-input
                v-model="formTwoData.hujiDetailed"
                type="textarea"
              ></el-input>
            </el-form-item>
            <el-form-item label="家庭地址" prop="sheng">
              <el-row :gutter="12">
                <el-col :span="8">
                  <el-form-item>
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
                  <el-form-item>
                    <el-select
                      v-model="formTwoData.jiatingShi"
                      placeholder="请选择"
                      style="width: 100%"
                      @change="jiaTingShiOptionChane"
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
                  <el-form-item>
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
            <el-form-item>
              <el-input v-model="formTwoData.jiatingDetailed" type="textarea">
              </el-input>
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
              <div v-if="formOneData.cause === '4'">
                {{ formOneData.causeValue }}
              </div>
              {{ formOneData.cause }}
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
              {{ formTwoData.minzu }}
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
              {{ formTwoData.idCardQishi }}
            </el-descriptions-item>
            <el-descriptions-item label="身份证有效期结束日">
              {{ formTwoData.idCardJieshu }}
            </el-descriptions-item>
            <el-descriptions-item label="健康状况">
              {{ formTwoData.jiankangzhuangkuang }}
            </el-descriptions-item>
            <el-descriptions-item label="户籍地址" :span="2">
              {{ formTwoData.hujiSheng }}
            </el-descriptions-item>

            <el-descriptions-item label="家庭地址" :span="2">
              {{ formTwoData.jiatingSheng }}
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
              icon="success"
              title="提交成功"
              sub-title="请等待老师处理"
            >
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
  submitLoan,
} from "@/api/system";
import { FormInstance, FormRules } from "element-plus";
import { reactive, ref, watch } from "vue";
import { useUserStore } from "@/store/user";

const stepsNumber = ref(1);
const formOne = ref<FormInstance>();
const formTwo = ref<FormInstance>();
const { name } = useUserStore();

const formOneData = reactive({
  username: name,
  academicYear: "2023-2024学年", // 学年
  amount: null,
  year: "",
  cause: "",
  causeValue: "",
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
  hujishi: null,
  hujiXian: null,
  hujiDetailed: "",
  jiatingSheng: null,
  jiatingShi: null,
  jiatingXian: null,
  jiatingDetailed: "",
});

const nextForm = async (formEl: any) => {
  stepsNumber.value = stepsNumber.value + 1;
  if (!formEl) return;
  // await formEl.validate((valid, fields) => {
  //   if (valid && stepsNumber.value !== 4) {
  //     stepsNumber.value = stepsNumber.value + 1;
  //   }
  // });
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
});
const rulesTwo = reactive<FormRules>({
  name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  relation: [{ required: true, message: "请选择关系", trigger: "change" }],
  idCard: [{ required: true, message: "请输入身份证号", trigger: "blur" }],
  phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
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
    { required: true, message: "请输入家庭电话手机或座机", trigger: "blur" },
  ],
  youbian: [{ required: true, message: "请输入邮编", trigger: "blur" }],
  idCardQishi: [
    { required: true, message: "请选择身份证有效起始日期", trigger: "change" },
  ],
  idCardJieshu: [
    { required: true, message: "请选择身份证有效结束日期", trigger: "change" },
  ],
  jiankangzhuangkuang: [
    { required: true, message: "请选择健康状况", trigger: "change" },
  ],
  sheng: [{ required: true, message: "请选择省", trigger: "change" }],
  shi: [{ required: true, message: "请选择市", trigger: "change" }],
  xian: [{ required: true, message: "请选择县", trigger: "change" }],
});

const sendApplication = async () => {
  stepsNumber.value += 1;
  console.log(Object.assign(formOneData, formTwoData));
  const { data } = await submitLoan(Object.assign(formOneData, formTwoData));
  console.log(data);
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
  const { data } = await queryShiOption({ pcodeId: shengId });
  huJiShiOptions.value = data;
  formTwoData.hujishi = null;
  formTwoData.hujiXian = null;
};
const jiaTingShengOptionChange = async (shengId: number) => {
  const { data } = await queryShiOption({ pcodeId: shengId });
  jiaTingShiOptions.value = data;
  formTwoData.jiatingShi = null;
  formTwoData.jiatingXian = null;
};
// 县级菜单
const hujiShiOptionChane = async (shiId: number) => {
  const { data } = await queryXianOption({ pcodeId: shiId });
  huJiXianOptions.value = data;
  formTwoData.hujiXian = null;
};
const jiaTingShiOptionChane = async (shiId: number) => {
  const { data } = await queryXianOption({ pcodeId: shiId });
  jiaTingXianOptions.value = data;
  formTwoData.jiatingXian = null;
};

const minZuoptions = ref<OptionType[]>([]);
const getMinzuOption = async () => {
  const { data } = await queryMinzuOption();
  minZuoptions.value = data;
};
getMinzuOption();
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
