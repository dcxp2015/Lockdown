var fs = require('fs');
var mysql = require('mysql');

connect();

function connect() {
    var connection = mysql.createConnection(JSON.parse(fs.readFileSync("credentials.json", 'utf8')));

    connection.connect(function(err) {
        console.log("error: " + err);
    });
}
