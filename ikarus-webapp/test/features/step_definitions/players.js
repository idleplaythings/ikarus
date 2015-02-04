var assert = require('assert');

var playersStepDefinitions = function () {
  this.World = require("../support/world.js").World;

  this.Given(/^player "([^"]*)" with Steam ID "([^"]*)" exists$/, function (name, steamId, callback) {
    this.app.createUser(name, steamId)()
      .finally(callback)
      .catch(this.handleError);
  });

  this.Given(/^I am logged in as "([^"]*)"$/, function (name, callback) {
    this.username = name;
    this.app.login(name)()
      .finally(callback)
      .catch(this.handleError);
  });

  this.Given(/^I am ready$/, function (callback) {
    var app = this.app;
    this.app.callSetPlayerReady(true)()
      .finally(callback)
      .catch(this.handleError);
  });

  this.When(/^"([^"]*)" connects to server "([^"]*)"$/, function (username, serverName, callback) {

    var user = getUser(this.app, username);
    var app = this.app;

    this.app.callPlayerConnected(serverName, getSteamId(user))()
      .finally(function() {
        app.callTestingEvaluateSquads()()
          .finally(callback)
          .catch(this.handleError);
      })
      .catch(this.handleError);
  });

  this.When(/^"([^"]*)" disconnects from server "([^"]*)"$/, function (username, serverName, callback) {
    var user = getUser(this.app, username);
    var app = this.app;

    this.app.callPlayerDisconnected(serverName, getSteamId(user))()
      .finally(function() {
        app.callTestingEvaluateSquads()()
          .finally(callback)
          .catch(this.handleError);
      })
      .catch(this.handleError);
  });

  this.Then(/^player "([^"]*)" should have an inventory$/, function (username, callback) {
    assertHasInventory(this.app, username);
    callback();
  });
};

function assertHasInventory(app, username) {
  var squadId = getSquadByUsername(app, username)._id;
  var inventory = getInventoryBySquadId(app, squadId);

  assert(inventory);
}

function getInventoryBySteamId(app, steamId) {
  return app.findOneFrom('inventories', function(inventory){
    return inventory.steamId === steamId;
  });
}

function getInventoryBySquadId(app, squadId) {
  return app.findOneFrom('inventories', function(inventory){
    return inventory.squadId === squadId;
  });
}

function getSquadByUsername(app, username) {
  return getSquadBySteamId(app, getSteamId(getUser(app, username)));
}

function getSquadBySteamId(app, steamId) {
  return app.findOneFrom('squads', function(squad){
    return squad.steamIds && squad.steamIds.indexOf(steamId) > -1;
  });
}

function getUser(app, username) {
  return app.findOneFrom('users', function(user){
    return user.services.steam && user.services.steam.username === username;
  });
}

function getSteamId(user) {
  return user.services.steam.id;
}

module.exports = playersStepDefinitions;
