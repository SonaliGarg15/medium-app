<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">Medium</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a
                  class="nav-link"
                  v-if="username"
                  @click="setFeed('user')"
                  :class="{ active: activeFeed === 'user'}"
                >Your Feed</a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  @click="setFeed('global')"
                  :class="{ active: activeFeed === 'global'}"
                >Global Feed</a>
              </li>
              <li class="nav-item pull-xs-right">
                <input class="form-control" v-model="selectedTag" v-on:change="onTagSelected(selectedTag)" placeholder="Write tag and press enter"/>              
              </li>
            </ul>
          </div>
          <ArticlePreview v-for="article in articles" :key="article.slug" :article="article"></ArticlePreview>
        </div>
        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <div class="tag-list">
              <ul class="tag-list" v-for="(tag, index) in tags" :name="tag" :key="index">
                <li class="tag-pill tag-default"
                >{{ tag }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArticlePreview from "@/components/ArticlePreview.vue";

export default {
  components: {
    ArticlePreview
  },
  methods: {
    setFeed(feedType) {
      if (feedType === "global") {
        this.activeFeed = "global";
        this.$store.dispatch("home/getGlobalFeed");
      } else if (feedType === "user") {
        this.activeFeed = "user";
        this.$store.dispatch("home/getUserFeed");
      }
    },
    onTagSelected(selectedTag) {
      this.$store.dispatch("home/fetchArticles", {filters: {tag: selectedTag}});
    }
  },
  created() {
    this.setFeed("global");
  },
  computed: {
    articles: function() {
      return this.$store.getters["home/articles"] || [];
    },
    tags: function() {
      return this.$store.getters["home/tags"] || [];
    },
    username: function() {
      return this.$store.getters["users/username"];
    }
  },
  data: function() {
    return {
      activeFeed: "global",
      isTagSelected: false,
      selectedTag: ""
    };
  },
  mounted() {
    this.$store.dispatch("home/fetchTags");
  }
};
</script>

