var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
//require('blob-polyfill');
//require('blob');
//var mysql = require('mysql');

/*var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "gist2"
});*/
var querystring = require('querystring');
//var DOMParser = require('xmldom').DOMParser;


/* GET Query & Results  page. */
router.post('/', function(req, res, next) {
    var queryhash = req.body.queryHash;
    var dataID1 = req.body.dataid;
    var timestamp = req.body.timestamp;
    var sparqlQueryStr = req.body.sparqlQueryString;
    var jsonString = req.body.jsonString;
    var SVG = req.body.svg;
    var dataID2 =req.body.dataid1;
    //var gistID = JSON.parse(dataID1);
    //var gistID1 = dataID1["dataID"];
    var item = {
        queryhash:queryhash,
        gistID1: dataID1,
        timeStamp:timestamp,
        sparqlQueryStr:sparqlQueryStr,
        jsonStr:jsonString,
        svg:SVG,
        gistID2:dataID2
    };
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("sparqlblock");
        //var myobj = { name: "Company Inc", address: "Highway 37" };
        dbo.collection("gistdata").insertOne(item, function (err, res) {
            if (err) throw err;
            //console.log("1 document inserted");
            db.close();
        });
    });
});

module.exports = router;
