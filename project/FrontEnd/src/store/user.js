import axios from 'axios';

import constants from '../utils/constants';
import jwtDecode from '../utils/jwt';

import router from '../router';
import notify from '../utils/notify';

const userStore = {
  state: {
    instance: localStorage.getItem('jwt') ?? {},
    incorrect: {},
    users: [],
  },
  mutations: {
    LOAD_INSTANCE(state, instance) {
      state.instance = instance;
    },
    UNLOAD_INSTANCE(state) {
      state.instance = {};
    },
    SET_INCORRECT(state, incorrect) {
      state.incorrect = incorrect;
    },
    CLEAR_INCORRECT(state) {
      state.incorrect = {};
    },
    LOAD_USERS(state, users) {
      state.users = users;
    },
  },
  getters: {
    isConnected: (state) => Object.keys(state.instance).length !== 0,
    isAdmin: (state, getters) => getters.isConnected && state.instance.role === 'admin',
    decodedInstance: (state, getters) => {
      if (getters.isConnected) return jwtDecode(state.instance).payload;
      return null;
    },
    userErrors: (state) => (key) => state.incorrect[key],
    allUsers: (state) => state.users,
    specificUser: (state) => (id) => state.users.find((u) => u.id === id),

  },
  actions: {
    login({ commit }, credentials) {
      commit('CLEAR_INCORRECT');

      axios.post(constants.LOGIN_ENDPOINT, credentials)
        .then((res) => {
          const { token } = res.data;

          localStorage.setItem('jwt', token);
          commit('LOAD_INSTANCE', token);
          router.push('/');
        })
        .catch((err) => {
          const { message } = err.response.data;
          commit('SET_INCORRECT', { login: Array.isArray(message) ? message : [message] });
        });
    },
    register({ commit }, credentials) {
      commit('CLEAR_INCORRECT');

      axios.post(constants.REGISTER_ENDPOINT, credentials)
        .then((res) => {
          const { token } = res.data;

          localStorage.setItem('jwt', token);
          commit('LOAD_INSTANCE', token);
          router.push('/');
        })
        .catch((err) => {
          const { message } = err.response.data;
          commit('SET_INCORRECT', { register: Array.isArray(message) ? message : [message] });
        });
    },
    logout({ commit }) {
      commit('UNLOAD_INSTANCE');
      localStorage.removeItem('jwt');
      router.push('/');
    },
    addtobasket({ commit }, userid) {
      axios.post(
        `${constants.USERS_ENDPOINT}/${userid}/ban`,
        {},
        {
          headers: {
            Authorization: `JWT ${localStorage.getItem('jwt')}`,
          },
        },
      )
        .then((res) => {
          commit('LOAD_USERS', res.data);
        })
        .catch((err) => {
          notify(err.message, 'danger');
          throw new Error(`API ${err}`);
        });
    },
    loadUsers({ commit }) {
      axios.get(
        `${constants.USERS_ENDPOINT}`,
        {
          headers: {
            Authorization: `JWT ${localStorage.getItem('jwt')}`,
          },
        },
      )
        .then((res) => {
          commit('LOAD_USERS', res.data);
        })
        .catch((err) => {
          notify(err.message, 'danger');
          throw new Error(`API ${err}`);
        });
    },
    banUser({ commit }, user) {
      axios.post(
        `${constants.USERS_ENDPOINT}/${user.id}/ban`,
        {},
        {
          headers: {
            Authorization: `JWT ${localStorage.getItem('jwt')}`,
          },
        },
      )
        .then((res) => {
          commit('LOAD_USERS', res.data);
        })
        .catch((err) => {
          notify(err.message, 'danger');
          throw new Error(`API ${err}`);
        });
    },
    unbanUser({ commit }, user) {
      axios.post(
        `${constants.USERS_ENDPOINT}/${user.id}/unban`,
        {},
        {
          headers: {
            Authorization: `JWT ${localStorage.getItem('jwt')}`,
          },
        },
      )
        .then((res) => {
          commit('LOAD_USERS', res.data);
        })
        .catch((err) => {
          notify(err.message, 'danger');
          throw new Error(`API ${err}`);
        });
    },
  },
};

export default userStore;
