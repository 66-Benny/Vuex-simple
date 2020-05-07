<template>
  <div class="C-page">
    <h1>{{ msg }}</h1>
    <pageD @click.native="shout('pageD')" :myMessage.sync="bar">
      <template v-slot:header>
        <h1>Here might be a page title</h1>
      </template>
      <template v-slot:default="slotProps">
        <p>{{ slotProps.user.name }}</p>
        <p>{{ slotProps.user.age }}</p>
        <p>{{ slotProps.user.city }}</p>
      </template>
      <template v-slot:footer>
        <p>Here some contact info</p>
      </template>
    </pageD>
  </div>
</template>

<script>
import pageD from "./D";
export default {
  name: "C.page",
  components: { pageD },
  data() {
    return {
      msg: "Welcome to Your C App ",
      bar: "pageC text"
    };
  },
  mounted() {},
  methods: {
    shout(e) {
      console.log(e);
    }
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
.C-page {
  width: 80%;
  height: 400px;
  background-color: sandybrown;
}
</style>
