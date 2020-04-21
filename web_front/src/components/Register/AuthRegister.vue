<template>
  <v-row align="center" justify="center">
    <v-col>
      <v-card class="elevation-0">
        <v-card-text>
          <v-form ref="form">
            <v-text-field
              label="ユーザー名"
              prepend-icon="mdi-account-circle"
              type="text"
              v-model.lazy.trim="formData.username"
              autofocus
              :rules="baseValidRules"
              validate-on-blur
            />
            <v-text-field
              id="password"
              label="パスワード(8文字以上)"
              name="password"
              prepend-icon="mdi-lock"
              type="password"
              v-model.lazy.trim="formData.password"
              counter
              :rules="passwordRules"
              validate-on-blur
              hint="passwordなどの一般的すぎるものは避けてください"
              persistent-hint
            />
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-img
            src="../../assets/bee/bee3.png"
            alt="はちさん"
            max-height="32px"
            max-width="32px"
            contain
          />
          <v-spacer />
          <v-btn color="primary" @click="authRegister">
            作成する
          </v-btn>
        </v-card-actions>
      </v-card>
      <GlobalMessage></GlobalMessage>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Register",
  data: () => ({
    formData: {
      username: "",
      password: "",
    },
    baseValidRules: [(v) => !!v || "入力必須です"],
    passwordRules: [
      (v) => !!v || "入力必須です",
      (v) => (v && v.length >= 8) || "8文字以上入力してください",
    ],
  }),
  methods: {
    authRegister() {
      const isValid = this.$refs.form.validate();
      if (isValid) {
        this.$store.dispatch("auth/register", this.formData).then(() => {
          this.$emit("nextStep");
        });
      }
    },
  },
};
</script>

<style scoped></style>
