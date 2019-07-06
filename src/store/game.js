import axios from 'axios';

import { catchError } from '../utils';

const state = {
  rules: {
    html: '',
    js: '',
  },
  statements: {
    html: '',
    js: '',
  },
  visualizer: {
    html: '',
    js: '',
  },
};


const actions = {
  getRules(ctx) {
    axios.get('/api/event/rules')
      .then((response) => {
        ctx.commit('SET_RULES', response.data);
      })
      .catch(catchError);
  },
  getStatements(ctx) {
    axios.get('/api/event/statements')
      .then((response) => {
        ctx.commit('SET_STATEMENTS', response.data);
      })
      .catch(catchError);
  },
  getVisualizer(ctx) {
    axios.get('/api/event/visualizer')
      .then((response) => {
        ctx.commit('SET_VISUALIZER', response.data);
      });
  },
};

const mutations = {
  // eslint-disable-next-line no-shadow
  SET_RULES(state, rules) {
    state.rules = rules;
  },
  // eslint-disable-next-line no-shadow
  SET_STATEMENTS(state, statements) {
    state.statements = statements;
  },
  // eslint-disable-next-line no-shadow
  SET_VISUALIZER(state, visualizer) {
    state.visualizer = visualizer;
  },
};

const getters = {
  // eslint-disable-next-line no-shadow
  rules(state) {
    return state.rules;
  },
  // eslint-disable-next-line no-shadow
  statements(state) {
    return state.statements;
  },
  // eslint-disable-next-line no-shadow
  visualizer(state) {
    return state.visualizer;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
