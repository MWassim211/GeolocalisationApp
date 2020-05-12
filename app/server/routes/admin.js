var express = require("express");
var router = express.Router();
var axios = require("axios").default;
const notifier = require('node-notifier');
const api = require("./api");


//var GeoResource = require("../classes/GeoResource");
var GeoResourceTab = api.GeoResourcesTab;
//console.log(GeoResourceTab.length + 'cc')
var Game = { ttl : 60, radius:1000}
    


router.get("/create",(req,res)=>{res.render("create")});
router.get("/config",(req,res)=>{res.render('gameConfig')})


var gameResource = function(req,res) {
    axios.get('http://192.168.75.26:8080/users')    
    .then(function (response) {
        // handle success 
        //console.log(response);
        console.log(response.data);
        //var usersConnected = response.data.filter(element => element.connected == ture);
        //usersConnected.forEach(element => {
        //    GeoResourceTab.push(new GeoResource(element.login));
        //});
        //  res.render("index", {GeoResourceTab : GeoResourceTab});
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .then(function () {
        // always executed
    });
}

var registerUser  = function (req,res) {
    axios.post('http://192.168.75.26:8080/users', {
        login: req.body.login,
        password:  req.body.password // based on name tag in html
    })
    .then(function (response) {
        // String
        notifier.notify('User Created Successfuly');
        console.log(response);
        //res.render("index");
        res.redirect('/admin')
    })    
    .catch(function (error) {
        console.log(error);
    });
    /*axios.get('http://192.168.75.26:8080/users')
    
    .then(function (response) {
        // handle success 
        console.log(response);
        res.render("creation");
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .then(function () {
        // always executed
    });*/
    console.log("Done");
}

var showUsers = function(req,res) {
    axios.get('http://192.168.75.26:8080/users')
    .then(function (response) {
        // handle success 
        //console.log(response);
        //console.log(response.data);
        res.render("users", {users : response.data});
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .then(function () {
        // always executed
    });
};

var showUser = function (req,res){
    axios.get("http://192.168.75.26:8080/users/"+req.params.user)
    .then(function (response) {
        // handle success 
        //console.log(response);
        //console.log(response.data);
        res.render("user", {user : response.data});
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .then(function () {
        // always executed
    });
}

var putUser = function(req,res){
    console.log(req.params.user);
    console.log(req.body.login);
    console.log("ta race");
    axios.put("http://192.168.75.26:8080/user/"+req.params.user, {
        login: req.body.login,
        password:  req.body.password // based on name tag in html
    }).then(function (response) {
        // String
        notifier.notify('User Updated Successfuly');
        console.log(response);
        res.redirect("/admin/users");
    })    
    .catch(function (error) {
        console.log(error);
    }).then(function () {
        console.log("puttt");
    });
}

var deleteUser = function(req,res) {
    axios.delete("http://192.168.75.26:8080/user/"+req.params.user)
    .then(function(response){
        notifier.notify('User Deleted Successfuly');
        console.log(response);
        res.redirect('/admin/users')
    })
    .catch(function(error){
        console.log(error);
    }).then(function(){
        console.log('deleteee');
    })
}

var setSetting = function (req,res){
    Game.ttl = req.body.ttl;
    console.log(req.body);
    console.log(Game);
    notifier.notify('ttl set with Success');
    res.redirect('/admin')
}

var setcible = function (req,res){
    console.log('envoie de la cible');
    Game.cibleLat = req.body.Hciblelat;
    Game.cibleLon = req.body.Hciblelon;
    console.log(Game);
    notifier.notify('Cible set with Success');
    res.redirect('/admin')
}

var setperi = function(req,res){
    Game.periLat = req.body.Hperilat;
    Game.periLon = req.body.Hperilon;
    notifier.notify('Perimetre set with Success');
    res.redirect('/admin')
}

var lancerGame = function(req,res){
    Game.lancerGame = true;
    //LancementGame = true;
    notifier.notify('Partie lancer avec succés');
    setTimeout(function() { Game.lancerGame = false }, Game.ttl * 1000);
    //setTimeout(function() { LancementGame = false }, Game.ttl * 500);
    //Game.lancerGame = false ;
    res.redirect('/admin'); 
}

var setRadius = function(req,res){
    Game.Radius = req.body.radius;
    notifier.notify('Radius set with Success');
    res.redirect('/admin')
}
router.get("/",(req,res)=>{ 
    console.log(require("./api"));
    console.log('testtt')
    res.render("index",{ data : require("./api").GeoResourcesTab});
    //res.render("user", {user : {login : 'cc', connected : false}});
}); 
router.post("/register",registerUser);
router.get("/users",showUsers);
router.get("/users/:user",showUser);
router.put("/users/:user",putUser);
router.delete("/users/:user",deleteUser);
router.post('/gamesettings',setSetting);
router.post('/gamecible',setcible);
router.post('/gameperi',setperi);
router.post('/radius',setRadius)
router.post('/lancerGame',lancerGame)

module.exports = {
    router,
    Game
}