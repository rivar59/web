<template>
  <div>
    <div class="uk-margin">
      <ul class="uk-subnav uk-subnav-pill uk-flex-center">
        <li :class="{'uk-active': displayedComments === 'fav'}">
          <a href="#" @click="getFav()">Basket</a>
        </li>
      </ul>

      <div class="uk-margin uk-grid-match"
           uk-grid v-if="allComments.length">
        <div class="uk-width-1-2@m" v-for="comment in allComments" :key="comment.id">
          <Comment :id="comment.id" :not_spoiler="true"/>
          <button key="remove" @click="loadMyFavComments();
          toggleFavCommentdown(comment);">Delete</button>
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
import Comment from '../../components/Comment.vue';

export default {
  name: 'MyList',
  data() {
    return {
      displayedComments: 'mine',
    };
  },
  components: {
    Comment,
  },
  computed: {
    ...mapState(['comments']),
    ...mapGetters({
      allComments: 'allComments',
      user: 'decodedInstance',
    }),
  },
  methods: {
    ...mapActions({
      loadMyComments: 'loadMyComments',
      loadMyFavComments: 'loadMyFavComments',
      toggleFavCommentdown: 'toggleFavCommentdown',
    }),
    getMines() {
      this.loadMyComments();
      this.displayedComments = 'mine';
    },
    getFav() {
      console.log('Hi');
      this.loadMyFavComments();
      this.displayedComments = 'fav';
    },
  },
  created() {
    this.$store.dispatch('loadMyFavComments');
  },
};
</script>
