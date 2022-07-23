var express = require("express");
var app = express();
var router = express.Router();
var path = __dirname + '/Views/';
const path2 = require('path');
const getDate = (req, res, next) => {
  
  if ((new Date().getDay() > 0 && new Date().getDay() < 6) && (new Date().getHours() >= 9 && (new Date().getHours() + 1) <= 17)) {
      console.log("app is open ")
      next()
  } else {
      console.log("app is closed ")
      res.end(' sorry !!!! The web application is only available during working hours (Monday to Friday,  from 9 to 17)')
  }
}
app.use(getDate);
app.set('Views',path2.join(__dirname,'Views'));

router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get("/",function(req,res){
  res.sendFile(path + "index.html");
});

router.get("/about",function(req,res){
  res.sendFile(path + "about.html");
});

router.get("/contact",function(req,res){
  res.sendFile(path + "contact.html");
});

app.use("/",router);

app.use("*",function(req,res){
  res.sendFile(path + "404.html");
});

app.listen(5000,function(){
  console.log("Live at Port 5000");
});
