<template>
  <div class="C-page">
    <h1>{{ msg }}</h1>
    <tr style="color:red; fontsize=16px; text-align=center"></tr>
  </div>
</template>

<script>
export default {
  name: "C.page",
  data() {
    return {
      msg: "Welcome to Your C App "
    };
  },
  mounted() {}
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
.C-page {
  float: left;
  width: 40%;
  height: 200px;
  background-color: sandybrown;
}
</style>
