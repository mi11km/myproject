<template>
  <div id="search">
    <v-card tile>
      <v-card max-width="840px" class="mx-auto pt-6 elevation-0">
        <v-form>
          <v-text-field
            label="サークルを検索（キーワードを入力）"
            prepend-inner-icon="mdi-magnify"
            type="text"
            v-model="filterParams.words"
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
            v-model="filterParams.kind"
            :items="choiceSelector.kinds"
          ></v-select>
          <v-select
            dense
            outlined
            clearable
            class="selector mx-2"
            label="大学公認かどうか"
            prepend-inner-icon="mdi-checkbox-multiple-marked-outline"
            v-model="filterParams.approval"
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
        <component :is="currentList" :query="query"></component>
      </v-lazy>
    </transition>
    <v-btn @click="$vuetify.goTo(0)" class="go-to-top ma-6 d-none d-sm-flex">
      <v-icon>mdi-chevron-up</v-icon>
    </v-btn>
  </div>
</template>

<script>
import ClubList from "../components/Search/ClubList";
import ClubList2 from "../components/Search/ClubList2";

export default {
  name: "Search",
  data: () => ({
    currentList: "ClubList",
    nextList: "ClubList2",
    query: null,
    queryParams: null,
    filterParams: {
      words: null,
      kind: null,
      approval: null
    }
  }),
  components: {
    ClubList,
    ClubList2
  },
  computed: {
    choiceSelector() {
      return this.$store.getters["club/choiceSelector"];
    }
  },
  methods: {
    setQueryParams() {
      if (this.filterParams.words) {
        this.queryParams = [];
        let searchWordsArray = this.filterParams.words.split(/\s+/);
        for (let word of searchWordsArray) {
          this.queryParams.push(["activity", word]); // キーワード検索は活動内容のワードの部分一致から絞る
        }
      }
      this.addQueryParam(this.filterParams.kind, "kind");
      this.addQueryParam(this.filterParams.approval, "is_officially_approved");
    },
    addQueryParam(value, modelName) {
      if (value) {
        if (this.queryParams == null) {
          this.queryParams = [];
        }
        this.queryParams.push([modelName, value]);
      }
    },
    search() {
      this.setQueryParams();
      if (this.queryParams) {
        this.query = new URLSearchParams(this.queryParams);
        [this.currentList, this.nextList] = [this.nextList, this.currentList];
        this.queryParams = null;
      }
    }
  }
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
