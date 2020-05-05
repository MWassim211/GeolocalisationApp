<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                dark
                flat
              >
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer />
              </v-toolbar>

              <v-alert color='error' :value='error' icon='close'>Login or Passeword are incorrect.</v-alert>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Login"
                    name="login"
                    prepend-icon="person"
                    type="text"
                   :value="username"
                   @input ="updateUsername"
                  />

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                    :value="password"
                    @input="updatePassword"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn dark class="white--text" @click.prevent="login">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import {mapState} from 'vuex'
  export default {
    name : 'Login',
    data () {
        return {
            //username : '',
            //password : '',
            error : false
        }
    },
    computed : {
        ...mapState('user',['username','password'])
    },
    methods : {
        updateUsername (value) {
          this.$store.dispatch("user/updateUsername", {value : value})
        },
        updatePassword(value) {
          this.$store.dispatch("user/updatePassword", {value : value})
        },
        login () {
            this.$store.dispatch('user/login' , {
                login : this.username,  // login beacuse in rest api it uses logun not username
                password : this.password
            })
            .then(success => {
                console.log("succcccce");
                this.$router.push('/') // if login is successful redirect him to home page
            })
            .catch(error => {
                console.log(error)
                this.error = true;
            })
        }
    },
    props: {
      source: String,
    },
  }
</script>