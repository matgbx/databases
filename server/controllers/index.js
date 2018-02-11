var models = require('../models');

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 40 // Seconds.
};

module.exports = {
  messages: {
    get: function (req, res) {
      console.log('received messages GET');
      //calls models messages GET
      models.messages.get((result) => {
        //send stringified results - use express.json
        res.json(result);
      });
      
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      //calls models messages POST
      console.log('received messages POST');
      models.messages.post(req.body, (result) => {
        //send back response
        res.sendStatus(201);
      });    
     
    }, // a function which handles posting a message to the database
    options: function (req, res) {
      console.log(defaultCorsHeaders);
      res.writeHead(200, defaultCorsHeaders);
      res.send();
    }
  },
  

  users: {
    // Ditto as above
    get: function (req, res) {
      console.log('received users GET');
      models.users.get((result) => {
        res.json(result);
      });
    },
    
    post: function (req, res) {
      console.log('received users POST');
      models.users.post(req.body, (result) => {
        res.sendStatus(201);
      });
    }
  }
};

