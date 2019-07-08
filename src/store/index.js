import Vue from 'vue';
import Vuex from 'vuex';

import Challenges from './challenges';
import Submissions from './submissions';
import Game from './game';
import Tournaments from './tournaments';

// eslint-disable-next-line import/no-cycle
import Users from './users';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    Challenges,
    Submissions,
    Users,
    Game,
    Tournaments,
  },
});

export default store;

const initialStateCopy = JSON.parse(JSON.stringify(store.state));

export function resetState() {
  store.replaceState(JSON.parse(JSON.stringify(initialStateCopy)));
}
