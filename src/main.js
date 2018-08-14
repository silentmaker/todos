import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faBars, faTimes, faPlus, faCheckCircle, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faCircle, faTrashAlt } from '@fortawesome/free-regular-svg-icons';

import Vue from 'vue';
import App from './App.vue';
import store from './store';
import './registerServiceWorker';

library.add(
  faBars, faTimes, faPlus, faCircle, faCheckCircle,
  faTrashAlt, faChevronUp, faChevronDown,
);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
