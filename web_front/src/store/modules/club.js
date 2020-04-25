import api from "../../plugins/api";
import store from "../index";

const authclub = {
  namespaced: true,
  state: {
    choiceSelector: {
      kinds: ["運動系", "文化系", "技術系", "音楽系", "委員会系", "その他"],
      approval: ["公認", "非公認"]
    },
    authClubId: null,
    clubData: null
  },
  getters: {
    choiceSelector: state => state.choiceSelector,
    authClubId: state => state.authClubId,
    clubData: state => state.clubData
  },
  mutations: {
    set(state, clubData) {
      state.authClubId = clubData.id;
      state.clubData = clubData;
    },
    clear(state) {
      state.authClubId = null;
    }
  },
  actions: {
    /**
     * サークル登録
     */
    register({ commit }, clubData) {
      store.commit("message/clear");

      const params = new FormData();
      params.append("user", store.getters["auth/userId"]);
      params.append("name", clubData.name);
      params.append("university", clubData.university);
      params.append("kind", clubData.kind);
      params.append("is_officially_approved", clubData.is_officially_approved);
      params.append("image", clubData.image);

      api
        .post("/clubs/", params)
        .then(response => {
          commit("set", response.data);
        })
        .catch(error => {
          store.commit("message/setErrorMessage", error.response.data);
        });
    },
    /**
     * サークル情報取得(userのidから)
     */
    fetch({ commit }) {
      api.get("/clubs/").then(response => {
        const clubData = response.data;
        const user = store.getters["auth/userId"];
        for (let data of clubData) {
          if (data.user === user) {
            commit("set", data);
            return data;
          }
        }
      });
    },
    /**
     * サークル情報変更
     */
    update({ getters, dispatch }, clubData) {
      store.commit("message/clear");
      return new Promise((resolve, reject) => {
        const clubId = getters.authClubId;
        api
          .patch(`/clubs/${clubId}/`, clubData)
          .then(response => {
            console.log(response);
            dispatch("fetch");
            store.commit("message/setSuccessMessage", "変更しました");
            resolve();
          })
          .catch(error => {
            console.log(error);
            store.commit("message/setErrorMessage", error.response.data);
            reject();
          });
      });
    }
  }
};

export default authclub;
