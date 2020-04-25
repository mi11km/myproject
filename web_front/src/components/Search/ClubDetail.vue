<template>
  <transition name="slide" mode="out-in" appear>
    <v-img src="../../assets/top/top4.jpg">
      <v-card class="pb-12 detail-transparent">
        <v-breadcrumbs class="pb-0" :items="items">
          <template v-slot:divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>
        <v-carousel
          cycle
          height="400"
          hide-delimiter-background
          show-arrows-on-hover
          class="mt-4 mb-4"
        >
          <v-carousel-item v-for="i in 5" :key="i">
            <v-sheet color="primary" height="100%">
              <v-row class="fill-height" align="center" justify="center">
                <div class="display-3">Slide{{ i }}</div>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>

        <v-card-title class="display-1 px-12">
          {{ data.name }}
        </v-card-title>
        <v-card-subtitle class="px-12"
          >{{ data.university }} --
          {{ data.is_officially_approved }} ({{data.kind}})
        </v-card-subtitle>

        <v-card class="mx-auto detail elevation-0 pa-4 inner-transparent">
          <v-card-title class="title-decoration mb-4">活動内容</v-card-title>
          <v-card-text>{{ data.activity || this.template }}</v-card-text>

          <v-card-title class="title-decoration mb-4"
            >みんなへのメッセージ！</v-card-title
          >
          <v-card-text>{{ data.message || this.template }}</v-card-text>
        </v-card>
      </v-card>
    </v-img>
  </transition>
</template>

<script>
import api from "../../plugins/api";

export default {
  name: "ClubDetail",
  props: ["id"],
  data: () => ({
    data: {},
    items: [
      { text: "サークル一覧", disabled: false, to: "/search" },
      { text: "サークル詳細", disabled: false },
    ],
    template: "まだ記入されてないよ！更新されるのを待ってね！",
  }),
  created() {
    api.get(`/clubs/${this.id}/`).then((response) => {
      this.data = response.data;
    });
  },
};
</script>

<style scoped>
.detail-transparent {
  background: rgba(255, 255, 255, 0.95) !important;
}

.detail {
  max-width: 840px;
}

.inner-transparent {
    background: rgba(255, 255, 255, 0.0) !important;
}

.title-decoration {
  padding: 0.5em; /*文字周りの余白*/
  color: #494949; /*文字色*/
  background: #fffaf4; /*背景色*/
  border-left: solid 5px #ffaf58; /*左線（実線 太さ 色）*/
}
</style>
