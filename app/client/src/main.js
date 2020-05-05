import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import Carte from './components/Carte.vue'
import Position from './components/Position.vue'
import PosCate from './components/PosCate.vue'
import Gameinfo from './components/Gameinfo.vue'
import Trophies from './components/Trophies.vue'
import Timer from './components/Timer.vue'
import { Icon }  from 'leaflet'

import 'leaflet/dist/leaflet.css';
import 'purecss/build/pure-min.css';
import '../public/css/style.css'
//import '../public/js/map';
//import '../public/js/form';
import 'vue/dist/vue.esm.browser'


// this part resolve an issue where the markers would not appear
delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});


import vuetify from '@/plugins/vuetify' 

Vue.component('Carte',Carte)
Vue.component('Position',Position)
Vue.component('Gameinfo',Gameinfo)
Vue.component('trophies',Trophies)
Vue.component('timer',Timer)

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
