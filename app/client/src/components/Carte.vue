<template>
        <v-content>
          <v-container fluid>
    <v-card>
            <v-layout>
              <div id="map" style="margin: 0 auto;">
              </div>
              
            </v-layout>
             
    </v-card>
          </v-container>
        </v-content>
</template>

<script>
import L from 'leaflet';
import {mapstate, mapState} from 'vuex'
import { Icon , icon } from 'leaflet';

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default {
    name : 'Carte',
    data () {
        return {
        }
    },
    computed : {
        ...mapState('appli',['map','tileLayer','layers','mymarker','periCircle','cibleMarker','otherPlayersMarker','LatLon' , 'zoom']),
        ...mapState('user',['allUsers','game'])
    },
    created() {
        
    },
    mounted() {

        this.initMap();
        this.$root.$on("updateZOOMonMap", (datarecieved) => {
            this.map.setView([this.LatLon[0], this.LatLon[1]], this.zoom);
            console.log(this.map)
            console.log('zoom mis a jour')
        });

        this.$root.$on("formsubmition", (datarecieved) => {
            this.map.setView([this.LatLon[0], this.LatLon[1]], this.zoom);
            this.mymarker.setLatLng(this.LatLon).bindPopup('Je suis ici!!').openPopup();
        });


         this.$root.$on("addcibleTOmap", (datarecieved) => {

            this.$store.dispatch('appli/updateCibleInstance',L.marker([this.game.cibleLat,this.game.cibleLon],{
   icon :  icon ({
      iconSize : [ 25 , 41 ],
      iconAnchor : [ 12 , 0  ],
      iconUrl :  ' 2b3e1faf89f94a4835397e7a43b4f77d.png ' ,
      iconRetinaUrl :  '680f69f3c2e6b90c1812a813edf67fd7.png' ,
      shadowUrl :   'a0c6cc1401c107b501efee6477816891.png'
   })}));
            this.cibleMarker.addTo(this.map).bindPopup('Cible').openPopup();
                   
        })
  
        this.$root.$on("addPeriTOmap", (datarecieved) => {
            this.$store.dispatch('appli/periCircle',L.circle([this.game.periLat,this.game.periLon], {radius : this.game.radius , color : 'red'}));
            this.periCircle.addTo(this.map);
        })

        this.$root.$on("addPlayers", (datarecieved) => {
            let userActuell = localStorage.getItem('user');
            this.otherPlayersMarker.forEach(marker=>{
                this.map.removeLayer(marker)
            })
            this.$store.dispatch('appli/updateAllMarkers',[])
            this.allUsers.forEach(player => {
                if(player.id != userActuell)
                    this.otherPlayersMarker.push(L.marker(player.position,{
   icon :  icon ({
      iconSize : [ 25 , 41 ],
      iconAnchor : [ 12 , 0 ],
      iconUrl :  ' 2b3e1faf89f94a4835397e7a43b4f77d.png ' ,
      iconRetinaUrl :  '680f69f3c2e6b90c1812a813edf67fd7.png' ,
      shadowUrl :   'a0c6cc1401c107b501efee6477816891.png'
   })}).addTo(this.map).bindPopup(String(player.id)).openPopup());
            })
        });

    },
    methods : {
        initMap(){
            this.$store.dispatch('appli/updateMapInstance',L.map('map').setView(this.LatLon, this.zoom));
            //L.Icon.Default.imagePath = '../../node_modules/leaflet/dist/images/';

            // Création d'un "tile layer" (permet l'affichage sur la carte)
            this.$store.dispatch('appli/UpdateTileLayerInstance', L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibTFpZjEzIiwiYSI6ImNqczBubmhyajFnMnY0YWx4c2FwMmRtbm4ifQ.O6W7HeTW3UvOVgjCiPrdsA', {
            maxZoom: 20,
		    minZoom: 1,	
		    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
		    	'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
		    	'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		    id: 'mapbox.streets'
            }));
            this.tileLayer.addTo(this.map);
            //this.$store.dispatch('appli/updateMarkerInstance',L.marker(this.LatLon));
            this.$store.dispatch('appli/updateMarkerInstance',L.marker(this.LatLon, {
   icon :  icon ({
      iconSize : [ 25 , 41 ],
      iconAnchor : [ 12 , 0 ],
      iconUrl :  ' 2b3e1faf89f94a4835397e7a43b4f77d.png ' ,
      iconRetinaUrl :  '680f69f3c2e6b90c1812a813edf67fd7.png' ,
      shadowUrl :   'a0c6cc1401c107b501efee6477816891.png'
   })}));
            this.mymarker.addTo(this.map).bindPopup('Je suis iciii !').openPopup();
        },
        getUsersInfo(){
            this.allUsers.forEach(element => {
                L.circle(element.position, {radius : this.game.radius , color : 'red'}).addTo(this.map);
                L.circle(element.position, {color : 'red'}).addTo(this.map).bindPopup('Entrée du bâtiment<br><strong>Nautibus</strong>.').openPopup();
            });
		}

        
    }
}
</script>

<style scoped>
.leaflet-popup-tip-container {
width: 40px;
height: 20px;
position: relative;
left: 50%;
top: -117px;
margin-left: -20px;
overflow: hidden;
pointer-events: none;
transform: rotate(180deg);
}


</style>