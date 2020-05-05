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
           var greenIcon = L.icon({
                iconUrl: '../assets/icons/cible.png',

                iconSize:     [38, 95], // size of the icon
                shadowSize:   [50, 64], // size of the shadow
                iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
                shadowAnchor: [4, 62],  // the same for the shadow
                popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
            });

            this.$store.dispatch('appli/updateCibleInstance',L.marker([this.game.cibleLat,this.game.cibleLon]));
            this.cibleMarker.addTo(this.map).bindPopup('Cible').openPopup();
                   
        })
  
        this.$root.$on("addPeriTOmap", (datarecieved) => {
            this.$store.dispatch('appli/periCircle',L.circle([this.game.periLat,this.game.periLon], {radius : 3000 , color : 'red'}));
            this.periCircle.addTo(this.map);
        })

        this.$root.$on("addPlayers", (datarecieved) => {
            let userActuell = localStorage.getItem('user');
            console.log('les markers')
            console.log(this.otherPlayersMarker);
            this.otherPlayersMarker.forEach(marker=>{
                this.map.removeLayer(marker)
            })
            this.$store.dispatch('appli/updateAllMarkers',[])
            this.allUsers.forEach(player => {
                if(player.id != userActuell)
                    this.otherPlayersMarker.push(L.marker(player.position).addTo(this.map).bindPopup(String(player.id)).openPopup());
            })
        });

    },
    methods : {
        initMap(){
            this.$store.dispatch('appli/updateMapInstance',L.map('map').setView(this.LatLon, this.zoom));
            L.Icon.Default.imagePath = '../../node_modules/leaflet/dist/images/';
            
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
            this.$store.dispatch('appli/updateMarkerInstance',L.marker(this.LatLon, {color : 'red'}).addTo(this.map).bindPopup('Entrée du bâtiment<br><strong>Nautibus</strong>.').openPopup())
            this.mymarker.addTo(this.map).bindPopup('Je suis ici !').openPopup();
        },
        getUsersInfo(){
            this.allUsers.forEach(element => {
                L.circle(element.position, {radius : 1000 , color : 'red'}).addTo(this.map);
                console.log(element.position)
                L.circle(element.position, {color : 'red'}).addTo(this.map).bindPopup('Entrée du bâtiment<br><strong>Nautibus</strong>.').openPopup();
            });
		}

        
    }
}
</script>

<style scoped>



</style>