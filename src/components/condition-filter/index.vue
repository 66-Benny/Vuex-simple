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
            value: this.form[key]
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
    closeItem(sourceItem, sourceKey) {
      this.$emit("closeItem", sourceItem, sourceKey);
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
  }
  & .tagItem:last-child {
    margin-right: 0;
  }
}
</style>
