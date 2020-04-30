<template>
  <div class="B-page">
    <headerCard
      :formInline="formInline"
      :selectValueData="selectValueData"
      :addrCode="addrCode"
      :timeRange="timeRange"
      :title="title"
      ref="headerCard"
    ></headerCard>
    <bodyCard
      :tableHeader="tableHeader"
      :tableData="tableData"
      :pageNum="pageNum"
      :pageSize="pageSize"
      :getExportLoadin="getExportLoading"
      :getTableDataLoading="getTableDataLoading"
      @submitForm="submitForm"
      @handleExport="handleExport"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    ></bodyCard>
    <el-dialog
      title="提示"
      :visible.sync="InfoDialogVisible"
      width="50%"
      center
    >
      <h4 style="text-align:center">
        所选日期范围包含时间节点（2020年04月01日），请重新选择日期范围。
      </h4>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from "vuex";
import headerCard from "../components/header-card";
import bodyCard from "../components/body-card";

const FETCH_TABLEHEADER_ACTION =
  "report/provincialLogisticsReport/fetchTableHeaderData";
const FETCH_TABLEDATA_ACTION =
  "report/provincialLogisticsReport/fetchTableData";
const FETCH_EXPORT_ACTION = "report/provincialLogisticsReport/fetchExport";
const FETCH_ADDRCODE_ACTION = "report/provincialLogisticsReport/fetchAddrCode";

export default {
  name: "provincialLogisticsReport",
  components: {
    headerCard,
    bodyCard
  },
  data() {
    return {
      title: "",
      addrCode: "",
      reportId: [],
      reportType: [],
      repoertIndex: 0, // 0: 旧数据，1：新数据
      formInline: {
        reportType: "",
        COUNT_DATE: [], // 创建日期范围
        PROVINCE_CODE: "ALL" // 省份
      },
      selectValueData: {
        data: []
      },
      tableHeader: {
        data: []
      },
      tableData: {
        data: {
          list: []
        }
      },
      pageNum: 1,
      pageSize: 15,
      InfoDialogVisible: false,
      formInlineTimeName: ""
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getInfo();
    },
    // 获取基本信息，例如 title，reportId，reportType，addrCode
    getInfo() {
      this.title = this.$route.meta.title;
      this.reportId = this.$route.meta.reportId;
      this.reportType = this.$route.meta.reportType;
      this.addrCode = this.$store.getters["systemConfig/user"].addrCode; // 获取用户的addrCode
      if (this.addrCode === "HQ") {
        this.formInline.PROVINCE_CODE = "ALL";
      } else {
        this.formInline.PROVINCE_CODE = this.addrCode;
      }
      const payload = {
        reportId: this.reportId[this.repoertIndex],
        addrCode: this.addrCode
      };
      this.postSelectValueData(payload);
    },
    // 更改分页器的每页显示多少条数据
    handleSizeChange(val) {
      this.pageSize = val;
      this.handleTableDataClick();
    },
    // 更改分页器显示当前是第几页
    handleCurrentChange(val) {
      this.pageNum = val;
      this.handleTableDataClick();
    },
    // 点击导出按钮，将开始导出Excel
    handleExport(ruleForm) {
      this.formInline.reportType = this.reportType[this.repoertIndex];
      const payload = {
        reportId: this.reportId[this.repoertIndex],
        queryMap: this.formInline
      };
      this.$refs.headerCard.$refs[ruleForm].validate(valid => {
        if (valid) {
          this.postExportExcel(payload); // 导出 Excel，执行 Vuex 的 dispatch，执行 actions 中的fetchExport 函数
        } else {
          return false;
        }
        return false;
      });
    },
    submitForm(ruleForm) {
      this.$refs.headerCard.$refs[ruleForm].validate(valid => {
        if (valid) {
          this.handleTableDataClick();
        } else {
          return false;
        }
        return false;
      });
    },
    // 开始获取表格的数据
    handleTableDataClick() {
      // 获取表格数据，执行 Vuex 的 dispatch，执行 actions 中的 fetchTableData 函数
      const payload = {
        reportId: this.reportId[this.repoertIndex],
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        queryMap: this.formInline
      };
      this.postTableData(payload);
      this.postTableHeader(this.reportId[this.repoertIndex]);
      return false;
    },
    // 执行 actions 中的 fetchTableHeader 函数
    postTableHeader(ReportId) {
      this.$store.dispatch(FETCH_TABLEHEADER_ACTION, ReportId);
    },
    // 执行 actions 中的 fetchTableData 函数
    postTableData(payload) {
      this.$store.dispatch(FETCH_TABLEDATA_ACTION, payload);
    },
    // 执行 actions 中的 fetchExport 函数
    postExportExcel(payload) {
      this.$store.dispatch(FETCH_EXPORT_ACTION, payload);
    },
    postSelectValueData(payload) {
      this.$store.dispatch(FETCH_ADDRCODE_ACTION, payload);
    }
  },
  computed: {
    // 获取 Vuex 中 state 的数据
    // ...mapState({
    //   tableHeaderFromVuex: state =>
    //     state.report.provincialLogisticsReport.tableHeaderData, // 获取表头信息
    //   tableDataFromVuex: state =>
    //     state.report.provincialLogisticsReport.tableData, // 获取表格数据
    //   getTableDataLoading: state =>
    //     state.loading.actions[FETCH_TABLEDATA_ACTION], // table 表格loading动画
    //   SelectValueDataFromVuex: state =>
    //     state.report.provincialLogisticsReport.addrCode, // 获取省份下拉框信息
    //   getExportLoading: state => state.loading.actions[FETCH_EXPORT_ACTION] // 导出按钮loading动画
    // }),
    // 根据 title 动态改变 label 名称
    timeRange() {
      let timeRangeName = "";
      if (this.title === "省物流入库明细表") {
        timeRangeName = "入库日期范围";
      } else if (this.title === "省物流出库明细表") {
        timeRangeName = "出库日期范围";
      } else if (this.title === "省物流库存明细表") {
        timeRangeName = "出库日期范围";
      } else {
        timeRangeName = "日期范围";
      }
      return timeRangeName;
    }
  },
  watch: {
    // 监测表头信息，将数据存储在 tableHeader
    tableHeaderFromVuex(newval) {
      if (newval.message === "操作成功") {
        this.tableHeader.data = newval.data;
      }
    },
    // 监测表格数据，将数据存储在 tableData，并取消表格等待动画和解除导出按钮禁用功能
    tableDataFromVuex(newval) {
      if (newval.message === "操作成功") {
        this.tableData.data = newval.data;
      }
    },
    SelectValueDataFromVuex(newVal) {
      if (newVal.message === "操作成功") {
        this.selectValueData.data = newVal.data;
      }
    },
    // 监测路由的变化，如果路径变化，开始重新获取筛选框和下拉数据
    $route(val, old) {
      if (val.path !== old.path) {
        this.init();
      }
    },
    "formInline.COUNT_DATE": {
      handler() {
        // 假设时间节点是时间戳：1585670400
        if (this.formInline.COUNT_DATE) {
          const limtTime = 1585670400;
          const statrTime =
            new Date(this.formInline.COUNT_DATE[0]).getTime() / 1000;
          const endTime =
            new Date(this.formInline.COUNT_DATE[1]).getTime() / 1000;
          if (limtTime < endTime && limtTime > statrTime) {
            // 如果时间节点在时间范围之内，弹框警告
            this.InfoDialogVisible = true;
            this.formInline.COUNT_DATE = [];
            return false;
          }
          if (limtTime > endTime) {
            // 如果时间节点大于时间范围结束时间，发送旧 reportID
            this.repoertIndex = 0;
          }
          if (limtTime < statrTime) {
            // 如果时间节点小于时间范围开始时间，发送新 reportID
            this.repoertIndex = 1;
          }
        }
        return false;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.B-page {
  width: 80%;
  height: 400px;
  background-color: black;
  .mg-10 {
    margin-top: 10px;
  }
}
</style>
