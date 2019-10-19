<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>

        <ArticleMeta :article="article" :actions="true"></ArticleMeta>
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12">
          <div v-html="parseMarkdown(article.body)"></div>
        </div>
      </div>

      <hr />

      <div class="article-actions">
        <ArticleMeta :article="article" :actions="true"></ArticleMeta>
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <form class="card comment-form">
            <div class="card-block">
              <textarea class="form-control" placeholder="Write a comment..." rows="3"></textarea>
            </div>
            <div class="card-footer">
              <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
              <button class="btn btn-sm btn-primary">Post Comment</button>
            </div>
          </form>

          <div class="card">
            <div class="card-block">
              <p
                class="card-text"
              >With supporting text below as a natural lead-in to additional content.</p>
            </div>
            <div class="card-footer">
              <a href class="comment-author">
                <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
              </a>
              &nbsp;
              <a href class="comment-author">Jacob Schmidt</a>
              <span class="date-posted">Dec 29th</span>
            </div>
          </div>

          <div class="card">
            <div class="card-block">
              <p
                class="card-text"
              >With supporting text below as a natural lead-in to additional content.</p>
            </div>
            <div class="card-footer">
              <a href class="comment-author">
                <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
              </a>
              &nbsp;
              <a href class="comment-author">Jacob Schmidt</a>
              <span class="date-posted">Dec 29th</span>
              <span class="mod-options">
                <i class="ion-edit"></i>
                <i class="ion-trash-a"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import marked from "marked";
import store from "@/store";
import ArticleMeta from "@/components/ArticleMeta.vue";

export default {
  name: "article-view",
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  components: {
    ArticleMeta
  },
  beforeRouteEnter(to, from, next) {
    debugger;
    Promise.all([store.dispatch("articles/fetchArticle", to.params.slug)]).then(
      () => {
        next();
      }
    );
  },
  computed: {
    article() {
      return this.$store.getters["articles/article"];
    },
    currentUser: function() {
      return this.$store.getters["users/currentUser"];
    },
    isAuthenticated: function() {
      return this.$store.getters["users/isAuthenticated"];
    }
  },
  methods: {
    parseMarkdown(content) {
      return marked(content);
    }
  }
};
</script>
