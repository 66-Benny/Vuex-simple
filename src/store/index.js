import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import modelA from "../model/A";
import modelB from "../model/B";
import modelC from "../model/C";
import modelD from "../model/D";

Vue.use(Vuex);

export default new Vuex.Store({
  namespaced: true,
  modules: {
    modelA,
    modelB,
    modelC,
    modelD
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage // 修改存储的状态
    })
  ] // 状态持久化
});
