import { postA } from "../server/A";
export default {
  namespaced: true,
  state: {
    dataA: {
      data: []
    }
  },
  actions: {
    fetchA(context, payload) {
      return postA(payload).then(res => {
        context.commit("updateA", res);
      });
    }
  },
  mutations: {
    updateA(state, payload) {
      const nativeState = state;
      nativeState.dataA = payload;
    }
  }
};
