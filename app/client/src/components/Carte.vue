<template>
    <section>
        <h2 id="unique">Carte</h2>
        <div id="map"></div>
    </section>
</template>

<script>
import L from 'leaflet';

export default {
    name : 'Carte',
    data () {
        return {
            map : null,
            tileLayer : null,
            layers : []

        }
    },
    mounted() {
        this.initMap();
        
        //this.initLayers() 
        this.$root.$on("formsubmition", (datarecieved) => {
            console.log(datarecieved);
            this.map.setView([datarecieved[0], datarecieved[1]], 15);
            L.marker([datarecieved[0], datarecieved[1]]).addTo(this.map).bindPopup('Entrée du bâtiment<br><strong>Nautibus</strong>.').openPopup();
            console.log("okkkkk");  
        });
    },
    methods : {
        initMap(){
            //Initialisation de la map
            this.map = L.map('map').setView([45.78207, 4.86559], 15); 

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
            L.marker([45.78207, 4.86559]).addTo(this.map).bindPopup('Entrée du bâtiment<br><strong>Nautibus</strong>.').openPopup();
            console.log("init executed");
        }
    }
}
</script>

<style>

</style>