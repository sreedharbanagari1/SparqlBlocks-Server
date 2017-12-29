var express = require('express'),
    fs = require('fs'),
    path = require('path');

var query = require('./routes/query');  // request to query.js file
var qr = require('./routes/query1');    // request to query1.js file
var js = require('./routes/json1');     // request to json1.js file

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(
    '/demo',
    express.static(path.join(__dirname, 'node_modules', 'sparqlblocks', 'dist')));

app.use('/query', query);  // request comes from exec file
app.use('/query1',qr);     // request comes from query.ejs file for downloading the sparqlquery
app.use('/json1',js);     //request comes from query.ejs file for downloading the Results

module.exports = app;
