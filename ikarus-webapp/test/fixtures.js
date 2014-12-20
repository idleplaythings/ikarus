var util = require('./util');
var Q = require('q');

module.exports = {
  login: function login(ddpClient) {
    return function(username, password) {
      return function() {
        var methodResponse = Q.defer();
        var dataReady = Q.defer();

        util.info('fixtures.login: Logging in as "' + username + '"');

        ddpClient.call(
          'login',
          [ { user: { username: username }, password: password } ],
          function(error, result) {
            handleMeteorMethodError(error);
            util.info('fixtures.login: Logged in as "' + username + '"');
            methodResponse.resolve(error);
          },
          function() {
            util.info('fixtures.login: Data ready')
            dataReady.resolve();
          }
        );

        return Q.all([ methodResponse.promise, dataReady.promise ]);
      }
    }
  },
  logout: function logout(ddpClient) {
    return function() {
      return function() {
        var methodResponse = Q.defer();
        var dataReady = Q.defer();

        util.info('fixtures.logout: Logging out');

        ddpClient.call(
          'logout',
          [ ],
          function(error, result) {
            handleMeteorMethodError(error);
            util.info('fixtures.logout: Logged out');
            methodResponse.resolve(error);
          },
          function() {
            util.info('fixtures.logout: Data ready')
            dataReady.resolve();
          }
        );

        return Q.all([ methodResponse.promise, dataReady.promise ]);
      }
    }
  },
  createUser: function createUser(ddpClient) {
    return function(username, steamId, password) {
      return function() {
        var methodResponse = Q.defer();
        var dataReady = Q.defer();

        util.info('fixtures.createUser: Creating user "' + username + '"');

        ddpClient.call(
          'testing_createTestUser',
          [ username, steamId, password ],
          function(error, result) {
            handleMeteorMethodError(error);
            util.info('fixtures.createUser: User "' + username + '" created');
            methodResponse.resolve(result);
          },
          function() {
            util.info('fixtures.createUser: Data ready')
            dataReady.resolve();
          }
        );

        return Q.all([ methodResponse.promise, dataReady.promise ]);
      }
    }
  },
  createCompany: function createCompany(ddpClient) {
    return function(companyName) {
      return function() {
        var methodResponse = Q.defer();
        var dataReady = Q.defer();

        util.info('createCompany: Creating company "' + companyName + '"');

        ddpClient.call(
          'createCompany',
          [ companyName ],
          function(error, result) {
            handleMeteorMethodError(error);
            util.info('createCompany: Company "' + companyName + '" created');
            methodResponse.resolve(result);
          },
          function() {
            util.info('createCompany: Data ready')
            dataReady.resolve();
          }
        );

        return Q.all([ methodResponse.promise, dataReady.promise ]);
      }
    }
  },
  removeFixtures: function removeFixtures(ddpClient) {
    return function() {
      return function() {
        var methodResponse = Q.defer();
        var dataReady = Q.defer();

        util.info('removeFixtures: Removing fixtures');

        ddpClient.call(
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
    }
  }
};

function handleMeteorMethodError(error) {
  if (error) {
    util.error('Error in Meteor method: ' + error.message);
    throw new Error(error.message);
  }
}
