import axios from 'axios';
import { catchError, showInfo } from '../utils';

const state = {
  submissions: [],
};


const actions = {
  create(ctx, info) {
    const data = {
      submission: {
        ...info,
      },
    };
    axios.post('/api/submissions/create', data)
      .then(() => {
        ctx.commit('ADD_SUBMISSION', info);
        showInfo('Посылка отправлена');
      })
      .catch(catchError);
  },
};


const mutations = {
  // eslint-disable-next-line no-shadow
  ADD_SUBMISSION(state, info) {
    state.submissions.push(info);
  },
};


const getters = {};


export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
