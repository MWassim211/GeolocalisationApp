import axios from 'axios'

export default {
    namespaced: true,
    state : {
        userurl : ''
    },
    mutations : {
        LOGIN (state,payload) {
            return new Promise ((resolve,reject) => {
                axios.post("http://192.168.75.26:8080/login",null, {
                    params : {
                        login : payload.login,
                        password : payload.password
                    }
                })
                .then(function(response){
                    console.log('statusssss' + response.status)
                    if (response.status === 200){
                        console.log(response.headers.authentication);
                        localStorage.setItem('token',response.headers.authentication)
                        resolve(true);
                    }
                })
                .catch(function(error) {
                    console.log('failed');
                    reject(false);
                })
            }) 
        },
        GAMEPARAMS (state,payload){
            // Axios call and promises
        }
    },
    actions : {
        login (context , payload) {
           return new Promise ((resolve,reject) => {
            axios.post("http://192.168.75.26:8080/login",null, {
                params : {
                    login : payload.login,
                    password : payload.password
                }
            })
            .then(function(response){
                if (response.status === 200){
                    console.log(response.config.params.login);
                    sessionStorage.setItem('token',response.headers.authentication)
                    localStorage.setItem("user",response.config.params.login);
                    resolve(true);
                }
            })
            .catch(function(error) {    
                console.log('failed');
                reject(error);
            })
        }) 
        },
        gameParams(context,payload){
            context.commit('GAMEPARAMS',payload);
        }
    },
    getters : {

    }
}