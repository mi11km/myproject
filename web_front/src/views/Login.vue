<template>
  <div>
    <GlobalMessage></GlobalMessage>
    <v-row justify="center" class="hgt">
      <transition name="slide" mode="out-in" appear>
        <v-col cols="12" sm="8" md="6">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-spacer />
              <v-img
                src="../assets/logo.png"
                alt="clubeeのロゴ"
                max-height="32px"
                max-width="32px"
              />
              <v-spacer />
            </v-toolbar>

            <v-card-text>
              <v-form ref="form">
                <v-text-field
                  label="ユーザー名"
                  prepend-icon="mdi-account"
                  type="text"
                  v-model.trim.lazy="formData.username"
                  autofocus
                  :rules="baseValidRules"
                  validate-on-blur
                />

                <v-text-field
                  id="password"
                  label="パスワード"
                  name="password"
                  prepend-icon="mdi-lock"
                  type="password"
                  v-model.trim.lazy="formData.password"
                  :rules="baseValidRules"
                  validate-on-blur
                />
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-img
                src="../assets/bee/bee6.png"
                alt="はちさん"
                max-height="32px"
                max-width="32px"
                contain
              />
              <v-spacer />
              <v-btn color="primary" @click="login">ログインする</v-btn>
              <v-btn color="primary" @click="simpleLogin"
                >簡易ログインする
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </transition>
    </v-row>
  </div>
</template>

<script>
import router from "../plugins/router";

export default {
  name: "Login",
  data: () => ({
    baseValidRules: [(v) => !!v || "入力必須です"],
    formData: {
      username: "",
      password: "",
    },
  }),
  computed: {
    isLoggedIn() {
      return this.$store.getters["auth/isLoggedIn"];
    },
  },
  methods: {
    login() {
      const isValid = this.$refs.form.validate();
      if (isValid) {
        this.$store.dispatch("auth/login", this.formData).then(() => {
          router.replace("/");
        });
      }
    },
    simpleLogin() {
      this.$store.dispatch("auth/login", {
        username: "ユーザーネーム",
        password: "kinoko716",
      });
      router.replace("/");
    },
  },
};
</script>

<style scoped>
.hgt {
  height: 480px;
}
</style>
