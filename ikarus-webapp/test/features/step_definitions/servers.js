var assert = require('assert');

var serverStepDefinitions = function () {
  this.World = require("../support/world.js").World;

  this.Given(/^server "([^"]*)" is registered$/, function (serverName, callback) {
    this.app.callTestingRegisterServer(serverName)()
      .finally(callback)
      .catch(this.handleError);
  });

  this.Given(/^server "([^"]*)" has gameId$/, function (serverName, callback) {
    this.app.callTestingSetGameId(serverName)()
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
    var app = this.app;

    if (status == 'idle' || status == 'down') {
      this.app.callServerStatus(serverName, status)()
        .finally(function() {
          app.callTestingEvaluateSquads()()
            .finally(callback)
            .catch(this.handleError);
        })
        .catch(this.handleError);
    } else {
      this.app.callTestingSetServerStatus(serverName, status)()
        .finally(callback)
        .catch(this.handleError);
    }

  });

  this.Given(/^server "([^"]*)" has details (.*)$/, function (serverName, details, callback) {
    this.app.callServerDetails(serverName, JSON.parse(details))()
        .finally(callback)
        .catch(this.handleError);
  });

  this.Given(/^server "([^"]*)" is locked$/, function (serverName, callback) {
    this.app.callLockServer(serverName)()
      .finally(callback)
      .catch(this.handleError);
  });

  this.Then(/^there should not be squads queuing on server "([^"]*)"$/, function (serverName, callback) {
    assertHasEmptyQueue(this.app, serverName);
    callback();
  });

  this.Then(/^there should not be squads playing on server "([^"]*)"$/, function (serverName, callback) {
    assertHasNoSquadsPlaying(this.app, serverName);
    callback();
  });

  this.Then(/^status for server "([^"]*)" should be "([^"]*)"$/, function (serverName, status, callback) {
    assertStatusIs(this.app, serverName, status);
    callback();
  });

  this.When(/^servers have been checked for game start$/, function (callback) {
    this.app.callTestingCheckServerForGameStart()()
      .finally(callback)
      .catch(this.handleError);
  });

  this.When(/^servers have been checked for waiting abort$/, function (callback) {
    this.app.callTestingCheckServeIsReadyToAbort()()
      .finally(callback)
      .catch(this.handleError);
  });

  this.Given(/^status for server "([^"]*)" changed long ago$/, function (serverName, callback) {
    var serverId = getServerByName(this.app, serverName)._id;
    this.app.callTestingElapseServerStatusChanged(serverId)()
      .finally(callback)
      .catch(this.handleError);
  });

  this.Given(/^"([^"]*)" squads are minimum to start a game$/, function (min, callback) {
    this.app.callTestingSetMinSquadsToStartGame(min)()
      .finally(callback)
      .catch(this.handleError);
  });

  this.Given(/^severs wait "([^"]*)" minutes for additional players before starting$/, function (min, callback) {
    this.app.callTestingSetMinTimeToStartGame(min)()
      .finally(callback)
      .catch(this.handleError);
  });

  this.Given(/^servers can fit "([^"]*)" player$/, function (max, callback) {
    this.app.callTestingSetMaxPlayersPerServer(max)()
      .finally(callback)
      .catch(this.handleError);
  });

  this.Given(/^servers abort waiting if only "([^"]*)" squad is on server$/, function (min, callback) {
    this.app.callTestingSetMinTeamsToAbort(min)()
      .finally(callback)
      .catch(this.handleError);
  });

  this.Given(/^I am logged in as server "([^"]*)"$/, function (serverName, callback) {
    this.app.callTestingLoginAsServer(serverName)()
      .finally(callback)
      .catch(this.handleError);
  });
};

function assertStatusIs(app, serverName, status) {
  var server = getServerByName(app, serverName);
  assert(server.status == status);
}

function assertHasNoSquadsPlaying(app, serverName) {
  var server = getServerByName(app, serverName);
  assert(! server.inGame || server.inGame.length === 0);
}

function assertHasEmptyQueue(app, serverName) {
  var server = getServerByName(app, serverName);
  assert(! server.queue || server.queue.length === 0);
}

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
    return server.name == name;
  });
}

module.exports = serverStepDefinitions;
