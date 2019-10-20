<template>
    <div class="profile-page">
        <ArticlesList :favorited="favorited"></ArticlesList>
    </div>    
</template>

<script>
import ArticlesList from "@/components/ArticlesList";

export default {
    name: "ProfileFavorited",
    components : {
        ArticlesList
    },
    computed: {
        favorited() {
            return this.$route.params.username;
        }
    }
};
</script>