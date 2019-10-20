<template>
  <div>
    <ul v-if="errors" class="error-messages">
      <li v-for="(v, k) in errors" :key="k">{{ k }} {{ v | error }}</li>
    </ul>
    <form class="card comment-form" @submit.prevent="onSubmitComment(slug, comment)">
      <div class="card-block">
        <textarea class="form-control" v-model="comment" placeholder="Write a comment..." rows="3"></textarea>
      </div>
      <div class="card-footer">
        <button class="btn btn-sm btn-primary">Post Comment</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "CommentEditor",
  props: {
    slug: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      comment: this.content || null,
      errors: {}
    };
  },
  methods: {
    onSubmitComment(slug, comment) {
      this.$store
        .dispatch("articles/createComment", { slug, comment })
        .then(() => {
          this.comment = null;
          this.errors = {};
        })
        .catch(({ response }) => {
          this.errors = response.data.errors;
        });
    }
  }
};
</script>

