<template>
    <section>
        <h2>Carte</h2>
        <div id="map"></div>
    </section>
</template>

<script>
import L from 'leaflet';
import {mapstate, mapState} from 'vuex'

export default {
    name : 'Carte',
    data () {
        return {
            map : null,
            tileLayer : null,
            layers : []
        }
    },
    computed : {
        ...mapState('appli',['LatLon' , 'zoom'])
    },
    ready() {
        
        console.log('done set');
    },
    mounted() {

        this.initMap();
       
        //this.initLayers() 
        this.$root.$on("formsubmition", (datarecieved) => {
            this.map.setView([this.LatLon[0], this.LatLon[1]], this.zoom);
            L.marker([this.LatLon[0], this.LatLon[1]]).addTo(this.map).bindPopup('You are here !').openPopup();
        });
    },
    methods : {
        initMap(){
            //Initialisation de la map
            this.map = L.map('map').setView([45.78207, 4.86559], 15); 
            L.Icon.Default.imagePath = '../../node_modules/leaflet/dist/images/';

            
            // Création d'un "tile layer" (permet l'affichage sur la carte)
            this.tileLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibTFpZjEzIiwiYSI6ImNqczBubmhyajFnMnY0YWx4c2FwMmRtbm4ifQ.O6W7HeTW3UvOVgjCiPrdsA', {
                maxZoom: 20,
		    minZoom: 1,	
		    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
		    	'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
		    	'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		    id: 'mapbox.streets'
            });
            this.tileLayer.addTo(this.map);
            L.circle([45.78207, 4.86559], {radius : 1000 , color : 'red'}).addTo(this.map);
            L.marker([45.78207, 4.86559], {color : 'red'}).addTo(this.map).bindPopup('Entrée du bâtiment<br><strong>Nautibus</strong>.').openPopup();
            L.marker([45.78207, 4.86559]).addTo(this.map)   ;
            //console.log("init executed");
        }
    }
}
</script>

<style scoped>
#map {
    text-align: center;
    margin: 10;
    position: center;
    height: 900px;
    width: 1500px;
    margin-left: auto;
    margin-right: auto;
}



</style>