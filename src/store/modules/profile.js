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
    },
    follow(context, username) {
        return api.post(`/profiles/${username}/follow`, username)
        .then(({data}) => {
            context.commit("setProfile", data.profile);
        });
    },
    unfollow(context, username) {
        return api.delete(`/profiles/${username}/follow`, username)
        .then(({data}) => {
            context.commit("setProfile", data.profile);
        });
    }
  }
};
