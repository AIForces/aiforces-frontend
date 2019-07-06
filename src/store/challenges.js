import axios from 'axios';
import { catchError, showInfo } from '../utils';

const state = {};

const actions = {
  create(ctx, { sub1, sub2, level }) {
    axios.post('/api/challenges/create', {
      challenge: {
        sub1,
        sub2,
        level,
      },
    })
      .then(() => {
        showInfo('Дуэль поставленна в очередь');
      })
      .catch(catchError);
  },
  update(ctx) {
    axios.get('/api/challenges/');
  },
};

const mutations = {};
const getters = {};


export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
