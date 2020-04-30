<template>
  <el-card class="box-card mg-10" :body-style="{ padding: '10px' }">
    <div class="header">
      <div class="title">{{ title }}</div>
      <collapse-open>
        <el-form
          :inline="true"
          :model="formInline"
          ref="ruleForm"
          class="demo-form-inline"
          label-position="top"
          :position-error-field="false"
        >
          <el-row :gutter="20">
            <el-col :span="6" v-if="addrCode === 'HQ'">
              <el-form-item label="省份" prop="PROVINCE_CODE">
                <el-select
                  v-model="formInline.PROVINCE_CODE"
                  placeholder="选择省份"
                >
                  <el-option
                    v-for="item of selectValueData.data.ADDR_CODE"
                    :key="item.value"
                    :label="item.value"
                    :value="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6" v-else>
              <el-form-item label="省份" prop="PROVINCE_CODE">
                <el-select
                  v-model="formInline.PROVINCE_CODE"
                  placeholder="选择省份"
                  disabled
                >
                  <el-option
                    v-for="item of selectValueData.data.ADDR_CODE"
                    :key="item.value"
                    :label="item.value"
                    :value="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                prop="COUNT_DATE"
                :label="timeRange"
                :rules="[{ required: true, message: '日期范围不能为空' }]"
              >
                <el-date-picker
                  class="date"
                  v-model="formInline.COUNT_DATE"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker> </el-form-item
            ></el-col>
          </el-row>
        </el-form>
      </collapse-open>
    </div>
  </el-card>
</template>
<script>
import collapseOpen from "./collapse-open";

export default {
  name: "headerCard",
  components: {
    collapseOpen
  },
  props: {
    addrCode: {
      type: String
    },
    formInline: {
      type: Object,
      required: true,
      default() {
        return {};
      }
    },
    selectValueData: {
      type: Object,
      required: true,
      default() {
        return { data: [] };
      }
    },
    timeRange: {
      type: String
    },
    title: {
      type: String
    }
  }
};
</script>
<style lang="scss" scoped>
.header {
  .title {
    font-size: 16px;
    font-weight: 600;
    color: #6f7e95;
    padding-bottom: 10px;
  }
}
</style>
