<template>
  <div class="uk-position-absolute uk-position-left favorite"
       :class="{'favorite-disabled': disabled}">
    <div class="uk-flex">
      <button @click="!disabled ? toggleFavComment(comment) : null">Add to basket</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Favorite',
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
      toggleFavComment: 'toggleFavComment',
    }),
  },
};
</script>

<style lang="scss" scoped>
.favorite {
  user-select: none;

  top: -1.5em;
  left: .5em;

  &.favorite-disabled {
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
