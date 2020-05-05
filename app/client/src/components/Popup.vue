<template>
  <div class="text-center">
      <v-list-item-title
      color="primary"
      dark
      @click.stop="dialog = true"
    >
      {{propObj.id}} 
        </v-list-item-title>
    <v-dialog
      style="z-index:9999;"
      v-model="dialog"
      width="500"
    >
      


      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          {{propObj.id}} 
        </v-card-title>

        <v-card-text>
            <v-layout column align-center>
                <v-flex class="mt-5">
                    <v-avatar size="200">
                        <img class="text-lg-center" :src="propObj.url">
                    </v-avatar>
                    <p class="dark--text subheading mt-1 text-center"> {{propObj.id}}</p>

                    <p class="dark--text subheading mt-1 text-center"> position : {{propObj.position}}</p>
                    <p class="dark--text subheading mt-1 text-center"> role : {{propObj.role}}</p>
                    <p class="dark--text subheading mt-1 text-center"> status : {{propObj.status}}</p>
                    <p class="dark--text subheading mt-1 text-center"> trophies : {{propObj.trophys}}</p>
                </v-flex>
            </v-layout>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
           Fermer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>


<script>
  export default {
    name : 'Popup',
    props :{
        propObj: { type: Object, required: false}
    },
    data () {
      return {
        dialog: false,
      }
    },
  }
</script>