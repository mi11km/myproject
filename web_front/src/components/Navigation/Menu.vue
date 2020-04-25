<template>
  <v-list dense>
    <v-list-item-group mandatory>
      <template v-for="item in constantItems">
        <v-list-item :to="item.link" :key="item.text" exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-list-item to="/profile" v-show="isLoggedIn">
        <v-list-item-action>
          <v-icon>mdi-account</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>マイページ</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>

    <v-divider></v-divider>

    <div class="ma-4" v-show="!isLoggedIn">
      <v-btn to="/register" outlined color="primary" block>サークル登録</v-btn>
    </div>
    <div class="ma-4" v-show="!isLoggedIn">
      <v-btn to="/login" outlined color="primary" block>ログイン</v-btn>
    </div>
    <div class="ma-4" v-show="isLoggedIn">
      <v-btn to="/logout" outlined color="primary" block>ログアウト</v-btn>
    </div>
    <v-img
      src="../../assets/bee/bee9.png"
      alt="はちさん"
      max-width="160px"
      contain
      class="bee"
    />
  </v-list>
</template>

<script>
export default {
  name: "Menu",
  data: () => ({
    constantItems: [
      { icon: "mdi-home", text: "ホーム", link: "/" },
      { icon: "mdi-view-module", text: "サークル一覧", link: "/search" },
    ],
  }),
  computed: {
    isLoggedIn() {
      return this.$store.getters["auth/isLoggedIn"];
    },
  },
};
</script>

<style scoped>
.bee {
  position: absolute;
  bottom: 16px;
  left: 16px;
}
</style>
