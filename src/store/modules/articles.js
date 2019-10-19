import { api } from "../api";
import Vue from "vue";

const initialState = {
  article: {
    author: {},
    title: "",
    description: "",
    body: "",
    tagList: []
  },
  comments: []
};

export default {
  namespaced: true,
  state: {
    ...initialState
  },
  getters: {
    article(state) {
      return state.article;
    }
  },
  mutations: {
    addTag(state, tag) {
      state.article.tagList = state.article.tagList.concat([tag]);
    },
    removeTag(state, tag) {
      state.article.tagList = state.article.tagList.filter(t => t !== tag);
    },
    resetState(state) {
      for (let s in state) {
        Vue.set(state, s, initialState[s]);
      }
    },
    setArticle(state, article) {
      state.article = article;
    }
  },
  actions: {
    publishArticle(params) {
      return api.post("/articles", {
        article: params.getters.article
      });
    },
    async fetchArticle(context, slug) {
      debugger;
      const response = await api.get(`/articles/${slug}`);
      context.commit("setArticle", response.data.article);
      return response;
    },
    addEditTagToArticle(context, tag) {
      context.commit("addTag", tag);
    },
    addEditRemoveTagToArticle(context, tag) {
      context.commit("removeTag", tag);
    },
    resetArticleState({ commit }) {
      commit("resetState");
    }
  }
};
