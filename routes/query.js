var express = require('express');
var router = express.Router();
//var FileSaver = require('browser-filesaver');
//var Filesaver = require( 'filesaver');
var url = require('url');
require('blob-polyfill');
require('blob');
var querystring = require('querystring');
var DOMParser = require('xmldom').DOMParser;

/* GET Query & Results  page. */
router.get('/', function(req, res, next) {
    //response.send('user ' + request.params.query);
    var url_parts = url.parse(req.url, true);
    //console.log("user made a request " + url_parts);
    var params = url_parts.query;
    var query = params.query;
    var json = params.json;
    var svg = params.SVG;
    var gistID = params.GIST;
    //var dom = new DOMParser();
    //var svg1 = dom.parseFromString(svg, 'image/svg+xml');

    //var container = document.createElement('div');
   // var parser = new DOMParser();
    //var svg1 = parser.parseFromString(svg, "image/svg+xml");
    //var doc = new DOMParser().parseFromString(svg,"image/svg+xml");
   // var filename = 'block.svg';
    //var mimetype = 'image/svg+xml';
    //res.setHeader('Content-Type', mimetype);
    //res.setHeader('Content-disposition', 'attachment; filename=' + filename);
  //var outputBlob = new Blob([svg], {type : 'image/svg+xml'});

      res.render('query', {QUERY: query, JS: json, SVG:svg,dataID:gistID});
//res.write(svg);
//res.end;
});

module.exports = router;
