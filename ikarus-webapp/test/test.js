var util = require('./util');
var fixtures = require('./fixtures');
var ddpClient = require('./ddp').ddpClient;
var Q = require('q');
require('jasmine-custom-message');

// Gotta go fast, man...
jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;

describe('ikarus', function() {
  beforeEach(function(done) {
    function onConnection() {
      info('DDP connection opened');
    }

    function onSubscribe() {
      info('Subscribed to testing publication');
    }
    connect()
      .then(onConnection)
      .then(subscribe('testing', []))
      .then(onSubscribe)
      .finally(done)
      .catch(handleError.bind(this));
  });

  afterEach(function(done) {
    removeFixtures()(null)
      .then(close)
      .finally(done)
      .catch(handleError.bind(this));
  });

  it('logs in as test user', function(done) {
    createUser('testiukko2', '123123123', 'salakala')()
      .then(login('testiukko2', 'salakala'))
      .then(logout())
      .finally(done)
      .catch(handleError.bind(this));
  });

  it('creates a company', function(done) {
    createUser('testiukko2', '123123123', 'salakala')(null)
      .then(login('testiukko2', 'salakala'))
      .then(createCompany('Metsien Miehet'))
      .then(assertMemberOf(ddpClient.collections, '123123123', 'Metsien Miehet'))
      .then(logout())
      .finally(done)
      .catch(handleError.bind(this))
  });
});

function log(msg, fn) {
  return function() {
    info(msg);
    fn();
  }
}

var info = util.info;
var error = util.error;
var connect = util.asPromised(ddpClient.connect, ddpClient);
var close = ddpClient.close.bind(ddpClient);
var subscribe = function(collection, params) {
  return function() {
    return util.asPromised(ddpClient.subscribe, ddpClient)(collection, params);
  }
}
// var createUser = util.asPromised(fixtures.createUser(ddpClient));
var login = fixtures.login(ddpClient);
var logout = fixtures.logout(ddpClient);
var createUser = fixtures.createUser(ddpClient);
var createCompany = fixtures.createCompany(ddpClient);
var removeFixtures = fixtures.removeFixtures(ddpClient);

function assertMemberOf(collections, steamId, companyName) {
  return function() {
    var companies = Object.keys(collections.companies)
      .map(function(companyId) {
        return collections.companies[companyId]
      })
      .filter(function(company) {
        return company.name === companyName;
      });

      since('Unable to find steam id "' + steamId + '" in company "' + companyName + '"')
        .expect(companies[0].playerIds).toContain(steamId);
  }
}

function handleError(error) {
  var msg;

  if (error instanceof Error) {
    msg = error.message + "\n\n" + error.stack;
  } else if (error.message) {
    msg = error.message;
  } else {
    msg = error;
  }

  since(msg).expect(true).toBe(false);
}

// ddpClient.on('message', function (msg) {
//   console.log("ddp message: " + msg);
// });

// ddpClient.on('socket-close', function(code, message) {
//   console.log("Close: %s %s", code, message);
// });

// ddpClient.on('socket-error', function(error) {
//   console.log("Error: %j", error);
// });
