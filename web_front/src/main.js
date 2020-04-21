import Vue from "vue";
import App from "./App.vue";
import router from "./plugins/router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import GlobalMessage from "./components/GlobalMessage";

Vue.config.productionTip = process.env.NODE_ENV === "production";

Vue.component("GlobalMessage", GlobalMessage);

new Vue({
  store,
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
