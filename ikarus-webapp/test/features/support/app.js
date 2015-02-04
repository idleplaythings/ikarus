var util = require('./util');
var Q = require('q');
var chalk = require('chalk');

module.exports = App;

function App(ddpClient) {
  this._ddpClient = ddpClient;
}

App.prototype.connect = function() {
  var self = this;

  return function() {
    var deferred = Q.defer();

    self._ddpClient.connect(function(error) {
      if (error) {
        deferred.reject(error);
        return;
      }

      util.info('Connected to app')

      self._ddpClient.subscribe('testing', [], function(error) {
        if (error) {
          deferred.reject(error);
        } else {
          util.info('Subscribed to testing publication');
          deferred.resolve();
        }
      });
    });

    return deferred.promise;
  };
};

App.prototype.disconnect = function() {
  var self = this;

  return function() {
    var deferred = Q.defer();

    self._ddpClient.close();

    setTimeout(function() {
      util.info('Disconnected from app');
      deferred.resolve();
    }, 150);

    return deferred.promise;
  }
};

App.prototype.callMethod = function(method, arguments) {
  var methodResponse = Q.defer();
  var dataReady = Q.defer();

  util.info(chalk.yellow(method) + ' called with arguments ' + chalk.yellow('"' + arguments.join('", "') + '"'));

  function onMethod(error, result) {
    util.info(chalk.yellow(method) + ' response received');
    handleMeteorMethodError(error);
    methodResponse.resolve(error);
  };

  function onData() {
    util.info(chalk.yellow(method) + ' data ready');
    dataReady.resolve();
  };

  this._ddpClient.call(method, arguments, onMethod, onData);

  return Q.all([ methodResponse.promise, dataReady.promise ]);
}

App.prototype.findOneFrom = function(name, filter){
  return this.findFrom(name, filter).pop();
};

App.prototype.findFrom = function(name, filter){
  var collections = this._ddpClient.collections;

  if (! collections[name]) {
    return [];
  }

  return Object.keys(collections[name]).map(function(id) {
    return collections[name][id];
  }).filter(filter);
};

App.prototype.login = function(username) {
  return function() {
    return this.callMethod('testing_login', [username]);
  }.bind(this)
}

App.prototype.logout = function() {
  return function() {
    return this.callMethod('logout', [ ]);
  }.bind(this)
}

App.prototype.createUser = function(username, steamId) {
  return function() {
    return this.callMethod('testing_createTestUser', [ username, steamId ]);
  }.bind(this)
};

App.prototype.createCompany = function(companyName) {
  return function() {
    return this.callMethod('testing_createCompany', [ companyName ]);
  }.bind(this)
};

App.prototype.callCreateCompany = function(companyName) {
  return function() {
    return this.callMethod('createCompany', [ companyName ]);
  }.bind(this)
};

App.prototype.callInviteToCompany = function(userId) {
  return function() {
    return this.callMethod('inviteToCompany', [ userId ]);
  }.bind(this)
};

App.prototype.removeFixtures = function() {
  return function() {
    return this.callMethod('testing_removeFixtures', [ ]);
  }.bind(this)
};

App.prototype.addPlayerToCompany = function(username, companyName) {
  return function() {
    return this.callMethod('testing_addPlayerToCompany', [ username, companyName ]);
  }.bind(this)
};

App.prototype.callTestingRegisterServer = function(serverName) {
  return function() {
    return this.callMethod('testingRegisterServer', [serverName, 'salakala']);
  }.bind(this)
};

App.prototype.callPlayerConnected = function(serverName, steamId) {
  return function() {
    return this.callMethod('playerConnected', [serverName, steamId]);
  }.bind(this)
};

App.prototype.callPlayerDisconnected = function(serverName, steamId) {
  return function() {
    return this.callMethod('playerDisconnected', [serverName, steamId]);
  }.bind(this)
};

App.prototype.callSetPlayerReady = function (ready) {
  return function() {
    return this.callMethod('setPlayerReady', [ready]);
  }.bind(this);
};

App.prototype.callTestAddToArmory = function(companyId, amount, armaclass) {
  return function() {
    return this.callMethod('testing_addToArmory', [companyId, amount, armaclass]);
  }.bind(this)
};

App.prototype.callAddToInventory = function(armaclass) {
  return function() {
    return this.callMethod('addToInventory', [armaclass]);
  }.bind(this)
};

App.prototype.callRemoveFromInventory = function(armaclass) {
  return function() {
    return this.callMethod('removeFromInventory', [armaclass]);
  }.bind(this)
};

App.prototype.callTestAddToInventory = function(squadId, amount, armaclass) {
  return function() {
    return this.callMethod('testing_addToInventory', [squadId, amount, armaclass]);
  }.bind(this)
};

App.prototype.callMissionLoot = function (serverName, squadId, loot, objectiveName) {
  return function() {
    return this.callMethod('missionLoot', [serverName, squadId, loot, objectiveName]);
  }.bind(this)
};

App.prototype.callServerStatus = function (serverName, status) {
  return function() {
    return this.callMethod('updateServerStatus', [serverName, status]);
  }.bind(this)
};

App.prototype.callServerDetails = function (serverName, details) {
  return function() {
    return this.callMethod('updateServerDetails', [serverName, details]);
  }.bind(this)
};

App.prototype.callLockServer = function (serverName) {
  return function() {
    return this.callMethod('lockSquads', [serverName]);
  }.bind(this)
};

App.prototype.callCreateSquad = function () {
  return function() {
    return this.callMethod('createSquad', []);
  }.bind(this)
};

App.prototype.callLeaveSquad = function () {
  return function() {
    return this.callMethod('leaveSquad', []);
  }.bind(this)
};

App.prototype.callEnterSquadQueue = function () {
  return function() {
    return this.callMethod('enterSquadQueue', []);
  }.bind(this)
};

App.prototype.callLeaveSquadQueue = function () {
  return function() {
    return this.callMethod('leaveSquadQueue', []);
  }.bind(this)
};

App.prototype.callJoinSquad = function (squadId) {
  return function() {
    return this.callMethod('joinSquad', [squadId]);
  }.bind(this)
};

App.prototype.callTestingElapseSquadTimeout = function (squadId) {
  return function() {
    return this.callMethod('testingElapseSquadTimeout', [squadId]);
  }.bind(this)
};

App.prototype.callTestingElapseServerStatusChanged = function (serverId) {
  return function() {
    return this.callMethod('testingElapseServerStatusChanged', [serverId]);
  }.bind(this)
};

App.prototype.callTestingCheckSquadDeadlines = function () {
  return function() {
    return this.callMethod('testingCheckSquadDeadlines', []);
  }.bind(this)
};

App.prototype.callTestingCheckServerForGameStart = function () {
  return function() {
    return this.callMethod('testingCheckServerForGameStart', []);
  }.bind(this)
};

App.prototype.callTestingCheckServeIsReadyToAbort = function () {
  return function() {
    return this.callMethod('testingCheckServeIsReadyToAbort', []);
  }.bind(this)
};

App.prototype.callTestingSetMinSquadsToStartGame = function (min) {
  return function() {
    return this.callMethod('testingSetMinSquadsToStartGame', [min]);
  }.bind(this)
};

App.prototype.callTestingSetMinTimeToStartGame = function (min) {
  return function() {
    return this.callMethod('testingSetMinTimeToStartGame', [min]);
  }.bind(this)
};

App.prototype.callTestingSetMaxPlayersPerServer = function (max) {
  return function() {
    return this.callMethod('testingSetMaxPlayersPerServer', [max]);
  }.bind(this)
};

App.prototype.callTestingSetMinTeamsToAbort = function (max) {
  return function() {
    return this.callMethod('testingSetMinTeamsToAbort', [max]);
  }.bind(this)
};

App.prototype.callTestingSetMaxSquadMembers = function (max) {
  return function() {
    return this.callMethod('testingSetMaxSquadMembers', [max]);
  }.bind(this)
};

App.prototype.callTestingLoginAsServer = function (serverName) {
  return function() {
    return this.callMethod('testingLoginAsServer', [serverName]);
  }.bind(this)
};

App.prototype.callTestingEvaluateSquads = function () {
  return function() {
    return this.callMethod('testingEvaluateSquads', []);
  }.bind(this)
};

App.prototype.callTestingSetServerStatus = function (serverName, status) {
  return function() {
    return this.callMethod('testingSetServerStatus', [serverName, status]);
  }.bind(this)
};

function handleMeteorMethodError(error) {
  if (error) {
    util.error('Error in Meteor method: ' + error.message);
    throw new Error(error.message);
  }
}
