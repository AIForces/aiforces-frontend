import Vue from 'vue';
import Vuex from 'vuex';

import Challenges from './store/challenges';
import Submissions from './store/submissions';


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Challenges,
    Submissions,
  },
});
