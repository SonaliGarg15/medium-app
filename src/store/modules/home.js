import { api } from "../api";

export default {
  namespaced: true,
  state: {
    articles: [],
    isLoading: true,
    count: 0,
    tags: []
  },
  getters:{
    articles(state){
      return state.articles;
    },
    isLoading(state) {
      return state.isLoading;
    },
    tags(state) {
      return state.tags;
    }
  },
  mutations: {
    articles(state, { articles, articlesCount }) {
      state.articles = articles;
      state.count = articlesCount;
    },
    setTags(state, tags){
      state.tags = tags;
    },
    fetchStart(state) {
      state.isLoading = true;
    },
    fetchEnd(state, { articles, articlesCount }) {
      state.articles = articles;
      state.count = articlesCount;
      state.isLoading = false;
    },
    updateArticlesInList(state, data) {
      state.articles = state.articles.map(article => {
        if(article.slug != data.slug) {
          return article;
        }
        article.favorited = data.favorited;
        article.favoritesCount = data.favoritesCount;
        return article;
      });
    }
  },
  actions: {    
    async fetchArticles({ commit }, params) {
      commit("fetchStart");
      let route = "/articles";
      if (params) {
        const {
          tag = null,
          author = null,
          favorited = null,
          page = 1
        } = params.filters;
        route += tag ? `?tag=${tag}&` : "";
        route += author ? `?author=${author}&` : "";
        route += favorited ? `?favorited=${favorited}&` : "";
        route += page ? `?offset=${page - 1 + 50}&limit=50` : "";
      }
     return api.get(route)
        .then(({data}) => {
          commit("fetchEnd", data);
        });
    },
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
        route += page ? `?offset=${page - 1 + 50}&limit=50` : "";
      }
      const response = await api.get(route);
      commit("articles", response.data);
    },
    async getUserFeed({ commit }, payload = { page: 1 }) {
      let route = "/articles/feed";
      if (payload) {
        const { page = 1 } = payload;
        route += page ? `?offset=${page - 1 + 20}&limit=20` : "";
      }
      const response = await api.get(route);
      commit("articles", response.data);
    },
    fetchTags({ commit }) {
      return api.get("/tags").then(({ data }) => {
        commit("setTags", data.tags);
      })
    }
  }
};
