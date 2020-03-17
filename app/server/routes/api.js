var express = require("express");
var router = express.Router();
var axios = require("axios");

var GeoResource = require("../classes/GeoResource");

var tab = [];
tab.push(new GeoResource());
tab.push(new GeoResource());

function authenticate(req) {
    return axios.get("http://192.168.75.26:8080/authenticate",{
        params: {
            token : req.get("Authorization"),
            origin : req.get("Origin")
          }
    })
}

router.get("/resources",(req,res)=>{
    authenticate(req)
    .then(function (response) {
        // handle success 
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(  tab ));
    })
    .catch(function (error) {
        // handle error
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

        if (!(Array.isArray(position) && position.length == 2 && typeof position[0] == 'number' && typeof position[1] == "number" )){
            res.status(400).send("Invalid position object");
        }

        let resource = tab.find(element => element.id == resourceId);
        if (!resource){
            res.status(404);
        }
        resource.position=position;
        res.sendStatus(204);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
        res.sendStatus(401)
    })
    .then(function () {
        // always executed
    });
    
})

router.put("/resources/:resourceId/image",(req,res)=>{
    authenticate(req)
    .then(function(response){
        let resourceId = req.params.resourceId;
        console.log(resourceId);
        let url = req.body.url;
        if (! typeof url == 'string'){
            res.status(400).send("Invalid url object");
        }

        let resource = tab.find(element => element.id == resourceId);
        if (!resource){
            res.sendStatus(404);
        }

        resource.url=url;
        res.send(204);
    })    
    .catch(function(error){
        res.sendStatus(401);
    })
    .then(function(response){
        //always executed
    })
})

module.exports = router;