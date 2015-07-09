var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var dbhelper = require('./dbhelper.js');

app.get('/', function(req, res){
    res.sendFile('/Users/Daniel/Desktop/DCXP 2015/Lockdown/Lockdown/frontend/index.html');
});

io.on('connection', function(socket){
    socket.on('user', function(msg){
        dbhelper.connect();
        dbhelper.signIn(msg, function(success) {
            if(success) {

            }
            else {

            }
        });
    });
});

http.listen(3001, '192.168.1.164', function() {
    console.log('listening on 192.168.1.164:3000');
});
