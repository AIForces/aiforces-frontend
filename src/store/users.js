import axios from 'axios';

import { catchError, showInfo } from '../utils';
// eslint-disable-next-line import/no-cycle
import router from '../router';

const state = {
  authorized: false,
  updated: false,
  self_id: null,
  users: [],
  foreignSubmissions: new Map(),
};


const actions = {
  login(ctx, info) {
    const data = {
      username: info.name,
      password: info.pass,
    };
    console.log(data);
    axios.post('/api/sessions/create', data)
      .then((response) => {
        console.log(response);
        ctx.commit('SET_AUTHORIZED', true);
        ctx.dispatch('checkAuth');
        window.vm.$router.push('/');
      })
      .catch(catchError);
  },
  logout(ctx) {
    axios.post('/api/sessions/destroy')
      .then(() => {
        window.vm.$router.push('/login');
        ctx.commit('SET_AUTHORIZED', false);
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      })
      .catch(catchError);
  },
  register(ctx, info) {
    const data = {
      user: {
        username: info.username,
        name: info.name,
        surname: info.surname,
        password: info.password,
        password_confirmation: info.password,
      },
    };
    axios.post('/api/users/create', data)
      .then(() => {
        showInfo('Регистрация успешна');
        window.vm.$router.push('/login');
      })
      .catch(catchError);
  },
  checkAuth(ctx) {
    console.log('check auth');
    axios.get('/api/sessions')
      .then((response) => {
        if (response.data.logged_in) {
          ctx.commit('SET_AUTHORIZED', true);
          ctx.commit('SET_SELF_ID', response.data.id);
          router.push('/');
        }
      })
      .catch(catchError);
  },
  getUsers(ctx) {
    axios.get('/api/event/participants')
      .then((response) => {
        ctx.commit('SET_USERS', response.data.ids);
        console.log('user ids:', response.data.ids);
        for (let i = 0; i < response.data.ids.length; i += 1) {
          ctx.dispatch('getUserSubmissions', response.data.ids[i].id);
        }
      })
      .catch(catchError);
  },
  getUserSubmissions(ctx, id) {
    axios.get(`/api/submissions/public/${id}`)
      .then((response) => {
        // eslint-disable-next-line no-shadow
        const submissions = [];
        console.log('ids:', response.data.ids);
        for (let i = 0; i < response.data.ids.length; i += 1) {
          axios.get(`/api/submissions/${response.data.ids[i]}`, {
            params: {
              keys: ['id', 'name', 'created_at'],
            },
          })
            .then((response2) => {
              submissions.push(response2.data);
            })
            .catch(catchError);
        }
        ctx.commit('SET_FOREIGN_SUBMISSIONS', { id, submissions });
      })
      .catch(catchError);
  },
};

const mutations = {
  // eslint-disable-next-line no-shadow
  SET_AUTHORIZED(state, authorized) {
    state.authorized = authorized;
  },
  // eslint-disable-next-line no-shadow
  SET_SELF_ID(state, id) {
    state.self_id = id;
  },
  // eslint-disable-next-line no-shadow
  SET_USERS(state, users) {
    state.users = users;
  },
  // eslint-disable-next-line no-shadow
  SET_FOREIGN_SUBMISSIONS(state, { id, submissions }) {
    console.log('set foreign submissions', { id, submissions });
    state.foreignSubmissions.set(id, submissions);
  },
};

const getters = {
  // eslint-disable-next-line no-shadow
  authorized(state) {
    return state.authorized;
  },
  // eslint-disable-next-line no-shadow
  users(state) {
    return state.users;
  },
  // eslint-disable-next-line no-shadow
  selfId(state) {
    return state.self_id;
  },
  // eslint-disable-next-line no-shadow
  foreignSubmissions(state) {
    return state.foreignSubmissions;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
