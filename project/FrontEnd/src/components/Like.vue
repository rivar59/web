<template>
  <div class="uk-position-absolute uk-position-right like"
       :class="{'like-disabled': disabled}">
    <div class="uk-flex">
      <a class="uk-text-success icon" @click="!disabled ? likeComment(comment) : null">
        <IconThumbsUp :filled="comment.likes.includes(user?._id)"/>
      </a>
      <span class="uk-margin-small-left uk-margin-small-right">
        {{ comment.likes.length - comment.unlikes.length }}
      </span>
      <a class="uk-text-danger icon" @click="!disabled ? unlikeComment(comment) : null">
        <IconThumbsDown :filled="comment.unlikes.includes(user?._id)"/>
      </a>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import IconThumbsUp from '../icons/IconThumbsUp.vue';
import IconThumbsDown from '../icons/IconThumbsDown.vue';

export default {
  name: 'Like',
  props: {
    id: {
      type: String,
      required: false,
    },
    disabled: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    IconThumbsUp,
    IconThumbsDown,
  },
  computed: {
    ...mapGetters({
      specificComment: 'specificComment',
      user: 'decodedInstance',
    }),
    comment() {
      return this.specificComment(this.id);
    },
  },
  methods: {
    ...mapActions({
      likeComment: 'likeComment',
      unlikeComment: 'unlikeComment',
    }),
  },
};
</script>

<style lang="scss" scoped>
.like {
  user-select: none;

  &.like-disabled {
    .icon {
      opacity: .4;
      cursor: default;

      &:hover {
        opacity: .4;
      }
    }
  }

  .icon {
    height: 1.2em;
    width: 1.2em;

    &:hover {
      opacity: .7;
    }

    &:active {
      opacity: .4;
    }
  }
}
</style>
