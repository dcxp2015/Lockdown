var fs = require('fs');
var mysql = require('mysql');
var socketio = require('socket.io')(80);
var connections = new Array();

module.exports = {
    connection : null,

    connect: function () {
        connection = mysql.createConnection(JSON.parse(fs.readFileSync('credentials.json', 'utf8')));

        connection.connect(function(err) {
            console.log('error: ' + err);
        });
    },

    signIn: function(user, ip, callback) {
        connection.query('SELECT * FROM Users WHERE username = ?', user, function(err, result) {
            if(err) {
                throw err;
            }

            // User is signed in
            if(result.length > 0) {
                callback(false);
            }
            else {
                connection.query('INSERT INTO Users ?', {username: connection.escape(user)}, function(err, result) {
                    if(err) {
                        throw err;
                    }

                    callback(true);

                    if(connections.indexOf(user) == -1) {
                        connections.push({key: user, value: ip})
                    }
                });
            }
        });
    },

    signOut: function(user) {
        connection.query('DELETE FROM Users WHERE username = "' + connection.escape(user) + '"', function(err, result) {
            if(err) {
                throw err;
            }

            connections.splice(connections.indexOf(user), 1);

            console.log('result' + result);
        });
    }
};
