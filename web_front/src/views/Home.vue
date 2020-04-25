<template>
  <v-img src="../assets/top/top3.jpg" id="bg-img">
    <v-card
      id="tpt"
      class="con ma-4 px-4 py-8"
      color="orange lighten-4"
      img="../assets/top.jpeg"
      min-height="560px"
      shaped
      outlined
      elevation="12"
    >
      <v-img
        src="../assets/bee/bee10.png"
        max-width="280px"
        alt="はちさん"
        contain
      ></v-img>

      <div style="align-self: center;">
        <v-card-title class="display-1">
          Welcome to
          <span class="ml-2">Clubee!</span>
        </v-card-title>
        <v-card-subtitle
          class="pa-0 ml-4 mb-2"
          v-for="subTitle in subTitles"
          :key="subTitle"
        >
          {{ subTitle }}
        </v-card-subtitle>
        <v-card-actions class="con">
          <v-btn to="/login" v-if="!isLoggedIn" class="ma-2" elevation="4"
            >ログイン
          </v-btn>
          <v-btn to="/register" v-if="!isLoggedIn" class="ma-2" elevation="4"
            >サークルを登録
          </v-btn>
          <v-btn to="/profile" v-if="isLoggedIn" class="ma-2" elevation="4"
            >マイページへ
          </v-btn>
          <v-btn to="/search" class="ma-2" elevation="4">サークルを探す</v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </v-img>
</template>

<script>
export default {
  name: "Home",
  data: () => ({
    subTitles: ["Let`s Search Clubs!", "大学のサークル・部活探しに"],
  }),
  computed: {
    isLoggedIn() {
      return this.$store.getters["auth/isLoggedIn"];
    },
  },
};
</script>

<style scoped>
.con {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: row-reverse;
}

#tpt {
  background: rgba(255, 223, 178, 0.7) !important;
}

#bg-img {
  height: 100%;
}
</style>
