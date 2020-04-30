<template>
  <div class="collapse">
    <el-collapse v-model="showHideActiveNames">
      <el-collapse-item name="open" class="collapseOpen">
        <template slot="title">
          <span class="title">查询条件</span>
          <span class="icon-showHide">{{
            showHideActiveNames[0] === "open" ? "收起" : "展开"
          }}</span>
        </template>
        <slot></slot>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
export default {
  name: "collapse",
  data() {
    return {
      showHideActiveNames: ["open"]
    };
  }
};
</script>
<style lang="scss" scoped>
.collapse {
  .collapseOpen {
    .title {
      font-size: 14px;
      color: #6f7e95;
      font-weight: 600;
    }
    position: relative;
    .icon-showHide {
      position: absolute;
      right: 2%;
    }
    /deep/ .el-collapse-item__wrap {
      border-bottom: 0px solid #fff;
      /deep/ .el-collapse-item__content {
        padding-bottom: 0px;
      }
    }
    /deep/ .demo-form-inline {
      .el-row {
        margin-left: 5px !important;
        margin-right: 5px !important;
      }
      .el-col {
        padding-left: 15px !important;
        padding-right: 15px !important;
      }
      .button {
        text-align: center;
      }
      /deep/ .el-autocomplete {
        width: 178.33px;
      }
    }
  }
}
</style>
