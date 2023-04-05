<template>
  <div>
    <el-descriptions title="贷款信息" :column="2">
      <el-descriptions-item label="姓名">
        {{ recordData.username }}
      </el-descriptions-item>
      <el-descriptions-item label="申请学年">
        {{ recordData.academicYear }}
      </el-descriptions-item>
      <el-descriptions-item label="贷款金额">
        {{ recordData.amount }} 元
      </el-descriptions-item>
      <el-descriptions-item label="贷款年限">
        {{ recordData.year }} 年
      </el-descriptions-item>
      <el-descriptions-item label="申请原因">
        <span v-if="recordData.cause === '其他'">
          {{ recordData.causeValue }}
        </span>
        <span v-else>
          {{ recordData.cause }}
        </span>
      </el-descriptions-item>
    </el-descriptions>
    <el-descriptions title="共同借款人信息" :column="2">
      <el-descriptions-item label="姓名">
        {{ recordData.commonName }}
      </el-descriptions-item>
      <el-descriptions-item label="身份证号">
        {{ recordData.idCard }}
      </el-descriptions-item>
      <el-descriptions-item label="关系">
        {{ recordData.relation }}
      </el-descriptions-item>
      <el-descriptions-item label="联系电话">
        {{ recordData.phone }}
      </el-descriptions-item>
      <el-descriptions-item label="国籍">
        {{ recordData.guoji }}
      </el-descriptions-item>
      <el-descriptions-item label="身份证类型">
        {{ recordData.idCardType }}
      </el-descriptions-item>
      <el-descriptions-item label="户口性质">
        {{ recordData.hukouxingzhi }}
      </el-descriptions-item>
      <el-descriptions-item label="民族">
        {{ recordData.minzu }}
      </el-descriptions-item>
      <el-descriptions-item label="性别">
        {{ recordData.xingbie }}
      </el-descriptions-item>
      <el-descriptions-item label="婚姻状况">
        {{ recordData.hunyinzhuangkuang }}
      </el-descriptions-item>
      <el-descriptions-item label="职业" :span="2">
        {{ recordData.zhiye }}
      </el-descriptions-item>
      <el-descriptions-item label="家庭电话">
        {{ recordData.jiatingdianhua }}
      </el-descriptions-item>
      <el-descriptions-item label="邮编">
        {{ recordData.youbian }}
      </el-descriptions-item>
      <el-descriptions-item label="身份证有效期起始日">
        {{ timeFormat(recordData.idCardQishi) }}
      </el-descriptions-item>
      <el-descriptions-item label="身份证有效期结束日">
        {{ recordData.idCardJieshu }}
      </el-descriptions-item>
      <el-descriptions-item label="健康状况" :span="2">
        {{ recordData.jiankangzhuangkuang }}
      </el-descriptions-item>
      <el-descriptions-item label="户籍地址" :span="2">
        {{ recordData.hujiSheng }}
        {{ recordData.hujiShi }} {{ recordData.hujiXian }}
        {{ recordData.hujiDetailed }}
      </el-descriptions-item>
      <el-descriptions-item label="家庭地址" :span="2">
        {{ recordData.jiatingSheng }}
        {{ recordData.jiatingShi }} {{ recordData.jiatingXian }}
        {{ recordData.jiatingDetailed }}
      </el-descriptions-item>
    </el-descriptions>
    <el-descriptions title="申请信息" :column="1">
      <el-descriptions-item label="贷款编号">
        {{ recordData.number }}
      </el-descriptions-item>
      <el-descriptions-item label="提交时间">
        {{ hourFormat(recordData.tijiaoTime) }}
      </el-descriptions-item>
      <el-descriptions-item label="贷款状态">
        {{ recordData.status }}
      </el-descriptions-item>
      <el-descriptions-item label="到期时间">
        {{ hourFormat(recordData.endTime) }}
      </el-descriptions-item>
      <el-descriptions-item label="申请材料">
        <el-button
          link
          :disabled="recordData.fileName === '无'"
          type="primary"
          @click="
            download({ Id: recordData.fileId, fileName: recordData.fileName })
          "
        >
          {{ recordData.fileName }}
        </el-button>
      </el-descriptions-item>
      <el-descriptions-item label="备注">
        {{ recordData.refuse }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script setup lang="ts">
import { timeFormat, hourFormat } from "@/utils/timeformat";
import { downloadAxios, downloadType } from "@/api/system";

const props = defineProps(["recordData"]);
const { recordData } = props;

const download = async (params: downloadType) => {
  await downloadAxios(params);
};
</script>

<style scoped></style>
