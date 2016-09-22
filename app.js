var express = require('express'),
    fs = require('fs'),
    path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(
    '/demo',
    express.static(path.join(__dirname, 'node_modules', 'sparqlblocks', 'dist')));

module.exports = app;
