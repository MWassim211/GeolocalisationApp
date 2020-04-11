const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
const api = require("./routes/api");
const admin = require("./routes/admin");
const methodOverride = require('method-override');
const app = express();

const GeoResourceTab = api.GeoResourcesTab

//app.use(methodOverride('_method'))
app.use(express.json()) // for parsing application/json
app.use(bodyParser.urlencoded({extended:true}));

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  //gres.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  //res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Authorization , Origin');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  //res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use(methodOverride(function (req, res) {

  //console.log("overridennn")
  //console.log(req.body)
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    console.log("youhouuouuu")
    delete req.body._method
    return method
  }
}));

app.use( function( req, res, next ) {
  // this middleware will call for each requested
  // and we checked for the requested query properties
  // if _method was existed
  // then we know, clients need to call DELETE request instead
  if ( req.query._method == 'DELETE' ) {
      // change the original METHOD
      // into DELETE method
      req.method = 'DELETE';
      // and set requested url to /user/12
      req.url = req.path;
  }       
  next(); 
});

app.use('/static', express.static(path.join(__dirname, '/public')));
app.use("/api",api.router);
app.use("/admin",admin);

// EJS config
//app.set("view","./views");
app.set("view engine","ejs");

app.get("/carte",(req,res)=>{res.render("carte" , {GeoResourceTab : GeoResourceTab})});
//app.get("/creation",(req,res)=>{res.render("creation")});
//app.post("/register",admin.registerUser);

app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!") // this should be on the top of the stack ??????
  })

app.listen(3376);