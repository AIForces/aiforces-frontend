import axios from 'axios';
import { catchError, showInfo } from '../utils';

const state = {
  challenges: [],
};

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
    axios.get('/api/challenges/', {
      params: {
        keys: ['id', 'player1', 'player2', 'status', 'player1_verdict', 'player2_verdict', 'created_at', 'level', 'time_elapsed', 'creator', 'winner'],
      },
    })
      .then((response) => {
        console.log(response.data);
        ctx.commit('SET_CHALLENGES', response.data);
      })
      .catch(catchError);
  },
};

const mutations = {
  // eslint-disable-next-line no-shadow
  SET_CHALLENGES(state, challenges) {
    state.challenges = challenges;
  },
};

const getters = {
  // eslint-disable-next-line no-shadow
  challenges(state) {
    return state.challenges;
  },
};


export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
