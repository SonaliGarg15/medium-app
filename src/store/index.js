import Vue from "vue";
import Vuex from "vuex";
import home from "./modules/home";
import users from "./modules/users";
import articles from "./modules/articles";
import profile from "./modules/profile";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    home,
    users,
    articles,
    profile
  }
});
