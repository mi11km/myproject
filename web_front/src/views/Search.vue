<template>
  <div id="search">
    <v-card tile>
      <v-card max-width="840px" class="mx-auto pt-6 elevation-0">
        <v-form>
          <v-text-field
            label="サークルを検索（キーワードを入力）"
            prepend-inner-icon="mdi-magnify"
            type="text"
            v-model="searchWords"
            outlined
          />
        </v-form>

        <v-card-subtitle class="pt-0">条件で絞る</v-card-subtitle>
        <v-form>
          <v-select
            dense
            outlined
            clearable
            class="selector mx-2"
            label="サークルの系統"
            prepend-inner-icon="mdi-checkbox-multiple-marked-outline"
            v-model="filterConditions.kind"
            :items="choiceSelector.kinds"
          ></v-select>
          <v-select
            dense
            outlined
            clearable
            class="selector mx-2"
            label="大学公認かどうか"
            prepend-inner-icon="mdi-checkbox-multiple-marked-outline"
            v-model="filterConditions.approval"
            :items="choiceSelector.approval"
          ></v-select>
        </v-form>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="elevation-4" color="primary" outlined @click="search">
            <v-icon>mdi-magnify</v-icon>
            検索する
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-card>

    <transition name="slide" mode="out-in" appear>
      <v-lazy>
        <router-view :query="query"></router-view>
      </v-lazy>
    </transition>
    <v-btn @click="$vuetify.goTo(0)" class="go-to-top ma-6 d-none d-sm-flex">
      <v-icon>mdi-chevron-up</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "Search",
  data: () => ({
    query: "",
    searchWords: "",
    filterConditions: {
      words: null,
      kind: null,
      approval: null,
    },
  }),
  computed: {
    choiceSelector() {
      return this.$store.getters["club/choiceSelector"];
    },
  },
  methods: {
    setQuery() {
      if (this.searchWords) {
        let searchWordsArray = this.searchWords.split(/\s+/);
        for (let i = 0; i < searchWordsArray.length; i++) {
          searchWordsArray[i] = "search=" + searchWordsArray[i];
        }
        this.filterConditions.words = searchWordsArray;
      }
      this.addCondition(this.filterConditions.kind, "kind");
      this.addCondition(
        this.filterConditions.approval,
        "is_officially_approved"
      );
      return this.filterConditions.words;
    },
    search() {
      this.query = this.setQuery();
      if (this.query) {
        this.query = this.query.join("&");
        let url = "/search/list/?" + this.query;
        this.$router.push({ path: url });
      }
      this.filterConditions.words = null;
    },
    addCondition(value, modelName) {
      if (value) {
        value = modelName + "=" + value;
        if (this.filterConditions.words == null) {
          this.filterConditions.words = [];
        }
        this.filterConditions.words.push(value);
      }
    },
  },
};
</script>

<style scoped>
.go-to-top {
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 99;
}

.selector {
  display: inline-block;
}
</style>
