<template>
  <div class="tagArea">
    <div class="tagItem" v-for="(item, key) in tagList" :key="key">
      <span>{{ item.title }}：</span>
      <span>{{ item.value }}</span>
      <i
        @click="closeItem(item, key)"
        name="close"
        class="el-icon-close"
        content="关闭"
      ></i>
    </div>
  </div>
  <!-- <span v-for="item in tagList">{{ item.title }}|{{ item.value }}</span> -->
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
        if (!this.isEmpty(this.form[key])) {
          this.getFormItemLabelName(key);
          this.list[key] = {
            title: this.getFormItemLabelName(key),
            value: this.getFormItemValue(key)
          };
        } else {
          delete this.list[key];
        }
      }
      return this.list;
    }
  },
  methods: {
    isEmpty(obj) {
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      // 本身为空直接返回true
      if (obj == null) return true;
      // 然后可以根据长度判断，在低版本的ie浏览器中无法这样判断。
      if (obj.length > 0) return false;
      if (obj.length === 0) return true;
      if (obj) return false;
      //最后通过属性长度判断。
      for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
      }
      if (obj == "") return true;
      return true;
    },
    arrayFind(arr, pred) {
      const idx = this.arrayFindIndex(arr, pred);
      return idx !== -1 ? arr[idx] : undefined;
    },
    arrayFindIndex(arr, pred) {
      for (let i = 0; i !== arr.length; ++i) {
        if (pred(arr[i])) {
          return i;
        }
      }
      return -1;
    },
    getFormItemLabelName(key) {
      const item = this.arrayFind(
        this.$parent.$children,
        component => component.prop === key
      );
      return item.label;
    },
    getFormItemValue(key) {
      //debugger;
      const item = this.arrayFind(
        this.$parent.$children,
        component => component.prop === key
      );
      const itemClassName = item.$children[1].$el.className;
      if (itemClassName.indexOf("el-checkbox-group") !== -1) {
        return item.$children[1].value;
      } else if (itemClassName.indexOf("el-select") !== -1) {
        return item.$children[1].selectedLabel;
      } else if (itemClassName.indexOf("el-input") !== -1) {
        return item.$children[1].value;
      } else if (itemClassName.indexOf("el-col-11") !== -1) {
        return _format.transformDateValue(
          item.fieldValue,
          item.$children[1].$el.innerText
        );
      } else if (itemClassName.indexOf("el-switch") !== -1) {
        return _format.transformSwitchValue(item.fieldValue);
      } else if (itemClassName.indexOf("el-radio-group") !== -1) {
        return item.$children[1].value;
      } else if (itemClassName.indexOf("el-textarea") !== -1) {
        return item.$children[1].value;
      }
    },
    closeItem(sourceItem, sourceKey) {
      this.$emit("closeItem", sourceItem, sourceKey);
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
