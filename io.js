const socket = require('socket.io');
const winston = require('winston');
require('winston-loggly-bulk');

if (process.env.LOGGLY_SUBDOMAIN && process.env.LOGGLY_TOKEN) {
  winston.add(winston.transports.Loggly, {
    token: process.env.LOGGLY_TOKEN,
    subdomain: process.env.LOGGLY_SUBDOMAIN,
    tags: process.env.LOGGLY_TAG ? [process.env.LOGGLY_TAG] : [],
    json:true
  });
}

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
