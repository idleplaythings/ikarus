var util = require('./util');
var Q = require('q');

module.exports = App;

function App(ddpClient) {
  this._ddpClient = ddpClient;
}

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
      'createCompany',
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

App.prototype.removeFixtures = function() {
  var self = this;

  return function() {
    var methodResponse = Q.defer();
    var dataReady = Q.defer();

    util.info('removeFixtures: Removing fixtures');

    self._ddpClient.call(
      'testing_removeFixtures',
      [ ],
      function(error, result) {
        handleMeteorMethodError(error);
        util.info('removeFixtures: Test fixtures removed');
        methodResponse.resolve(result);
      },
      function() {
        util.info('removeFixtures: Data ready')
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
