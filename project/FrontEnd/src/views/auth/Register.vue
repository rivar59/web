<template>
  <div>
    <div class="uk-margin uk-width-large uk-margin-auto uk-card
         uk-card-default uk-card-body uk-box-shadow-large">
      <h3 class="uk-card-title uk-text-center">Create an account!</h3>

      <div v-if="apiErrors('register')" class="uk-alert uk-alert-danger">
        <ul>
          <li v-for="message in apiErrors('register')" :key="message">
            <span>{{ message }}</span>
          </li>
        </ul>
      </div>

      <form>
        <div class="uk-margin">
          <div class="uk-inline uk-width-1-1">
            <span class="uk-form-icon" uk-icon="icon: user"></span>
            <input placeholder="Full name" class="uk-input uk-form-large"
                   :class="{'uk-form-danger': errors.includes('fullName')}"
                   v-model="form.fullName" type="text" required>
          </div>
        </div>

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
                   :class="{'uk-form-danger': errors.includes('password1')}"
                   v-model="form.password1" type="password" required>
          </div>
        </div>

        <div class="uk-margin">
          <div class="uk-inline uk-width-1-1">
            <span class="uk-form-icon" uk-icon="icon: lock"></span>
            <input placeholder="Retype password" class="uk-input uk-form-large"
                   :class="{'uk-form-danger': errors.includes('password2')}"
                   v-model="form.password2" type="password" required>
          </div>
        </div>

        <div class="uk-margin">
          <button @click.prevent="register"
                  class="uk-button uk-button-primary uk-button-large uk-width-1-1">
            Register
          </button>
        </div>

        <router-link to="/login" v-slot="{ href, navigate }" custom>
          <div class="uk-text-small uk-text-center">
            Already have an account? <a :href="href" @click="navigate">Log in</a>
          </div>
        </router-link>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Register',
  data() {
    return {
      form: {
        fullName: '',
        email: '',
        password1: '',
        password2: '',
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
      storeRegister: 'register',
    }),
    register() {
      this.errors = [];

      if (this.form.fullName.trim() === '') this.errors.push('fullName');
      if (this.form.email.trim() === '') this.errors.push('email');
      if (this.form.password1.trim() === '') this.errors.push('password1');
      if (this.form.password2.trim() === '') this.errors.push('password2');

      if (this.errors.length > 0) return;

      this.storeRegister(this.form);
    },
  },
};
</script>
