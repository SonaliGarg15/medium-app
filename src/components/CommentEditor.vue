<template>
  <div>
    <form class="card comment-form" @submit.prevent="onSubmitComment(slug, comment)">
      <div class="card-block">
        <textarea class="form-control" v-model="comment" placeholder="Write a comment..." rows="3"></textarea>
      </div>
      <div class="card-footer">
        <img :src="userImage" class="comment-author-img" />
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
            type: String, required: true
        },
        content: {
             type: String, required: false
        },
        userImage: {
            type: String, required: false
        }
    },
    data() {
        return {
            comment: this.content || null
        }
    },
    methods: {
        onSubmitComment(slug, comment) {
            this.$store.
            dispatch("articles/createComment", { slug, comment })
            .then(() => {
                this.comment = null;
            })
        }
    }
}
</script>

