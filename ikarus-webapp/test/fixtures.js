var util = require('./util');

module.exports = {
  callLogin: callLogin,
  callCreateUser: callCreateUser,
  callRemoveTestUsers: callRemoveTestUsers
}

function callLogin(ddpClient) {
  return function(username, password, callback) {
    ddpClient.call( 'login', [ { user: { username: username }, password: password } ], function(error, result) {
      if (error) {
        util.error('Error logging in as test user', error);
      } else {
        util.info('Logged in as test user');
      }
      callback();
    });
  }
}


function callCreateUser(ddpClient) {
  return function(username, steamId, password, callback) {
    ddpClient.call('testing_createTestUser', [ username, steamId, password ], function(error, result) {
      if (error) {
        util.error('Error creating test user', error);
      } else {
        util.info('Test user created');
      }
      callback();
    });
  }
}

function callRemoveTestUsers(ddpClient) {
  return function (callback) {
    ddpClient.call('testing_removeTestUsers', [ ], function(error, result) {
      if (error) {
        util.error('Error removing test user', error);
      } else {
        util.info('Test users removed');
      }
      callback();
    });
  }
}