import axios from 'axios';

const state = {
  authorized: false,
};

const actions = {
  login(ctx, name, pass) {
    const data = {
      'users[username]': name,
      'users[password]': pass,
    };
    axios.post('/api/sessions/create', data)
      .then((response) => {
        console.log(response);
        ctx.commit('SET_AUTHORIZED', true);
      })
      .catch(error => console.error(error));
  },
  register(ctx, data) {
    axios.post('/api/users/create', data)
      .then(res => console.error(res));
  },
};

const mutations = {
  SET_AUTHORIZED(state, authorized) {
    state.authorized = authorized;
  },
};

const getters = {
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
