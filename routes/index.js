const { Console } = require('console');
var express = require('express');
var router = express.Router();
const fs = require('fs');
const { evaluate, random } = require('mathjs')
const path = require('path');
var pass = require('./passwords.json');
router.get('/', function(req, res, next) {
  res.render('index', { title: 'RandomApi' });
});
router.get('/time', function(req, res, next){
  if(pass["Passwords"][req.url.split("=")[1].split("?")[0]]){
    if((pass["Passwords"][req.url.split("=")[1].split("?")[0]]["usage"]<=100)
    ||(pass["Passwords"][req.url.split("=")[1].split("?")[0]]["permisson"]=="admin")){
    pass["Passwords"][req.url.split("=")[1].split("?")[0]]["usage"]=pass["Passwords"][req.url.split("=")[1].split("?")[0]]["usage"]+1;
    pass["Passwords"][req.url.split("=")[1].split("?")[0]]["lastsearch"]=[...(pass["Passwords"][req.url.split("=")[1].split("?")[0]]["lastsearch"]),"time"]
    fs.writeFileSync(path.join(__dirname,'./passwords.json'),JSON.stringify(pass,null, 2));
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var time ={
      date:date,
      time:time,
    }
    res.json(time);
    }else{
      res.json(
        {"date":"LIMIT EXCEEDED",
      "time":"LIMIT EXCEEDED"})
    }
  }else{
    res.send( `<h1> Wrong Key</h1>
   Redirecting in  <div id="redirect">5</div><script>
   setInterval(()=>{(parseInt(document.getElementById("redirect").innerHTML)<=0
   ?window.location.replace("http://localhost:3000/")
   :document.getElementById("redirect").innerHTML=
   parseInt(document.getElementById("redirect").innerHTML)-1)},1000)
   </script>`)
  }
 
});
router.get('/wallpaper', function(req, res, next){
  if(pass["Passwords"][req.url.split("=")[1].split("?")[0]]){
    if((pass["Passwords"][req.url.split("=")[1].split("?")[0]]["usage"]<=100)
    ||(pass["Passwords"][req.url.split("=")[1].split("?")[0]]["permisson"]=="admin")){
    pass["Passwords"][req.url.split("=")[1].split("?")[0]]["usage"]=pass["Passwords"][req.url.split("=")[1].split("?")[0]]["usage"]+1;
    pass["Passwords"][req.url.split("=")[1].split("?")[0]]["lastsearch"]=[...(pass["Passwords"][req.url.split("=")[1].split("?")[0]]["lastsearch"]),"wallpaper"]
    fs.writeFileSync(path.join(__dirname,'./passwords.json'),JSON.stringify(pass,null, 2));
  let image=["https://wallpaperaccess.com/full/1154205.jpg","https://cutewallpaper.org/22/neon-circle-wallpapers/1102915097.jpg","https://hdwallpaperim.com/wp-content/uploads/2017/08/31/148196-cyberpunk-neon-748x468.jpg"]
  res.json({
      "image":image[Math.floor(random(0,image.length))]
    });
    }else{
      res.json(
        {"image":"LIMIT EXCEEDED"})
    }
  }else{
    res.send( `<h1> Wrong Key</h1>
    Redirecting in  <div id="redirect">5</div><script>
    setInterval(()=>{(parseInt(document.getElementById("redirect").innerHTML)<=0
    ?window.location.replace("http://localhost:3000/")
    :document.getElementById("redirect").innerHTML=
    parseInt(document.getElementById("redirect").innerHTML)-1)},1000)
    </script>`)
  }
  
});
router.get('/evaluate', function(req, res, next) {
  if(pass["Passwords"][req.url.split("=")[1].split("?")[0]]){
    if((pass["Passwords"][req.url.split("=")[1].split("?")[0]]["usage"]<=100)
    ||(pass["Passwords"][req.url.split("=")[1].split("?")[0]]["permisson"]=="admin")){
    pass["Passwords"][req.url.split("=")[1].split("?")[0]]["usage"]=pass["Passwords"][req.url.split("=")[1].split("?")[0]]["usage"]+1;
    pass["Passwords"][req.url.split("=")[1].split("?")[0]]["lastsearch"]=[...(pass["Passwords"][req.url.split("=")[1].split("?")[0]]["lastsearch"]),"evaluate"]
    fs.writeFileSync(path.join(__dirname,'./passwords.json'),JSON.stringify(pass,null, 2));
    let a =req.url.split("=")[2];
    let b;
    try{
b=evaluate(a);}
catch(err){
b=0;
    }
let result={
      result:b
    }
  res.json(result);
  }else{
    res.json(
      {"result":"LIMIT EXCEEDED"})
  }}else{
    res.send( `<h1> Wrong Key</h1>
    Redirecting in  <div id="redirect">5</div><script>
    setInterval(()=>{(parseInt(document.getElementById("redirect").innerHTML)<=0
    ?window.location.replace("http://localhost:3000/")
    :document.getElementById("redirect").innerHTML=
    parseInt(document.getElementById("redirect").innerHTML)-1)},1000)
    </script>`)
  }
})//http://localhost:3000/evaluate?key=123456?data=2+9+829292
router.get('/password',function(req,res,next){
 if(!pass["Passwords"][req.url.split("=")[1]]){
  pass["Passwords"][req.url.split("=")[1]]={
    "usage":0,
    "permission":"user",
    "lastsearch":[]
  }
 fs.writeFileSync(path.join(__dirname,'./passwords.json'),JSON.stringify(pass,null, 2));
 res.json(pass);
 pass=require('./passwords.json');
}else{
  res.send( `<h1>Password Already Exists </h1>
  Redirecting in  <div id="redirect">5</div><script>
  setInterval(()=>{(parseInt(document.getElementById("redirect").innerHTML)<=0
  ?window.location.replace("http://localhost:3000/")
  :document.getElementById("redirect").innerHTML=
  parseInt(document.getElementById("redirect").innerHTML)-1)},1000)
  </script>`)
}
})
module.exports = router;
