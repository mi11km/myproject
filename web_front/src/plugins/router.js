import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

import Home from "../views/Home";
import Register from "../views/Register";
import Login from "../views/Login";
import Logout from "../components/Logout";
import Profile from "../views/Profile";
import Search from "../views/Search";
import ClubDetail from "../components/Search/ClubDetail";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history", // todo 本番サーバーではすべてのURLのリクエストに対してindex.htmlを返す設定をする
  routes: [
    { path: "/", component: Home },
    { path: "/register", component: Register, meta: { alreadyLoggedIn: true } },
    { path: "/login", component: Login, meta: { alreadyLoggedIn: true } },
    { path: "/logout", component: Logout },
    { path: "/profile", component: Profile, meta: { requiresAuth: true } },
    { path: "/search", component: Search },
    { path: "/detail/:id", component: ClubDetail, props: true }
  ]
});

/**
 * Routerによって画面遷移する際に毎回実行される
 */
router.beforeEach((to, from, next) => {
  store.commit("message/clear");

  const isLoggedIn = store.getters["auth/isLoggedIn"];
  const token = sessionStorage.getItem("access");
  console.log("isLoggedIn=", isLoggedIn);

  // ログインが必要な画面に遷移しようとした場合
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (isLoggedIn) {
      next();
    } else {
      // まだ認証用トークンが残っていればユーザー情報を再取得
      if (token != null) {
        console.log("User is not logged in. Trying to reload again.");

        store
          .dispatch("auth/reload")
          .then(() => {
            // 再取得できたらそのまま次へ
            console.log("Succeeded to reload. So, free to next.");
            next();
          })
          .catch(() => {
            // 再取得できなければログイン画面へ
            forceToLoginPage(to, from, next);
          });
      } else {
        // 認証用トークンが無い場合は、ログイン画面へ
        forceToLoginPage(to, from, next);
      }
    }
  } else if (to.matched.some(record => record.meta.alreadyLoggedIn)) {
    // ログインしている状態でログインor登録画面に行こうとした場合
    if (isLoggedIn) {
      next("/");
    } else {
      next();
    }
  } else {
    // ログインが不要な画面であればそのまま次へ
    next();
  }
});

/**
 * ログイン画面へ強制送還
 */
function forceToLoginPage(to, from, next) {
  console.log("Force user to login page.");
  next({
    path: "/login",
    // 遷移先のURLはクエリ文字列として付加
    query: { next: to.fullPath }
  });
}

export default router;
