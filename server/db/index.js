var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".
var dbConnect = function() {
  var newConnection = mysql.createConnection({
    user: 'student',
    password: 'student',
    database: 'chat'
  });
  newConnection.connect(); 
};

module.exports.dbConnect = dbConnect;