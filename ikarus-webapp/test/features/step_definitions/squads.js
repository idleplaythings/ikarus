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

  this.When(/^I create a squad$/, function (callback) {
    this.app.callCreateSquad()()
      .finally(callback)
      .catch(this.handleError);
  });

  this.When(/^I join a same squad as "([^"]*)"$/, function (username, callback) {
    var squadId = getSquadByUsername(this.app, username)._id;
    this.app.callJoinSquad(squadId)()
      .finally(callback)
      .catch(this.handleError);
  });

  this.Given(/^I leave my squad$/, function (callback) {
    this.app.callLeaveSquad()()
      .finally(callback)
      .catch(this.handleError);
  });

  this.When(/^I enter my squad to the queue$/, function (callback) {
    this.app.callEnterSquadQueue()()
      .finally(callback)
      .catch(this.handleError);
  });

  this.Then(/^I leave my squad from the queue$/, function (callback) {
    this.app.callLeaveSquadQueue()()
      .finally(callback)
      .catch(this.handleError);
  });

  this.Then(/^Squad that has player "([^"]*)" should be on queue at index "([^"]*)"$/, function (username, index, callback) {
    assertIsInQueue(this.app, username, index);
    callback();
  });

  this.Given(/^Squad that has player "([^"]*)" should be on queue in region "([^"]*)" at index "([^"]*)"$/, function (username, region, index, callback) {
    assertIsInQueue(this.app, username, region, index);
    callback();
  });

  this.Then(/^Squad that has player "([^"]*)" should not be queuing on region "([^"]*)"$/, function (username, region, callback) {
    assertIsNotInQueue(this.app, username, region);
    callback();
  });

  this.Then(/^Squad that has player "([^"]*)" should be playing on server "([^"]*)"$/, function (username, serverName, callback) {
    assertIsOnServer(this.app, username, serverName);
    callback();
  });

  this.Then(/^Squad that has player "([^"]*)" should not be playing on server "([^"]*)"$/, function (username, serverName, callback) {
    assertIsNotOnServer(this.app, username, serverName);
    callback();
  });

  this.When(/^deadline for connecting to game on squad that has player "([^"]*)" has elapsed$/, function (username, callback) {
    var squadId = getSquadByUsername(this.app, username)._id;

    this.app.callTestingElapseSquadTimeout(squadId)()
      .finally(callback)
      .catch(this.handleError);
  });

  this.When(/^squad deadlines are checked$/, function (callback) {
    this.app.callTestingCheckSquadDeadlines()()
      .finally(callback)
      .catch(this.handleError)
  });

  this.Given(/^squad can have "([^"]*)" members$/, function (max, callback) {
    this.app.callTestingSetMaxSquadMembers(max)()
      .finally(callback)
      .catch(this.handleError);
  });
};

function assertIsNotOnServer(app, username, serverName) {
  var squad = getSquadByUsername(app, username);
  var server = getServerByName(app, serverName);
  var index = server.inGame ? server.inGame.indexOf(squad._id) : -1;

  assert(index === -1);
};

function assertIsOnServer(app, username, serverName) {
  var squad = getSquadByUsername(app, username);
  var server = getServerByName(app, serverName);
  var index = server.inGame.indexOf(squad._id);

  assert(index !== -1);
};

function assertIsNotInQueue(app, username, region) {
  var squad = getSquadByUsername(app, username);
  var queue = getQueueByRegion(app, region);
  var index = queue.queue.indexOf(squad._id);

  assert(index === -1);
};

function assertIsInQueue(app, username, region, index) {
  var squad = getSquadByUsername(app, username);
  var queue = getQueueByRegion(app, region);
  var index = queue.queue.indexOf(squad._id);

  assert(index === index);
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

function getQueueByRegion(app, region) {
  return app.findOneFrom('serverQueues', function(server){
    return server.region == region
  });
}

function getServerByName(app, name) {
  return app.findOneFrom('servers', function(server){
    return server.name == name
  });
}

module.exports = squadsStepDefinitions;
