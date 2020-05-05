import Vue from 'vue'
import App from './App.vue'
//import Carte from './components/Carte.vue'
//import Position from './components/Position.vue'
//import Header from './components/Header.vue'
//import 'leaflet/dist/leaflet.css';
//import 'purecss/build/pure-min.css';
//import './public/css/style.css';
//
//import './public/js/map';
//import './public/js/form';
//console.log(this.$refs);
 new Vue({
    el :"#app",
    data : {
        name : 'hoho'
    },
    components : {
        //Header,
        //Position,
        //Carte
        App
    },
    template : '<App/>',
});