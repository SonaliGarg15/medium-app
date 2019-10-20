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
    },
    comments(state) {
      return state.comments;
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
    },
    setComments(state, comments) {
      state.comments = comments;
    }
  },
  actions: {
    publishArticle(params) {
      return api.post("/articles", {
        article: params.getters.article
      });
    },
    async editArticle(context, params) {
      return api.put(`/articles/${params.slug}`, { article : params});
    },
    async deleteArticle(context, slug) {
      return api.delete(`/articles/${slug}`);
    },
    async fetchArticle(context, slug, prevArticle) {
      if (prevArticle !== undefined) {
        return context.commit("setArticle", prevArticle);
      }
      const response = await api.get(`/articles/${slug}`);
      context.commit("setArticle", response.data.article);   
      return response;
    },
    async fetchComments(context, slug) {
      const response = await api.get(`/articles/${slug}/comments`);
      context.commit("setComments", response.data.comments);
      return response.data.comments;
    },
    async createComment(context, payload) {
      await api.post(`/articles/${payload.slug}/comments`, {
        comment : {body: payload.comment}
      });
      context.dispatch("fetchComments", payload.slug);
    },
    async deleteComment(context, payload) {
      await api.delete(`/articles/${payload.slug}/comments/${payload.commentId}`);
      context.dispatch("fetchComments", payload.slug);
    },
    async removeFavorite(context, slug){
      const response = await api.delete(`articles/${slug}/favorite`); 
      context.commit("home/updateArticlesInList", response.data.article, {root: true});
      context.commit("setArticle", response.data.article);   
    },
    async addFavorite(context, slug){
      const response = await  api.post(`articles/${slug}/favorite`);
      context.commit("home/updateArticlesInList", response.data.article, {root: true});
      context.commit("setArticle", response.data.article);   
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
