<template>
  <v-card class="mt-6 mb-12 mx-auto" max-width="840px">
    <v-form class="px-8 pt-8" ref="form">
      <v-text-field
        label="サークル名"
        prepend-icon="mdi-account-group"
        type="text"
        validate-on-blur
        :rules="baseValidRules"
        :disabled="editable"
        v-model.trim.lazy="formData.name"
      />
      <v-text-field
        label="大学"
        prepend-icon="mdi-school"
        type="text"
        validate-on-blur
        :rules="baseValidRules"
        :disabled="editable"
        v-model.trim.lazy="formData.university"
      />
      <v-select
        label="サークルの系統"
        prepend-icon="mdi-atom"
        :rules="baseValidRules"
        :disabled="editable"
        :items="choiceSelector.kinds"
        v-model="formData.kind"
      ></v-select>
      <v-select
        label="大学公認かどうか"
        prepend-icon="mdi-checkbox-multiple-marked-outline"
        :rules="baseValidRules"
        :disabled="editable"
        :items="choiceSelector.approval"
        v-model="formData.is_officially_approved"
      ></v-select>
      <v-textarea
        label="活動内容"
        prepend-icon="mdi-comment-account-outline"
        counter
        :disabled="editable"
        v-model.lazy="formData.activity"
      ></v-textarea>
      <v-textarea
        label="メッセージ"
        prepend-icon="mdi-comment-text-outline"
        counter
        hint="見に来てくれた人へのメッセージなどを書いてください"
        persistent-hint
        :disabled="editable"
        v-model.lazy="formData.message"
      ></v-textarea>
      <v-file-input
        v-model="formData.image"
        :disabled="editable"
        small-chips
        persistent-hint
        hint="プロフィール画像を変更する場合はこちらで画像を選択してください"
        accept="image/*"
        label="プロフィール画像"
        prepend-icon="mdi-camera"
      ></v-file-input>
    </v-form>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="isEditable" outlined color="primary" v-show="!show"
        >編集する
      </v-btn>
      <v-btn @click="updateClubData" color="primary" v-show="show"
        >更新する</v-btn
      >
      <v-btn @click="isEditable" v-show="show">キャンセル</v-btn>
    </v-card-actions>
    <GlobalMessage></GlobalMessage>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ClubInfo",
  data: () => ({
    editable: true,
    show: false,
    baseValidRules: [v => !!v || "入力必須です"],
    formData: {
      name: "",
      university: "",
      kind: "",
      is_officially_approved: "",
      image: null,
      activity: "",
      message: ""
    }
  }),
  created() {
    this.$store.commit("message/clear");
    this.setData();
  },
  computed: {
    ...mapGetters("club", ["clubData", "choiceSelector"])
  },
  methods: {
    set() {
      this.editable = true;
      this.show = false;
    },
    setData() {
      this.formData.name = this.clubData.name;
      this.formData.university = this.clubData.university;
      this.formData.kind = this.clubData.kind;
      this.formData.is_officially_approved = this.clubData.is_officially_approved;
      this.formData.activity = this.clubData.activity;
      this.formData.message = this.clubData.message;
    },
    isEditable() {
      this.show = !this.show;
      this.editable = !this.editable;
      this.setData();
    },
    updateClubData() {
      const isValidated = this.$refs.form.validate();
      if (isValidated) {
        const params = new FormData();
        params.append("name", this.formData.name);
        params.append("university", this.formData.university);
        params.append("kind", this.formData.kind);
        params.append(
          "is_officially_approved",
          this.formData.is_officially_approved
        );
        params.append("activity", this.formData.activity);
        params.append("message", this.formData.message);
        if (this.formData.image) {
          params.append("image", this.formData.image);
        }

        this.$store.dispatch("club/update", params).then(() => {
          this.set();
        });
      }
    }
  }
};
</script>

<style scoped></style>
