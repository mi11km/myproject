<template>
  <v-app>
    <Header v-if="shouldShow"></Header>

    <v-content class="grey lighten-3">
      <router-view></router-view>
    </v-content>

    <Footer></Footer>
  </v-app>
</template>

<script>
import Header from "./components/Navigation/Header";
import Footer from "./components/Navigation/Footer";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  computed: {
    shouldShow() {
      return this.$route.path !== "/register";
    },
  },
};
</script>

<style>
/* どこでも使えるアニメーション記述 */
/* slide アニメーション */
.slide-enter-active {
  animation: slide-in 0.5s;
}

.slide-leave-active {
  animation: slide-in 0.5s reverse;
}

@keyframes slide-in {
  from {
    transform: translateX(200px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* fade アニメーション */
.fade-enter-active {
  animation: fade-in 0.5s;
}

.fade-leave-active {
  animation: fade-in 0.5s reverse;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>

