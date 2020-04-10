<template>
  <form>
    <v-text-field
      :value="userurl"      
      label="Url"
      required
      @input="setUrl"
    ></v-text-field>
   

    <v-btn class="mr-4" @click.prevent="setFomSub">submit</v-btn>
    <v-btn @click="clear">clear</v-btn>
  </form>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name : 'Gamesettings',
    date () {
        return {

        }
    },
    computed : {
        ...mapState('user',['userurl'])
    },
    methods : {
      setFomSub () {
        this.$store.dispatch('user/gameParams');
      },
      setUrl (value) {
        this.$store.dispatch('user/gameParams',value);
      }
    }
}
</script>