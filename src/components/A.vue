<template>
  <div class="A-page">
    <h1>{{ msg }}</h1>
    <strong>{{ viObj }}</strong>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from "vuex";

const FETCH_AFUN_ACTION = "modelA/fetchA";

export default {
  name: "A.page",
  data() {
    return {
      msg: "Welcome to Your A App",
      obj: {
        aaa: "a test",
        bbb: 15
      },
      viObj: {}
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.postPageA(this.obj);
    },
    doSomthing() {
      console.log("A组件触发");
    },
    postPageA(payload) {
      this.$store.dispatch(FETCH_AFUN_ACTION, payload);
    }
  },
  computed: {
    ...mapState({
      pageAFromVuex: state => state.modelA.dataA
    })
  },
  watch: {
    pageAFromVuex(val) {
      this.viObj = val;
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
.A-page {
  width: 100%;
  height: 600px;
  background-color: #42b983;
}
</style>
