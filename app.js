//Include libraries

var app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
    static = require('node-static');

// Makes all files in the current folder accessible from the web.
var fileServer = new static.Server('./');

// Port for our web server.
app.listen(9000);

// if the URL of the socket server is opened in a browser, serve the static file

function handler (request, response) {
  request.addListener('end', function() {
    fileServer.serve(request, response);
  });
}

io.sockets.on('connection', function(socket) {
  
  socket.on('clicked', function(data) {
    socket.broadcast.emit('click', data);
  });
});
