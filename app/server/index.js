const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
const api = require("./routes/api");
const admin = require("./routes/admin");
const methodOverride = require('method-override');
const app = express();

app.use(express.json()) // for parsing application/json
app.use(bodyParser.urlencoded({extended:true}));
app.use("/api",api);
app.use("/admin",admin);
app.use('/static', express.static(path.join(__dirname, '/public')));

// EJS config
//app.set("view","./views");
app.set("view engine","ejs");

//app.get("/admin",(req,res)=>{res.render("index")});
//app.get("/creation",(req,res)=>{res.render("creation")});
//app.post("/register",admin.registerUser);

app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!") // this should be on the top of the stack ??????
  })

app.listen(3000);