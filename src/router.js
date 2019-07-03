import Vue from 'vue';
import Router from 'vue-router';
import Rules from './views/Rules.vue';
import store from './store';

Vue.use(Router);

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
      beforeEnter: (to, from, next) => {
        console.log(store);
        store.dispatch('Submissions/update');
        next();
      },
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
    {
      path: '/register',
      name: 'Registration',
      component: () => import(/* webpackChunkName: "enter" */ './views/Register.vue'),
    },
    {
      path: '/login',
      name: 'LogIn',
      component: () => import(/* webpackChunkName: "enter" */ './views/LogIn.vue'),
    },
  ],
});

router.beforeResolve((to, from, next) => {
  console.log(to.path);
  if (window.vm.$store.state.Users.authorized || to.path === '/register' || to.path === '/login') {
    next();
  } else {
    next('/login');
  }
});

export default router;
