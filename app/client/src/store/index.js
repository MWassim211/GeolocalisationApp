import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    LatLon : [5,5],
		zoom : 7
  },
  mutations: {
    updateField,
    UPDATE (state,payload) {
      state.LatLon[payload.index] = payload.value;
    },
    UPDATE_ZOOM (state,value){
      state.zoom = value;
    },
  },
  actions: {
    updateLatLon (context,payload) {
      context.commit('UPDATE',payload)
    },
    updateZoom (context,value) {
      context.commit("UPDATE_ZOOM",value)
    },
    updateLatLonZoom (context,lat,lon,value) {
      //context.commit('UPDATE_LAT',lat);
      //context.commit('UPDATE_LON',lon);
      //context.commit("UPDATE_ZOOM",value);
    }
  },
  getters : {
    getField,
    LatLon  : state => state.LatLon,
    zoom : state => state.zoom
  },
  modules: {
  },
  strict : true
})

window.store = store; // to get access in the console
export default store;