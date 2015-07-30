var assert = require('assert');

var eventsStepDefinitions = function () {

  this.Then(/^server "([^"]*)" should have game started event$/, function (serverName, callback) {
    assertServerHasGameStartedEvent(this.app, serverName);
    callback();
  });

  this.Then(/^server "([^"]*)" should have game waiting event$/, function (serverName, callback) {
    assertServerHasGameWaitingEvent(this.app, serverName);
    callback();
  });

  this.Then(/^server "([^"]*)" should have game end event$/, function (serverName, callback) {
    assertServerHasGameEndEvent(this.app, serverName);
    callback();
  });

  this.Then(/^server "([^"]*)" should have player killed events for "([^"]*)" and "([^"]*)"$/, function (serverName, victimName, killerName, callback) {
    assertGameAndPlayersHaveDeathEvent(this.app, serverName, victimName, killerName);
    callback();
  });

  this.Then(/^server "([^"]*)" should have player connected event for "([^"]*)"$/, function (serverName, playerName, callback) {
    assertGameHasPlayerConnectedEvent(this.app, serverName, playerName);
    callback();
  });

  this.Then(/^server "([^"]*)" should have player disconnected event for "([^"]*)"$/, function (serverName, playerName, callback) {
    assertGameHasPlayerDisconnectedEvent(this.app, serverName, playerName);
    callback();
  });

  this.Then(/^server "([^"]*)" and player "([^"]*)" should have mission loot event$/, function (serverName, playerName, callback) {
    assertGameHasMissionLootEvent(this.app, serverName, playerName);
    callback();
  });
};

var TYPE_GAME_STARTED = 1;
var TYPE_GAME_WAITING = 2;
var TYPE_GAME_END = 3;
var TYPE_PLAYER_DEATH = 11;
var TYPE_PLAYER_JOINED = 10;
var TYPE_PLAYER_LEFT = 9;
var TYPE_MISSION_LOOT = 100;

function assertGameHasMissionLootEvent(app, serverName, playerName) {
  var gameId = getServersCurrentGameId(app, serverName);
  var uid = getSteamId(getUser(app, playerName));
  var companyId = getCompanyByMemberSteamId(app, uid)._id;

  assert(getMissionLootEvent(app, gameId, companyId));
}

function assertGameHasPlayerDisconnectedEvent(app, serverName, playerName) {
  var gameId = getServersCurrentGameId(app, serverName);
  var uid = getSteamId(getUser(app, playerName));
  var companyId = getCompanyByMemberSteamId(app, uid)._id;

  assert(getPlayerLeftEvent(app, gameId, companyId, uid));
}

function assertGameHasPlayerConnectedEvent(app, serverName, playerName) {
  var gameId = getServersCurrentGameId(app, serverName);
  var uid = getSteamId(getUser(app, playerName));
  var companyId = getCompanyByMemberSteamId(app, uid)._id;

  assert(getPlayerJoinedEvent(app, gameId, companyId, uid));
}

function assertGameAndPlayersHaveDeathEvent(app, serverName, victimName, killerName) {
  var gameId = getServersCurrentGameId(app, serverName);
  var victimUid = getSteamId(getUser(app, victimName));
  var killerUid = getSteamId(getUser(app, killerName));
  var victimCompanyId = getCompanyByMemberSteamId(app, victimUid)._id;
  var killerCompanyId = getCompanyByMemberSteamId(app, killerUid)._id;

  assert(getPlayerDeathEvent(app, gameId, victimCompanyId, victimUid, killerUid));
  assert(getPlayerDeathEvent(app, gameId, killerCompanyId, victimUid, killerUid));
}

function assertServerHasGameStartedEvent(app, serverName) {
  var gameId = getServersCurrentGameId(app, serverName);
  var startEvent = getEventByTypeAndGameId(app, gameId, TYPE_GAME_STARTED);
  assert(startEvent);
}

function assertServerHasGameWaitingEvent(app, serverName) {
  var gameId = getServersCurrentGameId(app, serverName);
  var startEvent = getEventByTypeAndGameId(app, gameId, TYPE_GAME_WAITING);
  assert(startEvent);
}

function assertServerHasGameEndEvent(app, serverName) {
  var gameId = getServersCurrentGameId(app, serverName);
  var startEvent = getEventByTypeAndGameId(app, gameId, TYPE_GAME_END);
  assert(startEvent);
}

function getMissionLootEvent(app, gameId, companyId) {
  return app.findOneFrom('gameEvents', function (event) {
    return event.t == TYPE_MISSION_LOOT
      && event.g == gameId
      && event.c == companyId
      && event.pl.p == 'IKRS_loot_valuables'
      && event.pl.i.money == 50;
  });
};

function getPlayerJoinedEvent(app, gameId, companyId, uid) {
  return app.findOneFrom('gameEvents', function (event) {
    return event.t == TYPE_PLAYER_JOINED
      && event.g == gameId
      && event.c == companyId
      && event.pl.p == uid;
  });
};

function getPlayerLeftEvent(app, gameId, companyId, uid) {
  return app.findOneFrom('gameEvents', function (event) {
    return event.t == TYPE_PLAYER_LEFT
      && event.g == gameId
      && event.c == companyId
      && event.pl.p == uid;
  });
};

function getPlayerDeathEvent(app, gameId, companyId, victimId, killerId) {
  return app.findOneFrom('gameEvents', function (event) {
    return event.t == TYPE_PLAYER_DEATH
      && event.g == gameId
      && event.c == companyId
      && event.pl.v == victimId
      && event.pl.k == killerId;
  });
};

function getEventByTypeAndGameId(app, gameId, type) {
  return app.findOneFrom('gameEvents', function (event) {
    return event.t == type && event.g == gameId;
  });
}

function getServersCurrentGameId(app, name) {
  return getServerByName(app, name).gameId;
}

function getServerByName(app, name) {
  return app.findOneFrom('servers', function(server){
    return server.name == name;
  });
}

function getCompanyByMemberSteamId(app, steamId) {
  return app.findOneFrom('companies', function(company){
    return company.playerIds && company.playerIds.indexOf(steamId) > -1;
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

module.exports = eventsStepDefinitions;
