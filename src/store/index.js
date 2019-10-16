import Vue from "vue";
import Vuex from "vuex";
import articles from "./modules/home";
import users from "./modules/users";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    articles,
    users
  }
});
