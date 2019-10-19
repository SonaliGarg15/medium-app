import { api } from "../api";

export default {
  namespaced: true,
  state: {
    articles: [],
    count: 0
  },
  getters:{
    articles(state){
      return state.articles;
    }
  },
  mutations: {
    articles(state, { articles, articlesCount }) {
      state.articles = articles;
      state.count = articlesCount;
    }
  },
  actions: {
    async getGlobalFeed({ commit }, payload = { page: 1 }) {
      let route = "/articles";
      if (payload) {
        const {
          tag = null,
          author = null,
          favorited = null,
          page = 1
        } = payload;
        route += tag ? `?tag=${tag}&` : "";
        route += author ? `?author=${author}&` : "";
        route += favorited ? `?favorited=${favorited}&` : "";
        route += page ? `?offset=${page - 1 + 10}&limit=10` : "";
      }
      const response = await api.get(route);
      commit("articles", response.data);
    },
    async getUserFeed({ commit }, payload = { page: 1 }) {
      let route = "/articles/feed";
      if (payload) {
        const { page = 1 } = payload;
        route += page ? `?offset=${page - 1 + 10}&limit=10` : "";
      }
      const response = await api.get(route);
      commit("articles", response.data);
    }
  }
};
