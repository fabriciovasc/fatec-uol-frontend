import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {far} from '@fortawesome/free-regular-svg-icons';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {fab} from '@fortawesome/free-brands-svg-icons';

library.add(far, fab, fas);

createApp(App)
  .component('fa', FontAwesomeIcon)
  .use(router)
  .mount('#app');
