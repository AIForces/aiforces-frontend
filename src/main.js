import Vue from 'vue';
import Buefy from 'buefy';
import VueHighlightJS from 'vue-highlight.js';

import App from './App.vue';
import router from './router';
import store from './store';

import 'buefy/dist/buefy.css';
import '@mdi/font/css/materialdesignicons.css';

import 'vue-highlight.js/lib/allLanguages';
import 'highlight.js/styles/default.css';

Vue.config.productionTip = false;

Vue.use(Buefy);
Vue.use(VueHighlightJS);

const vm = new Vue({
  router,
  store,
  render: h => h(App),
  mounted() {
    this.$store.dispatch('Users/checkAuth');
  },
}).$mount('#app');

window.vm = vm;
