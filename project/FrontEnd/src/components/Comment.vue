<template>
  <article class="uk-comment uk-comment-primary uk-margin">
    <header class="uk-comment-header">
      <div class="uk-grid-medium uk-flex-middle" uk-grid>
        <div class="uk-width-expand uk-position-relative">

          <h4 class="uk-comment-title uk-margin-remove">
            <span class="uk-margin-small-right">{{ comment.title }}</span>
          </h4>
          {{comment.price}}€<br>
          Category: {{comment.description}}<br>
          <img class="imagevente" :src="comment.url"> <br>
          <div v-if="isConnected && (user.role === 'user')">
            <Favorite :id="comment.id" :disabled="!isConnected"/>
          </div>
        </div>
      </div>
      <div v-if="isConnected && (user.role === 'admin')">
              <button @click="removeComment(comment)">
                Delete
              </button>
      </div>
    </header>
  </article>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import Favorite from './Favorite.vue';

export default {
  name: 'Comment',
  data() {
    return {
      show: this.not_spoiler,
      edit: false,
    };
  },
  props: {
    id: {
      type: String,
      required: false,
    },
    not_spoiler: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  components: {
    Favorite,
  },
  computed: {
    ...mapState(['comments']),
    ...mapGetters({
      specificComment: 'specificComment',
      isConnected: 'isConnected',
      user: 'decodedInstance',
    }),
    comment() {
      return this.specificComment(this.id);
    },
  },
  methods: {
    ...mapActions({
      removeComment: 'removeComment',
      updateComment: 'updateComment',
    }),
    toggleShow() {
      this.show = !this.show;
    },
    toggleEdit() {
      if (this.edit) this.updateComment(this.comment);
      this.edit = !this.edit;
    },
  },
};
</script>

<style scoped>

.imagevente{
    width: 10%;
}

</style>
