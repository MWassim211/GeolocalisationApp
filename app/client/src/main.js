import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import Carte from './components/Carte.vue'
import Position from './components/Position.vue'
import PosCate from './components/PosCate.vue'

import 'leaflet/dist/leaflet.css';
import 'purecss/build/pure-min.css';
import '../public/css/style.css'
//import '../public/js/map';
//import '../public/js/form';
import 'vue/dist/vue.esm.browser'

import vuetify from '@/plugins/vuetify' 

Vue.component('Carte',Carte)
Vue.component('Position',Position)

Vue.config.productionTip = false

//new Vue({
//  store,
//  router,
//  vuetify,
//  render: h => h(App)
//}).$mount('#app')

window.app = new Vue({
  el : '#app',
  store,
  router,
  vuetify,
  render: h => h(App)
  //components : { App ,Carte, Position , PosCate},
  //template : '<App />'
})
