import Vue from 'vue';
import Vuex from 'vuex';

import Challenges from './challenges';
import Submissions from './submissions';
import Users from './users';
import Game from './game';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Challenges,
    Submissions,
    Users,
    Game,
  },
});
