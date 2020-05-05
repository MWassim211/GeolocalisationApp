<template>
<v-app id="landing-page">
    <!--<app-header v-if="!['login'].includes($route.name)"/>-->
    <Navbar v-if="!['login'].includes($route.name)"/>
    <router-view></router-view>

</v-app>
</template>



<script>
import L from 'leaflet'
import Header from './components/Header.vue'
import Navbar from './components/Navbar.vue'

export default {
  components: {
        'app-header' : Header,
        Navbar,
    },
    data () {
        return {
        }
    },
    //created() {
    //    // Listen to storage events
    //     //this.$store.state.appli.LatLon = JSON.parse(localStorage.getItem("LATLON"));
    //    //    console.log(this.$store)
    //        console.log('je usis sans lelistner')
    //    if (!localStorage.getItem("monstore")) {
    //        // console.log('Ignored an event: ', e)
    //        console.log("ya rien du tout en ce moment")
    //    return
    //    }
    //              var vuexJSON = JSON.parse(localStorage['monstore'])th
    //              console.log("elfechta")
    //              console.log(store)
    //              store.replaceState(vuexJSON)
//
    //              
//
    //    },
    created() {

        if(localStorage.getItem('LATLON')  == null){
            this.setRealPosition();
        }else{
            this.$store.state.appli.LatLon = JSON.parse(localStorage.getItem('LATLON')) 
        }

        if(localStorage.getItem('zoom')  !== null){
            this.$store.state.appli.zoom = parseInt(localStorage.getItem('zoom')) 
        }
    },
    mounted () {

        //window.addEventListener('unload',(event)=>{
        //    sessionStorage.setItem('timer', JSON.stringify(this.$store.state.user.timer));
        //})
        if(localStorage.getItem('usersConnecteToGame') !== null){
            this.$store.state.user.allUsers = JSON.parse(localStorage.getItem('usersConnecteToGame'));
            this.$root.$emit("addPlayers");
        }
        if(localStorage.getItem('GameSet') !== null){
            this.$store.state.user.game = JSON.parse(localStorage.getItem('GameSet'));
            this.$root.$emit("addCible");
            this.$root.$emit("addcibleTOmap"); 
			this.$root.$emit('addPeriTOmap')
        }
        //if (sessionStorage.getItem('timer') !== null){
        //    this.$store.state.user.timer = JSON.parse(sessionStorage.getItem('timer'))
        //    this.$store.dispatch('user/start');
        //}
    },
    beforeDestroy(){
    },
    methods: {
        setRealPosition(){
			if (navigator.geolocation){
				navigator.geolocation.getCurrentPosition((pos)=>{
                    this.$store.dispatch('appli/updateLatLon',{value : pos.coords.latitude  , index : 0})
					this.$store.dispatch('appli/updateLatLon',{value : pos.coords.longitude  , index : 1})
				})
			}else{
				alert("pas de Geo");
			}
		},
    }
}
</script>

<style lang="scss">

//#app{
//  background: #3A1C71;
//    background: -webkit-linear-gradient(to right, #FFAF7B, #D76D77, #3A1C71);
//    background: linear-gradient(to right, #FFAF7B, #D76D77, #3A1C71);
// 
//}
//#app {
//  font-family: Avenir, Helvetica, Arial, sans-serif;
//  -webkit-font-smoothing: antialiased;
//  -moz-osx-font-smoothing: grayscale;
//  text-align: center;
//  color: #2c3e50;
//}
//
//#nav {
//  padding: 30px;
//
//  a {
//    font-weight: bold;
//    color: #2c3e50;
//
//    &.router-link-exact-active {
//      color: #42b983;
//    }
//  }
//}
</style>
