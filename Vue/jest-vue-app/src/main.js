import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import config from './store'
import router from './router'

Vue.config.productionTip = false
let store = new Vuex.Store(config);
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
