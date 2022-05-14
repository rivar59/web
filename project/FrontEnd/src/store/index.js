import { createStore } from 'vuex';
import axios from 'axios';

import notify from '../utils/notify';
import constants from '../utils/constants';
import userStore from './user';

export default createStore({
  state: {
    comments: [],
    incorrect: {},
  },
  mutations: {
    LOAD_COMMENTS(state, comments) {
      state.comments = comments;
    },
    ADD_COMMENT(state, comment) {
      state.comments.push(comment);
    },
    UPDATE_COMMENT(state, newComment) {
      state.comments = state.comments.map((c) => {
        if (c.id === newComment.id) return newComment;
        return c;
      });
    },
    REMOVE_COMMENT(state, comment) {
      state.comments = state.comments.filter((c) => c.id !== comment.id);
    },
    SET_INCORRECT(state, incorrect) {
      state.incorrect = incorrect;
    },
    CLEAR_INCORRECT(state) {
      state.incorrect = {};
    },
  },
  getters: {
    allComments: (state) => state.comments,
    specificComment: (state) => (id) => state.comments.find((c) => c.id === id),
    errors: (state) => (key) => state.incorrect[key],
  },
  actions: {
    addComment({ commit }, comment) {
      commit('CLEAR_INCORRECT');

      axios.post(
        `${constants.COMMENTS_ENDPOINT}`,
        { ...comment },
        {
          headers: {
            Authorization: `JWT ${localStorage.getItem('jwt')}`,
          },
        },
      )
        .then(() => {
          commit('ADD_COMMENT', comment);
          notify('Comment successfully added', 'success');
        })
        .catch((err) => {
          const { message } = err.response.data;
          commit('SET_INCORRECT', { add: Array.isArray(message) ? message : [message] });
        });
    },
    removeComment({ commit }, comment) {
      console.log('hi');
      axios.delete(
        `${constants.COMMENTS_ENDPOINT}/${comment.id}`,
        {
          headers: {
            Authorization: `JWT ${localStorage.getItem('jwt')}`,
          },
        },
      )
        .then((res) => {
          commit('REMOVE_COMMENT', comment);
          notify(res.data.message, 'success');
        })
        .catch((err) => {
          notify(err.message, 'danger');
          throw new Error(`API ${err}`);
        });
    },
    updateComment({ commit }, comment) {
      axios.patch(
        `${constants.COMMENTS_ENDPOINT}/${comment.id}`,
        comment,
        {
          headers: {
            Authorization: `JWT ${localStorage.getItem('jwt')}`,
          },
        },
      )
        .then((res) => {
          const newComment = res.data.data;

          commit('UPDATE_COMMENT', newComment);
          notify(res.data.message, 'success');
        })
        .catch((err) => {
          notify(err.message, 'danger');
          throw new Error(`API ${err}`);
        });
    },
    findComments({ commit }, query) {
      axios.get(`${constants.COMMENTS_ENDPOINT}?q=${query.trim()}`)
        .then((res) => {
          commit('LOAD_COMMENTS', res.data);
        })
        .catch((err) => {
          notify(err.message, 'danger');
          throw new Error(`API ${err}`);
        });
    },
    loadComments({ commit }) {
      axios.get(`${constants.COMMENTS_ENDPOINT}`)
        .then((res) => {
          commit('LOAD_COMMENTS', res.data);
        })
        .catch((err) => {
          notify(err.message, 'danger');
          throw new Error(`API ${err}`);
        });
    },
    loadMyComments({ commit }) {
      axios.get(
        `${constants.COMMENTS_ENDPOINT}/@me`,
        {
          headers: {
            Authorization: `JWT ${localStorage.getItem('jwt')}`,
          },
        },
      )
        .then((res) => {
          commit('LOAD_COMMENTS', res.data);
        })
        .catch((err) => {
          notify(err.message, 'danger');
          throw new Error(`API ${err}`);
        });
    },
    loadMyFavComments({ commit }) {
      axios.get(
        `${constants.COMMENTS_ENDPOINT}/@fav`,
        {
          headers: {
            Authorization: `JWT ${localStorage.getItem('jwt')}`,
          },
        },
      )
        .then((res) => {
          commit('LOAD_COMMENTS', res.data);
        })
        .catch((err) => {
          notify(err.message, 'danger');
          throw new Error(`API ${err}`);
        });
    },
    likeComment({ commit }, comment) {
      axios.post(
        `${constants.COMMENTS_ENDPOINT}/${comment.id}/like`,
        {},
        {
          headers: {
            Authorization: `JWT ${localStorage.getItem('jwt')}`,
          },
        },
      )
        .then((res) => {
          const newComment = res.data.data;

          commit('UPDATE_COMMENT', newComment);
        })
        .catch((err) => {
          notify(err.message, 'danger');
          throw new Error(`API ${err}`);
        });
    },
    unlikeComment({ commit }, comment) {
      axios.post(
        `${constants.COMMENTS_ENDPOINT}/${comment.id}/unlike`,
        {},
        {
          headers: {
            Authorization: `JWT ${localStorage.getItem('jwt')}`,
          },
        },
      )
        .then((res) => {
          const newComment = res.data.data;

          commit('UPDATE_COMMENT', newComment);
        })
        .catch((err) => {
          notify(err.message, 'danger');
          throw new Error(`API ${err}`);
        });
    },
    toggleFavComment({ commit }, comment) {
      axios.post(
        `${constants.COMMENTS_ENDPOINT}/${comment.id}/toggleFavorite`,
        {},
        {
          headers: {
            Authorization: `JWT ${localStorage.getItem('jwt')}`,
          },
        },
      )
        .then((res) => {
          const newComment = res.data.data;

          commit('UPDATE_COMMENT', newComment);
        })
        .catch((err) => {
          notify(err.message, 'danger');
          throw new Error(`API ${err}`);
        });
    },
    toggleFavCommentdown({ commit }, comment) {
      axios.post(
        `${constants.COMMENTS_ENDPOINT}/${comment.id}/toggleFavoritedown`,
        {},
        {
          headers: {
            Authorization: `JWT ${localStorage.getItem('jwt')}`,
          },
        },
      )
        .then((res) => {
          const newComment = res.data.data;

          commit('UPDATE_COMMENT', newComment);
        })
        .catch((err) => {
          notify(err.message, 'danger');
          throw new Error(`API ${err}`);
        });
    },
  },
  modules: {
    user: userStore,
  },
});
