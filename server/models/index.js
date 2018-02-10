var connection = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      // mysql function that takes a callback
      connection.query('select * from messages', function(err, result, fields) {
        if (err) {
          throw err;
        }
        //invoke callback to pass back results to controller
        callback(results);
      });  
    }, // a function which produces all of the messages
    post: function (message, callback) {
      connection.query('insert into messages () values (?)', function(err, result) {
        if (err) {
          throw err;
        }
        //invoke callback to pass back results to controller
        var result = 'added chat to messages list';
        callback(result);
      });  
      
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {
      connection.query('select * from users', function(err, result, fields) {
        if (err) {
          throw err;
        }
        //invoke callback to pass back results to controller
        callback(results);
      }); 
    },
    
    post: function () {
      
      
    }
  }
};

