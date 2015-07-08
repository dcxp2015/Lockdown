var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile('/Users/rahulsundararaman/Desktop/Lockdown/frontend/second.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});
http.listen(3000, '192.168.1.162', function() {
	console.log('listening on 192.168.1.162:3000');
});