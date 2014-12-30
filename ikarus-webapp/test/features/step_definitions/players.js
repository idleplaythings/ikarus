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

  this.When(/^"([^"]*)" connects to server "([^"]*)"$/, function (username, serverName, callback) {

    var user = getUser(this.app, username);

    this.app.callPlayerConnected(serverName, getSteamId(user))()
      .finally(callback)
      .catch(this.handleError);
  });

  this.When(/^"([^"]*)" disconnects from server "([^"]*)"$/, function (username, serverName, callback) {
    var user = getUser(this.app, username);

    this.app.callPlayerDisconnected(serverName, getSteamId(user))()
      .finally(callback)
      .catch(this.handleError);
  });

  this.Then(/^player "([^"]*)" should have an inventory$/, function (username, callback) {
    assertHasInventory(this.app, username);
    callback();
  });

  this.Then(/^player "([^"]*)" should not have an inventory$/, function (username, callback) {
    assertDoesNotHaveInventory(this.app, username);
    callback();
  });
};


function assertDoesNotHaveInventory(app, username) {
  var steamId = getSteamId(getUser(app, username));
  var inventory = getInventoryBySteamId(app, steamId);

  assert(! inventory);
}

function assertHasInventory(app, username) {
  var steamId = getSteamId(getUser(app, username));
  var inventory = getInventoryBySteamId(app, steamId);

  assert(inventory);
}

function getInventoryBySteamId(app, steamId) {
  return app.findOneFrom('inventories', function(inventory){
    return inventory.steamId === steamId;
  });
}

function getUser(app, username) {
  return app.findOneFrom('users', function(user){
    return user.services.steam.username === username;
  });
}

function getSteamId(user) {
  return user.services.steam.id;
}

module.exports = playersStepDefinitions;
