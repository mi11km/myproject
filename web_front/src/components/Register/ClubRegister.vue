<template>
  <v-row align="center" justify="center">
    <v-col>
      <v-card class="elevation-0">
        <v-card-text>
          <v-form ref="form">
            <v-text-field
              label="サークル名"
              prepend-icon="mdi-account-group"
              :rules="baseValidRules"
              validate-on-blur
              type="text"
              v-model.lazy.trim="form.clubName"
            />

            <v-text-field
              label="大学"
              prepend-icon="mdi-school"
              :rules="baseValidRules"
              validate-on-blur
              type="text"
              v-model.lazy.trim="form.mainUniversity"
            />

            <v-select
              v-model="form.clubKind"
              :items="choiceSelector.kinds"
              :rules="baseValidRules"
              label="サークルの系統"
              prepend-icon="mdi-atom"
            ></v-select>

            <v-select
              v-model="form.approval"
              :items="choiceSelector.approval"
              :rules="baseValidRules"
              label="大学公認かどうか"
              prepend-icon="mdi-checkbox-multiple-marked-outline"
            ></v-select>

            <v-file-input
              v-model="form.image"
              :rules="baseValidRules"
              small-chips
              accept="image/*"
              label="プロフィール画像を選択してください"
              prepend-icon="mdi-camera"
            ></v-file-input>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-img
            src="../../assets/bee/bee5.png"
            alt="はちさん"
            max-height="32px"
            max-width="32px"
            contain
          />
          <v-spacer />
          <v-btn color="primary" @click="clubRegister">
            登録する
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "ClubRegister",
  data: () => ({
    baseValidRules: [v => !!v || "必須です"],
    form: {
      clubName: "",
      mainUniversity: "",
      clubKind: "",
      approval: "",
      image: null
    }
  }),
  computed: {
    choiceSelector() {
      return this.$store.getters["club/choiceSelector"];
    }
  },
  methods: {
    clubRegister() {
      const isValid = this.$refs.form.validate();
      if (isValid) {
        this.$store
          .dispatch("club/register", {
            name: this.form.clubName,
            university: this.form.mainUniversity,
            kind: this.form.clubKind,
            is_officially_approved: this.form.approval,
            image: this.form.image
          })
          .then(() => {
            this.$router.replace("/profile");
          });
      }
    }
  }
};
</script>

<style scoped></style>
