<template>
  <div class="D-page">
    <h1>{{ msg }}</h1>
    <input v-model.trim.lazy="msg" type="text" />
    <div><slot name="header"></slot></div>
    <div>
      <slot :user="userInfo"></slot>
    </div>
    <div><slot name="footer"></slot></div>
    <div @click.self="shout(2)">
      <button @click.once="shout(1)">ok</button>
    </div>
    <form @submit.prevent="onSubmit"></form>
    <span @click="onClick">pageC: {{ myMessage }}</span>
  </div>
</template>

<script>
export default {
  name: "D.page",
  data() {
    return {
      msg: "Welcome to Your D App",
      userInfo: {
        name: "Benny",
        age: 30,
        city: "DL",
        phone: "13000000000"
      }
    };
  },
  props: ["myMessage"],
  methods: {
    shout(e) {
      console.log(e);
    },
    onSubmit() {
      console.log("sumit");
    },
    onClick() {
      this.$emit("update:myMessage", "AAAAAAAA");
    }
  }
};
</script>

<style scoped>
h1,
h2 {
  font-weight: normal;
}
a {
  color: #42b983;
}
.D-page {
  width: 80%;
  height: 300px;
  background-color: tomato;
}
</style>
