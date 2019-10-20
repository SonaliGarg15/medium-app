<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link class="navbar-brand" to="/">Medium</router-link>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <!-- Add "active" class when you're on that page" -->
          <router-link class="nav-link" to="/">Home</router-link>
        </li>
        <li v-if="username" class="nav-item">
          <router-link class="nav-link" to="/article">
            <i class="ion-compose"></i>&nbsp;New Post
          </router-link>
        </li>
        <li v-if="username" class="nav-item">
          <router-link class="nav-link" to="/settings">Settings</router-link>
        </li>
        <li v-if="username == null" class="nav-item">
          <router-link class="nav-link" to="/login">Sign in</router-link>
        </li>
        <li v-if="username == null" class="nav-item">
          <router-link class="nav-link" to="/register">Sign up</router-link>
        </li>
        <li v-if="username" class="nav-item">
          <router-link
            class="nav-link"
            exact
            :to="{
              name: 'profile',
              params: { username: username }
            }"
          >{{ username }}</router-link>
        </li>
        <li v-if="username" class="nav-item nav-link" @click="logout">Logout</li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    username() {
      return this.$store.getters["users/username"];
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("users/logout").then(() => {
        this.$router.push({ name: "home" });
      });
    }
  }
};
</script>