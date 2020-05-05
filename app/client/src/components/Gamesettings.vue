<template>
  <form>
    <v-text-field
      :value="userurl" 
      name="url"     
      label="Url"
      required
      @input="setUrl"
    >
    </v-text-field>
   

    <v-btn class="mr-4" @click.prevent="setFomSub">submit</v-btn>
    

     <v-row align="center" justify="center">
    <v-img
      :src="userurl"
      align="center"
      justify="center"
      aspect-ratio="1"
      class="grey lighten-2"
      max-width="500"
      max-height="300"
    >
      <template v-slot:placeholder>
        <v-row
          class="fill-height ma-0"
          align="center"
          justify="center"
        >
        </v-row>
      </template>
    </v-img>
  </v-row>
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
    mounted : function(){
      //this.$store.dispatch('user/getImage');
    },
    computed : {
        ...mapState('user',['userurl'])
    },
    methods : {
      setFomSub () {
        this.$store.dispatch('user/gameParams')
        .then(success => {
                this.$router.push('/') // if login is successful redirect him to home page
            })
            .catch(error => {
                console.log(error)
            })
      },
      setUrl (value) {
        this.$store.dispatch('user/updateUrl',{value : value});
      }
    }
}
</script>