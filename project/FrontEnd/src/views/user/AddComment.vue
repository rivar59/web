<template>
  <div>
    <form>
      <fieldset class="uk-fieldset">
        <legend class="uk-legend">Add comment</legend>

        <div v-if="apiErrors('add')" class="uk-alert uk-alert-danger">
          <ul>
            <li v-for="message in apiErrors('add')" :key="message">
              <span>{{ message }}</span>
            </li>
          </ul>
        </div>

        <div class="uk-margin">
          <input v-model="form.title" :class="{'uk-form-danger': errors.includes('title')}"
                 class="uk-input" type="text" placeholder="Title...">
        </div>

        <div class="uk-margin">
          <textarea v-model="form.description"
                    :class="{'uk-form-danger': errors.includes('description')}"
                    class="uk-textarea" rows="1" placeholder="Categorie"></textarea>
        </div>

        <div class="uk-margin">
          <textarea v-model="form.url"
                    :class="{'uk-form-danger': errors.includes('url')}"
                    class="uk-textarea" rows="1" placeholder="url"></textarea>
        </div>

          <div class="uk-margin">
          <textarea v-model="form.price"
                    :class="{'uk-form-danger': errors.includes('price')}"
                    class="uk-textarea" rows="1" placeholder="price"></textarea>
        </div>

        <button @click.prevent="addComment" class="uk-button uk-button-primary">Add</button>
      </fieldset>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'AddComment',
  data() {
    return {
      form: {
        title: '',
        description: '',
        url: '',
        price: '',
      },
      errors: [],
    };
  },
  computed: {
    ...mapGetters({
      apiErrors: 'errors',
    }),
  },
  methods: {
    ...mapActions({
      storeAddComment: 'addComment',
    }),
    addComment() {
      this.errors = [];

      if (this.form.title.trim() === '') this.errors.push('title');
      if (this.form.description.trim() === '') this.errors.push('description');
      if (this.form.url.trim() === '') this.errors.push('url');
      if (this.form.price.trim() === '') this.errors.push('price');

      if (this.errors.length > 0) return;

      this.storeAddComment(this.form);

      this.form.title = '';
      this.form.description = '';
      this.form.url = '';
      this.form.price = '';
    },
  },
};
</script>
