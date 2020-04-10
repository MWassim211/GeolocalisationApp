<template>
  <div>
    <app-header v-if="!['login'].includes($route.name)"/>
    <router-view></router-view>
  </div>
</template>



<script>
import Header from './components/Header.vue'

export default {
  components: {
        'app-header' : Header
    },
    data () {
        return {
        }
    },
    methods: {
    }
}
</script>

<style lang="scss">
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
