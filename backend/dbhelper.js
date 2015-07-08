var fs = require('fs');
var mysql = require('mysql');
var express = require('express');
var app = express();

var dbhelper = {
    connection : null,

    connect: function () {
        connection = mysql.createConnection(JSON.parse(fs.readFileSync('credentials.json', 'utf8')));

        connection.connect(function(err) {
            console.log('error: ' + err);
        });
    },

    signIn: function(user) {
        connection.query('INSERT INTO Users SET ?', {username: connection.escape(user)}, function(err, result) {
            if(err) {
                throw err;
            }

            console.log('result: ' + result);
        });
    },

    signOut: function(user) {
        connection.query('DELETE FROM Users WHERE username = "' + connection.escape(user) + '"', function(err, result) {
            if(err) {
                throw err;
            }

            console.log('result' + result);
        });
    }
}

dbhelper.connect();
dbhelper.signOut('daniel');
