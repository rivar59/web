<template>
  <div id="nav">
    <nav class="uk-navbar-container" uk-navbar>
      <div class="uk-navbar-left">
        <ul class="uk-navbar-nav">
          <router-link to="/" custom
                       v-slot="{ href, navigate, isActive }">
            <li :class="{'uk-active': isActive}">
              <a :href="href" @click="navigate">Home</a>
            </li>
          </router-link>

          <router-link to="/add" custom
                       v-slot="{ href, navigate, isActive }">
            <li :class="{'uk-active': isActive}" v-if="isConnected && user.role === 'admin'">
              <a :href="href" @click="navigate">Add Item</a>
            </li>
          </router-link>
          <router-link to="/mine" custom
                       v-slot="{ href, navigate, isActive }">
            <li :class="{'uk-active': isActive}" v-if="isConnected && user.role !== 'admin'">
              <a :href="href" @click="navigate">My list</a>
            </li>
          </router-link>
          <router-link to="/admin" custom
                       v-slot="{ href, navigate, isActive }">
            <li :class="{'uk-active': isActive}" v-if="isConnected && user.role === 'admin'">
              <a :href="href" @click="navigate">Admin view</a>
            </li>
          </router-link>
        </ul>
      </div>

      <div class="uk-navbar-right">
        <ul class="uk-navbar-nav" v-if="!isConnected">
          <router-link to="/register" custom
                       v-slot="{ href, navigate, isActive }">
            <li :class="{'uk-active': isActive}">
              <a :href="href" @click="navigate">Register</a>
            </li>
          </router-link>
          <router-link to="/login" custom
                       v-slot="{ href, navigate, isActive }">
            <li :class="{'uk-active': isActive}">
              <a :href="href" @click="navigate">Login</a>
            </li>
          </router-link>
        </ul>
        <ul class="uk-navbar-nav" v-else>
          <li>
            <a class="uk-link-reset uk-text-bolder">{{ user?.fullName }}</a>
          </li>
          <li>
            <a @click="logout">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>

  <div class="uk-container uk-margin-top">
    <router-view/>
  </div>
</template>

<script>
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';

import { mapActions, mapGetters } from 'vuex';

UIkit.use(Icons);

export default {
  name: 'App',
  computed: {
    ...mapGetters({
      isConnected: 'isConnected',
      user: 'decodedInstance',
    }),
  },
  methods: {
    ...mapActions({
      logout: 'logout',
    }),
  },
};
</script>

<style>
@import "../node_modules/uikit/dist/css/uikit.min.css";
</style>
