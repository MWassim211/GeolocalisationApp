var express = require("express");
var router = express.Router();
var axios = require("axios");
const adminSettings = require("./admin");

var GeoResource = require("../classes/GeoResource");

var GeoResourcesTab = [];
GeoResourcesTab.push(new GeoResource("toto1"));
GeoResourcesTab.push(new GeoResource("toto2"));
var Game = adminSettings.Game;






function authenticate(req) {
    console.log('tarace');
    console.log(req.query.Authorization);
    console.log(req.query.origin);
    console.log('tarace2');
    return axios.get("http://192.168.75.26:8080/authenticate",{
        params: {
            token : req.query.Authorization,
            origin : req.query.origin,
            //token : req.get('Authorization'),
            //origin : req.get('Origin')
          }
    })
}

router.get('/gamesettings', (req,res)=>{
    authenticate(req)
    .then(function(response){
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(  Game ));
    })
    .catch(function (error) {
        // handle errorgit
        res.sendStatus(401)
        console.log(error);
    })
    .then(function () {
        // always executed
    });
})



router.get("/resources",(req,res)=>{
    authenticate(req)
    .then(function (response) { 
        // handle success 
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(  GeoResourcesTab ));
    })
    .catch(function (error) {
        // handle errorgit
        res.sendStatus(401)
        console.log(error);
    })
    .then(function () {
        // always executed
    });
    
})  

router.put("/resources/:resourceId/position",(req,res)=>{
    authenticate(req)
    .then(function(response){
        let resourceId = req.params.resourceId
        let position = req.body.position;
        console.log(position)
        if (!(Array.isArray(position) && position.length == 2 && typeof position[0] === 'number' && typeof position[1] === "number" )){
            res.status(400).send("Invalid position object");
        }

        let resource = GeoResourcesTab.find(element => element.id == resourceId);
        if (!resource){
            //res.status(404);
            resource = new GeoResource(resourceId);
            GeoResourcesTab.push(resource);
            console.log('pushhhhh');
            
        }
        resource.position=position;
        res.sendStatus(204);
    })
    .catch(function (error) {
        // handle error
        console.log("put de l'apii eroor")
        console.log(error);
        res.sendStatus(401)
    })
    .then(function () {
        // always executed
    });
    
})

router.put("/resources/:resourceId/image",(req,res)=>{
    console.log(console.log(authenticate(req)));
    authenticate(req)
    .then(function(response){
        console.log("dkhelt win nhab");
        console.log(response);
        let resourceId = req.params.resourceId;
        let url = req.body.url;
        console.log("monurl" + url);
        if (! typeof url == 'string'){
            res.status(400).send("Invalid url object");
        }

        let resource = GeoResourcesTab.find(element => element.id == resourceId);
        if (!resource){
            //res.sendStatus(404);
            resource = new GeoResource(resourceId);
            GeoResourcesTab.push(resource);
        }
        resource.url=url;
        res.sendStatus(204);
    })    
    .catch(function(error){
        console.log("jaffiche les erreus");
        console.log(error);
        res.sendStatus(401);
    })
    .then(function(response){
        //always executed
        let resourceId = req.params.resourceId;
        let resource = GeoResourcesTab.find(element => element.id == resourceId);
        console.log(resource);
    })
})

module.exports = {
    router,
    GeoResourcesTab
}
