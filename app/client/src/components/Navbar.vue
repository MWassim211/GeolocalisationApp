<template>
  <div>
      <v-content>
        <v-layout>
    <v-app-bar
      dense
      dark
      
    >
      <v-app-bar-nav-icon @click="drawer = !drawer" ></v-app-bar-nav-icon>

     

      <v-toolbar-title>Pac Mapp</v-toolbar-title>

      <v-spacer></v-spacer>

       <v-btn icon>
        <router-link to="/" exact><v-icon color="grey darken-2" >mdi-home</v-icon></router-link>
      </v-btn>  

      <v-btn icon>
        <router-link to="/settings" exact><v-icon color="grey darken-2">mdi-account-cog</v-icon></router-link>
      </v-btn>


      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      
      <v-menu
        left
        bottom
      >
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="n in 5"
            :key="n"
            @click="() => {}"
          >
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    <v-btn  color="dark" @click="logout"> 
        <span>Sign Out</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>

    </v-app-bar>
    
    </v-layout>
    
    </v-content>
     <v-navigation-drawer app v-model="drawer" dark clipped>
          <v-list>
              <v-subheader class="text--center">Users connected</v-subheader>
              <v-divider white></v-divider>
              <v-list-item-group color="primary">
              <v-list-item
                  v-for="user in allUsers"
                  :key="user.id"
              >
                  <v-list-item-content>
                      <Popup :propObj="user">{{user.id}}</Popup>
                      <v-divider class="white--text"></v-divider>
                  </v-list-item-content>
              </v-list-item>
              </v-list-item-group>
          </v-list>
    </v-navigation-drawer>  
  </div>
</template>

<script>
import {mapState} from 'vuex';
import Popup from './Popup.vue'
export default {
  data() {
    return {
      drawer: false,
      
    }
  },
  components : {
      Popup,
  },
  props : {
      userTodisplay : Object
  },
  computed : {
      ...mapState('user',['allUsers'])
  },
  watch : {
      drawer : function(){
          //if (this.drawer === true) {this.getUsersInfo();}
      }
    },
  methods : {
      getUsersInfo(){
			  this.$store.dispatch("user/getUsersInfo")
			  .then(function(repsonse){
			  })
			  .catch(function(error){
			  	console.log(error);
			})
    },
    logout(){
      this.$store.dispatch('user/logout')
      .then(success => {
          localStorage.clear();
          sessionStorage.clear();
          this.$router.push('/login') // if login is successful redirect him to home page
      })
      .catch(function(error){
        console.log(error)
      })
    }
  }
}
</script>