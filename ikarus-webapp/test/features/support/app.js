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

App.prototype.callInviteToCompany = function(username) {
  return function() {
    return this.callMethod('inviteToCompany', [ username ]);
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


function handleMeteorMethodError(error) {
  if (error) {
    util.error('Error in Meteor method: ' + error.message);
    throw new Error(error.message);
  }
}
