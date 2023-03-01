//boiler plate code for starting a server
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const port = process.env.PORT || 3000;


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.listen( port , function() {
  console.log(`Server listening on port ${port}`);

});

/*************************************************************************************/

//setting up  get requests
app.get("/",function (req,res){
  res.render("cover");
});

app.get("/home",function(req,res){
  res.render("home");
});















/*************************************************************************************/
//setting up post requests
