<template>
  <v-card v-if="successMessage || errorMessage" class="mx-12 my-4">
    <div v-show="successMessageType === 'string' && successMessage">
      <v-alert type="success" dense outlined text>
        {{ successMessage }}
      </v-alert>
    </div>

    <div v-show="errorMessageType === 'string' && errorMessage">
      <v-alert type="error" dense outlined text>
        {{ errorMessage }}
      </v-alert>
    </div>

    <div v-show="successMessageType === 'object' && successMessage">
      <v-alert
        v-for="(successMsg, index) in successMessage"
        :key="index"
        type="success"
        dense
        outlined
        text
      >
        {{ successMsg }}
      </v-alert>
    </div>

    <div v-show="errorMessageType === 'object' && errorMessage">
      <v-alert
        v-for="(errorMsg, index) in errorMessage"
        :key="index"
        type="error"
        dense
        outlined
        text
      >
        {{ errorMsg }}
      </v-alert>
    </div>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "GlobalMessage",
  computed: {
    ...mapGetters("message", ["successMessage", "errorMessage"]),
    successMessageType() {
      return typeof this.successMessage;
    },
    errorMessageType() {
      return typeof this.errorMessage;
    },
  },
};
</script>

<style scoped></style>
