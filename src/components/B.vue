<template>
  <div class="B-page">
    <h1>{{ msg }}</h1>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "B.page",
  data() {
    return {
      msg: "Welcome to Your B App"
    };
  },
  mounted() {
    this.$emit("mounted");
    console.log("B组件触发");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
a {
  color: #42b983;
}
.B-page {
  width: 90%;
  height: 400px;
  background-color: skyblue;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
</style>
