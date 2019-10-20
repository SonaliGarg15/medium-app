<template>
  <div>
    <div v-if="isLoading" class="article-preview">Loading articles...</div>
    <div v-else>
      <div v-if="articles.length === 0" class="article-preview">No articles are here... yet.</div>
      <ArticlePreview
        v-for="(article, index) in articles"
        :article="article"
        :key="article.title + index"
      />
    </div>
  </div>
</template>

<script>
import ArticlePreview from "./ArticlePreview";

export default {
  components: {
    ArticlePreview
  },
  props: {
    favorited: {
      type: String,
      required: false
    },
    author: {
      type: String,
      required: false
    },
    type: {
      type: String,
      required: false,
      default: "all"
    }
  },
  computed: {
    articles() {
      return this.$store.getters["home/articles"];
    },
    isLoading:function(){
      return this.$store.getters["home/isLoading"];
    },
    articlesCount:function(){
      return this.$store.getters["home/count"];
    },
    listConfiguration() {
      const { type } = this;
      const filters = {};
      if (this.author) {
        filters.author = this.author;
      }
      if (this.favorited) {
        filters.favorited = this.favorited;
      }

      return {
        type,
        filters
      };
    }
  },
  mounted() {
    this.fetchArticles();
  },
  methods: {
    fetchArticles() {
      this.$store.dispatch("home/fetchArticles", this.listConfiguration);
    }
  }
};
</script>