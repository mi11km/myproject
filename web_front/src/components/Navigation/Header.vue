<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndDown"
      app
    >
      <Menu></Menu>
    </v-navigation-drawer>

    <v-app-bar
      dark
      color="primary"
      :clipped-left="$vuetify.breakpoint.lgAndDown"
      hide-on-scroll
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title class="ml-0 pl-2 logo">
        <router-link to="/" class="logo-link">
          <v-img
            src="../../assets/logo.png"
            alt="clubeeのロゴ"
            max-height="32px"
            max-width="32px"
            class="logo-img"
          />
          <span>{{ siteName }}</span>
        </router-link>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="キーワードを入力"
        class="hidden-sm-and-down"
        v-if="isSearch"
      />
      <v-spacer />
    </v-app-bar>
  </div>
</template>

<script>
import Menu from "./Menu";

export default {
  name: "Header.vue",
  data: () => ({
    siteName: "Clubee",
    drawer: null,
  }),
  computed: {
    isSearch() {
      return !this.$route.path.includes('search');
    },
  },
  components: {
    Menu,
  },
};
</script>

<style scoped>
.logo {
  width: 300px;
}

.logo-link {
  text-decoration: none;
  color: var(--my-contents-color);
}

.logo-img {
  display: inline-block;
  vertical-align: middle;
  margin-right: 4px;
}
</style>
