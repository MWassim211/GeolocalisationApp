import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import Carte from './components/Carte.vue'
import Position from './components/Position.vue'
Vue.component('Carte',Carte)
Vue.component('Position',Position)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
