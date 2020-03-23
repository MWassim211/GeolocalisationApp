<template>
  <div id="app">
    <Header />
    <Position ref="poref"/>
   <section>
        <h2 id="unique">Carte</h2>
        <div id="map"></div>
    </section>
  <button v-on:click="ready">tap</button>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Position from './components/Position.vue'
import Carte from './components/Carte.vue'
import 'vue/dist/vue.esm.browser'
import './assets/js/bundle'


export default {
  name: 'App',
  components: {
    Header,
    Position,
    Carte
  },
  methods : {
    ready() {
      console.log(document.getElementById("unique"))
      console.log(this.$refs.poref)
    }
    
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
