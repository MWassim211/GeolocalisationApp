<template>
    <v-card justify-center>
        <v-container fluid style="max-height: 341px"
      class="overflow-y-auto">
            <h1><v-icon>info</v-icon>  Information sur la partie</h1><v-btn  @click="getGameSettings">Get/update Game Info</v-btn>
            
            <v-form
				class="px-3"
			    ref="form"
			    lazy-validation
			  >
			  <v-flex xs12 sm6 md12>
			    <v-text-field
				  :value="game.cibleLat"	
			      label="Latitude de la cible:"
				  disabled  
			    ></v-text-field>
			 </v-flex>

			 <v-flex xs12 sm6 md12>
			    <v-text-field
				  :value="game.cibleLon"	
			      label="Longitude de la cible: "
                  disabled
			    ></v-text-field>
			 </v-flex>

             <v-flex xs12 sm6 md12>
			    <v-text-field
				  :value="game.periLat"	
			      label="Latitude du centre du périmètre :"
				  disabled
			    ></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md12>
			    <v-text-field
				  :value="game.periLon"	
			      label="Longitude du centre du périmètre: "
                  disabled
			    ></v-text-field>
			 </v-flex>
            </v-form>

		
        </v-container >
    </v-card>
           
</template>

<script>
import { mapState , mapActions } from 'vuex'

export default {
	name : 'Gameinfo',
	computed : {
		...mapState('appli',['LatLon','zoom']),
		...mapState('user',['allUsers','game'])
	},
	methods : {
		async getGameSettings(){
			var success = false;
			await this.$store.dispatch("user/getGameSettings")
			.then(function(response){
				
			
			})
			.catch(function(error){
				console.log(error);
			})
			//await this.$root.$emit('addPeriTOmap');
			
		},
	}
}
</script>