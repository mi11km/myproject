<template>
  <div id="clubList">
    <v-card
      class="ma-8"
      max-width="320"
      v-for="post in posts"
      :key="post.id"
      hover
      :to="'/detail/' + post.id"
    >
      <v-img
        class="white--text align-end"
        height="200px"
        src="../../assets/top/top4.jpg"
      >
        <v-card-title>{{ post.name }}</v-card-title>
      </v-img>

      <v-card-subtitle class="pb-0"
        >{{ post.university }} --
        {{ post.is_officially_approved }}</v-card-subtitle
      >
    </v-card>
  </div>
</template>

<script>
import api from "../../plugins/api";

export default {
  name: "ClubList",
  data: () => ({
    posts: [],
  }),
  props: ["query"],
  watch: {
    $route() {
      console.log(this.query)
      if (this.query) {
        api
          .get(`/clubs/?${this.query}`)
          .then((response) => {
            console.log(response.data)
            this.posts = response.data;
          })
          .catch((error) => {
            console.log(error.response);
          });
      }
    },
  },
  created() {
    api
      .get("/clubs/")
      .then((response) => {
        this.posts = response.data;
      })
      .catch((error) => {
        console.log(error.response);
      });
  },
};
</script>

<style scoped>
#clubList {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
