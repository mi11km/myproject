<template>
  <div></div>
</template>

<script>
import router from "../plugins/router";

export default {
  name: "Logout",
  created() {
    this.$store.dispatch("auth/logout");
    router.replace("/");
  },
};
</script>
