<template>
  <div class="collapseFormContainer">
    <slot name="base"></slot>
    <el-divider dashed></el-divider>
    <div>
      <font class="showMoreTittle">{{ showMoreTittle }}</font>
      <div class="tagList">
        <slot name="tagList"></slot>
      </div>
      <a class="expander" @click="handleExpand">
        {{ innerExpand ? "收起" : "展开" }}
        <i
          :class="{
            'el-icon-arrow-down': !innerExpand,
            'el-icon-arrow-up': innerExpand
          }"
        ></i>
      </a>
    </div>
    <el-collapse-transition>
      <div v-show="innerExpand">
        <slot name="showMore"></slot>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
export default {
  name: "show-more",
  props: {
    showMoreTittle: {
      type: String,
      default: "更多查询条件"
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    innerExpand: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      }
    }
  },
  methods: {
    handleExpand() {
      this.innerExpand = !this.innerExpand;
    }
  }
};
</script>
<style lang="scss" scoped>
.collapseFormContainer {
  .showMoreTittle {
    display: inline-block;
    vertical-align: top;
    color: #33517e;
    font-size: 16px;
    font-weight: bold;
  }
  .tagList {
    display: inline-block;
    width: calc(100% - 200px);
    z-index: 10;
  }
  .expander {
    user-select: none;
    float: right;
    cursor: pointer;
  }
}
</style>
