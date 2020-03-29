<template>
    <section>
			<h2>Position</h2>
			<form @submit.prevent="onFormSubmition" class="pure-form pure-form-stacked">
				<fieldset>
					<label for="lat">Lattitude : </label> <input type="text" id="lat" name="lat" :value="LatLon[0]" @input="updateLat">
					<label for="lon">Longitude : </label> <input type="text" id="lon" name="lon" :value="LatLon[1]" @input="updateLon" >
					<label for="zoom">Zoom : <span id="zoomValue"></span></label> <input type="range" id="zoom" name="zoom" min="1" max="20" :value="zoom" @input="updateZoom">
					<input type="submit" value="Afficher" class="pure-button pure-button-active">
				</fieldset>	
			</form>
		</section>
</template>

<script>
import { mapState , mapActions } from 'vuex'

export default {
	name : 'Position',
	computed : {
		...mapState(['LatLon','zoom']),
	},
	mounted() {
		import('../assets/js/bundle.js')
	},
	methods : {
		...mapActions(['updateLatLonZoom']),
		updateLat (event) {
			this.$store.dispatch('updateLatLon',{value : event.target.value , index : 0})
		},
		updateLon (event) {
			this.$store.dispatch('updateLatLon',{value : event.target.value , index : 1})
		},
		updateZoom (event) {
			this.$store.dispatch('updateZoom',event.target.value)
		},
		onFormSubmition (){
			this.$root.$emit("formsubmition"); 
		}
    
  }
}
</script>