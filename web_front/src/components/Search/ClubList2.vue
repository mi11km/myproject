<template>
  <div id="clubList2">
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
  name: "ClubList2",
  data: () => ({
    posts: []
  }),
  props: ["query"],
  created() {
    let endpoint = "/clubs/";
    if (this.query) {
      endpoint = endpoint + "?" + this.query;
    }
    api
      .get(endpoint)
      .then(response => {
        console.log(response);
        this.posts = response.data;
      })
      .catch(error => {
        console.log(error.response);
      });
  }
};
</script>

<style scoped>
#clubList2 {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
