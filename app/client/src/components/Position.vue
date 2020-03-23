<template>
    <section>
			<h2 ref="reff">Position</h2>
			<form onsubmit="return updateMap();" class="pure-form pure-form-stacked">
				<fieldset>
					<label for="lat">Lattitude : </label> <input type="text" id="lat" name="lat" value="45.782">
					<label for="lon">Longitude : </label> <input type="text" id="lon" name="lon" value="4.8656">
					<label for="zoom">Zoom : <span id="zoomValue"></span></label> <input type="range" id="zoom" name="zoom" min="1" max="20" value="15">
					<input type="submit" value="Afficher" class="pure-button pure-button-active">
				</fieldset>
			</form>
			<button @click="ready">pos</button>
		</section>
</template>

<script>
export default {
	name : 'Position',
	methods : {
    ready() {
      console.log(this.$refs)
    }
    
  }
}
</script>