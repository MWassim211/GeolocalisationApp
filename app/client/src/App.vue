<template>
  <div id="app">
    <Header />
    <Position ref="poref"/>
  <Carte />
  <button v-on:click="ready">tap</button>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Position from './components/Position.vue'
import Carte from './components/Carte.vue'
//import 'vue/dist/vue.esm.browser' included in Webpack
//import './assets/js/bundle'


export default {
  name: 'App',
  components: {
    Header,
    Position,
    Carte
  },
  methods : {
    ready() {
    }
    
  },
    mounted() {
      import('./assets/js/bundle.js')
    } 
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
