<template>
  <div class="tagArea">
    <div
      class="tagItem"
      v-for="(item, key) in tagList"
      :key="key"
      v-if="isArray(item.value)"
    >
      <span>{{ item.title }}：</span>
      <span v-for="child of item.value" :key="child">
        <span>{{ child }}</span>
        <i
          @click="closeItem(child, key)"
          name="close"
          class="el-icon-close"
          content="关闭"
        ></i>
        <span> | </span>
      </span>
    </div>
    <div
      class="tagItem"
      v-for="(item, key) in tagList"
      :key="key"
      v-if="!isArray(item.value)"
    >
      <span>{{ item.title }}：</span>
      <span>{{ item.value }} </span>
      <i
        @click="closeItem(item, key)"
        name="close"
        class="el-icon-close"
        content="关闭"
      ></i>
    </div>
  </div>
</template>

<script>
import _format from "../../common/common";
export default {
  name: "ConditionFilter",
  props: {
    form: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      list: {}
    };
  },
  computed: {
    tagList() {
      for (let key in this.form) {
        if (!_format.isEmpty(this.form[key])) {
          const childrenValue = this.$parent.$children;
          this.list[key] = {
            title: _format.getFormItemLabelName(key, childrenValue),
            value: _format.getFormItemValue(key, childrenValue)
          };
        } else {
          delete this.list[key];
        }
      }
      return this.list;
    }
  },
  methods: {
    closeItem(sourceItem, sourceKey) {
      console.log(sourceItem, sourceKey);
      // this.$emit("closeItem", sourceItem, sourceKey);
    },
    isArray(val) {
      console.log(val);

      return Object.prototype.toString.call(val) === "[object Array]"
        ? true
        : false;
    }
  }
};
/*
大家好，我是 Web 前端开发工程师，罗鹏飞。拥有6年的开发工作经验，在 IBM 工作有5年时间。

在 IBM 欧美内部项目，使用 ECM，V18，Bootstrap等技术开发公司的私有云、公有云、混合云的产品页面
在 IBM 华为项目，使用 React、Ant-Design开发部门的后台管理界面，可以方便运维人员可视化的查看页面性能方面的数据情况
在 IBM 移动项目，使用 Vue、SCM-UI、eChart等技术开发报表页面，并且会开发一些新的组件，以满足现有框架无法满足的功能

所掌握的技术栈主要有：Vue / Vuex / React / Element-UI / Ant-Design / ES6 / Sass / 微信小程序等技术
*/
</script>
<style lang="scss" scoped>
.tagArea {
  display: inline-block;
  .tagItem {
    display: inline-block;
    min-height: 25px;
    line-height: 25px;
    border: 1px solid #d0d0d0;
    padding-left: 10px;
    padding-right: 10px;
    margin-right: 10px;
    margin-bottom: 5px;
    .el-icon-close {
      margin-left: 5px;
      color: #a9a9a9;
      cursor: pointer;
      z-index: 10;
    }
  }
  & .tagItem:last-child {
    margin-right: 0;
  }
}
</style>
