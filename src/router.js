import Vue from 'vue';
import Router from 'vue-router';
import Rules from './views/Rules.vue';
// eslint-disable-next-line import/no-cycle
import store from './store';

Vue.use(Router);


function updateData() {
  if (!store.state.Users.authorized || store.state.Users.updated) return;

  store.dispatch('Game/getRules');
  store.dispatch('Game/getStatements');
  store.dispatch('Game/getVisualizer');
  store.dispatch('Submissions/update');
  store.dispatch('Users/getUsers');
  store.dispatch('Challenges/update');
  store.dispatch('Tournaments/update');

  store.state.Users.updated = true;
}


const router = new Router({
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
      beforeEnter: (to, from, next) => {
        updateData();
        next();
      },
      component: Rules,
    },
    {
      path: '/statements',
      name: 'Statements',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      beforeEnter: (to, from, next) => {
        updateData();
        next();
      },
      component: () => import(/* webpackChunkName: "statements" */ './views/Statements.vue'),
    },
    {
      path: '/visualizer',
      name: 'Visualizer',
      beforeEnter: (to, from, next) => {
        updateData();
        next();
      },
      component: () => import(/* webpackChunkName: "statements" */ './views/Visualizer.vue'),
    },
    {
      path: '/submissions/new',
      name: 'NewSubmission',
      component: () => import(/* webpackChunkName: "submissions" */ './views/NewSubmission.vue'),
    },
    {
      path: '/submissions',
      name: 'SubmissionsList',
      beforeEnter: (to, from, next) => {
        updateData();
        next();
      },
      component: () => import(/* webpackChunkName: "submissions" */ './views/SubmissionsList.vue'),
    },
    {
      path: '/challenges/new',
      name: 'NewChallenge',
      beforeEnter: (to, from, next) => {
        if (store.state.Users.authorized) {
          updateData();
        }
        next();
      },
      component: () => import(/* webpackChunkName: "challenges" */ './views/NewChallenge.vue'),
    },
    {
      path: '/challenges/',
      name: 'ChallengesList',
      beforeEnter: (to, from, next) => {
        updateData();
        next();
      },
      component: () => import(/* webpackChunkName: "challenges" */ './views/ChallengesList.vue'),
    },
    {
      path: '/tournaments/:id',
      name: 'TournamentsView',
      props: true,
      beforeEnter: (to, from, next) => {
        updateData();
        next();
      },
      component: () => import(/* webpackChunkName: "tournaments" */ './views/TournamentView.vue'),
    },
    {
      path: '/tournaments',
      name: 'TournamentsList',
      beforeEnter: (to, from, next) => {
        updateData();
        console.log('matched index');
        next();
      },
      component: () => import(/* webpackChunkName: "tournaments" */ './views/TournamentsList.vue'),
    },
    {
      path: '/register',
      name: 'Registration',
      component: () => import(/* webpackChunkName: "enter" */ './views/Register.vue'),
    },
    {
      path: '/login',
      name: 'LogIn',
      beforeEnter: (to, from, next) => {
        store.dispatch('Users/checkAuth');
        next();
      },
      component: () => import(/* webpackChunkName: "enter" */ './views/LogIn.vue'),
    },
  ],
});

router.beforeResolve((to, from, next) => {
  console.log(`${from.path} => ${to.path}`);
  if (store.state.Users.authorized || to.path === '/register' || to.path === '/login') {
    next();
  } else {
    store.dispatch('Users/checkAuth');

    if (store.state.Users.authorized) next();

    next('/login');
  }
});

export default router;
