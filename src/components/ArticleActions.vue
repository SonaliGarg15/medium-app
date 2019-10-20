<template>
  <span v-if="isAuthor">
    <router-link class="btn btn-sm btn-outline-secondary" :to="editArticleLink">
      <i class="ion-edit"></i> <span>&nbsp;Edit Article</span>
    </router-link>
    <span>&nbsp;&nbsp;</span>
    <button class="btn btn-outline-danger btn-sm" @click="deleteArticle">
      <i class="ion-trash-a"></i> <span>&nbsp;Delete Article</span>
    </button>
  </span>
  <span v-else>    
    <button
      class="btn btn-sm"
      @click="toggleFavorite"
      :class="toggleFavoriteButtonClasses"
    >
      <i class="ion-heart"></i> <span>&nbsp;</span>
      <span v-text="favoriteArticleLabel" /> <span>&nbsp;</span>
      <span class="counter"> {{ article.favoritesCount}} </span>
    </button>
  </span>
</template>

<script>
export default {
  name: "ArticleActions",
  props: {
    article: { type: Object, required: true },
    isAuthor: { type: Boolean, required: true }
  },
  computed: {
    isAuthenticated: function() {
      return this.$store.getters["users/isAuthenticated"];
    },
    profile: function() {
      return this.$store.getters["profile/profile"];
    },
    username: function() {
      return this.$store.getters["users/username"];
    },
    editArticleLink() {
      return { name: "article-edit", params: { slug: this.article.slug } };
    },
    toggleFavoriteButtonClasses() {
      return {
        "btn-primary": this.article.favorited,
        "btn-outline-primary": !this.article.favorited
      };
    },
    favoriteArticleLabel() {
      return this.article.favorited ? "Unfavorite Article" : "Favorite Article";
    }
  },
  methods: {
    toggleFavorite() {
      if (!this.isAuthenticated) {
        this.$router.push({ name: "login" });
        return;
      }
      const action = this.article.favorited ? "articles/removeFavorite" : "articles/addFavorite";
      this.$store.dispatch(action, this.article.slug);
    },    
    async deleteArticle() {    
        await this.$store.dispatch("articles/deleteArticle", this.article.slug)
        .then(() => this.$router.push({ name: "profile", params: { username: this.username } }));      
    }
  }
};
</script>
