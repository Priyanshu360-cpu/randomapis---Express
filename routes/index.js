var express = require('express');
var router = express.Router();
const { evaluate } = require('mathjs')
var pass = require('./passwords.json');
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var time ={
  date:date,
  time:time,
}
var movies = [
  {id: 101, name: "Fight Club", year: 1999, rating: 8.1},
  {id: 102, name: "Inception", year: 2010, rating: 8.7},
  {id: 103, name: "The Dark Knight", year: 2008, rating: 9},
  {id: 104, name: "12 Angry Men", year: 1957, rating: 8.9}
];
router.get('/', function(req, res, next) {
  res.json(movies);
});
router.get('/time', function(req, res, next) {
  let arr=[...pass["Passwords"]]
  if(arr.indexOf(req.url.split("=")[1])!=-1){
  res.json(time);

  }else{
    res.send("Wrong key")
  }
  
});
router.get('/evaluate', function(req, res, next) {
  let arr=[...pass["Passwords"]]
  if(arr.indexOf(req.url.split("=")[1].split("?")[0])!=-1){
    let a =req.url.split("=")[2];
    let result={
      result:evaluate(a)
    }
  res.json(result);

  }else{
    res.send("Wrong key")
  }
})
module.exports = router;
