<template>
  <v-row align="center" justify="center" class="hgt">
    <transition name="fade" mode="out-in" appear>
      <v-col cols="12" sm="8" md="6" style="min-width: 320px;">
        <v-toolbar color="primary" dark flat>
          <v-spacer />
          <v-img
            src="../assets/logo.png"
            alt="clubeeのロゴ"
            max-height="32px"
            max-width="32px"
            class="logo-img"
          />
          <v-spacer />
        </v-toolbar>

        <v-stepper v-model="currentStep">
          <v-stepper-header>
            <v-stepper-step :complete="currentStep > 1" step="1">
              ユーザー作成
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="currentStep > 2" step="2">
              サークル登録
            </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <AuthRegister @nextStep="currentStep++"></AuthRegister>
            </v-stepper-content>

            <v-stepper-content step="2">
              <ClubRegister></ClubRegister>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
    </transition>
  </v-row>
</template>

<script>
import AuthRegister from "../components/Register/AuthRegister";
import ClubRegister from "../components/Register/ClubRegister";

export default {
  name: "Stepper",
  data: () => ({
    currentStep: 1,
  }),
  components: {
    AuthRegister,
    ClubRegister,
  },
};
</script>

<style scoped></style>
