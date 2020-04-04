import axios from 'axios'

export default {
    namespaced: true,
    state : {
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
                    console.log('status' + response.status)
                    if (response.status === 200){
                        resolve(true)
                    }
                })
                .catch(function(error) {
                    reject(error)
                })
            }) 
        }
    },
    actions : {
        login (context , payload) {
            context.commit('LOGIN',payload)
        }
    },
    getters : {

    }
}