<template>
  <v-footer color="primary" absolute app inset>
    <v-spacer />
    <span class="white--text text-center">
      &copy; {{ thisYear }} Clubee - All rights reserved
    </span>
    <v-spacer />
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  computed: {
    thisYear() {
      return new Date().getFullYear();
    },
  },
};
</script>

<style scoped></style>
