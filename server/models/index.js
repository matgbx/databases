var connection = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      // use .query to retrieve all messages from messages table
      connection.query('select * from messages', function(err, result, fields) {
        if (err) {
          throw err;
        }
        //invoke callback to pass back results to controller
        callback(result);
      });  
    }, // a function which produces all of the messages
    post: function (req, callback) {
      // use .query to retrieve id number for user by select method
      connection.query('select id from users where username = ?;', req.username, function(err, id, fields) {
        //set query string for readability
        var queryString = 'insert into messages (message, user_id, roomname) values (?, ?, ?);';
        // use .query to insert the request message, the id retrieved from the previous query, and roomname
        connection.query(queryString, [req.message, id[0].id, req.roomname], function(err, result) {
          if (err) {
            throw err;
          }
          //invoke callback to pass back results to controller
          var result = 'added chat to messages list';
          //send result back for controller to know that post is complete
          callback(result);
        }); 
      }); 
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (callback) {
      connection.query('select * from users', function(err, result, fields) {
        if (err) {
          throw err;
        }
        //invoke callback to pass back results to controller
        callback(result);
      }); 
    },
    
    post: function (req, callback) {
      //checks to see if username already exists
      connection.query('select username from users where username = ?;', req.username, function(err, username, fields) {
        if (username.length === 1) {
          //if it already exists, send chat added message
          // this is an attempt to avoid an error due to the use of UNIQUE when creating the table column
          var resp = 'added chat to messages list';
          //invoke callback to pass back results to controller
          callback(resp);
        } else {
          //if the username does not exist, add it to the users table
          var queryString = 'insert into users (username) values (?);';
          connection.query(queryString, req.username, function(err, result) {
            var result = '===> new user created & chat added to messages list';
            //invoke callback to pass back results to controller
            callback(result);
          });
        }
      });
    }
  }
};

