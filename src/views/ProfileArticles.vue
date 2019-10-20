<template>
  <div class="profile-page">
    <ArticlesList :author="author"></ArticlesList>
  </div>
</template>

<script>
import ArticlesList from "@/components/ArticlesList";

export default {
  name: "ProfileArticles",
  components: {
    ArticlesList
  },
  computed: {
    author() {
      return this.$route.params.username;
    }
  }
};
</script>
