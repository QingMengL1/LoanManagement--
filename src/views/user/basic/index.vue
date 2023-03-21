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
            :rules="rulesBasicForm"
            :model="basicFormData"
            label-width="130px"
          >
            <el-row>
              <el-col :span="12">
                <el-form-item label="姓名" prop="name">
                  <el-input v-model="basicFormData.name" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="身份证号码" prop="idCard">
                  <el-input v-model="basicFormData.idCard" />
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
                    <el-option value="汉族"> 汉族</el-option>
                    <el-option value="蒙古族"> 蒙古族 </el-option>
                    <el-option value="回族"> 回族 </el-option>
                    <el-option value="藏族"> 藏族 </el-option>
                    <el-option value="维吾尔族"> 维吾尔族 </el-option>
                    <el-option value="苗族"> 苗族 </el-option>
                    <el-option value="彝族"> 彝族 </el-option>
                    <el-option value="壮族"> 壮族 </el-option>
                    <el-option value="布依族"> 布依族 </el-option>
                    <el-option value="朝鲜族"> 朝鲜族 </el-option>
                    <el-option value="满族"> 满族 </el-option>
                    <el-option value="侗族"> 侗族 </el-option>
                    <el-option value="瑶族"> 瑶族 </el-option>
                    <el-option value="白族"> 白族 </el-option>
                    <el-option value="土家族"> 土家族 </el-option>
                    <el-option value="哈尼族"> 哈尼族 </el-option>
                    <el-option value="哈萨克族"> 哈萨克族 </el-option>
                    <el-option value="傣族"> 傣族 </el-option>
                    <el-option value="黎族"> 黎族 </el-option>
                    <el-option value="傈僳族"> 傈僳族 </el-option>
                    <el-option value="佤族"> 佤族 </el-option>
                    <el-option value="畲族"> 畲族 </el-option>
                    <el-option value="高山族"> 高山族 </el-option>
                    <el-option value="拉祜族"> 拉祜族 </el-option>
                    <el-option value="水族"> 水族 </el-option>
                    <el-option value="东乡族"> 东乡族 </el-option>
                    <el-option value="纳西族"> 纳西族 </el-option>
                    <el-option value="景颇族"> 景颇族 </el-option>
                    <el-option value="柯尔克孜族"> 柯尔克孜族 </el-option>
                    <el-option value="土族"> 土族 </el-option>
                    <el-option value="达斡尔族"> 达斡尔族 </el-option>
                    <el-option value="仫佬族"> 仫佬族 </el-option>
                    <el-option value="羌族"> 羌族 </el-option>
                    <el-option value="布朗族"> 布朗族 </el-option>
                    <el-option value="撒拉族"> 撒拉族 </el-option>
                    <el-option value="毛南族"> 毛南族 </el-option>
                    <el-option value="仡佬族"> 仡佬族 </el-option>
                    <el-option value="锡伯族"> 锡伯族 </el-option>
                    <el-option value="阿昌族"> 阿昌族 </el-option>
                    <el-option value="普米族"> 普米族 </el-option>
                    <el-option value="塔吉克族"> 塔吉克族 </el-option>
                    <el-option value="怒族"> 怒族 </el-option>
                    <el-option value="乌孜别克族"> 乌孜别克族 </el-option>
                    <el-option value="俄罗斯族"> 俄罗斯族 </el-option>
                    <el-option value="鄂温克族"> 鄂温克族 </el-option>
                    <el-option value="德昂族"> 德昂族 </el-option>
                    <el-option value="保安族"> 保安族 </el-option>
                    <el-option value="裕固族"> 裕固族 </el-option>
                    <el-option value="京族"> 京族 </el-option>
                    <el-option value="独龙族"> 独龙族 </el-option>
                    <el-option value="鄂伦春族"> 鄂伦春族 </el-option>
                    <el-option value="赫哲族"> 赫哲族 </el-option>
                    <el-option value="门巴族"> 门巴族 </el-option>
                    <el-option value="珞巴族"> 珞巴族 </el-option>
                    <el-option value="基诺族"> 基诺族 </el-option>
                    <el-option value="其他"> 其他 </el-option>
                    <el-option value="外国血统中国籍人士">
                      外国血统中国籍人士
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
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="毕业中学" prop="biyezhongxue">
                  <el-select style="width: 100%"> </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="毕业中学名称" porp="biyezhongxuemingcheng">
                  <el-select style="width: 100%"> </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="资助中心" required>
              <el-row :gutter="12">
                <el-col :span="8">
                  <el-form-item prop="sheng">
                    <el-select
                      v-model="basicFormData.zizhuzhongxin.sheng"
                      placeholder="请选择"
                      style="width: 100%"
                    >
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="shi">
                    <el-select
                      v-model="basicFormData.zizhuzhongxin.shi"
                      placeholder="请选择"
                      style="width: 100%"
                    >
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="jiaoyuju">
                    <el-select
                      v-model="basicFormData.zizhuzhongxin.jiaoyuju"
                      placeholder="请选择"
                      style="width: 100%"
                    >
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="入学前户籍地址" required>
              <el-row :gutter="12">
                <el-col :span="8">
                  <el-form-item prop="sheng">
                    <el-select
                      v-model="basicFormData.huji.sheng"
                      placeholder="请选择"
                      style="width: 100%"
                    >
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="shi">
                    <el-select
                      v-model="basicFormData.huji.shi"
                      placeholder="请选择"
                      style="width: 100%"
                    >
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="xian">
                    <el-select
                      v-model="basicFormData.huji.xian"
                      placeholder="请选择"
                      style="width: 100%"
                    >
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              <el-input v-model="basicFormData.huji.detailed" type="textarea">
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="contact_form" style="margin-top: 26px">
          <p style="margin-bottom: 16px">通讯信息</p>
          <el-form
            ref="contactForm"
            :rules="rulesContactForm"
            :model="contactFormData"
            label-width="130px"
          >
            <el-row>
              <el-col :span="12">
                <el-form-item label="手机" prop="phone">
                  <el-input v-model="contactFormData.phone"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="邮政编码">
                  <el-input v-model="contactFormData.youbian"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="电子邮件" prop="email">
                  <el-input v-model="contactFormData.email"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="QQ" prop="qq">
                  <el-input v-model="contactFormData.qq"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="微信">
                  <el-input v-model="contactFormData.wechat"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="通信地址">
              <el-input
                v-model="contactFormData.contactAddress"
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
            :rules="rulesSchoolForm"
            :model="schoolFormData"
            label-width="130px"
          >
            <el-row>
              <el-col :span="12">
                <el-form-item label="高校名称" prop="name">
                  <el-input v-model="schoolFormData.name"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="院系名称" prop="college">
                  <el-input v-model="schoolFormData.college"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="专业名称" prop="major">
                  <el-input v-model="schoolFormData.major"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="学历" prop="xueli">
                  <el-select v-model="schoolFormData.xueli" style="width: 100%">
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="入学年份" prop="year">
                  <el-select v-model="schoolFormData.year" style="width: 100%">
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="学号" prop="studentId">
                  <el-input
                    v-model="schoolFormData.studentId"
                    style="width: 100%"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="专业类别" prop="type">
                  <el-select v-model="schoolFormData.type" style="width: 100%">
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="学制" prop="years">
                  <el-select v-model="schoolFormData.years" style="width: 100%">
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="毕业时间" prop="graduate">
                  <el-date-picker
                    v-model="schoolFormData.graduate"
                    style="width: 100%"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div style="margin-top: 16px; text-align: right">
          <el-button type="primary" style="width: 100px">提交修改</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { FormInstance, FormRules } from "element-plus";
import { reactive, ref } from "vue";

const basicForm = ref<FormInstance>();
const contactForm = ref<FormInstance>();
const schoolForm = ref<FormInstance>();

const basicFormData = reactive({
  name: "",
  idCard: "",
  guoji: "",
  idCardType: "",
  hukouxingzhi: "",
  minzu: "",
  xingbie: "",
  hunyinzhuangkuang: "",
  zhiye: "",
  idCardQishi: "",
  idCardJieshu: "",
  biyezhongxue: "",
  biyezhongxuemingcheng: "",
  zizhuzhongxin: {
    sheng: "",
    shi: "",
    jiaoyuju: "",
  },
  huji: {
    sheng: "",
    shi: "",
    xian: "",
    detailed: "",
  },
});

const rulesBasicForm = reactive<FormRules>({
  name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
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
  biyezhongxue: [{ required: true, message: "请输入手机号", trigger: "blur" }],
  biyezhongxuemingcheng: [
    { required: true, message: "请输入手机号", trigger: "blur" },
  ],
  idCardQishi: [
    { required: true, message: "请选择身份证有效起始日期", trigger: "change" },
  ],
  idCardJieshu: [
    { required: true, message: "请选择身份证有效结束日期", trigger: "change" },
  ],
  sheng: [{ required: true, message: "请选择省", trigger: "change" }],
  shi: [{ required: true, message: "请选择市", trigger: "change" }],
  xian: [{ required: true, message: "请选择县", trigger: "change" }],
});

const contactFormData = reactive({
  phone: "",
  youbian: "",
  email: "",
  qq: "",
  wechat: "",
  contactAddress: "",
});

const rulesContactForm = reactive<FormRules>({
  phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
  email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
  qq: [{ required: true, message: "请输入qq", trigger: "blur" }],
});

const schoolFormData = reactive({
  name: "",
  college: "",
  major: "",
  xueli: "",
  year: "",
  studentId: "",
  type: "",
  years: "",
  graduate: "",
});

const rulesSchoolForm = reactive<FormRules>({
  name: [{ required: true, message: "请输入学校名称", trigger: "blur" }],
  college: [{ required: true, message: "请输入学院名称", trigger: "blur" }],
  major: [{ required: true, message: "请输入专业名称", trigger: "blur" }],
  xueli: [{ required: true, message: "请选择学历", trigger: "change" }],
  year: [{ required: true, message: "请选择入学年份", trigger: "change" }],
  studentId: [{ required: true, message: "请输入学号", trigger: "blur" }],
  type: [{ required: true, message: "请选择专业类型", trigger: "change" }],
  years: [{ required: true, message: "请选择学制", trigger: "change" }],
  graduate: [{ required: true, message: "请选择毕业时间", trigger: "change" }],
});
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
