import Vue from 'vue'
import Vuex from 'vuex'
//import createPersistedState from "vuex-persistedstate";
import VuexPersist from 'vuex-persist'

import Applicatif  from './modules/applicatif'
import User from './modules/user'


Vue.use(Vuex)

let store = new Vuex.Store({
  modules : {
    appli : Applicatif,
    user : User,
  },  
  //strict : true
  //plugins: [createPersistedState({
  //  storage : window.localStorage,
  //}
  //)]
})

window.store = store; // to get access in the console
export default store;

