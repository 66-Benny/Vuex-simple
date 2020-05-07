<template>
  <div class="showMore">
    <p class="baseTitle">基本查询条件</p>
    <show-more :visible.sync="visible" :showMoreTittle="showMoreTittle">
      <template slot="base"></template>
      <template slot="showMore"></template>
    </show-more>
  </div>
</template>

<script>
import showMore from "./index";

export default {
  components: { showMore },
  data() {
    return {
      showMoreTittle: "更多查询条件",
      visible: true
    };
  }
};
</script>
<style lang="scss" scoped>
.showMore {
  .baseTitle {
    font-size: 16px;
    font-weight: bold;
    color: #33517e;
  }
}
</style>
