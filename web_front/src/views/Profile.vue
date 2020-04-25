<template>
  <div>
    <v-card>
      <v-card min-height="208px" class="con elevation-0" tile>
        <v-avatar size="189" class="my-2">
          <v-img
            :src="clubData.image"
            alt="サークルのトップ画像"
            class="top-img"
          ></v-img>
        </v-avatar>
        <v-card class="elevation-0">
          <v-card-title>{{ clubData.name }}</v-card-title>
          <v-card-subtitle
            >{{ clubData.university }} --
            {{ clubData.is_officially_approved }}
          </v-card-subtitle>
          <v-card-subtitle>{{ clubData.kind }}</v-card-subtitle>
        </v-card>
      </v-card>

      <v-tabs centered show-arrows>
        <v-tab @click="currentComponent = 'Detail'">
          <v-icon>mdi-account-group</v-icon>
          <span class="ml-2">サークル情報</span>
        </v-tab>

        <v-tab @click="currentComponent = 'Settings'">
          <v-icon>mdi-cog</v-icon>
          <span class="ml-2">設定</span>
        </v-tab>
      </v-tabs>
    </v-card>

    <component :is="currentComponent"></component>
  </div>
</template>

<script>
import Detail from "../components/Profile/clubInfo";
import Settings from "../components/Profile/Settings";

export default {
  name: "ClubProfile",
  data: () => ({
    currentComponent: "Detail"
  }),
  computed: {
    clubData() {
      return this.$store.getters["club/clubData"];
    }
  },
  components: {
    Detail,
    Settings
  }
};
</script>

<style scoped>
.con {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.top-img {
  border-radius: 50%;
}
</style>
