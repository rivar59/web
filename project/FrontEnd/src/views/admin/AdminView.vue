<template>
  <div>
    <table class="uk-table uk-table-middle uk-table-divider"
           v-if="isConnected && user.role === 'admin'">
      <thead>
      <tr>
        <th class="uk-width-small">Full Name</th>
        <th class="uk-table-expand">Email</th>
        <th class="uk-width-small uk-text-center">Action</th>
      </tr>
      </thead>
      <tbody v-if="allUsers.length">
        <User v-for="user in allUsers" :key="user.id" :id="user.id"/>
      </tbody>
      <tbody v-else>
      <tr>
        <td colspan="3">No result...</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import User from '../../components/User.vue';

export default {
  name: 'AdminView',
  components: {
    User,
  },
  computed: {
    ...mapState(['users']),
    ...mapGetters({
      allUsers: 'allUsers',
      isConnected: 'isConnected',
      user: 'decodedInstance',
    }),
  },
  created() {
    this.$store.dispatch('loadUsers');
  },
};
</script>
