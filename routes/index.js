var express = require('express');
var router = express.Router();
const fs = require('fs');
const { evaluate } = require('mathjs')
var pass = require('./passwords.json');
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var time ={
  date:date,
  time:time,
}

router.get('/', function(req, res, next) {
  res.render('index', { title: 'RandomApi' });
});
router.get('/time', function(req, res, next) {
  if([...pass["Passwords"]].indexOf(req.url.split("=")[1])!=-1){
  res.json(time);

  }else{
    res.send("Wrong key")
  }
  
});
router.get('/evaluate', function(req, res, next) {
  if([...pass["Passwords"]].indexOf(req.url.split("=")[1].split("?")[0])!=-1){
    let a =req.url.split("=")[2];
    let result={
      result:evaluate(a)
    }
  res.json(result);

  }else{
    res.send("Wrong key")
  }
})//http://localhost:3000/evaluate?key=123456?data=2+9+829292
router.get('/password',function(req,res,next){
  const path = require('path');
 let a=req.url.split("=")[1];
 if([...pass["Passwords"]].indexOf(a)==-1){
 let c={
   Passwords:[...pass["Passwords"],a]
 }
 fs.writeFileSync(path.join(__dirname,'./passwords.json'),JSON.stringify(c,null, 2));
 res.json(c);
 pass=require('./passwords.json');
}else{
  res.send("Password already exists")
}
})
module.exports = router;
