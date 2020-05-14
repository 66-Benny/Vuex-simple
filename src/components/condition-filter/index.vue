<template>
  <div class="tagArea">
    <div
      class="tagItem"
      v-for="(item, key) in tagList"
      :key="key"
      v-if="isArray(item.label)"
    >
      <span>{{ item.title }}：:</span>
      <span v-for="child of item.label" :key="child">
        <span>{{ child }}</span>
        <i
          @click="closeItem(child, key, item.value)"
          name="close"
          class="el-icon-close isArrayClose"
          content="关闭"
        ></i>
        <span class="divide" v-show="isLastOne(child, item)">|</span>
      </span>
    </div>
    <div
      class="tagItem"
      v-for="(item, key) in tagList"
      :key="key"
      v-if="!isArray(item.label)"
    >
      <span>{{ item.title }}：</span>
      <span>{{ item.label }} </span>
      <i
        @click="closeItem(item.label, key, item.value)"
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
            label: _format.getFormItemLabel(key, childrenValue),
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
    closeItem(sourceItem, sourceKey, sourceValue) {
      this.$emit("closeItem", sourceItem, sourceKey, sourceValue);
    },
    isArray(val) {
      return Object.prototype.toString.call(val) === "[object Array]"
        ? true
        : false;
    },
    isLastOne(val1, val2) {
      return _.last(val2.label) === val1 ? false : true;
    }
  }
};
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
    .divide {
      font-size: 14px;
      line-height: 1.5;
      color: #e8e8e8;
      margin: 0 8px;
      height: 0.9em;
      width: 1.5px;
    }
    // .isArrayClose::after {
    //   content: "|";
    //   color: red;
    //   font-weight: bold;
    //   margin: 0 3px;
    // }
    // .isArrayClose:last-child::after {
    //   content: "|";
    //   color: blueviolet;
    // }
  }
  & .tagItem:last-child {
    margin-right: 0;
  }
}
</style>
