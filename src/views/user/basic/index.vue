<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">
        <i-ep-menu />
      </el-breadcrumb-item>
      <el-breadcrumb-item> 我的信息 </el-breadcrumb-item>
      <el-breadcrumb-item> 基本信息 </el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <div class="form_class">
        <div class="basic_form" style="margin-top: 26px">
          <p style="margin-bottom: 16px">基本信息</p>
          <el-form
            ref="basicForm"
            :rules="rulesForm"
            :model="basicFormData"
            label-width="130px"
          >
            <el-row>
              <el-col :span="12">
                <el-form-item label="姓名" prop="name">
                  <el-input v-model="basicFormData.name" disabled />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="身份证号" prop="idCard">
                  <el-input v-model="basicFormData.idCard" disabled />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="身份证起始日期" prop="idCardQishi">
                  <el-date-picker
                    v-model="basicFormData.idCardQishi"
                    type="date"
                    placeholder="请选择日期"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="身份证结束日期" prop="idCardJieshu">
                  <el-date-picker
                    v-model="basicFormData.idCardJieshu"
                    type="date"
                    placeholder="请选择日期"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="国籍" prop="guoji">
                  <el-select
                    v-model="basicFormData.guoji"
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
                    v-model="basicFormData.idCardType"
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
                    v-model="basicFormData.hukouxingzhi"
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
                    v-model="basicFormData.minzu"
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
                  <el-radio-group v-model="basicFormData.xingbie">
                    <el-radio label="男" value="男" />
                    <el-radio label="女" value="女" />
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="婚姻状况" prop="hunyinzhuangkuang">
                  <el-select
                    v-model="basicFormData.hunyinzhuangkuang"
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
                    v-model="basicFormData.zhiye"
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
              <el-col :span="12">
                <el-form-item label="年龄" prop="age">
                  <el-input-number
                    v-model="basicFormData.age"
                    :controls="false"
                    style="width: 100%"
                  >
                  </el-input-number>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="毕业中学" prop="biyezhongxue">
                  <el-input
                    v-model="basicFormData.biyezhongxue"
                    style="width: 100%"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="contact_form" style="margin-top: 26px">
          <p style="margin-bottom: 16px">通讯信息</p>
          <el-form
            ref="contactForm"
            :rules="rulesForm"
            :model="basicFormData"
            label-width="130px"
          >
            <el-row>
              <el-col :span="12">
                <el-form-item label="手机" prop="phone">
                  <el-input v-model="basicFormData.phone"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="邮政编码" prop="youbian">
                  <el-input v-model="basicFormData.youbian"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="电子邮件" prop="email">
                  <el-input v-model="basicFormData.email"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="QQ" prop="qqNumber">
                  <el-input v-model="basicFormData.qqNumber"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="微信" prop="wechat">
                  <el-input v-model="basicFormData.wechat"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="通信地址" prop="tongxindizhi">
              <el-input
                v-model="basicFormData.tongxindizhi"
                placeholder="请输入详细地址、填写到村镇、门牌号"
              >
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="school_form" style="margin-top: 26px">
          <p style="margin-bottom: 16px">就学信息</p>
          <el-form
            ref="schoolForm"
            :rules="rulesForm"
            :model="basicFormData"
            label-width="130px"
          >
            <el-row>
              <el-col :span="12">
                <el-form-item label="学校名称" prop="username">
                  <el-input v-model="basicFormData.schoolname" disabled>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="学院" prop="xueyuan">
                  <el-select
                    v-model="basicFormData.xueyuan"
                    @change="zhuanyeData"
                  >
                    <el-option
                      v-for="item in xueYuanOptions"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="专业名称" prop="zhuanye">
                  <el-select v-model="basicFormData.zhuanye">
                    <el-option
                      v-for="item in zhuanYeOptions"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="班级" prop="classnumber">
                  <el-input v-model="basicFormData.classnumber"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="学历" prop="xueli">
                  <el-select v-model="basicFormData.xueli" style="width: 100%">
                    <el-option value="研究生">研究生</el-option>
                    <el-option value="本科">本科</el-option>
                    <el-option value="专科">专科</el-option>
                    <el-option value="研究生">中职</el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="入学年份" prop="ruxueyear">
                  <el-select
                    v-model="basicFormData.ruxueyear"
                    style="width: 100%"
                  >
                    <el-option value="2018">2018</el-option>
                    <el-option value="2019">2019</el-option>
                    <el-option value="2020">2020</el-option>
                    <el-option value="2021">2021</el-option>
                    <el-option value="2022">2022</el-option>
                    <el-option value="2023">2023</el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="学号" prop="studentId">
                  <el-input
                    v-model="basicFormData.studentId"
                    style="width: 100%"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="专业类别" prop="zhuanyeType">
                  <el-select
                    v-model="basicFormData.zhuanyeType"
                    style="width: 100%"
                  >
                    <el-option value="哲学">哲学</el-option>
                    <el-option value="经济学">经济学</el-option>
                    <el-option value="法学">法学</el-option>
                    <el-option value="教育学">教育学</el-option>
                    <el-option value="文学">文学</el-option>
                    <el-option value="历史学">历史学</el-option>
                    <el-option value="理学">理学</el-option>
                    <el-option value="工学">工学</el-option>
                    <el-option value="农学">农学</el-option>
                    <el-option value="医学">医学</el-option>
                    <el-option value="管理学">管理学</el-option>
                    <el-option value="军事学">军事学</el-option>
                    <el-option value="艺术学">艺术学</el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="学制" prop="xuezhi">
                  <el-input v-model="basicFormData.xuezhi" style="width: 100%">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="毕业时间" prop="biyeshijian">
                  <el-date-picker
                    v-model="basicFormData.biyeshijian"
                    style="width: 100%"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div style="margin-top: 16px; text-align: right">
          <el-button type="primary" @click="resetForm">重置</el-button>
          <el-button
            type="primary"
            style="width: 100px"
            @click="submitBasicForm"
            >提交修改</el-button
          >
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import {
  getXueYuanData,
  getZhuanYeData,
  OptionType,
  queryMinzuOption,
} from "@/api/system";
import { getUserBasic, editUserBasic } from "@/api/user";
import { emailTest, idCardTest, nameTest, phoneTest } from "@/utils/tegTest";
import { ElMessage, FormRules } from "element-plus";
import { reactive, ref } from "vue";

const basicForm = ref<any>();
const contactForm = ref<any>();
const schoolForm = ref<any>();

const getbasicData = async () => {
  const { data } = await getUserBasic();
  if (data) {
    await zhuanyeData(data.xueyuan);
    basicFormData.value = data;
  }
};

getbasicData();

const basicFormData = ref({
  studentId: "",
  name: "",
  idCard: "",
  idCardQishi: "",
  idCardJieshu: "",
  guoji: "",
  idCardType: "",
  hukouxingzhi: "",
  minzu: null,
  xingbie: "",
  hunyinzhuangkuang: "",
  // TODO:年龄
  age: null,
  zhiye: "",
  biyezhongxue: "",
  // 通讯信息
  phone: "",
  youbian: "",
  email: "",
  qqNumber: "",
  wechat: "",
  tongxindizhi: "",
  // 学校信息
  schoolname: "",
  xueyuan: "",
  zhuanye: "",
  xueli: "",
  ruxueyear: "",
  zhuanyeType: "",
  xuezhi: "",
  biyeshijian: "",
  classnumber: null,
});

const rulesForm = reactive<FormRules>({
  name: [
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
  idCardQishi: [
    { required: true, message: "请选择身份证有效起始日期", trigger: "change" },
  ],
  idCardJieshu: [
    { required: true, message: "请选择身份证有效结束日期", trigger: "change" },
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
  age: [
    { required: true, message: "请输入年龄", trigger: "blur" },
    {
      asyncValidator: (rule, value) => {
        return new Promise((resolve, reject) => {
          if (value < 1 || value > 100) {
            reject("请输入正确的年龄");
          } else {
            resolve();
          }
        });
      },
      trigger: "blur",
    },
  ],
  biyezhongxue: [
    { required: true, message: "请输入毕业中学", trigger: "blur" },
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
  youbian: [{ required: false, message: "请输入邮编", trigger: "blur" }],
  email: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    {
      asyncValidator: (rule, value) => {
        return new Promise((resolve, reject) => {
          if (!emailTest.test(value)) {
            reject("请输入正确的邮箱");
          } else {
            resolve();
          }
        });
      },
      trigger: "blur",
    },
  ],
  qqNumber: [{ required: true, message: "请输入QQ", trigger: "blur" }],
  wechat: [{ required: true, message: "请输入微信", trigger: "blur" }],
  tongxindizhi: [
    { required: true, message: "请输入通信地址", trigger: "blur" },
  ],

  schoolname: [{ required: true, message: "请输入学校名称", trigger: "blur" }],
  xueyuan: [{ required: true, message: "请输入学院名称", trigger: "change" }],
  zhuanye: [{ required: true, message: "请输入专业名称", trigger: "change" }],
  xueli: [{ required: true, message: "请选择学历", trigger: "change" }],
  ruxueyear: [{ required: true, message: "请选择入学年份", trigger: "change" }],
  studentId: [{ required: true, message: "请输入学号", trigger: "blur" }],
  zhuanyeType: [
    { required: true, message: "请选择专业类型", trigger: "change" },
  ],
  xuezhi: [{ required: true, message: "请选择学制", trigger: "change" }],
  biyeshijian: [
    { required: true, message: "请选择毕业时间", trigger: "change" },
  ],
  classnumber: [{ required: true, message: "请输入班级", trigger: "blur" }],
});

const editBasicData = async () => {
  const { data } = await editUserBasic({
    formData: basicFormData.value,
  });
  ElMessage.success(data);
  getbasicData();
};

const minZuoptions = ref<OptionType[]>([]);
const getMinzuOption = async () => {
  const { data } = await queryMinzuOption();
  minZuoptions.value = data;
};
getMinzuOption();

const resetForm = () => {
  getbasicData();
};

const submitBasicForm = async () => {
  let flog = true;
  await basicForm.value.validate((valid: any, fields: any) => {
    if (!valid) {
      flog = false;
      return false;
    }
  });
  await contactForm.value.validate((valid: any, fields: any) => {
    if (!valid) {
      flog = false;
      return false;
    }
  });
  await schoolForm.value.validate((valid: any, fields: any) => {
    if (!valid) {
      flog = false;
      return false;
    }
  });
  if (flog) {
    await editBasicData();
  }
};

const xueYuanOptions = ref<OptionType[]>([]);
const zhuanYeOptions = ref<OptionType[]>([]);
const xueYuanData = async () => {
  const { data } = await getXueYuanData();
  xueYuanOptions.value = data;
};
xueYuanData();

const zhuanyeData = async (pamams: number) => {
  const { data } = await getZhuanYeData({ Id: pamams });
  zhuanYeOptions.value = data;
  basicFormData.value.zhuanye = "";
};
</script>

<style scoped lang="scss">
.form_class {
  width: 60%;
  padding: 0 auto;
  margin: 0 auto;
}
.box-card {
  display: block;
  min-height: 88vh;
  margin-top: 8px;
  overflow: auto;
  padding-bottom: 26px;
}
</style>
