var express = require('express');
var bodyParser = require('body-parser');
const mongoDb = require('mongodb');
const mongoClient = mongoDb.MongoClient;
var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
var url = "mongodb://localhost:27017/mydb";

mongoClient.connect(url, function(err, db) {
  if (err) {
    throw err;
  }
  app.post('/contactlist/',function(req,res){
    var saveData = req.body
    db.collection('data').insertMany(saveData, function(err, res) {
      if (err) {
        throw err;
      } else {
        console.log();
      }
    });
  });
  app.get('/contactlist',function(req,res) {
  console.log("i am here");
  db.collection("data").find().toArray(function(err, result) {
      if (err) {
        throw err;
      } else {
        res.json(result);
      console.log(result);
    }
    });
  });
});

app.listen(8000);
console.log("runung 3000");
