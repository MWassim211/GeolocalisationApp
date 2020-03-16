var express = require("express");
var router = express.Router();
var axios = require("axios").default;
const notifier = require('node-notifier');

router.get("/",(req,res)=>{res.render("index")}); 
router.get("/create",(req,res)=>{res.render("create")});

var registerUser  = function (req,res) {
    axios.post('http://192.168.75.26:8080/users', {
        login: req.body.login,
        password:  req.body.password // based on name tag in html
    })
    .then(function (response) {
        // String
        notifier.notify('User Created Successfuly');
        console.log(response);
        res.render("index");
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
    axios.put("http://192.168.75.26:8080/users/"+req.params.user, {
        login: req.body.login,
        password:  req.body.password // based on name tag in html
    }).then(function (response) {
        // String
        notifier.notify('User Updated Successfuly');
        console.log(response);
        res.render("index");
    })    
    .catch(function (error) {
        console.log(error);
    }).then(function () {
        console.log("puttt");
    });
}
router.post("/register",registerUser);
router.get("/users",showUsers);
router.get("/users/:user",showUser);
router.get("/users/:user/update",(req,res)=>{res.render("modify"),{user : response.data}});
router.put("/users/:user",putUser);
//router.post("/users",()=>{console.log("tar rrrra post")})
router.post("/users/:user",()=>{console.log("tar rrrra")});
module.exports = router;