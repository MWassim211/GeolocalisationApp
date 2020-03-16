var express = require("express");
var router = express.Router();
var axios = require("axios");

var GeResource = require("../classes/GeoResource");

var tab = [];
tab.push(new GeResource());
tab.push(new GeResource());

router.get("/resources",(req,res)=>{
    axios.get("http://192.168.75.26:8080/authenticate",{
        params: {
            token : req.headers.token,
            origin : req.headers.origin
          }
    })
    .then(function (response) {
        // handle success 
        console.log(response);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ GeResources : tab }));
        //console.log(response.data);
    })
    .catch(function (error) {
        // handle error
        res.sendStatus(401)
        console.log(error);
    })
    .then(function () {
        // always executed
        console.log(tab);
    });
    
})  

router.put("/resources/:resourcesId/position",(req,res)=>{
    res.send("put resourcesID");
    console.log(req.params.resourceId); 
})

router.put("/resources/:resourcesId/image",(req,res)=>{
    res.send("put resourcesID");
    console.log(req.params.resourceId);
})

module.exports = router;