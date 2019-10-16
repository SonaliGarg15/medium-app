<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <a href>Have an account?</a>
          </p>

          <ul class="error-messages">
            <li>That email is already taken</li>
          </ul>

          <form>
            <fieldset class="form-group">
              <input class="form-control form-control-lg" v-model="username" type="text" placeholder="Your Name">
            </fieldset>
           <fieldset class="form-group">
              <input class="form-control form-control-lg" v-model="email" type="text" placeholder="Email">
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg" v-model="password" type="password" placeholder="Password">
            </fieldset>
            <button @click="onSubmit" class="btn btn-lg btn-primary pull-xs-right">Sign up</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      email: "",
      password: ""
    };
  },
  methods: {
    onSubmit() {
      this.$store.dispatch("users/registerUser", {
        email: this.email,
        password: this.password,
        username: this.username
      })
      .then(() => this.$router.push({ name: "home" }));
    }
  }
};
</script>

