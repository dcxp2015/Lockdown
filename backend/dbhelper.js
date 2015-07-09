var fs = require('fs');
var mysql = require('mysql');
var express = require('express');
var socketio = require('socket.io')(80);

var app = express();

module.exports = {
    connection : null,

    connect: function () {
        connection = mysql.createConnection(JSON.parse(fs.readFileSync('credentials.json', 'utf8')));

        connection.connect(function(err) {
            console.log('error: ' + err);
        });
    },

    signIn: function(user, callback) {
        connection.query('SELECT * FROM Users WHERE username = "' + connection.escape(user) + '"', function(err, result) {
            if(err) {
                throw err;
            }

            // User is signed in
            if(result.length > 0) {
                callback(false);
            }
            else {
                connection.query('INSERT INTO Users SET ?', {username: connection.escape(user)}, function(err, result) {
                    if(err) {
                        throw err;
                    }

                    callback(true);

                    console.log('result: ' + result);
                });
            }


            console.log("result: " + result);
        });
    },

    signOut: function(user) {
        connection.query('DELETE FROM Users WHERE username = "' + connection.escape(user) + '"', function(err, result) {
            if(err) {
                throw err;
            }
a
            console.log('result' + result);
        });
    }
};
