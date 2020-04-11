var express = require("express");
var router = express.Router();
var axios = require("axios").default;
const notifier = require('node-notifier');
const api = require("./api");

var GeoResource = require("../classes/GeoResource");
var GeoResourceTab = api.GeoResourcesTab;

var Game ={}


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
}

var setcible = function (req,res){
    console.log(req.body);
    Game.cibleLat = req.body.Hciblelat;
    Game.cibleLon = req.body.Hciblelon;
    console.log(Game);
}
router.get("/",(req,res)=>{res.render("index", {GeoResourceTab : GeoResourceTab});}); 
router.post("/register",registerUser);
router.get("/users",showUsers);
router.get("/users/:user",showUser);
router.put("/users/:user",putUser);
router.delete("/users/:user",deleteUser);
router.post('/gamesettings',setSetting);
router.post('/gamecible',setcible);

module.exports = router;