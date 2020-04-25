import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import auth from "./modules/auth";
import club from "./modules/club";
import message from "./modules/message";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth,
    club,
    message
  },
  plugins: [createPersistedState({storage: window.sessionStorage})]
});

export default store;
