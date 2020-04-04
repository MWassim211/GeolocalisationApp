export default {
    namespaced: true,
    state: {
        LatLon : [5,5],
        zoom : 7,
      },
      mutations: {
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
        },
      },
      getters : {
      },
      modules: {
      }
}