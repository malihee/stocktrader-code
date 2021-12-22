import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import store from './store/index.js'
import VueRouter from 'vue-router'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faFontAwesome } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faFontAwesome , faTrash)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(VueRouter)

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
