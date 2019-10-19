<template>
  <div class="article-meta">
    <router-link :to="{ name: 'profile', params: { username: article.author.username } }">
      <img :src="article.author.image" />
    </router-link>
    <div class="info">
      <router-link
        :to="{ name: 'profile', params: { username: article.author.username } }"
        class="author"
      >{{ article.author.username }}</router-link>
      <span class="date">{{ article.createdAt }}</span>
    </div>
    <template v-if="actions">
      <article-actions :article="article" :isAuthor="isCurrentUser()"></article-actions>
    </template>
    <template v-else>
      <button
        class="btn btn-sm pull-xs-right"
        v-if="!actions"
        @click="toggleFavorite"
        :class="{
          'btn-primary': article.favorited,
          'btn-outline-primary': !article.favorited
        }"
      >
        <i class="ion-heart"></i>
        <span class="counter">{{ article.favoritesCount }}</span>
      </button>
    </template>
  </div>
</template>

<script>
import ArticleActions from "./ArticleActions";
export default {
  name: "ArticleMeta",
  props: {
    article: {
      type: Object,
      required: true
    },
    actions: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  components: {
    ArticleActions
  },
  computed: {
    currentUser: function() {
      return this.$store.getters["users/currentUser"];
    },
    isAuthenticated: function() {
      return this.$store.getters["users/isAuthenticated"];
    }
  },
  methods: {
    isCurrentUser() {
      if (this.currentUser) {
        if (this.currentUser.username && this.article.author.username) {
          return this.currentUser.username === this.article.author.username;
        }
      }
      return false;
    },
    toggleFavorite() {
      if (!this.isAuthenticated) {
        this.$router.push({ name: "login" });
        return;
      }
      const action = this.article.favorited
        ? "articles/removeFavorite"
        : "articles/addFavorite";
      this.$store.dispatch(action, this.article.slug);
    }
  }
};
</script>
