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
