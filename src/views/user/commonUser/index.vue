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
        <el-col :span="3" v-for="item in commonList">
          <el-card
            style="height: 200px; margin-top: 16px"
            shadow="hover"
            @click="editUserMessage(item)"
          >
            <div style="width: 100%; text-align: center; height: 100px">
              <i-ep-UserFilled
                style="width: 50px; height: 50px; margin-top: 25px"
              >
              </i-ep-UserFilled>
            </div>
            <div style="height: 100px">
              <span style="display: block"
                >姓名：<span>{{ item.commonName }}</span></span
              >
              <span style="display: block; margin-top: 16px"
                >关系：<span>{{ item.relation }}</span></span
              >
            </div>
          </el-card>
        </el-col>
        <el-col :span="3">
          <el-card
            style="height: 200px; margin-top: 16px"
            shadow="hover"
            @click="addCommonUser"
          >
            <i-ep-Plus
              style="
                display: block;
                width: 50%;
                height: 100px;
                margin: auto;
                margin-top: 25px;
              "
            >
            </i-ep-Plus>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
    <el-dialog
      v-model="userMessageVisible"
      @close="commonForm = getCommonForm()"
    >
      <el-form
        ref="commonFormRef"
        :rules="rulesCommonForm"
        :model="commonForm"
        label-width="130px"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名" prop="commonName">
              <el-input v-model="commonForm.commonName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="关系" prop="relation">
              <el-select
                v-model="commonForm.relation"
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
              <el-input v-model="commonForm.idCard" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机" prop="phone">
              <el-input v-model="commonForm.phone" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="国籍" prop="guoji">
              <el-select
                v-model="commonForm.guoji"
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
                v-model="commonForm.idCardType"
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
                v-model="commonForm.hukouxingzhi"
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
                v-model="commonForm.minzu"
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
              <el-radio-group v-model="commonForm.xingbie">
                <el-radio label="男" value="男" />
                <el-radio label="女" value="女" />
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="婚姻状况" prop="hunyinzhuangkuang">
              <el-select
                v-model="commonForm.hunyinzhuangkuang"
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
                v-model="commonForm.zhiye"
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
        <el-row>
          <el-col :span="12">
            <el-form-item label="家庭电话" prop="jiatingdianhua">
              <el-input v-model="commonForm.jiatingdianhua" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮编" prop="youbian">
              <el-input v-model="commonForm.youbian" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="身份证起始日期" prop="idCardQishi">
              <el-date-picker
                v-model="commonForm.idCardQishi"
                type="date"
                placeholder="请选择日期"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="身份证结束日期" prop="idCardJieshu">
              <el-date-picker
                v-model="commonForm.idCardJieshu"
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
              <el-radio-group v-model="commonForm.jiankangzhuangkuang">
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
                  v-model="commonForm.hujiSheng"
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
                  v-model="commonForm.hujiShi"
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
                  v-model="commonForm.hujiXian"
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
          <el-input v-model="commonForm.hujiDetailed" type="textarea">
          </el-input>
        </el-form-item>
        <el-form-item label="家庭地址" :required="true">
          <el-row :gutter="12">
            <el-col :span="8">
              <el-form-item prop="jiatingSheng">
                <el-select
                  v-model="commonForm.jiatingSheng"
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
                  v-model="commonForm.jiatingShi"
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
                  v-model="commonForm.jiatingXian"
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
          <el-input v-model="commonForm.jiatingDetailed" type="textarea">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitCommonUser(commonFormRef)">
            提交修改
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {
  OptionType,
  queryMinzuOption,
  queryShengOption,
  queryShiOption,
  queryXianOption,
} from "@/api/system";
import { nameTest, idCardTest, phoneTest, youbianTest } from "@/utils/tegTest";
import { ElMessage, FormInstance, FormRules } from "element-plus";
import { reactive, ref } from "vue";
import { subCommonUser, getCommonData, conmmonDataType } from "@/api/user";

const userMessageVisible = ref(false);
const foreverIdcard = ref(false);
const foreverIdcardChange = (value: boolean) => {
  if (value) {
    commonForm.value.idCardJieshu = "永久";
  } else {
    commonForm.value.idCardJieshu = "";
  }
};

const getCommonForm = () => {
  return {
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
  };
};
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
const commonFormRef = ref();
const commonForm = ref(getCommonForm());

const rulesCommonForm = reactive<FormRules>({
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
          if (!commonForm.value.hujiSheng) {
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
          if (!commonForm.value.hujiShi) {
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
          if (!commonForm.value.hujiXian) {
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
          if (!commonForm.value.jiatingSheng) {
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
          if (!commonForm.value.jiatingShi) {
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
          if (!commonForm.value.jiatingXian) {
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
          if (!commonForm.value.hujiDetailed) {
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
          if (!commonForm.value.jiatingDetailed) {
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
const huJiShengOptions = ref<OptionType[]>([]);
const huJiShiOptions = ref<OptionType[]>([]);
const huJiXianOptions = ref<OptionType[]>([]);

const jiaTingShengOptions = ref<OptionType[]>([]);
const jiaTingShiOptions = ref<OptionType[]>([]);
const jiaTingXianOptions = ref<OptionType[]>([]);

const commonList = ref<conmmonDataType[]>([]);
// 获取所有用户信息
const queryCommonData = async () => {
  const { data } = await getCommonData();
  commonList.value = data;
};
queryCommonData();

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
  commonForm.value.hujiShi = null;
  commonForm.value.hujiXian = null;
};
const jiaTingShengOptionChange = async (shengId: number) => {
  const { data } = await queryShiOption({ pcodeId: shengId });
  jiaTingShiOptions.value = data;
  commonForm.value.jiatingShi = null;
  commonForm.value.jiatingXian = null;
};
// 县级菜单
const hujiShiOptionChange = async (shiId: number) => {
  const { data } = await queryXianOption({ pcodeId: shiId });
  huJiXianOptions.value = data;
  commonForm.value.hujiXian = null;
};
const jiaTingShiOptionChange = async (shiId: number) => {
  const { data } = await queryXianOption({ pcodeId: shiId });
  jiaTingXianOptions.value = data;
  commonForm.value.jiatingXian = null;
};

const minZuoptions = ref<OptionType[]>([]);
const getMinzuOption = async () => {
  const { data } = await queryMinzuOption();
  minZuoptions.value = data;
};
getMinzuOption();

const editUserMessage = async (record: any) => {
  //
  console.log(record);
  await huJiShengOptionChange(record.hujiSheng);
  await hujiShiOptionChange(record.hujiShi);
  await jiaTingShengOptionChange(record.jiatingSheng);
  await jiaTingShiOptionChange(record.jiatingShi);
  commonForm.value = record;

  if (record.idCardJieshu === "永久") {
    foreverIdcard.value = true;
  } else {
    foreverIdcard.value = false;
  }
  userMessageVisible.value = true;
};

const submitCommonUser = async (formEl: any) => {
  let flog = true;
  await formEl.validate((valid: any, fields: any) => {
    if (!valid) {
      flog = false;
      return false;
    }
  });
  if (flog) {
    try {
      const { data } = await subCommonUser(commonForm.value);
      if (data === "提交成功") {
        ElMessage.success(data);
        commonForm.value = getCommonForm();
        userMessageVisible.value = false;
        queryCommonData();
      } else {
        ElMessage.error(data);
      }
    } catch (e: any) {
      ElMessage.error(e);
    }
  }
};
const addCommonUser = () => {
  commonForm.value = getCommonForm();
  foreverIdcard.value = false;
  huJiShiOptions.value = [];
  huJiXianOptions.value = [];
  jiaTingShiOptions.value = [];
  jiaTingXianOptions.value = [];
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
