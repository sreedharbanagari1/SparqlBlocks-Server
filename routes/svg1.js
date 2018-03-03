var express = require('express');
var router = express.Router();
var url = require('url');
//var Blob = require('blob-polyfill');
var querystring = require('querystring');
/* GET Json download format page page. */
router.get('/', function(req, res, next) {
    //response.send('user ' + request.params.query);
    var url_parts = url.parse(req.url, true);
    var params = url_parts.query;
    var svg = params.svg;
    var filename = 'VisualQuery.svg';
    var mimetype = 'image/svg+xml';
    res.setHeader('Content-Type', mimetype);
    res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    // console.log(json1);
    res.send(svg);
});
module.exports = router;