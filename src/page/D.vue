<template>
  <div class="D-page">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: "D.page",
  data() {
    return {
      msg: "Welcome to Your D App"
    };
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
.D-page {
  float: right;
  width: 40%;
  height: 200px;
  background-color: tomato;
}
</style>
