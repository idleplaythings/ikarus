var util = require('./util');
var App = require('./app');
var ddpClient = require('./ddp').ddpClient;
require('jasmine-custom-message');

var app = new App(ddpClient);

jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

describe('ikarus', function() {
  beforeEach(function(done) {
    function onConnection() {
      util.info('DDP connection opened');
    }

    function onSubscribe() {
      util.info('Subscribed to testing publication');
    }
    connect()
      .then(onConnection)
      .then(subscribe('testing', []))
      .then(onSubscribe)
      .finally(done)
      .catch(handleError.bind(this));
  });

  afterEach(function(done) {
    app.removeFixtures()(null)
      .then(close)
      .finally(done)
      .catch(handleError.bind(this));
  });

  it('logs in as test user', function(done) {
    app.createUser('testiukko2', '123123123', 'salakala')()
      .then(app.login('testiukko2', 'salakala'))
      .then(app.logout())
      .finally(done)
      .catch(handleError.bind(this));
  });

  it('creates a company', function(done) {
    app.createUser('testiukko2', '123123123', 'salakala')(null)
      .then(app.login('testiukko2', 'salakala'))
      .then(app.createCompany('Metsien Miehet'))
      .then(assertMemberOf(ddpClient.collections, '123123123', 'Metsien Miehet'))
      .then(app.logout())
      .finally(done)
      .catch(handleError.bind(this))
  });
});

var connect = util.asPromised(ddpClient.connect, ddpClient);
var close = ddpClient.close.bind(ddpClient);
var subscribe = function(collection, params) {
  return function() {
    return util.asPromised(ddpClient.subscribe, ddpClient)(collection, params);
  }
}

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
      util.info('Steam id "' + steamId + '" found in company "' + companyName + '"')
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
