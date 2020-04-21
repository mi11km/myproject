import api from "../../plugins/api";
import store from "../index";

const auth = {
  namespaced: true,
  state: {
    username: "",
    isLoggedIn: false,
    userId: null,
  },
  getters: {
    username: (state) => state.username,
    isLoggedIn: (state) => state.isLoggedIn,
    userId: (state) => state.userId,
  },
  mutations: {
    set(state, authData) {
      state.username = authData.user.username;
      state.isLoggedIn = true;
      state.userId = authData.user.id;
    },
    clear(state) {
      state.username = "";
      state.isLoggedIn = false;
      state.userId = null;
      store.commit("club/clear");
    },
  },
  actions: {
    /**
     * ユーザー登録
     */
    register({ dispatch }, authData) {
      store.commit("message/clear");
      return new Promise((resolve, reject) => {
        api
          .post("/auth/users/", authData)
          .then(() => {
            console.log("create user: success");
            resolve("ユーザーを作成しました。");
            return dispatch("login", authData);
          })
          .catch((error) => {
            store.commit("message/setErrorMessage", error.response.data);
            reject(error.response.data);
          });
      });
    },
    /**
     * ログイン
     */
    login({ dispatch }, authData) {
      store.commit("message/clear");
      return new Promise((resolve, reject) => {
        api
          .post("/auth/jwt/create/", {
            username: authData.username,
            password: authData.password,
          })
          .then((response) => {
            // 認証用トークンをlocalStorageに保存
            localStorage.setItem("access", response.data.access);
            // ユーザー情報を取得してstoreのユーザー情報を更新
            dispatch("reload").then((user) => user);
            console.log("logged in: success");
            resolve(response);
          })
          .catch((error) => {
            console.log(error.response);
            store.commit("message/setErrorMessage", "入力情報が間違っています");
            reject(error);
          });
      });
    },
    /**
     * ログアウト
     */
    logout({ commit }) {
      // 認証用トークンをlocalStorageから削除
      localStorage.removeItem("access");
      // storeのユーザー情報をクリア
      commit("clear");
    },
    /**
     * ユーザー情報更新
     */
    reload({ commit }) {
      api.get("/auth/users/me/").then((response) => {
        const user = response.data;
        // storeのユーザー情報を更新
        commit("set", { user: user });
        // storeのサークル情報を更新
        store.dispatch("club/fetch");
        return user;
      });
    },
    /**
     * ユーザー名変更
     */
    changeUsername({ dispatch }, newName) {
      store.commit("message/clear");
      return new Promise((resolve, reject) => {
        api
          .post("/auth/users/set_username/", {
            new_username: newName,
            current_password: "aaaaaa", // todo: 適当でもいいかわからない
          })
          .then((response) => {
            console.log(response);
            dispatch("reload").then((user) => user);
            store.commit("message/setSuccessMessage", "変更しました");
            resolve();
          })
          .catch((error) => {
            console.log(error.response);
            store.commit("message/setErrorMessage", error.response.data);
            reject();
          });
      });
    },
    /**
     * ユーザーを削除 todo なぜかできないstatus500のエラーがでる
     */
    delete(context, password) {
      return new Promise((resolve, reject) => {
        api
          .delete("/auth/users/me/", {
            data: {
              current_password: password,
            },
          })
          .then(() => {
            resolve();
          })
          .catch((error) => {
            console.log(error);
            reject();
          });
      });
    },
  },
};

export default auth;
