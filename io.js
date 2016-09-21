const socket = require('socket.io');
const bunyan = require('bunyan');

var log = bunyan.createLogger({name: "client-events"});
module.exports = function (httpServer) {
  var io = socket(httpServer);
  io.on('connection', function(socket) {
    var traceEvent = function(event) {
      event.sessionId = socket.id;
      log.info({event: event});
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
