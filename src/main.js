import Vue from 'vue';
import Buefy from 'buefy';


import App from './App.vue';
import router from './router';
import store from './store';

import 'buefy/dist/buefy.css';
import '@fortawesome/fontawesome-free/css/all.css';

Vue.config.productionTip = false;

Vue.use(Buefy);

const vm = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

window.vm = vm;
