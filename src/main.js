import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Modal from './modal.js'

// use it
Vue.use(Modal);
Vue.config.productionTip = false;
export const serverBus = new Vue();

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app');
