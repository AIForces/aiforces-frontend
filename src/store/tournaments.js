import axios from 'axios';
import { catchError } from '../utils';

const state = {
  tournaments: [],
  tournamentsInfo: [],
};

const actions = {
  update(ctx) {
    axios.get('/api/tournaments')
      .then((response) => {
        ctx.commit('SET_TOURNAMENTS', response.data);
      })
      .catch(catchError);
  },
  getTournament(ctx, id) {
    axios.get(`/api/tournaments/${id}`)
      .then((response) => {
        console.log(response);
        ctx.commit('SET_TOURNAMENT', response.data);
      })
      .catch(catchError);
  },
};

const mutations = {
  // eslint-disable-next-line no-shadow
  SET_TOURNAMENTS(state, tournaments) {
    state.tournaments = tournaments;
  },
  // eslint-disable-next-line no-shadow
  SET_TOURNAMENT(state, tournament) {
    state.tournamentsInfo[tournament.id] = tournament;
  },
};

const getters = {
  // eslint-disable-next-line no-shadow
  tournaments(state) {
    return state.tournaments;
  },
  // eslint-disable-next-line no-shadow
  tournamentsInfo(state) {
    return state.tournamentsInfo;
  },
};


export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
