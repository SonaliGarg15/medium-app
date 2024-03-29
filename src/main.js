import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/main.css"
import ErrorFilter from "./common/error.filter";

Vue.config.productionTip = false;

Vue.filter("error", ErrorFilter);

router.beforeEach((to, from, next) =>
  Promise.all([store.dispatch("users/userLoggedIn")]).then(next)
);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
