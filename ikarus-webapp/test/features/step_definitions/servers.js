var assert = require('assert');

var serverStepDefinitions = function () {
  this.World = require("../support/world.js").World;

  this.Given(/^server "([^"]*)" is registered$/, function (serverName, callback) {
    this.app.callRegisterServer(serverName)()
      .finally(callback)
      .catch(this.handleError);
  });

  this.Then(/^server "([^"]*)" should exist$/, function (serverName, callback) {
    assertServerExists(this.app, serverName);
    callback();
  });
};

function assertServerExists(app, serverName) {
  assert(getServerByName(app, serverName));
}

function getServerByName(app, name) {
  return app.findOneFrom('servers', function(server){
    return server.name = name
  });
}

module.exports = serverStepDefinitions;
