import Vue from 'vue';
import Router from 'vue-router';
import Rules from './views/Rules.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,

  routes: [
    {
      path: '/',
      name: 'Index',
      redirect: '/rules',
    },
    {
      path: '/rules',
      name: 'Rules',
      component: Rules,
    },
    {
      path: '/statements',
      name: 'Statements',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "statements" */ './views/Statements.vue'),
    },
    {
      path: '/submissions/new',
      name: 'NewSubmission',
      component: () => import(/* webpackChunkName: "submissions" */ './views/NewSubmission.vue'),
    },
    {
      path: '/submissions',
      name: 'SubmissionsList',
      component: () => import(/* webpackChunkName: "submissions" */ './views/SubmissionsList.vue'),
    },
    {
      path: '/challenges/new',
      name: 'NewChallenge',
      component: () => import(/* webpackChunkName: "challenges" */ './views/NewChallenge.vue'),
    },
    {
      path: '/challenges/',
      name: 'ChallengesList',
      component: () => import(/* webpackChunkName: "challenges" */ './views/ChallengesList.vue'),
    },
    {
      path: '/tournament',
      name: 'Tournament',
      component: () => import(/* webpackChunkName: "tournaments" */ './views/Tournament.vue'),
    },

  ],
});
