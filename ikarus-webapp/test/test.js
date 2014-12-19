var Q = require('q');
var ddpClient = require('./ddp').ddpClient;

describe('something', function() {
  beforeEach(function(done) {
    ddpClient.connect(function(error) {
      if (error) {
        throw new Error('DDP connection failed!');
      }

      function onSubscribe() {
        info('Subscribed to testing publication');
        done();
      }

      ddpClient.subscribe('testing', [], onSubscribe);
    });
  });

  afterEach(function(done) {
    removeTestUsers()
      .then(done);
  })

  it('logs in as test user', function(done) {
    createUser('testiukko', '123123123', 'salakala')
      .then(login('testiukko', 'salakala'))
      .then(done)
      .catch(handleError);
  })
});

var meteorCall = asPromised(ddpClient.call, ddpClient);
var createUser = asPromised(callCreateUser);
var login = asPromised(callLogin);
var removeTestUsers = asPromised(callRemoveTestUsers);

function handleError(error) {
  error(error);
}

function callCreateUser(username, steamId, password, callback) {
  ddpClient.call('testing_createTestUser', [ username, steamId, password ], function(error, result) {
    if (error) {
      error('Error creating test user', error);
    } else {
      info('Test user created');
    }
    callback();
  });
}

function callRemoveTestUsers(callback) {
  ddpClient.call('testing_removeTestUsers', [ ], function(error, result) {
    if (error) {
      error('Error removing test user', error);
    } else {
      info('Test users removed');
    }
    callback();
  });
}

function callLogin(username, password, callback) {
  ddpClient.call( 'login', [ { user: { username: username }, password: password } ], function(error, result) {
    if (error) {
      error('Error logging in as test user', error);
    } else {
      info('Logged in as test user');
    }
    callback();
  });
}

function info(str) {
  console.log('[INFO]: ' + str);
}

function error(str) {
  console.error('[ERROR] ' + str);
}

function asPromised(fn, ctx) {
  if (typeof fn !== 'function') {
    throw new Error(fn + ' is not a function');
  }

  return function() {
    var deferred = Q.defer();
    var args = Array.prototype.slice.call(arguments);
    args.push(function(err, result) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(result);
      }
    });

    fn.apply(ctx, args);

    return deferred.promise;
  }
}
