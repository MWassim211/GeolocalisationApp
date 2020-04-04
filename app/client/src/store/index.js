import Vue from 'vue'
import Vuex from 'vuex'

import Applicatif  from './modules/applicatif'
import User from './modules/user'


Vue.use(Vuex)

let store = new Vuex.Store({
  modules : {
    appli : Applicatif,
    user : User,
  },
  strict : true
})

window.store = store; // to get access in the console
export default store;