import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default {
  state: {
    count: 1
  },
  getters: {
    doubleCount(state) {
      return state.count * 2;
    }
  },
  mutations: {
    changeCount(state, value) {
      state.count += value;
    }
  },
  actions: {
    changeCount({ commit }, value) {
      setTimeout(() => {
        commit("changeCount", value);
      }, 2000);
    }
  }
};
