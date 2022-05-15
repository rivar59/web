<template>
  <div>
    <div class="uk-overflow-auto">
      <form class="uk-margin uk-flex">
        <input v-model="query" type="search" class="uk-input" placeholder="Item...">
        <button @click.prevent="findComments(query); clear1();" class="uk-button uk-button-primary">
          Search
        </button>
        <select name="type" v-model="type">
        <option>Lens</option>
        <option>Camera</option>
        <option>Backpack</option>
        <option>Other</option>
      </select>
        <button @click.prevent="findType(type); clear2();" class="uk-button uk-button-primary">
          Search
        </button>
      </form>
      <button @click="clear(); loadComments();" class="uk-button uk-button-primary">Clear</button>

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
      type: '',
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
      findType: 'findType',
      loadComments: 'loadComments',
    }),
    clear1() {
      console.log('hallo');
      this.type = '';
    },
    clear2() {
      console.log('hallo2');
      this.query = '';
    },
    clear() {
      console.log(this.type);
      console.log('hallo2');
      this.query = '';
      this.type = '';
    },
  },
  created() {
    this.$store.dispatch('loadComments');
  },
};
</script>
