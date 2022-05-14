<template>
  <div>
    <div class="uk-margin uk-width-large uk-margin-auto uk-card
         uk-card-default uk-card-body uk-box-shadow-large">
      <h3 class="uk-card-title uk-text-center">Welcome back!</h3>

      <div v-if="apiErrors('login')" class="uk-alert uk-alert-danger">
        <ul>
          <li v-for="message in apiErrors('login')" :key="message">
            <span>{{ message }}</span>
          </li>
        </ul>
      </div>

      <form>
        <div class="uk-margin">
          <div class="uk-inline uk-width-1-1">
            <span class="uk-form-icon" uk-icon="icon: mail"></span>
            <input placeholder="Email" class="uk-input uk-form-large"
                   :class="{'uk-form-danger': errors.includes('email')}"
                   v-model="form.email" type="email" required>
          </div>
        </div>

        <div class="uk-margin">
          <div class="uk-inline uk-width-1-1">
            <span class="uk-form-icon" uk-icon="icon: lock"></span>
            <input placeholder="Password" class="uk-input uk-form-large"
                   :class="{'uk-form-danger': errors.includes('password')}"
                   v-model="form.password" type="password" required>
          </div>
        </div>

        <div class="uk-margin">
          <button @click.prevent="login"
                  class="uk-button uk-button-primary uk-button-large uk-width-1-1">
            Login
          </button>
        </div>

        <router-link to="/register" v-slot="{ href, navigate }" custom>
          <div class="uk-text-small uk-text-center">
            Not registered? <a :href="href" @click="navigate">Create an account</a>
          </div>
        </router-link>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      errors: [],
    };
  },
  computed: {
    ...mapGetters({
      apiErrors: 'userErrors',
    }),
  },
  methods: {
    ...mapActions({
      storeLogin: 'login',
    }),
    login() {
      this.errors = [];

      if (this.form.email.trim() === '') this.errors.push('email');
      if (this.form.password.trim() === '') this.errors.push('password');

      if (this.errors.length > 0) return;

      this.storeLogin(this.form);
    },
  },
};
</script>
