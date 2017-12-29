var express = require('express');
var router = express.Router();
var url = require('url');
//var Blob = require('blob-polyfill');
var querystring = require('querystring');
/* GET  Query download format page. */
router.get('/', function(req, res, next) {
    //response.send('user ' + request.params.query);
    var url_parts = url.parse(req.url, true);
    var params = url_parts.query;
    var query1 = params.query1;
    var filename = 'query.rq';
    var mimetype = 'application/sparql-query';
    res.setHeader('Content-Type', mimetype);
    res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    // console.log(query1);
    res.send(query1);
});
module.exports = router;
