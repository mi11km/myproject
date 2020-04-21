<template>
  <div>
    <v-card class="mt-6 mx-auto" max-width="840px">
      <v-card-title class="pb-0 px-6">ユーザー情報</v-card-title>
      <v-form class="px-8 pt-4" ref="form">
        <v-text-field
          label="ユーザー名"
          prepend-icon="mdi-account"
          type="text"
          :rules="baseValidRules"
          validate-on-blur
          :disabled="editable"
          v-model.trim.lazy="formData.name"
        />
      </v-form>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="isEditable" outlined color="primary" v-show="!show"
          >編集する
        </v-btn>
        <v-btn @click="updateAuth" color="primary" v-show="show"
          >更新する</v-btn
        >
        <v-btn @click="isEditable" v-show="show">キャンセル</v-btn>
      </v-card-actions>

      <GlobalMessage></GlobalMessage>
    </v-card>

    <v-card class="mt-6 mx-auto pb-0 px-6 pt-6" max-width="840px">
      <v-card-title
        ><v-icon>mdi-trash-can-outline</v-icon>ユーザーを削除</v-card-title
      >
      <v-card-text
        >一度ユーザーを削除すると、2度と元に戻せません。十分ご注意ください。
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" class="white--text" @click.stop="dialog = true"
          >ユーザーを削除する</v-btn
        >
      </v-card-actions>
      {{ password }}
      <v-dialog v-model="dialog" max-width="360px">
        <v-card>
          <v-card-title class="headline">ユーザーを削除しますか？</v-card-title>

          <v-card-text class="pb-0">
            <span style="color: red;">必ず読んでください！</span><br />
            この操作はもとに戻せません。ユーザーに紐づくサークル情報も削除されます。<br />
            確認のため、あなたのパスワードを入力してください。
            <v-form ref="form">
              <v-text-field
                class="mt-4"
                type="password"
                prepend-inner-icon="mdi-lock"
                counter
                outlined
                validate-on-blur
                :rules="baseValidRules"
                v-model.lazy.trim="password"
              ></v-text-field>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" @click="deleteUser">
              削除する
            </v-btn>
            <v-btn outlined @click="resetDialog">
              キャンセル
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Settings",
  data: () => ({
    formData: {
      name: "",
    },
    password: "",
    baseValidRules: [(v) => !!v || "入力必須です"],
    editable: true,
    show: false,
    dialog: false,
  }),
  created() {
    this.set(this.username);
    this.$store.commit("message/clear");
  },
  computed: {
    username() {
      return this.$store.getters["auth/username"];
    },
  },
  methods: {
    set(name) {
      this.formData.name = name;
      this.editable = true;
      this.show = false;
    },
    isEditable() {
      this.show = !this.show;
      this.editable = !this.editable;
      this.formData.name = this.username;
    },
    updateAuth() {
      const isValid = this.$refs.form.validate();
      if (isValid) {
        this.$store
          .dispatch("auth/changeUsername", this.formData.name)
          .then(() => {
            this.set(this.formData.name);
          });
      }
    },
    deleteUser() {
      const isValid = this.$refs.form.validate();
      if (isValid) {
        this.$store.dispatch("auth/delete", this.password).then(() => {
          this.$router.replace("/");
        });
      }
    },
    resetDialog() {
      this.dialog = false;
      this.password = "";
    },
  },
};
</script>

<style scoped></style>
