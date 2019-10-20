<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
           <ul v-if="errors" class="error-messages">
            <li v-for="(v, k) in errors" :key="k">{{ k }} {{ v | error }}</li>
          </ul>
          <form @submit.prevent="onPublishOrEdit(article.slug)">
            <fieldset :disabled="inProgress">
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  v-model="article.title"
                  placeholder="Article Title"
                >
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  v-model="article.description"
                  placeholder="What's this article about?"
                >
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  v-model="article.body"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  v-model="tagInput"
                  @keypress.enter.prevent="addTag(tagInput)"
                >
                <div class="tag-list">
                  <span
                    class="tag-default tag-pill"
                    v-for="(tag, index) of article.tagList"
                    :key="tag + index"
                  >
                    <i class="ion-close-round" @click="removeTag(tag)"></i>
                    {{ tag }}
                  </span>
                </div>
              </fieldset>
              <button
                :disabled="inProgress"
                class="btn btn-lg pull-xs-right btn-primary"
                type="submit"
              >Publish Article</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import { mapGetters } from "vuex";
export default {
  name: "article-edit",
  props: {
    previousArticle: {
      type: Object,
      required: false
    }
  },
  async beforeRouteUpdate(to, from, next) {
    await store.dispatch("articles/resetArticleState");
    return next();
  },
  async beforeRouteEnter(to, from, next) {
    await store.dispatch("articles/resetArticleState");
    if (to.params.slug !== undefined) {
      await store.dispatch(
        "articles/fetchArticle",
        to.params.slug,
        to.params.previousArticle
      );
    }
    return next();
  },
  async beforeRouteLeave(to, from, next) {
    await store.dispatch("articles/resetArticleState");
    next();
  },
  data() {
    return {
      tagInput: null,
      inProgress: false,
      errors: {}
    };
  },
  computed: {
    article() {
      return this.$store.getters["articles/article"];
    },
    currentUser:function(){
      return this.$store.getters["users/currentUser"];
    }
  },
  methods: {
    onPublishOrEdit(slug) {
      let method = slug ? "articles/editArticle" : "articles/publishArticle";
      this.inProgress = true;
      this.$store
        .dispatch(method, this.article)
        .then(({ data }) => {
          this.inProgress = false;
          this.errors = {};
          this.$router.push({
            name: "article-view",
            params: { slug: data.article.slug }
          });
        })
        .catch(({ response }) => {
          this.inProgress = false;
          this.errors = response.data.errors;
        });
    },
    removeTag(tag) {
      this.$store.dispatch("articles/addEditTagToArticle", tag);
    },
    addTag(tag) {
      this.$store.dispatch("articles/addEditRemoveTagFromArticle", tag);
      this.tagInput = null;
    }
  }
};
</script>

