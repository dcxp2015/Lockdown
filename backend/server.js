var express = require('express');
var app = express();
var server = app.listen(3001);
var io = require('socket.io').listen(server);
var dbhelper = require('./dbhelper.js');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile('/Users/Daniel/Desktop/DCXP 2015/Lockdown/Lockdown/frontend/new_index.html');
});

app.get('/app', function(req, res) {
    dbhelper.connect();
    dbhelper.signIn(req.param('username'), req.connection.remoteAddress, function(success) {
        if(success) {
            res.sendFile('/Users/Daniel/Desktop/DCXP 2015/Lockdown/Lockdown/frontend/second.html');
        }
        else {
            res.send("unable to sign you in");
        }
    });
});
