var app = require('express')();
var server = app.listen(3001);
var io = require('socket.io').listen(server);
var dbhelper = require('./dbhelper.js');

app.get('/', function(req, res) {
    res.sendFile('/Users/Daniel/Desktop/DCXP 2015/Lockdown/Lockdown/frontend/new_index.html');
});

app.get('/app', function(req, res) {
    dbhelper.connect();
    console.log(req.param('username') + 'username')
    dbhelper.signIn(req.param('username'), function(success) {
        if(success) {
            res.sendFile('/Users/Daniel/Desktop/DCXP 2015/Lockdown/Lockdown/frontend/second.html');
        }
        else {
            res.send("unable to sign you in");
        }
    });
});
