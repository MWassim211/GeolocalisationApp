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
                color="#444"
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
                    v-model="username"
                  />

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                    v-model="password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="#444" class="white--text" @click.prevent="login">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    name : 'Login',
    data () {
        return {
            username : '',
            password : '',
            error : false
        }
    },
    methods : {
        login () {
            console.log(this.$store.user)
            this.$store.dispatch('user/login' , {
                login : this.username,  // login beacuse in rest api it uses logun not username
                password : this.password
            })
            .then(success => {
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