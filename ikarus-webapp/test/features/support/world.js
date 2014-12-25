var App = require('./app');
var ddpClient = require('./ddp').ddpClient;

var WorldConstructor = function WorldConstructor(callback) {
  var world = {
    username: null,
    defaultPassword: 'salakala',
    app: new App(ddpClient),
    handleError: function(error) {
      console.log('error happeneded')
      console.error(error);
    }
  };

  callback(world);
};

exports.World = WorldConstructor;
