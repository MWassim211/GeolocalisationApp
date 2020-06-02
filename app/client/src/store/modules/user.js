import axios from 'axios'



export default {
    namespaced: true,
    state : {
        username : '',
        password : '',
        userurl : '',
        allUsers : [],
        lose : false,
        game : {},
        timer : {
            currentTimer : 59,
            formattedTime : "00:00:59",
            ticker : undefined
        },
        numPartie : 0,
        score : 0
    },
    mutations : {
        LOGIN (state,payload) {
            return new Promise ((resolve,reject) => {
                axios.post("https://192.168.75.26:8080/login",null, {
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
        },
        UPDATEUSER(state,payload) {
            state.username = payload.value;
        },
        UPDATEPASS (state,payload){
            state.password = payload.value;
        },
        UPDATEURL (state,paylaod) {
            state.userurl = paylaod.value;
        },
        UP(state,payload){
            state.allUsers.forEach(element => {
                L.circle(element.position,{radius : 1000 , color : 'red'}).addTo(this.map);
            })
        },
        
    },
    actions : {
        setUsersMap(context,payload){
            context.commit("UP",payload)
            },
        updateUsername (context,payload) {
            context.commit("UPDATEUSER",payload)
        },
        updatePassword(context,payload){
            context.commit("UPDATEPASS",payload)
        },
        updateUrl (context,paylaod){
            context.commit("UPDATEURL",paylaod)
        },
        login (context , payload) {
           return new Promise ((resolve,reject) => {
            //https://192.168.75.26/login //
            axios.post("https://192.168.75.26/login",null, {
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
                reject(error);
            })
        }) 
        },
        logout(context,payload){
            return new Promise ((resolve,reject) => {
                //https://192.168.75.26/logout //http://192.168.75.26:8080
                axios.delete("https://192.168.75.26/logout",{
                    data : sessionStorage.getItem('token')
                })
                .then(function(response){
                    if (response.status === 204){
                        sessionStorage.removeItem('token')
                        localStorage.removeItem("user");
                        resolve(true);
                    }
                })
                .catch(function(error) {    
                    reject(error);
                })
            }) 
        },
        gameParams(context,payload){
            //context.commit('GAMEPARAMS',payload);
            console.log(context.state.username);
            return new Promise ((resolve,reject) => {
                //https://192.168.75.26/api/resources //http://localhost:3376
                axios.put("https://192.168.75.26/api/resources/"+localStorage.getItem('user')+"/image",{url : context.state.userurl},{ params : {
                    Authorization : sessionStorage.getItem('token'),
                    origin : document.location.origin
                }})
                .then(function(response){
                    console.log('passed')
                    if (response.status === 204){
                    }
                    resolve(true);
                })
                .catch(function(error) { 
                    console.log('dmg fail')  
                    reject(error) 
                })
            })
        },
        setPosition(context,payload){
            console.log(context.state.username);
            console.log(payload);
            return new Promise((resolve,reject)=>{
                //https://192.168.75.26/api/resources // http://localhost:3376
                axios.put("https://192.168.75.26/api/resources/"+localStorage.getItem('user')+"/position",{position : payload.LatLon},{ params : {
                    Authorization : sessionStorage.getItem('token'),
                    origin : document.location.origin
                }})
                .then(function(response){
                    if (response.status === 204){
                    }
                    resolve(true);
                })
                .catch(function(error) { 
                    reject(error) 
                })
            })
        },
        getImage (context,payload) {
            console.log(sessionStorage.getItem('token'));
            //https://192.168.75.26/api/resources //http://localhost:3376
            axios.get("https://192.168.75.26/api/resources",{ params : {
                Authorization : sessionStorage.getItem('token'),
                origin : document.location.origin
            }})
                .then(function(response){   
                    if (response.status === 200){
                        console.log(response);  
                        console.log(this.$store.state.username + 'le nom');
                        let GeoRes = response.data.find(element => { element.id === this.$store.state.username})
                        this.$store.state.userurl =GeoRes.url;
                        console(this.$store.state.userurl);
                    }
                })
                .catch(function(error) {  
                    console.log(error);
                })
        },
        getUsersInfo(context,payload){
            return new Promise((resolve,reject)=>{
                //https://192.168.75.26/api/resources //http://localhost:3376
                axios.get("https://192.168.75.26/api/resources/",{ params : {
                    Authorization : sessionStorage.getItem('token'),
                    origin : document.location.origin
                }})
                .then(function(response){
                    console.log('passed I will display')
                    if (response.status === 200){
                        context.state.allUsers = response.data;
                        localStorage.setItem('usersConnecteToGame',JSON.stringify(context.state.allUsers))
                    }
                    resolve(true);
                })
                .catch(function(error) { 
                    reject(error) 
                })
            })
        },
        getGameSettings(context,paload){
            return new Promise((resolve,reject)=>{
                //https://192.168.75.26/api/gamesettings //http://localhost:3376
                axios.get("https://192.168.75.26/api/gamesettings",{ params : {
                    Authorization : sessionStorage.getItem('token'),
                    origin : document.location.origin
                }})
                .then(function(response){
                    console.log('passed')
                    if (response.status === 200){
                        context.state.game =response.data;
                        context.state.timer.currentTimer = response.data.ttl - 5 * context.state.numPartie;
                        let measuredTime = new Date(null);
                        measuredTime.setSeconds(context.state.timer.currentTimer);
                        context.state.timer.formattedTime = measuredTime.toISOString().substr(11, 8);
                        localStorage.setItem('GameSet',JSON.stringify(context.state.game))
                    }
                    resolve(true);
                })
                .catch(function(error) { 
                    reject(error) 
                })
            })
        },
        start (context,paload) {
            if (context.state.timer.currentTimer > 0) 
              context.dispatch('tick')
        },
        tick (context,payload) {
            context.state.timer.ticker = setInterval(() => {
            context.state.timer.currentTimer--;
            if(context.state.timer.currentTimer <= 0) {
                window.clearInterval(context.state.timer.ticker)
                context.state.lose = true;
                if(window.navigator.vibrate) {
                    window.navigator.vibrate(200);
                }
            }
            let measuredTime = new Date(null);
            measuredTime.setSeconds(context.state.timer.currentTimer);
            let MHSTime = measuredTime.toISOString().substr(11, 8);
            context.state.timer.formattedTime = MHSTime
            }, 1000)
          },
          formatTime (context,payload) {
                let measuredTime = new Date(null);
                measuredTime.setSeconds(context.state.timer.currentTimer);
                let MHSTime = measuredTime.toISOString().substr(11, 8);
            return MHSTime;
        }
    },
    getters : {

    }
}