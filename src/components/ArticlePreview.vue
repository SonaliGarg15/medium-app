<template>
  <div class="article-preview">
    <div class="article-meta">
      <router-link
        class="nav-link"
        :to="{
              name: 'profile',
              params: { username: article.author.username }
            }"
      >
        <img :src="article.author.image" />
      </router-link>
      <div class="info">
        <router-link
          class="nav-link"
          :to="{
              name: 'profile',
              params: { username: article.author.username }
            }"
        >{{ article.author.username }}</router-link>

        <span class="date">{{ formatDate(article.createdAt) }}</span>
      </div>
      <button
        class="btn btn-sm pull-xs-right"
        @click="toggleFavorite"
        :class="toggleFavoriteButtonClasses"
      >
        <i class="ion-heart"></i>
        {{ article.favoritesCount }}
      </button>
    </div>
    <router-link :to="`/articleView/${article.slug}`" class="preview-link">
      <h1>{{ article.title }}</h1>
      <p>{{ article.description }}</p>
      <span>Read more...</span>
    </router-link>

     <ul class="tag-list pull-xs-right">
            <li  class="tag-default tag-pill tag-outline" v-for="(tag, index) of article.tagList" :key="tag + index">
              <span>{{ tag }}</span>
            </li>
          </ul>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: {
    article: {
      type: Object
    }
  },
  computed: {
    toggleFavoriteButtonClasses() {
      return {
        "btn-primary": this.article.favorited,
        "btn-outline-primary": !this.article.favorited
      };
    }
  },
  methods: {
    formatDate(dateString) {
      return moment(dateString).format("MMMM Do, YYYY");
    },
    toggleFavorite() {
      const action = this.article.favorited ? "articles/removeFavorite" : "articles/addFavorite";
      this.$store.dispatch(action, this.article.slug);
    }
  }
};
</script>

