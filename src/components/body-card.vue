<template>
  <el-card class="box-card mg-10" :body-style="{ padding: '10px' }">
    <div slot="header" class="clearfix">
      <span>查询结果</span>
      <span class="submitExportButton">
        <el-button
          @click.prevent="submitForm('ruleForm')"
          type="primary"
          size="mini"
          class="submitButton"
          >查询</el-button
        >
        <el-icon
          name="export"
          @click.prevent="handleExport('ruleForm')"
          v-loading="getExportLoading"
          class="export"
        ></el-icon>
      </span>
    </div>
    <div class="body">
      <drill-table
        :tableHeader="tableHeader"
        :tableData="tableData"
        :getTableDataLoading="getTableDataLoading"
        :pageNum="pageNum"
        :pageSize="pageSize"
      ></drill-table>
      <el-pagination
        :current-page="tableData.data.pageNum"
        :page-size="tableData.data.pageSize"
        :total="tableData.data.total"
        :page-count="tableData.data.pages"
        :page-sizes="[15, 30, 50]"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        style="width: 100%"
      >
      </el-pagination>
    </div>
  </el-card>
</template>

<script>
import drillTable from "./element-table";

export default {
  name: "provincialLogisticsReport",
  components: {
    drillTable
  },
  props: {
    pageNum: {
      type: Number
    },
    pageSize: {
      type: Number
    },
    tableHeader: {
      type: Object,
      required: true,
      default() {
        return { data: [] };
      }
    },
    tableData: {
      type: Object,
      required: true,
      default() {
        return { data: { list: [] } };
      }
    },
    getExportLoading: {
      type: Boolean
    },
    getTableDataLoading: {
      type: Boolean
    }
  },
  methods: {
    submitForm(ruleForm) {
      this.$emit("submitForm", ruleForm);
    },
    handleExport(ruleForm) {
      this.$emit("handleExport", ruleForm);
    },
    handleSizeChange(val) {
      this.$emit("handleSizeChange", val);
    },
    handleCurrentChange(val) {
      this.$emit("handleCurrentChange", val);
    }
  }
};
</script>

<style lang="scss" scoped>
.submitExportButton {
  float: right;
  .submitButton {
    margin-right: 15px;
  }
}
</style>
