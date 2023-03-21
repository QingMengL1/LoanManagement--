<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">
        <i-ep-menu />
      </el-breadcrumb-item>
      <el-breadcrumb-item> 我的信息 </el-breadcrumb-item>
      <el-breadcrumb-item> 共同借款人信息 </el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="12">
        <el-col :span="3">
          <el-card
            style="height: 200px"
            shadow="hover"
            @click="editUserMessage()"
          >
            <div style="width: 100%; text-align: center; height: 100px">
              <i-ep-UserFilled
                style="width: 50px; height: 50px; margin-top: 25px"
              >
              </i-ep-UserFilled>
            </div>
            <div style="height: 100px">
              <span style="height: 50px; display: inline-block">姓名：</span>
              <span style="height: 50px; display: inline-block">关系：</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
    <el-dialog v-model="userMessageVisible">
      <el-form
        ref="userForm"
        :rules="rulesUserForm"
        :model="userFormData"
        label-width="130px"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="userFormData.name" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身份证号码" prop="idCard">
              <el-input v-model="userFormData.idCard" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="身份证起始日期" prop="idCardQishi">
              <el-date-picker
                v-model="userFormData.idCardQishi"
                type="date"
                placeholder="请选择日期"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身份证结束日期" prop="idCardJieshu">
              <el-date-picker
                v-model="userFormData.idCardJieshu"
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
                v-model="userFormData.guoji"
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
                v-model="userFormData.idCardType"
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
                v-model="userFormData.hukouxingzhi"
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
                v-model="userFormData.minzu"
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
              <el-radio-group v-model="userFormData.xingbie">
                <el-radio label="男" value="男" />
                <el-radio label="女" value="女" />
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="婚姻状况" prop="hunyinzhuangkuang">
              <el-select
                v-model="userFormData.hunyinzhuangkuang"
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
                v-model="userFormData.zhiye"
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
                <el-option value="卫生专业技术人员">卫生专业技术人员</el-option>
                <el-option value="经济金融业务人员">经济金融业务人员</el-option>
                <el-option value="法律、社会和宗教专业人员"
                  >法律、社会和宗教专业人员</el-option
                >
                <el-option value="教学人员">教学人员</el-option>
                <el-option value="文学艺术工作人员">文学艺术工作人员</el-option>
                <el-option value="体育工作人员">体育工作人员</el-option>
                <el-option value="新闻出版、文化工作人员"
                  >新闻出版、文化工作人员</el-option
                >
                <el-option value="其他专业技术人员">其他专业技术人员</el-option>
                <el-option value="安全和消防人员">安全和消防人员</el-option>
                <el-option value="邮政和电信业务人员"
                  >邮政和电信业务人员</el-option
                >
                <el-option value="建筑施工人员">建筑施工人员</el-option>
                <el-option value="其他办事人员和有关人员"
                  >其他办事人员和有关人员</el-option
                >
                <el-option value="商业、服务业人员">商业、服务业人员</el-option>
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
        <el-form-item label="户籍地址" required>
          <el-row :gutter="12">
            <el-col :span="8">
              <el-form-item prop="sheng">
                <el-select
                  v-model="userFormData.huji.sheng"
                  placeholder="请选择"
                  style="width: 100%"
                >
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="shi">
                <el-select
                  v-model="userFormData.huji.shi"
                  placeholder="请选择"
                  style="width: 100%"
                >
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="xian">
                <el-select
                  v-model="userFormData.huji.xian"
                  placeholder="请选择"
                  style="width: 100%"
                >
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-input v-model="userFormData.huji.detailed" type="textarea">
          </el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="邮政编码" prop="youbian">
              <el-input v-model="userFormData.youbian"> </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="userFormData.phone"> </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="身体健康状况" prop="jiankangzhuangkuang">
              <el-radio-group v-model="userFormData.jiankangzhuangkuang">
                <el-radio label="健康" value="健康" />
                <el-radio label="患病" value="患病" />
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { FormInstance, FormRules } from "element-plus";
import { reactive, ref } from "vue";

const userForm = ref<FormInstance>();
const userMessageVisible = ref(false);
const userFormData = reactive({
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
  huji: {
    sheng: "",
    shi: "",
    xian: "",
    detailed: "",
  },
  youbian: "",
  phone: "",
  jiankangzhuangkuang: "",
});

const rulesUserForm = reactive<FormRules>({
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

  idCardQishi: [
    { required: true, message: "请选择身份证有效起始日期", trigger: "change" },
  ],
  idCardJieshu: [
    { required: true, message: "请选择身份证有效结束日期", trigger: "change" },
  ],
  sheng: [{ required: true, message: "请选择省", trigger: "change" }],
  shi: [{ required: true, message: "请选择市", trigger: "change" }],
  xian: [{ required: true, message: "请选择县", trigger: "change" }],
  youbian: [{ required: true, message: "请输入邮政编码", trigger: "blur" }],
  jiankangzhuangkuang: [
    { required: true, message: "请选择县", trigger: "change" },
  ],
});

const editUserMessage = () => {
  //
  userMessageVisible.value = true;
};
</script>

<style scoped lang="scss">
.box-card {
  display: block;
  min-height: 88vh;
  margin-top: 8px;
  overflow: auto;
  padding-bottom: 26px;
}
</style>
