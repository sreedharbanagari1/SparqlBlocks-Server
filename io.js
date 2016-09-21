const socket = require('socket.io');
const winston = require('winston');
require('winston-loggly-bulk');

winston.add(winston.transports.Loggly, {
  token: "ee08bcff-7d69-4b60-8c88-edc872f26116",
  subdomain: "sparqlblocks",
  tags: ["Winston-NodeJS"],
  json:true
});

// var log = bunyan.createLogger({name: "client-events"});
module.exports = function (httpServer) {
  var io = socket(httpServer);
  io.on('connection', function(socket) {
    var traceEvent = function(event) {
      event.sessionId = socket.id;
      winston.log('info', 'client-event', {event: event});
    };
    traceEvent({type: 'connection'});
    ['load-snapshot', 'save-snapshot', 'create', 'delete', 'move', 'ui'].map(function(eventType) {
      socket.on(eventType, traceEvent);
    });
    socket.on('disconnect', function(){
      traceEvent({type: 'disconnection'});
    });
  });
}
