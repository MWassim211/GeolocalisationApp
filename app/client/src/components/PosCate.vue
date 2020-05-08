<template>
   <v-content>
    <v-container fluid>
                <v-row>
                <v-flex xs12 md4 sd4>
                    <gameinfo/> 
                </v-flex>
                <v-flex xs12 md4 sd4>
                    <position/>
                </v-flex>
                <v-flex xs12 md4 sd4>
                    <v-btn xs12 sd12 md12 @click="nouvellePartie"> Nouvelle Partie </v-btn>
                    <timer xs12 sd12 md12 ></timer>
                    <trophies xs12 md12 sd12/>
                </v-flex>
                </v-row>
                    <v-divider></v-divider>
                <carte />

    </v-container>
    </v-content>
   
</template>
<script>
import Position from './Position.vue'
import Carte from './Carte.vue'
import Gameinfo from './Gameinfo.vue'
import Trophies from './Trophies.vue'
import Timer from './Timer.vue'
export default {
    name : 'PosCate',
    components : {
        'position' : Position,
        'carte' :    Carte,
        'gameinfo' : Gameinfo,
        'trophies' : Trophies,
        'timer' : Timer
    },
    Created () {
    },
    mounted() {
    },
    methods: {

        async nouvellePartie(){
            window.clearInterval(this.$store.state.user.timer.ticker)
            this.$root.$emit("ActiveEnvoiePos");
            this.$store.state.appli.otherPlayersMarker.forEach(element => {
                console.log(this.$store)
                this.$store.state.appli.map.removeLayer(element);
            });
            await this.$store.dispatch('user/getGameSettings');
            this.$store.state.appli.map.removeLayer(this.$store.state.appli.periCircle);
            this.$store.state.appli.map.removeLayer(this.$store.state.appli.cibleMarker);
            console.log('test ' + this.$store.state)
            this.$store.state.user.timer.currentTimer = this.$store.state.user.game.ttl - 5 * this.$store.state.user.numPartie;
            if (this.$store.state.user.timer.currentTimer <=0){
                await this.$store.dispatch('user/getGameSettings');
                console.log('dertha mais makeshhhhhh .....');
                console.log(this.$store.state.user.timer.currentTime)
            }
            this.$store.state.user.numPartie++;
            let measuredTime = new Date(null);
            measuredTime.setSeconds(this.$store.state.user.timer.currentTimer);
            this.$store.state.user.timer.formattedTime = measuredTime.toISOString().substr(11, 8);
            console.log(this.$store.state.user.timer.currentTimer)
            console.log(this.$store.state.user.timer.formattedTime);
        }
    }
}
</script>
