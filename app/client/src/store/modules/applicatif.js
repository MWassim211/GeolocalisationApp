import L from 'leaflet';


export default {
    namespaced: true,
    state: {
        map : null,
        tileLayer : null,
        layers : [],
        mymarker : null,
        cibleMarker : null,
        periCircle : null,
        otherPlayersMarker : [],
        LatLon : [],
        zoom : 15,
      },
      mutations: {
        UPDATE (state,payload) {
          state.LatLon[payload.index] = payload.value;
          if (state.map)
            state.map.setView(state.LatLon,state.zoom)
          localStorage.setItem("LATLON",JSON.stringify(state.LatLon))
          
        },
        UPDATE_ZOOM (state,value){
          state.zoom = value;
          if (state.map)
            state.map.setView(state.LatLon,state.zoom)
          localStorage.setItem("zoom",state.zoom)
        },
        UPDATEMAPINSTANCE(state,value){
          state.map = value;
        },
        UPDATEPERI(state,value){
          state.periCircle = value
        },
        UPDATETLINS(state,value){
          state.tileLayer =value;
        },
        UPMKRINS(state,value){
          state.mymarker = value;
        },
        UPCBLINS(state,value){
          state.cibleMarker = value;
        },
        UPMKRS(state,value){
          state.otherPlayersMarker = value;
        },
        UPDATEZOOMMAP(state,value){
          state.map.setZoom(value);
        }
      },
      actions: {  
        async updateLatLon (context,payload) {
          context.commit('UPDATE',payload)
        },
        updateZoom (context,value) {
          context.commit("UPDATE_ZOOM",value)
        },
        updateLatLonZoom (context,lat,lon,value) {
        },
        updateMapInstance(context,value){
          context.commit("UPDATEMAPINSTANCE",value);
        },
        periCircle(context,value){
          context.commit('UPDATEPERI',value)
        },
        UpdateTileLayerInstance(context,value){
          context.commit("UPDATETLINS",value);
        },
        updateMarkerInstance(context,value){
          context.commit('UPMKRINS',value)
        },
        updateCibleInstance(context,value){
          context.commit('UPCBLINS',value)
        },
        setCibleOnMap(context,value){
          context.state.map = L.marker([context.state.game.cibleLat,context.state.game.cibleLon]).addTo(context.state.map).bindPopup("cibleeee");
        },
        updateAllMarkers(context,value){
          context.commit('UPMKRS',value);
        },
        updateZoomMap(context,value){
          context.commit('UPDATEZOOMMAP',value)
        },
        
      },
      getters : {
        test: (state) => {
          return state.test;
      }
      },
      modules: {
      }
}