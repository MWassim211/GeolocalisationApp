<template>
    <section>
			<h2>Position</h2>
			<form @submit.prevent="updateLatLonZoom" class="pure-form pure-form-stacked">
				<fieldset>
					<label for="lat">Lattitude : </label> <input type="text" id="lat" name="lat" v-model.number="LatLon[0]">
					<label for="lon">Longitude : </label> <input type="text" id="lon" name="lon" v-model.number="LatLon[1]">
					<label for="zoom">Zoom : <span id="zoomValue"></span></label> <input type="range" id="zoom" name="zoom" min="1" max="20" v-model="zoom">
					<input type="submit" value="Afficher" class="pure-button pure-button-active">
				</fieldset>	
			</form>
			<button @click="ready">pos</button>
		</section>
</template>

<script>
import { mapState , mapActions } from 'vuex'
import { mapGetters } from 'vuex'
import { mapFields } from 'vuex-map-fields';

export default {
	name : 'Position',
	computed : {
		...mapFields(['LatLon','zoom']),
		Lat : {
			get () {
				return this.$store.state.LatLon[0];
			},
			set (value) {	
				//this.$store.commit('UPDATE',{value : value , index : 0})
				this.$store.dispatch('updateLatLon',{value : value , index : 0})
			}
		},
		Lon : {
			get () {
				return this.$store.state.LatLon[1];
			},
			set (value) {
				//this.$store.commit('UPDATE',{value : value , index : 1})
				this.$store.dispatch('updateLatLon',{value : value , index : 1})
			}
		},
		zoom : {
			get () {
				return this.$store.state.zoom;
			},
			set (value) {
				this.$store.dispatch('updateZoom',value);
			}
		}
	},
	methods : {
		...mapActions(['updateLatLonZoom']),

    ready() {
	  
	},
	onFormSubmition (){
		//this.$root.$emit("formsubmition",this.LatLon); // for the event bus ,accessible for ever element throw the app 
		this.$store.commit('')
		return false;
	}
    
  }
}
</script>