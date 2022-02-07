// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import qs from 'qs'

import App from './App'
import router from './router'
import './assets/reset.css'
import store from './store'
import elementUI from './assets/element'

Vue.config.productionTip = false
Vue.prototype.$qs = qs

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
