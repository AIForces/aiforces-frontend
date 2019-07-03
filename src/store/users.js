import axios from 'axios';

import { catchError, showInfo } from '../utils';
// eslint-disable-next-line import/no-cycle
import router from '../router';

const state = {
  authorized: false,
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
        window.vm.$router.push('/');
      })
      .catch(catchError);
  },
  logout(ctx) {
    axios.post('/api/sessions/destroy')
      .then(() => {
        window.vm.$router.push('/login');
        ctx.commit('SET_AUTHORIZED', false);
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
    axios.get('api/sessions')
      .then((response) => {
        if (response.data.logged_in) {
          ctx.commit('SET_AUTHORIZED', true);
          router.push('/');
        }
      })
      .catch(catchError);
  },
};

const mutations = {
  // eslint-disable-next-line no-shadow
  SET_AUTHORIZED(state, authorized) {
    state.authorized = authorized;
  },
};

const getters = {
  // eslint-disable-next-line no-shadow
  authorized(state) {
    return state.authorized;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
