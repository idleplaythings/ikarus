var assert = require('assert');

var squadsStepDefinitions = function () {
  this.World = require("../support/world.js").World;

  this.Then(/^player "([^"]*)" should have a squad$/, function (username, callback) {
    assetHasSquad(this.app, username);
    callback();
  });

  this.Then(/^player "([^"]*)" should not have a squad$/, function (username, callback) {
    assertDoesNotHaveSquad(this.app, username);
    callback();
  });

  this.When(/^mission loot "([^"]*)" is sent from server "([^"]*)" to squad containing "([^"]*)" from objective "([^"]*)"$/, function (loot, serverName, username, objectiveName, callback) {
    var squadId = getSquadByUsername(this.app, username)._id;
    this.app.callMissionLoot(serverName, squadId, [loot], objectiveName)()
      .finally(callback)
      .catch(this.handleError);
  });

  this.Then(/^no squads should exist$/, function (callback) {
    assertNoSquadsExists(this.app);
    callback();
  });
};

function assertNoSquadsExists(app) {
  var squads = app.findFrom('squads', function(squad){
    return true;
  });

  assert(squads.length === 0);
};

function assertDoesNotHaveSquad(app, username) {
  var squad = getSquadBySteamId(
    app,
    getSteamId(getUser(app, username))
  );

  assert(! squad);
}

function assetHasSquad(app, username) {
  var squad = getSquadBySteamId(
    app,
    getSteamId(getUser(app, username))
  );

  assert(squad);
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
    return user.services.steam.username === username;
  });
}

function getSteamId(user) {
  return user.services.steam.id;
}

module.exports = squadsStepDefinitions;
