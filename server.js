var connect = require('connect');
var app = connect();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

// Serve the chat/www folder as a static file server
app.use(connect.static(__dirname + '/chat/www'));

// Set up SocketIO
io.sockets.on('connection', function (socket) {
	// Emit the chat welcome message
	socket.emit('message', 'Welcome! You are now connected :)');

	// Re-broadcast a message from this client to everybody
	socket.on('message', function (msg) {
		io.sockets.emit('message', msg);
	});

	// Rebroadcast an image message to everybody, too
	socket.on('image', function(encoded) {
		io.sockets.emit('image', encoded);
	});
});

// Start on port 8080
server.listen(8080);
