<template>
		
			<v-card justify-center >
      <v-container fluid>
				<h1 ><v-icon>location_on</v-icon>Position</h1>

		<v-snackbar v-model='lancementNot' :timeout="6000">
        <span> Partie Lancer. Bon courage !</span>
        <v-btn>Fermer</v-btn>
      	</v-snackbar>

		<v-snackbar v-model='enAttenteInfoServeur' :timeout="4000">
        <span> En attente des information du serveur !</span>
        <v-btn>Fermer</v-btn>
      	</v-snackbar>

		<v-snackbar v-model='win' :timeout="6000">
        <span> Bravo ! vous avez gagner la partie</span>
        <v-btn>Fermer</v-btn>
      	</v-snackbar>

		<v-snackbar v-model='this.$store.state.user.lose' :timeout="6000">
        <span> Fin de partie </span>
        <v-btn>Fermer</v-btn>
      	</v-snackbar>

		<v-snackbar v-model='infoGame' :timeout="5000">
        <span> Impossible de lancer la patie actuellement ! En attente des infos de la partie</span>
        <v-btn>Fermer</v-btn>
      	</v-snackbar>

			<v-form
				class="px-3"
			    ref="form"
			    lazy-validation
			  >
			  <v-flex xs12 sm6 md12>
			    <v-text-field
				  :value="LatLon[0]"
				  @input="updateLat"
			      label="Latitude :"
			      required
			    ></v-text-field>
			 </v-flex>

			

			 <v-flex xs12 sm6 md12>
			    <v-text-field
				 	:value="LatLon[1]"
					@input="updateLon"	
			      label="Longitude : 	"
			      required
			    ></v-text-field>
			 </v-flex>
			 <v-flex xs12 sm6 md12>
      			<v-slider
      			  min="0"
      			  max="20"
      			  label="Zoom :"
				  :value="zoom"	
				  @change="updateZoom"
      			></v-slider>
    			</v-flex>
				
			<v-flex class="text-center">
       				<v-btn depressed :disabled="envoyerPos" @click.prevent="sendPosition">Envoyer Position</v-btn>
			</v-flex>  
			<v-spacer></v-spacer>
			<v-flex class="text-center">
					<v-btn depressed :disabled="!lancerPartie" @click="lancementPossibleSolo">Rejoindre partie Solo</v-btn>
					<v-btn depressed :disabled="!lancerPartie" @click="lancementPossible">Rejoindre Partie Multi-Joueurs</v-btn>
			</v-flex>   
			  			 
			</v-form>
			
      </v-container >
				</v-card>
</template>

<script>
import L from 'leaflet';
import LGEO from 'leaflet-geometryutil'
import { mapState , mapActions , mapGetters} from 'vuex'

export default {
	name : 'Position',
	data () {
		return {
			envoyerPos : false,
			distanceMinToWin : 2,
			lancerPartie : false,
			lancementNot : false,
			activer: true,
			peuxLancerpartie :false,
			infoGame : false,
			win : false,
			track  : null,
			pullingplayers : null,
			enAttenteInfoServeur : false,
			updatePositionServer : null,
		}
	},
	computed : {
		...mapState('appli',['LatLon','zoom','mymarker']),
		...mapState('user',['map','cibleMarker','allUsers','game','timer','lose']),
	},
	beforeCreate(){
	},
	mounted() {
		this.getGameSettings();
		

		this.$root.$on('ActiveEnvoiePos', () => {
			this.envoyerPos = false;
		})

		this.$root.$on('stopPullingPlayers', ()=>{
			clearInterval(this.pullingplayer);
		})
	},
	methods : {
		updateZoomMap(){
			this.$root.$emit('updateZOOMonMap')
		},
		updateLat (event) {
			this.$store.dispatch('appli/updateLatLon',{value : parseFloat(event) || '' , index : 0})
		},
		updateLon (event) {
			this.$store.dispatch('appli/updateLatLon',{value : parseFloat(event) || 0 , index : 1})
		},
		updateZoom (event) {
			this.$store.dispatch('appli/updateZoom',event)
		},
		onFormSubmition (){
			this.$root.$emit("formsubmition"); 
		},
		lancementPossible(){
			this.enAttenteInfoServeur = true;
			this.lancerPartie = false;
			let lanched = false;
			var pullServer = setInterval(()=>{
				this.getGameSettings();
				console.log('encore');
				if (this.$store.state.user.game.lancerGame == true){
					clearInterval(pullServer);
					if (!lanched){
						this.lancerTimer();
						lanched = true;
						this.$store.state.user.game.lancerGame = false;
					}
				}
			},4000)
		},
		lancementPossibleSolo(){
			this.enAttenteInfoServeur = true;
			this.lancerPartie = false;
			let lanched = false;
			var pullServer = setInterval(()=>{
				this.getGameSettings();
				this.$store.state.user.timer.currentTimer = this.$store.state.user.game.ttl - 5 * this.$store.state.user.numPartie;
					let measuredTime = new Date(null);
            		measuredTime.setSeconds(this.$store.state.user.timer.currentTimer);
					this.$store.state.user.timer.formattedTime = measuredTime.toISOString().substr(11, 8);
				if (this.$store.state.user.game.lancerGame == true){
					this.$store.state.user.timer.currentTimer = this.$store.state.user.game.ttl - 5 * this.$store.state.user.numPartie;
					console.log('la valeurrr : ' + this.$store.state.user.timer.currentTimer)
					let measuredTime = new Date(null);
            		measuredTime.setSeconds(this.$store.state.user.timer.currentTimer);
					this.$store.state.user.timer.formattedTime = measuredTime.toISOString().substr(11, 8);
					console.log('me temps que je veux :' + this.$store.state.user.timer.formattedTime)
					clearInterval(pullServer);
					if (!lanched){
						this.lancerTimerSolo();
						lanched = true;
						this.$store.state.user.game.lancerGame = false;
					}
				}
			},4000)
		},
		async lancerTimer(){
			console.log("lanciit deux fois !")
			this.lancementNot = true;
			this.lancerPartie = false;
			await this.getUsersInfo();
			this.$store.dispatch('user/start');
			this.$root.$emit("addcibleTOmap"); 
			this.$root.$emit('addPeriTOmap');
			this.$root.$emit("addPlayers");
			this.trackPosition();
			await this.pullingPlayers()
		},
		async pullingPlayers(){
			this.pullingplayers = setInterval(()=>{
				this.getUsersInfo();
				this.$root.$emit("addPlayers");
				console.log('la valeur que je cherche est : ' + this.$store.state.user.timer.currentTimer)
				if(this.$store.state.user.timer.currentTimer <= 0){
					clearInterval(this.pullingplayers);
					//this.getGameSettings();

				}
			},4000)	
			
		},
		lancerTimerSolo(){
			this.lancementNot = true;
			this.lancerPartie = false;
			this.$store.dispatch('user/start');
			this.$root.$emit("addcibleTOmap"); 
			this.$root.$emit('addPeriTOmap');
			this.trackPosition();	
		},
		sendPosition() {
			//this.getGameSettings();
			if (this.game.periLat && this.game.cibleLat){
				this.lancerPartie = true;
				this.envoyerPos = true;
			}else{
				this.infoGame = true;
			}
			//this.$store.state.user.timer.currentTimer = 59;
            //this.$store.state.user.timer.formattedTime = "00:00:59",
			this.$root.$emit("formsubmition"); 
			this.$store.dispatch("user/setPosition",{LatLon : this.LatLon})
			.then(function(repsonse){
				
			})
			.catch(function(error){
				console.log(error);
			})
				
		},
		setCibleOnMap() {
			this.cibleMarker = L.marker([this.game.cibleLat,this.game.cibleLon]).addTo(this.map).bindPopup("yhsqdksq");
		},
		async getUsersInfo(){
			await this.$store.dispatch("user/getUsersInfo")
			.then(function(repsonse){
			})
			.catch(function(error){
				console.log(error);
			})
		},
		async getGameSettings(){
			var success = false;
			await this.$store.dispatch("user/getGameSettings")
			.then(function(response){
			
			})
			.catch(function(error){
				console.log(error);
			})
			
		},
		trackPosition() {
			this.track = navigator.geolocation.watchPosition(this.successPosition)
			this.updatePositionServer = setInterval(() => {
				this.$store.dispatch('user/setPosition',{LatLon : this.$store.state.appli.LatLon});
			}, 4000);
		},
		successPosition(position) {
			console.log("je stalk")
			this.$store.state.appli.LatLon = [position.coords.latitude,position.coords.longitude]
			localStorage.setItem("LATLON",JSON.stringify(this.$store.state.appli.LatLon))
			var distance = LGEO.length( [L.latLng(this.LatLon[0],this.LatLon[1]),L.latLng(this.game.cibleLat,this.game.cibleLon)] );
			if (distance < this.distanceMinToWin){
				this.win = true;
				clearInterval(this.updatePositionServer)
			}
			this.mymarker.setLatLng(this.LatLon).bindPopup('En mouvement!!');
			if (this.$store.state.user.lose){
				navigator.geolocation.clearWatch(this.track)
				clearInterval(this.updatePositionServer) // stoper l'envoie de ma postion au sereur
			}
 		}
    
  }
}
</script>