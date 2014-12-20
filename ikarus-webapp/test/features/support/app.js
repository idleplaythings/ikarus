var util = require('./util');
var Q = require('q');

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

App.prototype.login = function(username, password) {
  var self = this;

  return function() {
    var methodResponse = Q.defer();
    var dataReady = Q.defer();

    util.info('app.login: Logging in as "' + username + '"');

    self._ddpClient.call(
      'login',
      [ { user: { username: username }, password: password } ],
      function(error, result) {
        handleMeteorMethodError(error);
        util.info('app.login: Logged in as "' + username + '"');
        methodResponse.resolve(error);
      },
      function() {
        util.info('app.login: Data ready')
        dataReady.resolve();
      }
    );

    return Q.all([ methodResponse.promise, dataReady.promise ]);
  }
};

App.prototype.logout = function() {
  var self = this;

  return function() {
    var methodResponse = Q.defer();
    var dataReady = Q.defer();

    util.info('app.logout: Logging out');

    self._ddpClient.call(
      'logout',
      [ ],
      function(error, result) {
        handleMeteorMethodError(error);
        util.info('app.logout: Logged out');
        methodResponse.resolve(error);
      },
      function() {
        util.info('app.logout: Data ready')
        dataReady.resolve();
      }
    );

    return Q.all([ methodResponse.promise, dataReady.promise ]);
  }
};

App.prototype.createUser = function(username, steamId, password) {
  var self = this;

  return function() {
    var methodResponse = Q.defer();
    var dataReady = Q.defer();

    util.info('app.createUser: Creating user "' + username + '"');

    self._ddpClient.call(
      'testing_createTestUser',
      [ username, steamId, password ],
      function(error, result) {
        handleMeteorMethodError(error);
        util.info('app.createUser: User "' + username + '" created');
        methodResponse.resolve(result);
      },
      function() {
        util.info('app.createUser: Data ready')
        dataReady.resolve();
      }
    );

    return Q.all([ methodResponse.promise, dataReady.promise ]);
  }
};

App.prototype.createCompany = function(companyName) {
  var self = this;

  return function() {
    var methodResponse = Q.defer();
    var dataReady = Q.defer();

    util.info('app.createCompany: Creating company "' + companyName + '"');

    self._ddpClient.call(
      'testing_createCompany',
      [ companyName ],
      function(error, result) {
        handleMeteorMethodError(error);
        util.info('app.createCompany: Company "' + companyName + '" created');
        methodResponse.resolve(result);
      },
      function() {
        util.info('app.createCompany: Data ready')
        dataReady.resolve();
      }
    );

    return Q.all([ methodResponse.promise, dataReady.promise ]);
  }
};

App.prototype.callCreateCompany = function(companyName) {
  var self = this;

  return function() {
    var methodResponse = Q.defer();
    var dataReady = Q.defer();

    util.info('app.callCreateCompany: Creating company "' + companyName + '"');

    self._ddpClient.call(
      'createCompany',
      [ companyName ],
      function(error, result) {
        handleMeteorMethodError(error);
        util.info('app.callCreateCompany: Company "' + companyName + '" created');
        methodResponse.resolve(result);
      },
      function() {
        util.info('app.callCreateCompany: Data ready')
        dataReady.resolve();
      }
    );

    return Q.all([ methodResponse.promise, dataReady.promise ]);
  }
};

App.prototype.callInviteToCompany = function(username) {
  var self = this;

  return function() {
    var methodResponse = Q.defer();
    var dataReady = Q.defer();

    util.info('app.callInviteToCompany: Inviting "' + username + '" to company');

    self._ddpClient.call(
      'inviteToCompany',
      [ username ],
      function(error, result) {
        handleMeteorMethodError(error);
        util.info('app.callInviteToCompany: "' + username + '" invited to company');
        methodResponse.resolve(result);
      },
      function() {
        util.info('app.callInviteToCompany: Data ready')
        dataReady.resolve();
      }
    );

    return Q.all([ methodResponse.promise, dataReady.promise ]);
  }
};

App.prototype.removeFixtures = function() {
  var self = this;

  return function() {
    var methodResponse = Q.defer();
    var dataReady = Q.defer();

    util.info('app.removeFixtures: Removing fixtures');

    self._ddpClient.call(
      'testing_removeFixtures',
      [ ],
      function(error, result) {
        handleMeteorMethodError(error);
        util.info('app.removeFixtures: Test fixtures removed');
        methodResponse.resolve(result);
      },
      function() {
        util.info('app.removeFixtures: Data ready')
        dataReady.resolve();
      }
    );

    return Q.all([ methodResponse.promise, dataReady.promise ]);
  }
};

App.prototype.addPlayerToCompany = function(username, companyName) {
  var self = this;

  return function() {
    var methodResponse = Q.defer();
    var dataReady = Q.defer();

    util.info('app.addPlayerToCompany: Adding player "' + username + '" to company "' + companyName + '"');

    self._ddpClient.call(
      'testing_addPlayerToCompany',
      [ username, companyName ],
      function(error, result) {
        handleMeteorMethodError(error);
        util.info('app.addPlayerToCompany: Player "' + username + '" added to company "' + companyName + '"');
        methodResponse.resolve(result);
      },
      function() {
        util.info('app.addPlayerToCompany: Data ready')
        dataReady.resolve();
      }
    );

    return Q.all([ methodResponse.promise, dataReady.promise ]);
  }
};

function handleMeteorMethodError(error) {
  if (error) {
    util.error('Error in Meteor method: ' + error.message);
    throw new Error(error.message);
  }
}
