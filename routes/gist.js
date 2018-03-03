var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var url1 = "mongodb://localhost:27017/";
var url = require('url');
//var Blob = require('blob-polyfill');
var querystring = require('querystring');
/* GET Json download format page page. */
router.get('/', function(req, res, next) {
    //response.send('user ' + request.params.query);
    var url_parts = url.parse(req.url, true);
    var params = url_parts.query;
    var gistID = params.gistID;

    MongoClient.connect(url1, function (err, db) {

        if (err) throw err;
        var dbo = db.db("sparqlblock");
        var query = {"gistID1": gistID};
        dbo.collection("gistdata").findOne(query, function (err, data) {
            if (err) throw err;
            console.log("1 document inserted");
            var queryhash = data.queryhash;
            var sparqlQueryString = data.sparqlQueryStr;
            var jsonString = data.jsonStr;
            var svg = data.svg;
            var gistID2 = data.gistID2;
            console.log(queryhash);
            var query = {"queryhash":queryhash};
            dbo.collection("gistdata").find(query, { "_id": 0, "gistId1":1,"timeStamp":1 }).toArray(function(err, result) {
                var gistID1=[];
                var timeStamp=[];
                if (err) throw err;
                //console.log("2 document inserted");
                //console.log(result[0].gistID1);
               // console.log(result[0].timeStamp);
                for (i=0; i<result.length; i++) {
                     gistID1[i] = result[i].gistID1;
                     timeStamp[i] = result[i].timeStamp;
                }
                res.render('gist', {QUERY:sparqlQueryString,JS:jsonString,SVG:svg,dataID:gistID2,gistID1:gistID1,timeStamp:timeStamp});
                });
           // res.render('gist', {QUERY:sparqlQueryString,JS:jsonString,SVG:svg,dataID:gistID2,gistID1:gistID1,timeStamp:timeStamp});
            db.close();
        });
    });
});
module.exports = router;