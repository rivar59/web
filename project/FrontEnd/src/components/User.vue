<template>
  <tr :class="{
    'uk-alert-primary': user.role === 'admin',
    'uk-alert-danger': user.role === 'banned',
  }">
    <td class="uk-flex uk-flex-column">
      <span class="uk-text-bolder">
        {{ user.fullName }}
        <span class="uk-text-muted" v-if="user.id === connectedUser._id">(you)</span>
      </span>
      <span>{{ formatDate(user.createdOn) }}</span>
    </td>
    <td>
      <span>{{ user.email }}</span>
    </td>
    <td>
      <button v-if="user.role === 'user' && user.id !== connectedUser._id"
              class="uk-button uk-button-danger uk-width-1-1" @click="banUser(user)">
        Ban
      </button>
      <button v-if="user.role === 'banned' && user.id !== connectedUser._id"
              class="uk-button uk-button-danger uk-width-1-1" @click="unbanUser(user)">
        Unban
      </button>
    </td>
  </tr>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import moment from 'moment';

export default {
  name: 'User',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState(['users']),
    ...mapGetters({
      specificUser: 'specificUser',
      connectedUser: 'decodedInstance',
    }),
    user() {
      return this.specificUser(this.id);
    },
  },
  methods: {
    ...mapActions({
      banUser: 'banUser',
      unbanUser: 'unbanUser',
    }),
    formatDate(date) {
      return moment(date).fromNow();
    },
  },
};
</script>
