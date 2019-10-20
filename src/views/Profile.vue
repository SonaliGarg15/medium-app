<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <p>{{ profile.bio }}</p>
            <div v-if="isCurrentUser()">
              <router-link
                class="btn btn-sm btn-outline-secondary action-btn"
                :to="{ name: 'settings' }"
              >
                <i class="ion-gear-a"></i> Edit Profile Settings
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  active-class="active"
                  exact
                  :to="{ name: 'profile'}"
                >My Articles</router-link>
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  active-class="active"
                  exact
                  :to="{ name: 'profile-favorites'}"
                >Favorited Articles</router-link>
              </li>
            </ul>
          </div>
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  mounted() {
    this.$store.dispatch("profile/fetch", this.$route.params);
  },
  computed: {
    username: function() {
      return this.$store.getters["users/username"];
    },
    currentUser: function() {
      return this.$store.getters["users/currentUser"];
    },
    isAuthenticated: function() {
      return this.$store.getters["users/isAuthenticated"];
    },
    profile: function() {
      return this.$store.getters["profile/profile"];
    }
  },
  methods: {
    isCurrentUser() {
      if (this.currentUser.username && this.profile.username) {
        return this.currentUser.username === this.profile.username;
      }
      return false;
    }
  },
  watch: {
    $route(to) {
      this.$store.dispatch("profile/fetch", to.params);
    }
  }
};
</script>

