import Vue from "vue";
import Vuex from "vuex";

import auth from "./modules/auth";
import club from "./modules/club";
import message from "./modules/message";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth,
    club,
    message,
  },
});

export default store;
