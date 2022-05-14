<template>
  <div>
    <div class="uk-overflow-auto">
      <form class="uk-margin uk-flex">
        <input v-model="query" type="search" class="uk-input" placeholder="Author...">
        <button @click.prevent="findComments(query)" class="uk-button uk-button-primary">
          Search
        </button>
      </form>

      <div class="uk-margin uk-grid-match" uk-grid v-if="allComments.length">
        <div class="uk-width-1-1" v-for="comment in allComments" :key="comment.id">
          <Comment :id="comment.id" />
        </div>
      </div>

      <div v-else>
        <span>No result...</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import Comment from '../components/Comment.vue';

export default {
  name: 'CommentList',
  data() {
    return {
      query: '',
    };
  },
  components: {
    Comment,
  },
  computed: {
    ...mapState(['comments']),
    ...mapGetters({
      allComments: 'allComments',
    }),
  },
  methods: {
    ...mapActions({
      findComments: 'findComments',
    }),
  },
  created() {
    this.$store.dispatch('loadComments');
  },
};
</script>
