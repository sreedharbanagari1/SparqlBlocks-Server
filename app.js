var express = require('express'),
    fs = require('fs'),
    path = require('path');
//var query = require('./routes/query');  // request to query.js file
var query = require('./routes/query');    // request to query1.js file
var gist = require('./routes/gist');
var gist1 = require('./routes/gist1');
var query1 = require('./routes/query1');
var json = require('./routes/json1');     // request to json1.js file
var svg = require('./routes/svg1');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var app = express();
// view engine setup
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


app.use(express.static(path.join(__dirname, 'public')));
app.use(
    '/demo',
    express.static(path.join(__dirname, 'node_modules', 'sparqlblocks', 'dist')));

app.use('/query',query);
app.use('/gist',gist);
app.use('/gist1',gist1);
app.use('/query1',query1);     // request comes from query.ejs file for downloading the sparqlquery
app.use('/json1',json);     //request comes from query.ejs file for downloading the Results
app.use('/svg1',svg);
module.exports = app;
