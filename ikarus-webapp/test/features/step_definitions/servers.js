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

  this.Then(/^server "([^"]*)" should have a player with Steam ID "([^"]*)"$/, function (serverName, steamId, callback) {
    assertHasPlayerWithSteamId(this.app, serverName, steamId);
    callback();
  });

  this.Then(/^server "([^"]*)" should not have a player with Steam ID "([^"]*)"$/, function (serverName, steamId, callback) {
    assertDoesNotHavePlayerWithSteamId(this.app, serverName, steamId);
    callback();
  });

  this.Given(/^server "([^"]*)" has status "([^"]*)"$/, function (serverName, status, callback) {
    this.app.callServerStatus(serverName, status)()
      .finally(callback)
      .catch(this.handleError);
  });

  this.Given(/^server "([^"]*)" is locked$/, function (serverName, callback) {
    this.app.callLockServer(serverName)()
      .finally(callback)
      .catch(this.handleError);
  });
};

function assertDoesNotHavePlayerWithSteamId(app, serverName, steamId) {
  var server = getServerByName(app, serverName);
  assert(! server.playerIds || server.playerIds.indexOf(steamId) === -1);
}

function assertHasPlayerWithSteamId(app, serverName, steamId) {
  var server = getServerByName(app, serverName);
  assert(server.playerIds && server.playerIds.indexOf(steamId) > -1);
}

function assertServerExists(app, serverName) {
  assert(getServerByName(app, serverName));
}

function getServerByName(app, name) {
  return app.findOneFrom('servers', function(server){
    return server.name == name
  });
}

module.exports = serverStepDefinitions;
