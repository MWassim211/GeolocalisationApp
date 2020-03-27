<template>
    <section>
			<h2>Position</h2>
			<form @submit.prevent="onFormSubmition" class="pure-form pure-form-stacked">
				<fieldset>
					<label for="lat">Lattitude : </label> <input type="text" id="lat" name="lat" v-model="LatLon[0]">
					<label for="lon">Longitude : </label> <input type="text" id="lon" name="lon" v-model="LatLon[1]">
					<label for="zoom">Zoom : <span id="zoomValue"></span></label> <input type="range" id="zoom" name="zoom" min="1" max="20" v-model="zoom">
					<input type="submit" value="Afficher" class="pure-button pure-button-active">
				</fieldset>	
			</form>
			<button @click="ready">pos</button>
		</section>
</template>

<script>
export default {
	name : 'Position',
	data () {
		return {
			LatLon : [],
			zoom : 15
		}
	},
	methods : {
    ready() {
	  
	},
	onFormSubmition (){
		this.$root.$emit("formsubmition",this.LatLon);
		return false;
	}
    
  }
}
</script>