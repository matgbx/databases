var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      //calls models GET
      console.log('received messages GET');
      models.messages.get((result) => {
        res.writeHead(201);
        res.send(result);
      });
      //write headers
      //send back response
      
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      //should be post sent from client
      
      //calls models POST
      console.log('received messages GET');
      models.messages.post(req.body, (result) => {
        res.writeHead(200);
        res.send(result);
      });
      //write headers
      //send back response
     
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  }
};

