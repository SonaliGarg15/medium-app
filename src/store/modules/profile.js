import { api } from "../api";
import Vue from "vue";

export default {
  namespaced: true,
  state: {
    profile: {}
  },
  getters: {
    profile(state) {
      return state.profile;
    }
  },
  mutations: {   
    setProfile(state, profile) {
      state.profile = profile;
    }
  },
  actions: {
    fetch(context, username) {
      return api.get(`/profiles/${username.username}`)
        .then(({data}) => {
            context.commit("setProfile", data.profile);
        });
    }
  }
};
