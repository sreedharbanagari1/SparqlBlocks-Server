var socket = require('socket.io');

module.exports = function (httpServer) {
  var io = socket(httpServer);
  io.on('connection', function(socket) {
    var traceEvent = function(event) {
      event.sessionId = socket.id;
      console.log(event);
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
