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
      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <CommentEditor v-if="isAuthenticated" :slug="slug"
          :userImage="currentUser.image"></CommentEditor>  
          <p v-else>
            <router-link to="/login">Sign in</router-link>
            or
            <router-link to="/register">sign up</router-link>
            </p>     

            <CommentList
              v-for="(comment, index) in comments"
              :slug="slug"
              :comment="comment"
              :key="index">
              </CommentList>        
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import marked from "marked";
import store from "@/store";
import ArticleMeta from "@/components/ArticleMeta.vue";
import CommentEditor from "@/components/CommentEditor.vue";
import CommentList from "@/components/CommentList.vue";

export default {
  name: "article-view",
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  components: {
    ArticleMeta,
    CommentEditor,
    CommentList
  },
  beforeRouteEnter(to, from, next) {
    Promise.all([
      store.dispatch("articles/fetchArticle", to.params.slug),
      store.dispatch("articles/fetchComments", to.params.slug)
    ]).then(
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
      console.log( this.$store.getters["users/isAuthenticated"]);
      return this.$store.getters["users/isAuthenticated"];
    },
    comments: function() {
      console.log(this.$store.getters["articles/comments"]);
      return this.$store.getters["articles/comments"];
    }
  },
  methods: {
    parseMarkdown(content) {
      return marked(content);
    }
  }
};
</script>
)