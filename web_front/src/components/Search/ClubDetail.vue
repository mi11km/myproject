<template>
  <transition name="slide" mode="out-in" appear>
    <v-card class="pb-12">
      <v-carousel
        cycle
        hide-delimiter-background
        show-arrows-on-hover
        class="mb-4"
        style="background-color: black"
      >
        <v-carousel-item
          v-for="(item, i) in imageItems"
          :key="i"
          :src="item.src"
          reverse-transition="fade-transition"
          transition="fade-transition"
          class="detail-content"
        >
        </v-carousel-item>
      </v-carousel>

      <v-card-title class="display-1 px-12 detail-content">
        {{ data.name }}
      </v-card-title>
      <v-card-subtitle class="px-12 detail-content"
        >{{ data.university }} -- {{ data.is_officially_approved }} ({{
          data.kind
        }})
      </v-card-subtitle>

      <v-card class="detail-content elevation-0 pa-4 inner-transparent">
        <v-card-title class="title-decoration mb-4">活動内容</v-card-title>
        <v-card-text>{{ data.activity || this.template }}</v-card-text>

        <v-card-title class="title-decoration mb-4"
          >みんなへのメッセージ！</v-card-title
        >
        <v-card-text>{{ data.message || this.template }}</v-card-text>
      </v-card>

      <v-breadcrumbs class="pb-0" :items="navItems">
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>
    </v-card>
  </transition>
</template>

<script>
import api from "../../plugins/api";

export default {
  name: "ClubDetail",
  props: ["id"],
  data: () => ({
    data: {},
    navItems: [
      { text: "サークル一覧", disabled: false, to: "/search" },
      { text: "サークル詳細", disabled: false }
    ],
    template: "まだ記入されてないよ！更新されるのを待ってね！"
  }),
  created() {
    api.get(`/clubs/${this.id}/`).then(response => {
      this.data = response.data;
    });
  },
  computed: {
    imageItems() {
      return [{ src: this.data.image }];
    }
  }
};
</script>

<style scoped>
.detail-transparent {
  background: rgba(255, 255, 255, 0.95) !important;
}
.detail-content {
  max-width: 1024px;
  margin: 0 auto;
}

.inner-transparent {
  background: rgba(255, 255, 255, 0) !important;
}

.title-decoration {
  padding: 0.5em; /*文字周りの余白*/
  color: #494949; /*文字色*/
  background: #fffaf4; /*背景色*/
  border-left: solid 5px #ffaf58; /*左線（実線 太さ 色）*/
}
</style>
